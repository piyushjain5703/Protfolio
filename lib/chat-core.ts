import { GoogleGenAI } from "@google/genai";
import {
  siteConfig,
  aboutParagraphs,
  experiences,
  techStack,
  proficiency,
  projects,
  articles,
  certifications,
  education,
  stats,
  marqueeItems,
} from "./data";

const MODEL = "gemini-2.5-flash";

export function getPortfolioContextJson(): string {
  const context = {
    siteConfig,
    stats,
    aboutParagraphs,
    experiences,
    techStack,
    proficiency,
    marqueeItems,
    projects,
    articles,
    certifications,
    education,
  };
  return JSON.stringify(context, null, 2);
}

export function getSystemInstruction(contextJson: string): string {
  return `You are a helpful chatbot for Piyush Jain's portfolio website. Your ONLY job is to answer questions about the following portfolio content. You must NOT answer questions about anything else (general knowledge, other people, unrelated topics).

Allowed topics: Piyush's tech stack, work experience, projects, tasks he did, articles, education, certifications, about/bio, and contact info.

If the user asks something that is not related to this portfolio (e.g. weather, sports, other people, coding help unrelated to this portfolio), you MUST respond with a short, polite refusal. Say exactly: "I can only answer questions about Piyush's portfolio—his experience, projects, tech stack, articles, education, and related topics. Ask me something about that!"

Use the following portfolio data (JSON) to answer. Prefer concise, friendly answers. You may use markdown for lists or links when helpful.

--- Portfolio data (JSON) ---
${contextJson}
--- End portfolio data ---`;
}

export async function getChatReply(
  message: string,
  history: { role: string; content: string }[],
  apiKey: string
): Promise<string> {
  const contextJson = getPortfolioContextJson();
  const systemInstruction = getSystemInstruction(contextJson);

  const contents = [
    ...history.map((m) => ({
      role: (m.role === "user" ? "user" : "model") as "user" | "model",
      parts: [{ text: m.content }],
    })),
    { role: "user" as const, parts: [{ text: message }] },
  ];

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: { systemInstruction },
  });

  return response.text ?? "";
}
