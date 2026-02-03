import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import { AI_DEFAULTS, OPENROUTER_BASE_URL } from "@/lib/constants";
import { buildPrompt, type AIAction } from "@/lib/ai-prompts";

const requestSchema = z.object({
  action: z.enum(["improve-summary", "improve-bullets", "suggest-skills"]),
  context: z.record(z.string(), z.unknown()),
});

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get("X-OpenRouter-Key");
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key não configurada. Acesse as configurações de IA." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos: " + parsed.error.message },
        { status: 400 },
      );
    }

    const model = request.headers.get("X-AI-Model") || AI_DEFAULTS.model;
    const temperature = Number(request.headers.get("X-AI-Temperature")) || AI_DEFAULTS.temperature;
    const maxTokens = Number(request.headers.get("X-AI-Max-Tokens")) || AI_DEFAULTS.maxTokens;

    const { action, context } = parsed.data;
    const prompt = buildPrompt(action as AIAction, context as Record<string, string | string[]>);

    const openai = new OpenAI({
      baseURL: OPENROUTER_BASE_URL,
      apiKey,
    });

    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
      temperature,
    });

    const result = completion.choices[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({ result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
