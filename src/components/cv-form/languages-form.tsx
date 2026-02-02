"use client";

import { type LanguageItem, type LanguageLevel } from "@/types/cv";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { generateId } from "@/lib/utils";

const LEVEL_OPTIONS: { value: LanguageLevel; label: string }[] = [
  { value: "Básico", label: "Básico" },
  { value: "Intermediário", label: "Intermediário" },
  { value: "Avançado", label: "Avançado" },
  { value: "Fluente", label: "Fluente" },
  { value: "Nativo", label: "Nativo" },
];

interface LanguagesFormProps {
  items: LanguageItem[];
  onAdd: (item: LanguageItem) => void;
  onUpdate: (id: string, data: Partial<LanguageItem>) => void;
  onRemove: (id: string) => void;
}

export function LanguagesForm({ items, onAdd, onUpdate, onRemove }: LanguagesFormProps) {
  function handleAdd() {
    onAdd({
      id: generateId(),
      language: "",
      level: "Intermediário",
    });
  }

  return (
    <SectionCard
      title="Idiomas"
      actions={
        <Button type="button" variant="ghost" size="sm" onClick={handleAdd}>
          + Adicionar
        </Button>
      }
    >
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhum idioma adicionado.
        </p>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                placeholder="Ex: Inglês"
                value={item.language}
                onChange={(e) => onUpdate(item.id, { language: e.target.value })}
              />
            </div>
            <div className="w-40">
              <Select
                options={LEVEL_OPTIONS}
                value={item.level}
                onChange={(e) =>
                  onUpdate(item.id, { level: e.target.value as LanguageLevel })
                }
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
              aria-label="Remover idioma"
            >
              &times;
            </Button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
