"use client";

import { useState } from "react";
import { type TemplateName } from "@/types/cv";
import {
  type TemplateCategory,
  CATEGORY_LABELS,
  getTemplatesByCategory,
  getTemplateInfo,
} from "@/lib/template-registry";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  value: TemplateName;
  onChange: (template: TemplateName) => void;
}

const CATEGORIES: TemplateCategory[] = ["ats", "visual"];

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  const currentCategory = getTemplateInfo(value).category;
  const [activeTab, setActiveTab] = useState<TemplateCategory>(currentCategory);

  const templates = getTemplatesByCategory(activeTab);

  return (
    <div className="flex flex-col gap-2">
      {/* Category tabs */}
      <div className="flex gap-1 rounded-md bg-muted p-0.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveTab(cat)}
            className={cn(
              "flex-1 rounded-sm px-2 py-1 text-xs font-medium transition-colors",
              activeTab === cat
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Template buttons */}
      <div className="flex gap-2">
        {templates.map((t) => (
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
    </div>
  );
}
