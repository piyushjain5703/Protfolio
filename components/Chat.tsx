"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { siteConfig } from "@/lib/data";

const SUGGESTED_QUESTIONS = [
  "What is his tech stack?",
  "Tell me about his experience at Traveloka",
  "What projects has he built?",
  "What articles has he written?",
];

type Message = { role: "user" | "assistant"; content: string };

function getChatEndpoint(): string {
  if (typeof window === "undefined") return "";
  const base = window.location.origin;
  // Use Next.js API route when on localhost (npm run dev); Netlify function in production
  if (window.location.hostname === "localhost") {
    return `${base}/api/chat`;
  }
  return `${base}/.netlify/functions/chat`;
}

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput("");
    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    history.push({ role: "user", content: trimmed });

    try {
      const res = await fetch(getChatEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: messages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json().catch(() => ({}));
      const reply = typeof data.reply === "string" ? data.reply : "Sorry, I couldn’t process that. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please check your connection and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:inset-auto md:right-6 md:bottom-24 md:top-auto md:w-[400px] md:max-h-[calc(100vh-8rem)] md:rounded-2xl md:shadow-2xl md:border md:border-[var(--border-color)]"
            style={{ background: "var(--card-bg)", backdropFilter: "blur(12px)" }}
          >
            <div className="flex flex-col h-full max-h-[85vh] md:max-h-[calc(100vh-8rem)]">
              <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--accent-15)]">
                    <MessageCircle size={20} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--fg)]">Portfolio assistant</h3>
                    <p className="text-xs text-[var(--fg-muted)]">Ask about {siteConfig.name}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-[var(--accent-10)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>

              <div
                ref={listRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
              >
                {messages.length === 0 && !loading && (
                  <div className="space-y-3">
                    <p className="text-sm text-[var(--fg-muted)]">
                      Ask about {siteConfig.name}&apos;s experience, projects, tech stack, articles, or education.
                    </p>
                    <p className="text-xs text-[var(--fg-muted)]">Suggested questions:</p>
                    <ul className="flex flex-col gap-2">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <li key={q}>
                          <button
                            type="button"
                            onClick={() => sendMessage(q)}
                            className="text-left text-sm px-3 py-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-40)] hover:bg-[var(--accent-10)] text-[var(--fg)] transition-colors w-full"
                          >
                            {q}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        m.role === "user"
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--card-border)] border border-[var(--border-color)] text-[var(--fg)]"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <div className="prose prose-sm prose-invert max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0 text-[var(--fg)]">
                          <ReactMarkdown
                            components={{
                              a: ({ href, children }) => (
                                <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl px-4 py-2.5 bg-[var(--card-border)] border border-[var(--border-color)] flex items-center gap-2 text-[var(--fg-muted)]">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">Thinking…</span>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border-color)]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about the portfolio…"
                    className="flex-1 rounded-xl px-4 py-3 bg-[var(--bg-alt)] border border-[var(--border-color)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="rounded-xl px-4 py-3 bg-[var(--accent)] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-lg hover:opacity-90 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <MessageCircle size={24} />
      </motion.button>
    </>
  );
}
