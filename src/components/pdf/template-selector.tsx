"use client";

import { type TemplateName } from "@/types/cv";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  value: TemplateName;
  onChange: (template: TemplateName) => void;
}

const TEMPLATES: { value: TemplateName; label: string; description: string }[] = [
  { value: "classic", label: "Clássico", description: "Espaçamento generoso, bullet points" },
  { value: "modern", label: "Moderno", description: "Divisores sutis, mais contemporâneo" },
  { value: "compact", label: "Compacto", description: "Cabe em 1 página, espaçamento justo" },
];

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div className="flex gap-2">
      {TEMPLATES.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => onChange(t.value)}
          className={cn(
            "rounded-md border px-3 py-1.5 text-sm transition-colors",
            value === t.value
              ? "border-primary bg-primary/10 text-primary font-medium"
              : "border-border bg-background text-muted-foreground hover:border-primary/50",
          )}
          title={t.description}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
