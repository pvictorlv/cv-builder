"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAISuggestion } from "@/hooks/use-ai-suggestion";
import { type CVData } from "@/types/cv";

interface CvAnalysisDialogProps {
  data: CVData;
}

export function CvAnalysisDialog({ data }: CvAnalysisDialogProps) {
  const [open, setOpen] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { suggest } = useAISuggestion();

  async function handleAnalyze() {
    setLoading(true);
    setError(null);

    try {
      const result = await suggest("analyze-cv", {
        cvJson: JSON.stringify(data),
        professionalArea: data.professionalArea,
      });

      if (!result) {
        setError("Configure sua API key do OpenRouter nas configurações de IA.");
        return;
      }

      setAnalysis(result);
      setOpen(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao analisar currículo";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setOpen(false);
    setAnalysis(null);
    setError(null);
  }

  const hasContent = data.contactInfo.name || data.professionalSummary.summary || data.workExperience.items.length > 0;

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        disabled={loading || !hasContent}
        onClick={handleAnalyze}
        title={!hasContent ? "Preencha o currículo antes de analisar" : undefined}
      >
        {loading ? "Analisando..." : "Análise de Recrutador"}
      </Button>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}

      {open && analysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-lg bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-bold">Análise de Recrutador</h2>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                Fechar
              </Button>
            </div>
            <div className="overflow-y-auto px-6 py-4">
              <AnalysisContent text={analysis} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AnalysisContent({ text }: { text: string }) {
  const sections = text.split(/^## /m).filter(Boolean);

  return (
    <div className="space-y-4">
      {sections.map((section, i) => {
        const [title, ...body] = section.split("\n");
        return (
          <div key={i}>
            <h3 className="mb-2 text-base font-semibold text-primary">{title}</h3>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {body.join("\n").trim()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
