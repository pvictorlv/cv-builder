"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAISuggestion } from "@/hooks/use-ai-suggestion";
import { type AIAction } from "@/lib/ai-prompts";

interface AISuggestionButtonProps {
  action: AIAction;
  context: Record<string, unknown>;
  onAccept: (result: string) => void;
  label?: string;
}

export function AISuggestionButton({
  action,
  context,
  onAccept,
  label = "Sugerir com IA",
}: AISuggestionButtonProps) {
  const { loading, error, suggest } = useAISuggestion();
  const [preview, setPreview] = useState<string | null>(null);

  async function handleSuggest() {
    const result = await suggest(action, context);
    if (result) {
      setPreview(result);
    }
  }

  function handleAccept() {
    if (preview) {
      onAccept(preview);
      setPreview(null);
    }
  }

  function handleReject() {
    setPreview(null);
  }

  if (preview) {
    return (
      <div className="mt-2 rounded-md border border-primary/30 bg-accent p-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Sugestão da IA:</p>
        <p className="mb-3 whitespace-pre-wrap text-sm">{preview}</p>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAccept}>
            Aceitar
          </Button>
          <Button size="sm" variant="secondary" onClick={handleReject}>
            Descartar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleSuggest}
        disabled={loading}
      >
        {loading ? "Gerando..." : label}
      </Button>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
