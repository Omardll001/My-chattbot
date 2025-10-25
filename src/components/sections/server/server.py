# server.py (Memory-optimized)
import os
import json
import logging
import re
from pathlib import Path
from typing import Optional

import numpy as np
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import openai

# --- Config ---
KB_DIR = Path("kb_store")
KB_ITEMS_PATH = KB_DIR / "kb_items.json"
KB_EMB_PATH = KB_DIR / "kb_embeddings.npz"

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-3.5-turbo").strip()

OLLAMA_TIMEOUT = 120
TOP_K = int(os.environ.get("TOP_K", 3))
MAX_CONTEXT_CHARS = 4000

ALPHA_TEXT = 0.7
BETA_TITLE = 1.2
GAMMA_PRIORITY = 1.0
RECENCY_BASE_YEAR = 2018
RECENCY_SCALE = 0.03

ID_BOOSTS = {"humly": 1.0, "outliar": 0.9, "meliox": 0.3}

WORK_INTENT_PATTERNS = [
    r"\b(work|experience|job|employed|role|intern|position|worked|employment|professional experience)\b",
    r"\b(current role|previous role|where do you work|where did you work)\b",
]

GREETING_PATTERNS = [
    r'^\s*(hi|hello|hey|hiya|yo)\b',
    r'\bhow are you\b',
    r'\bhow\'s it going\b',
    r'\bgood morning\b',
    r'\bgood afternoon\b',
    r'\bgood evening\b',
]

# --- Quick KB lookup patterns ---
NAME_PATTERNS = [r"\bwhat('?s| is) your name\b", r"\bwho are you\b", r"\bwhat should I call you\b"]
CONTACT_PATTERNS = [r"\b(contact|email|phone|how can I reach|reach me|contact info)\b"]
LANGUAGES_PATTERNS = [r"\b(language|languages|speak|speaks|spoken|fluent)\b"]
EDUCATION_PATTERNS = [r"\b(studied|university|college|degree|education|where did you study)\b"]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Flask init ---
app = Flask(__name__)
CORS(app, origins="*")  # or specify your Vercel domain for more security

# --- OpenAI init ---
if not OPENAI_API_KEY:
    logger.warning("OPENAI_API_KEY not set. OpenAI calls will fail until configured.")
client = openai.OpenAI(api_key=OPENAI_API_KEY)

# --- Load KB and embeddings ---
if not KB_ITEMS_PATH.exists() or not KB_EMB_PATH.exists():
    raise FileNotFoundError("kb_items.json or kb_embeddings.npz not found in kb_store. Run embed.py first.")

with open(KB_ITEMS_PATH, "r", encoding="utf-8") as f:
    kb_items = json.load(f)

npz = np.load(KB_EMB_PATH, allow_pickle=True)
kb_embeddings = np.asarray(npz["embeddings"], dtype=np.float32)
title_embeddings = np.asarray(npz["title_embeddings"], dtype=np.float32)
ids = list(npz["ids"])

# Make embeddings read-only to save memory
kb_embeddings.flags.writeable = False
title_embeddings.flags.writeable = False

# --- Lazy CPU-only embedder + query cache ---
_embedder = None
_query_cache = {}

def get_embedder():
    global _embedder
    if _embedder is None:
        os.environ["CUDA_VISIBLE_DEVICES"] = ""  # force CPU
        logger.info("Loading SentenceTransformer model on CPU")
        _embedder = SentenceTransformer("sentence-transformers/paraphrase-MiniLM-L3-v2", device="cpu")
    return _embedder

def get_query_embedding(query: str):
    if query in _query_cache:
        return _query_cache[query]
    embedder = get_embedder()
    q_emb = embedder.encode(query, convert_to_numpy=True, normalize_embeddings=True)
    if q_emb.ndim == 2:
        q_emb = q_emb[0]
    q = q_emb / (np.linalg.norm(q_emb) + 1e-12)
    _query_cache[query] = q
    return q

# --- Helper functions ---
def is_greeting(text: str) -> bool:
    if not text:
        return False
    t = text.lower().strip()
    for pat in GREETING_PATTERNS:
        if re.search(pat, t):
            return True
    return len(t.split()) <= 2 and t in {"hey", "hi", "hello", "hiya", "how are you", "how r u"}

def extract_most_recent_year(text: str) -> Optional[int]:
    if not text:
        return None
    years = re.findall(r"(?:19|20)\d{2}", text)
    return max(map(int, years)) if years else None

def is_work_intent(text: str) -> bool:
    if not text:
        return False
    t = text.lower()
    return any(re.search(pat, t) for pat in WORK_INTENT_PATTERNS)

def normalize_rows(x):
    x = np.asarray(x, dtype=np.float32)
    norms = np.linalg.norm(x, axis=1, keepdims=True) + 1e-12
    return x / norms

kb_embeddings = normalize_rows(kb_embeddings)
title_embeddings = normalize_rows(title_embeddings)

def find_kb_snippet(keywords):
    """Return the first KB item (title, summary, text) containing any keyword."""
    keys = [k.lower() for k in keywords]
    for it in kb_items:
        text_blob = " ".join([str(it.get("title","") or ""), str(it.get("summary","") or ""), str(it.get("text","") or "")]).lower()
        for k in keys:
            if k in text_blob:
                return (it.get("title",""), it.get("summary",""), it.get("text",""))
    return None

def get_top_k(query: str, k: int = TOP_K):
    q = get_query_embedding(query)
    sim_text = np.dot(kb_embeddings, q)
    sim_title = np.dot(title_embeddings, q)
    combined = ALPHA_TEXT * sim_text + BETA_TITLE * sim_title

    for idx, it in enumerate(kb_items):
        priority = float(it.get("priority", 0.0) or 0.0)
        combined[idx] += GAMMA_PRIORITY * priority
        item_id = it.get("id")
        if item_id in ID_BOOSTS:
            combined[idx] += float(ID_BOOSTS[item_id])
        year = it.get("year") or extract_most_recent_year(it.get("text", ""))
        if year:
            combined[idx] += max(0, int(year) - RECENCY_BASE_YEAR) * RECENCY_SCALE

    idxs = np.argsort(-combined)[:k]
    return idxs, combined[idxs]

# --- OpenAI call helper (new API) ---
def call_openai_chat(prompt: str, model: str = OPENAI_MODEL, timeout: int = 60):
    if not OPENAI_API_KEY:
        raise RuntimeError("OpenAI API key not configured.")
    # Clearer system prompt: represent Omar Dalal, use ONLY provided context
    messages = [
        {"role": "system", "content": 
            "You are an AI assistant representing Omar Dalal. Use ONLY the provided context to answer questions. "
            "If the answer exists in the context, provide it clearly. If not present, say you don't know. "
            "When asked for your name or who you are, answer 'Omar Dalal' or 'I am Omar Dalal'. "
            "If contact information is present in the context, provide it. Do not refuse to share information that is explicitly in the context."},
        {"role": "user", "content": prompt},
    ]
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        max_tokens=1024,
        temperature=0.0,
        timeout=timeout,
    )
    return response.choices[0].message.content

# --- Flask routes ---
@app.route("/", methods=["GET"])
def home():
    html = """
    <!doctype html>
    <html>
      <head><meta charset="utf-8"><title>Backend is running</title></head>
      <body>
        <h1>Flask backend is running</h1>
        <p>This server exposes a POST endpoint <code>/api/query</code> for the chatbot.</p>
      </body>
    </html>
    """
    return Response(html, content_type="text/html; charset=utf-8")

@app.route("/favicon.ico")
def favicon():
    return Response(status=204)

@app.route("/api/query", methods=["GET"])
def api_query_get():
    return jsonify({"error": "POST JSON required"}), 400

# ...existing Flask routes...
@app.route("/api/query", methods=["POST"])
def api_query():
    data = request.get_json() or {}
    question = (data.get("question") or "").strip()
    top_k = int(data.get("top_k", TOP_K))
    if not question:
        return jsonify({"error": "Missing question"}), 400

    q_lower = question.lower()

    # Direct intent / KB lookups for exact profile fields
    for pat in NAME_PATTERNS:
        if re.search(pat, q_lower):
            # Represent the owner explicitly
            return jsonify({"answer": "Omar Dalal"})

    for pat in CONTACT_PATTERNS:
        if re.search(pat, q_lower):
            found = find_kb_snippet(["contact", "email", "phone", "contact information", "reach me", "mailto"])
            if found:
                title, summary, text = found
                contact_text = "\n".join([s for s in (summary, text) if s]).strip()
                return jsonify({"answer": contact_text or "Contact information is present in the profile."})
            return jsonify({"answer": "No public contact information is present in the knowledge base."})

    for pat in LANGUAGES_PATTERNS:
        if re.search(pat, q_lower):
            found = find_kb_snippet(["language", "languages", "speak", "fluent", "spoken"])
            if found:
                _, summary, text = found
                return jsonify({"answer": (summary or text or "Languages are mentioned in the profile.")})
            break

    for pat in EDUCATION_PATTERNS:
        if re.search(pat, q_lower):
            found = find_kb_snippet(["university", "college", "degree", "studied", "education", "bachelor", "master", "msc", "phd", "bth", "blekinge"])
            if found:
                _, summary, text = found
                return jsonify({"answer": (summary or text or "Education is mentioned in the profile.")})
            break

    # Greeting preserved
    if is_greeting(question):
        return jsonify({"answer": "Hi! 👋 I'm an AI chatbot about Omar Dalal. Ask me anything!"})

    work_query = is_work_intent(question)
    retrieval_k = top_k if not work_query else max(top_k, 5)

    try:
        idxs, scores = get_top_k(question, retrieval_k)
        idxs = list(idxs)

        if work_query:
            for fid in ("humly", "outliar"):
                found_index = next((i for i, it in enumerate(kb_items) if it.get("id") == fid), None)
                if found_index is not None and found_index not in idxs:
                    idxs.append(found_index)
            idxs = idxs[:retrieval_k]

        if not idxs:
            return jsonify({"answer": "I couldn't find relevant information in the knowledge base."})

        top_items = [kb_items[i] for i in idxs]
        context_parts = [f"{it.get('title', '')}: {it.get('summary','')}\n\n{it.get('text','')}" for it in top_items]
        context_str = "\n\n---\n\n".join(context_parts)[:MAX_CONTEXT_CHARS]

        prompt = f"Context:\n\n{context_str}\n\nUser question: \"{question}\""
        stdout = call_openai_chat(prompt, model=OPENAI_MODEL, timeout=OLLAMA_TIMEOUT).strip()

        return jsonify({"answer": stdout, "context_used": context_parts})
    except Exception as e:
        logger.exception("Unhandled error")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    host = os.environ.get("FLASK_HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8080))
    app.run(host=host, port=port, debug=False)
