import { type AIAction } from "./ai-prompts";
import { type AISettings } from "./storage";

interface AIRequest {
  action: AIAction;
  context: Record<string, unknown>;
}

interface AIResponse {
  result: string;
}

export async function fetchAISuggestion(
  request: AIRequest,
  apiKey: string,
  settings: AISettings,
): Promise<string> {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-OpenRouter-Key": apiKey,
      "X-AI-Model": settings.model,
      "X-AI-Temperature": String(settings.temperature),
      "X-AI-Max-Tokens": String(settings.maxTokens),
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Erro desconhecido" }));
    throw new Error(error.error || `Erro ${response.status}`);
  }

  const data: AIResponse = await response.json();
  return data.result;
}
