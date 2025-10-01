# server.py (OpenAI version)
import os
import json
import time
import re
import logging
from pathlib import Path
from typing import Optional

import numpy as np
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from sentence_transformers import SentenceTransformer

# OpenAI
import openai

# --- Config ---
KB_DIR = Path("kb_store")
KB_ITEMS_PATH = KB_DIR / "kb_items.json"
KB_EMB_PATH = KB_DIR / "kb_embeddings.npz"

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-3.5-turbo").strip()
OLLAMA_UNUSED = os.environ.get("OLLAMA_HOST", "")

OLLAMA_TIMEOUT = 120
TOP_K = int(os.environ.get("TOP_K", 3))
MAX_CONTEXT_CHARS = 4000

# retrieval scoring weights (same as you had)
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

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Flask init ---
app = Flask(__name__)
CORS(app)

# --- OpenAI init ---
if not OPENAI_API_KEY:
    logger.warning("OPENAI_API_KEY not set. OpenAI calls will fail until you set OPENAI_API_KEY in environment.")
openai.api_key = OPENAI_API_KEY

# --- Load KB + embeddings + embedder ---
if not KB_ITEMS_PATH.exists() or not KB_EMB_PATH.exists():
    raise FileNotFoundError("kb_items.json or kb_embeddings.npz not found in kb_store. Run embed.py first.")

with open(KB_ITEMS_PATH, "r", encoding="utf-8") as f:
    kb_items = json.load(f)

npz = np.load(KB_EMB_PATH, allow_pickle=True)
kb_embeddings = np.asarray(npz["embeddings"], dtype=np.float32)
title_embeddings = np.asarray(npz["title_embeddings"], dtype=np.float32)
ids = list(npz["ids"])

embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

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

def get_top_k(query: str, k: int = TOP_K):
    q_emb = embedder.encode(query, convert_to_numpy=True, normalize_embeddings=True)
    if q_emb.ndim == 2:
        q_emb = q_emb[0]
    q = q_emb / (np.linalg.norm(q_emb) + 1e-12)

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

# --- OpenAI call helper ---
def call_openai_chat(prompt: str, model: str = OPENAI_MODEL, timeout: int = 60):
    """
    Calls OpenAI Chat API using the messages format. Returns text string.
    """
    if not openai.api_key:
        raise RuntimeError("OpenAI API key not configured (OPENAI_API_KEY).")

    # Build the messages array with a system instruction and the prompt
    messages = [
        {"role": "system", "content": "You are an assistant that answers questions about Omar Dalal using ONLY the provided context."},
        {"role": "user", "content": prompt},
    ]

    # Use ChatCompletions (compatible with gpt-3.5-turbo, gpt-4o-mini, etc.)
    try:
        resp = openai.ChatCompletion.create(
            model=model,
            messages=messages,
            max_tokens=1024,
            temperature=0.0,
        )
    except Exception as e:
        # bubble up for caller to log nicely
        raise

    # defensive extraction
    choices = resp.get("choices", [])
    if choices and isinstance(choices, list):
        first = choices[0]
        if isinstance(first, dict):
            # new openai responses put text in message.content or text
            if "message" in first and isinstance(first["message"], dict) and "content" in first["message"]:
                return first["message"]["content"]
            if "text" in first and isinstance(first["text"], str):
                return first["text"]
    # fallback to stringified response
    return json.dumps(resp, ensure_ascii=False)

# --- Utility routes to avoid 404s for common checks ---
@app.route("/", methods=["GET"])
def home():
    html = """
    <!doctype html>
    <html>
      <head><meta charset="utf-8"><title>Backend is running</title></head>
      <body>
        <h1>Flask backend is running</h1>
        <p>This server exposes a POST endpoint <code>/api/query</code> for the chatbot.</p>
        <p>Frontend (static app) is typically served on <a href="http://localhost:5173">http://localhost:5173</a>.</p>
        <h3>Quick test</h3>
        <pre>
curl -X POST "http://localhost:5174/api/query" \\
  -H "Content-Type: application/json" \\
  -d '{"question":"Tell me about Omar Dalal"}'
        </pre>
      </body>
    </html>
    """
    return Response(html, content_type="text/html; charset=utf-8")

@app.route("/favicon.ico")
def favicon():
    return Response(status=204)

@app.route("/api/query", methods=["GET"])
def api_query_get():
    msg = {
        "error": "This endpoint requires a POST request with JSON body.",
        "usage": {
            "method": "POST",
            "url": "/api/query",
            "headers": {"Content-Type": "application/json"},
            "body_example": {"question": "Tell me about Omar Dalal", "top_k": TOP_K}
        }
    }
    return jsonify(msg), 400

# --- Main API endpoint (POST) ---
@app.route("/api/query", methods=["POST"])
def api_query():
    data = request.get_json() or {}
    question = (data.get("question") or "").strip()
    top_k = int(data.get("top_k", TOP_K))
    if not question:
        return jsonify({"error": "Missing question"}), 400

    if is_greeting(question):
        return jsonify({"answer": "Hi! 👋 I'm an AI chatbot about Omar Dalal. I can answer questions about Omar's education, skills, projects and contact info. What would you like to know about him?"})

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

        top_items = [kb_items[i] for i in idxs]
        context_parts = []
        for it in top_items:
            title = it.get("title", "")
            summary = it.get("summary", "")
            text = it.get("text", "")
            if summary:
                context_parts.append(f"{title}: {summary}\n\n{text}")
            else:
                context_parts.append(f"{title}: {text}")

        context_str = "\n\n---\n\n".join(context_parts)
        if len(context_str) > MAX_CONTEXT_CHARS:
            context_str = context_str[:MAX_CONTEXT_CHARS] + "\n\n...context truncated..."

        if work_query:
            prompt = (
                "You are an assistant that answers questions about Omar Dalal using ONLY the provided context.\n\n"
                f"{context_str}\n\n"
                f'User question: \"{question}\"\n\n'
                "Answer thoroughly and helpfully. For work experience questions, include role/title, dates, responsibilities, achievements, and technologies/tools used. If info not in context, reply exactly: \"I don't know.\""
            )
        else:
            prompt = (
                "You are an assistant that answers questions about Omar Dalal using ONLY the provided context.\n\n"
                f"{context_str}\n\n"
                f'User question: \"{question}\"\n\n'
                "Answer concisely but helpfully. If info not in context, reply exactly: \"I don't know.\""
            )

        # Call OpenAI
        try:
            stdout = call_openai_chat(prompt, model=OPENAI_MODEL, timeout=OLLAMA_TIMEOUT)
            stdout = str(stdout).strip()
        except Exception as e:
            logger.exception("OpenAI call failed")
            return jsonify({"error": f"OpenAI error: {str(e)}"}), 500

        # Expand short work answers if needed (optional)
        if work_query and len(stdout.split()) < 45:
            try:
                expand_prompt = (
                    "The prior answer was short. Based on the same context, please expand the answer for the user. "
                    "Include role/title, dates, responsibilities, achievements, and technologies/tools used. "
                    "Do NOT add new facts beyond the provided context.\n\n"
                    f"{context_str}\n\nUser question: \"{question}\"\n"
                )
                stdout2 = call_openai_chat(expand_prompt, model=OPENAI_MODEL, timeout=OLLAMA_TIMEOUT)
                if stdout2 and len(str(stdout2).strip()) > 0:
                    stdout = str(stdout2).strip()
            except Exception:
                logger.exception("Expand call failed; keeping original.")

        return jsonify({"answer": stdout, "context_used": context_parts})
    except Exception as e:
        logger.exception("Unhandled error in /api/query")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    host = os.environ.get("FLASK_HOST", "0.0.0.0")
    port = int(os.environ.get("FLASK_PORT", 5174))
    app.run(host=host, port=port, debug=True)
