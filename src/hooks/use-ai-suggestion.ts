"use client";

import { useState, useCallback } from "react";
import { fetchAISuggestion } from "@/lib/ai-client";
import { type AIAction } from "@/lib/ai-prompts";
import { loadAIApiKey } from "@/lib/storage";

interface UseAISuggestionReturn {
  loading: boolean;
  error: string | null;
  suggest: (action: AIAction, context: Record<string, unknown>) => Promise<string | null>;
}

export function useAISuggestion(): UseAISuggestionReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggest = useCallback(
    async (action: AIAction, context: Record<string, unknown>): Promise<string | null> => {
      const apiKey = loadAIApiKey();
      if (!apiKey) {
        setError("Configure sua API key do OpenRouter nas configurações.");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchAISuggestion({ action, context }, apiKey);
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao buscar sugestão";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { loading, error, suggest };
}
