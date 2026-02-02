"use client";

import { type ReactNode } from "react";
import { Textarea } from "@/components/ui/textarea";
import { SectionCard } from "@/components/ui/section-card";

interface ProfessionalSummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
  aiButton?: ReactNode;
}

export function ProfessionalSummaryForm({
  summary,
  onChange,
  aiButton,
}: ProfessionalSummaryFormProps) {
  return (
    <SectionCard title="Resumo Profissional" actions={aiButton}>
      <Textarea
        id="summary"
        placeholder="Escreva um resumo conciso da sua experiência, principais habilidades e objetivos profissionais..."
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        maxLength={500}
        className="min-h-[100px]"
      />
      <p className="mt-1 text-xs text-muted-foreground">
        {summary.length}/500 caracteres
      </p>
    </SectionCard>
  );
}
