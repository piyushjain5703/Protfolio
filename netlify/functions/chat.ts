import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
import { portfolioContextJson } from "./portfolio-context.generated";

const MODEL = "gemini-2.5-flash";
const MAX_REQUESTS_PER_IP_PER_DAY = 30;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;

// In-memory rate limit (per instance; resets on cold start)
const ipCounts = new Map<string, { count: number; resetAt: number }>();

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = origin || "*";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  let entry = ipCounts.get(ip);
  if (entry) {
    if (now >= entry.resetAt) {
      entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
      ipCounts.set(ip, entry);
    }
  } else {
    entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    ipCounts.set(ip, entry);
  }
  const allowed = entry.count < MAX_REQUESTS_PER_IP_PER_DAY;
  if (allowed) entry.count++;
  return { allowed, remaining: Math.max(0, MAX_REQUESTS_PER_IP_PER_DAY - entry.count) };
}

export const handler: Handler = async (
  event: HandlerEvent,
  _context: HandlerContext
) => {
  const origin = event.headers["origin"] || event.headers["Origin"] || null;
  const headers = { "Content-Type": "application/json", ...corsHeaders(origin) };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const ip = event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  const { allowed, remaining } = rateLimit(ip);
  if (!allowed) {
    return {
      statusCode: 429,
      headers: { ...headers, "X-RateLimit-Remaining": "0" },
      body: JSON.stringify({
        error: "Too many requests. Please try again later.",
        reply: "I can only handle a limited number of questions per day. Please try again tomorrow.",
      }),
    };
  }

  let body: { message?: string; history?: { role: string; content: string }[] };
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid JSON body", reply: null }),
    };
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Missing or empty message", reply: null }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Chat is not configured",
        reply: "Sorry, the chat is temporarily unavailable.",
      }),
    };
  }

  const systemInstruction = `You are a helpful chatbot for Piyush Jain's portfolio website. Your ONLY job is to answer questions about the following portfolio content. You must NOT answer questions about anything else (general knowledge, other people, unrelated topics).

Allowed topics: Piyush's tech stack, work experience, projects, tasks he did, articles, education, certifications, about/bio, and contact info.

If the user asks something that is not related to this portfolio (e.g. weather, sports, other people, coding help unrelated to this portfolio), you MUST respond with a short, polite refusal. Say exactly: "I can only answer questions about Piyush's portfolio—his experience, projects, tech stack, articles, education, and related topics. Ask me something about that!"

Use the following portfolio data (JSON) to answer. Prefer concise, friendly answers. You may use markdown for lists or links when helpful.

--- Portfolio data (JSON) ---
${portfolioContextJson}
--- End portfolio data ---`;

  const history = Array.isArray(body.history) ? body.history : [];
  const contents = [
    ...history.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
    { role: "user" as const, parts: [{ text: message }] },
  ];

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction,
      },
    });

    const text = response.text ?? "";
    return {
      statusCode: 200,
      headers: { ...headers, "X-RateLimit-Remaining": String(remaining) },
      body: JSON.stringify({ reply: text }),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message.includes("429") || message.includes("rate") ? 429 : 500;
    return {
      statusCode: status,
      headers,
      body: JSON.stringify({
        error: status === 429 ? "Rate limit exceeded" : "Request failed",
        reply: status === 429
          ? "Too many requests. Please try again in a moment."
          : "Sorry, I couldn't process that. Please try again.",
      }),
    };
  }
};
