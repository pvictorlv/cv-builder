"use client";

import { type ReactNode } from "react";
import { type WorkExperienceItem } from "@/types/cv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { generateId } from "@/lib/utils";

interface WorkExperienceFormProps {
  items: WorkExperienceItem[];
  onAdd: (item: WorkExperienceItem) => void;
  onUpdate: (id: string, data: Partial<WorkExperienceItem>) => void;
  onRemove: (id: string) => void;
  renderAiButton?: (itemId: string) => ReactNode;
}

export function WorkExperienceForm({
  items,
  onAdd,
  onUpdate,
  onRemove,
  renderAiButton,
}: WorkExperienceFormProps) {
  function handleAdd() {
    onAdd({
      id: generateId(),
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  }

  return (
    <SectionCard
      title="Experiência Profissional"
      actions={
        <Button type="button" variant="ghost" size="sm" onClick={handleAdd}>
          + Adicionar
        </Button>
      }
    >
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhuma experiência adicionada.
        </p>
      )}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-3 rounded-md border border-border p-3">
            <div className="flex items-center justify-between">
              <div>{renderAiButton?.(item.id)}</div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id)}
                aria-label="Remover experiência"
              >
                &times;
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Cargo"
                placeholder="Desenvolvedor Full Stack"
                value={item.role}
                onChange={(e) => onUpdate(item.id, { role: e.target.value })}
              />
              <Input
                label="Empresa"
                placeholder="Tech Corp"
                value={item.company}
                onChange={(e) => onUpdate(item.id, { company: e.target.value })}
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
                  Trabalho atual
                </label>
              </div>
            </div>
            <Textarea
              label="Descrição (use bullets separados por linha)"
              placeholder={"Desenvolvi APIs REST em Node.js reduzindo latência em 40%\nLiderei migração para microsserviços com Docker e Kubernetes\nImplementei testes automatizados aumentando cobertura de 30% para 85%"}
              value={item.description}
              onChange={(e) => onUpdate(item.id, { description: e.target.value })}
              className="min-h-[120px]"
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
