"use client";

import { type EducationItem } from "@/types/cv";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { generateId } from "@/lib/utils";

interface EducationFormProps {
  items: EducationItem[];
  onAdd: (item: EducationItem) => void;
  onUpdate: (id: string, data: Partial<EducationItem>) => void;
  onRemove: (id: string) => void;
}

export function EducationForm({ items, onAdd, onUpdate, onRemove }: EducationFormProps) {
  function handleAdd() {
    onAdd({
      id: generateId(),
      course: "",
      institution: "",
      startDate: "",
      endDate: "",
      current: false,
    });
  }

  return (
    <SectionCard
      title="Formação Acadêmica"
      actions={
        <Button type="button" variant="ghost" size="sm" onClick={handleAdd}>
          + Adicionar
        </Button>
      }
    >
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhuma formação adicionada.
        </p>
      )}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-3 rounded-md border border-border p-3">
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id)}
                aria-label="Remover formação"
              >
                &times;
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Curso"
                placeholder="Bacharelado em Ciência da Computação"
                value={item.course}
                onChange={(e) => onUpdate(item.id, { course: e.target.value })}
              />
              <Input
                label="Instituição"
                placeholder="Universidade de São Paulo"
                value={item.institution}
                onChange={(e) => onUpdate(item.id, { institution: e.target.value })}
              />
              <Input
                label="Data de início"
                type="month"
                value={item.startDate}
                onChange={(e) => onUpdate(item.id, { startDate: e.target.value })}
              />
              <div>
                <Input
                  label="Data de término"
                  type="month"
                  value={item.endDate}
                  disabled={item.current}
                  onChange={(e) => onUpdate(item.id, { endDate: e.target.value })}
                />
                <label className="mt-1 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={item.current}
                    onChange={(e) =>
                      onUpdate(item.id, {
                        current: e.target.checked,
                        endDate: e.target.checked ? "" : item.endDate,
                      })
                    }
                  />
                  Cursando atualmente
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
