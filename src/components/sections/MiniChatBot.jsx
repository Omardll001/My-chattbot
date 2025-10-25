import { RevealOnScroll } from "../RevealOnScroll";
import { useState, useRef, useEffect } from "react";

export const MiniChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm Omar's portfolio chatbot — ask me anything about Omar's experience, skills, projects or contact info." },
  ]);
  const [input, setInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const scrollRef = useRef(null);
  const API_BASE = (import.meta && import.meta.env && import.meta.env.VITE_API_URL) || process.env.REACT_APP_API_URL || "http://localhost:8080";
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || processing) return;

    // Add user message and bot placeholder
    setMessages(prev => [...prev, { sender: "user", text: trimmed }, { sender: "bot", text: "⏳ Thinking..." }]);
    setInput("");
    setProcessing(true);

    try {
      const resp = await fetch(`${API_BASE}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, top_k: 3 }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Unknown server error" }));
        throw new Error(err.error || "Server error");
      }

      // const sources = (data.sources || []).map(s => `Source ${s.sourceNumber}: ${s.title}`).join("\n");
      const data = await resp.json();
      const answer = data.answer || "No answer";

      // replace the 'Thinking...' placeholder with final answer (no sources)
      setMessages(prev => {
        const copy = [...prev];
        let idx = -1;
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].sender === "bot" && /thinking/i.test(copy[i].text)) {
            idx = i;
            break;
          }
        }
        if (idx >= 0) {
          copy[idx] = { sender: "bot", text: answer };
        } else {
          copy.push({ sender: "bot", text: answer });
        }
        return copy;
      });

    } catch (err) {
      console.error("Chat error", err);
      setMessages(prev => {
        const copy = [...prev];
        // replace placeholder
        let idx = -1;
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].sender === "bot" && /thinking/i.test(copy[i].text)) {
            idx = i;
            break;
          }
        }
        const msg = `⚠️ Error: ${err.message || "server error"}. Try again later.`;
        if (idx >= 0) copy[idx] = { sender: "bot", text: msg };
        else copy.push({ sender: "bot", text: msg });
        return copy;
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleSend = () => sendMessage(input);

  const suggestions = [
    "What are your skills?",
    "Tell me about your role at Humly",
    "What projects have you worked on?",
    "Where did you study?",
    "How can I contact you?",
    "What languages do you speak?",
  ];

  return (
    <section id="Mini_Chatbot" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="w-full max-w-md mx-auto bg-black/80 rounded-xl shadow-lg border border-white/10 p-6 flex flex-col items-center">
          <div className="flex items-center mb-4 space-x-2">
            <span className="text-4xl">🤖</span>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Mini Chatbot</h2>
          </div>

          <div
            ref={scrollRef}
            className="w-full flex flex-col gap-2 mb-4 h-64 overflow-y-auto bg-blue-950/30 rounded-lg p-4 border border-blue-500/10 scrollbar-custom"
            aria-live="polite"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.sender === "bot" ? "bg-blue-500/20 text-blue-200" : "bg-blue-700/40 text-white"}`}>
                  {msg.text.split("\n").map((line, i) => <div key={i}>{line}</div>)}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex gap-2 mb-3">
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-lg bg-blue-900/40 text-white border border-blue-500/20 focus:outline-none"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              disabled={processing}
            />
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${processing ? "bg-gray-600 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              onClick={handleSend}
              disabled={processing}
            >
              {processing ? "Thinking..." : "Send"}
            </button>
          </div>

          <div className="w-full flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => sendMessage(s)} className="text-xs px-3 py-1 rounded-full border border-blue-500/20 bg-blue-900/30 hover:bg-blue-900/50">{s}</button>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-400">
            Tip: ask specific questions like "What are your TensorFlow projects?".
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
