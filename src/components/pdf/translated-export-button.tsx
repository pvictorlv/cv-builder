"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useAISuggestion } from "@/hooks/use-ai-suggestion";
import { type CVData, type TemplateName } from "@/types/cv";
import { getTemplateComponent } from "./templates/get-template";

const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  { ssr: false },
);

const LANGUAGES = [
  { value: "inglês", label: "English" },
  { value: "espanhol", label: "Español" },
  { value: "francês", label: "Français" },
  { value: "alemão", label: "Deutsch" },
  { value: "italiano", label: "Italiano" },
];

interface TranslatedExportButtonProps {
  data: CVData;
  template: TemplateName;
}

function getFileName(name: string, language: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug ? `cv-${slug}-${language}.pdf` : `cv-${language}.pdf`;
}

export function TranslatedExportButton({ data, template }: TranslatedExportButtonProps) {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("inglês");
  const [translatedData, setTranslatedData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { suggest } = useAISuggestion();

  async function handleTranslate() {
    setLoading(true);
    setError(null);
    setTranslatedData(null);

    try {
      const result = await suggest("translate-cv", {
        cvJson: JSON.stringify(data),
        targetLanguage: language,
      });

      if (!result) {
        setError("Configure sua API key do OpenRouter nas configurações de IA.");
        return;
      }

      const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(cleaned);

      const translated: CVData = {
        professionalArea: data.professionalArea,
        contactInfo: {
          name: parsed.contactInfo?.name ?? data.contactInfo.name,
          email: data.contactInfo.email,
          phone: data.contactInfo.phone,
          location: parsed.contactInfo?.location ?? data.contactInfo.location,
          linkedin: data.contactInfo.linkedin,
          portfolio: data.contactInfo.portfolio,
          photoUrl: data.contactInfo.photoUrl,
        },
        professionalSummary: {
          summary: parsed.professionalSummary?.summary ?? data.professionalSummary.summary,
        },
        workExperience: {
          items: (parsed.workExperience?.items ?? data.workExperience.items).map(
            (item: Record<string, unknown>, i: number) => ({
              ...data.workExperience.items[i],
              id: data.workExperience.items[i]?.id ?? uuid(),
              role: item.role ?? "",
              company: item.company ?? "",
              description: item.description ?? "",
              type: item.type ?? data.workExperience.items[i]?.type ?? "fulltime",
              startDate: item.startDate ?? data.workExperience.items[i]?.startDate ?? "",
              endDate: item.endDate ?? data.workExperience.items[i]?.endDate ?? "",
              current: item.current ?? data.workExperience.items[i]?.current ?? false,
            }),
          ),
        },
        education: {
          items: (parsed.education?.items ?? data.education.items).map(
            (item: Record<string, unknown>, i: number) => ({
              ...data.education.items[i],
              id: data.education.items[i]?.id ?? uuid(),
              course: item.course ?? "",
              institution: item.institution ?? "",
              startDate: item.startDate ?? data.education.items[i]?.startDate ?? "",
              endDate: item.endDate ?? data.education.items[i]?.endDate ?? "",
              current: item.current ?? data.education.items[i]?.current ?? false,
            }),
          ),
        },
        skills: {
          items: parsed.skills?.items ?? data.skills.items,
        },
        certifications: {
          items: (parsed.certifications?.items ?? data.certifications.items).map(
            (item: Record<string, unknown>, i: number) => ({
              ...data.certifications.items[i],
              id: data.certifications.items[i]?.id ?? uuid(),
              name: item.name ?? "",
              issuer: item.issuer ?? "",
              date: item.date ?? data.certifications.items[i]?.date ?? "",
              url: item.url ?? data.certifications.items[i]?.url ?? "",
            }),
          ),
        },
        languages: {
          items: (parsed.languages?.items ?? data.languages.items).map(
            (item: Record<string, unknown>, i: number) => ({
              ...data.languages.items[i],
              id: data.languages.items[i]?.id ?? uuid(),
              language: item.language ?? "",
              level: item.level ?? data.languages.items[i]?.level ?? "Intermediário",
            }),
          ),
        },
      };

      setTranslatedData(translated);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao traduzir currículo";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Exportar traduzido
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-md border border-border bg-background p-3">
      <div className="flex items-center gap-2">
        <Select
          id="translate-language"
          label=""
          options={LANGUAGES}
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setTranslatedData(null);
          }}
        />
        <Button
          variant="primary"
          size="sm"
          disabled={loading}
          onClick={handleTranslate}
        >
          {loading ? "Traduzindo..." : "Traduzir"}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { setOpen(false); setTranslatedData(null); setError(null); }}>
          Fechar
        </Button>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {translatedData && (
        <BlobProvider document={getTemplateComponent(template, translatedData)}>
          {({ url, loading: pdfLoading }) => (
            <Button
              variant="primary"
              size="sm"
              disabled={pdfLoading || !url}
              onClick={() => {
                if (!url) return;
                const a = document.createElement("a");
                a.href = url;
                a.download = getFileName(data.contactInfo.name, language);
                a.click();
              }}
            >
              {pdfLoading ? "Gerando PDF..." : `Baixar PDF em ${LANGUAGES.find(l => l.value === language)?.label ?? language}`}
            </Button>
          )}
        </BlobProvider>
      )}
    </div>
  );
}
