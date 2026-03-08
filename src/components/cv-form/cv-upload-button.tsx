"use client";

import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { useAISuggestion } from "@/hooks/use-ai-suggestion";
import { extractPdfText } from "@/lib/ai-client";
import { type CVData } from "@/types/cv";

interface CvUploadButtonProps {
  onParsed: (data: CVData) => void;
}

export function CvUploadButton({ onParsed }: CvUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { suggest } = useAISuggestion();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const text = await extractPdfText(file);
      const result = await suggest("parse-cv", { cvText: text });

      if (!result) {
        setError("Configure sua API key do OpenRouter nas configurações de IA.");
        return;
      }

      const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(cleaned);

      const cvData: CVData = {
        professionalArea: parsed.professionalArea ?? "tech",
        contactInfo: {
          name: parsed.contactInfo?.name ?? "",
          email: parsed.contactInfo?.email ?? "",
          phone: parsed.contactInfo?.phone ?? "",
          location: parsed.contactInfo?.location ?? "",
          linkedin: parsed.contactInfo?.linkedin ?? "",
          portfolio: parsed.contactInfo?.portfolio ?? "",
          photoUrl: parsed.contactInfo?.photoUrl ?? "",
        },
        professionalSummary: {
          summary: parsed.professionalSummary?.summary ?? "",
        },
        workExperience: {
          items: (parsed.workExperience?.items ?? []).map((item: Record<string, unknown>) => ({
            id: uuid(),
            type: item.type ?? "fulltime",
            role: item.role ?? "",
            company: item.company ?? "",
            startDate: item.startDate ?? "",
            endDate: item.endDate ?? "",
            current: item.current ?? false,
            description: item.description ?? "",
          })),
        },
        education: {
          items: (parsed.education?.items ?? []).map((item: Record<string, unknown>) => ({
            id: uuid(),
            course: item.course ?? "",
            institution: item.institution ?? "",
            startDate: item.startDate ?? "",
            endDate: item.endDate ?? "",
            current: item.current ?? false,
          })),
        },
        skills: {
          items: parsed.skills?.items ?? [],
        },
        certifications: {
          items: (parsed.certifications?.items ?? []).map((item: Record<string, unknown>) => ({
            id: uuid(),
            name: item.name ?? "",
            issuer: item.issuer ?? "",
            date: item.date ?? "",
            url: item.url ?? "",
          })),
        },
        languages: {
          items: (parsed.languages?.items ?? []).map((item: Record<string, unknown>) => ({
            id: uuid(),
            language: item.language ?? "",
            level: item.level ?? "Intermediário",
          })),
        },
      };

      onParsed(cvData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao processar currículo";
      setError(message);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        variant="secondary"
        size="sm"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
      >
        {loading ? "Processando..." : "Importar PDF"}
      </Button>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
