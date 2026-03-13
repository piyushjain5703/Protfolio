import { NextRequest, NextResponse } from "next/server";
import { getChatReply } from "@/lib/chat-core";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured", reply: "Sorry, the chat is temporarily unavailable." },
      { status: 500 }
    );
  }

  let body: { message?: string; history?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body", reply: null }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "Missing or empty message", reply: null }, { status: 400 });
  }

  const history = Array.isArray(body.history) ? body.history : [];

  try {
    const reply = await getChatReply(message, history, apiKey);
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : "Unknown error";
    const status = errMessage.includes("429") || errMessage.includes("rate") ? 429 : 500;
    return NextResponse.json(
      {
        error: status === 429 ? "Rate limit exceeded" : "Request failed",
        reply:
          status === 429
            ? "Too many requests. Please try again in a moment."
            : "Sorry, I couldn't process that. Please try again.",
      },
      { status }
    );
  }
}
