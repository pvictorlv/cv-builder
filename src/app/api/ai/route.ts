import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import { AI_MODEL, OPENROUTER_BASE_URL } from "@/lib/constants";
import { buildPrompt, type AIAction } from "@/lib/ai-prompts";

const requestSchema = z.object({
  action: z.enum(["improve-summary", "improve-bullets", "suggest-skills"]),
  context: z.record(z.unknown()),
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

    const { action, context } = parsed.data;
    const prompt = buildPrompt(action as AIAction, context as Record<string, string | string[]>);

    const openai = new OpenAI({
      baseURL: OPENROUTER_BASE_URL,
      apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const result = completion.choices[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({ result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
