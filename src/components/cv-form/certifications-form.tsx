"use client";

import { type CertificationItem } from "@/types/cv";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { generateId } from "@/lib/utils";

interface CertificationsFormProps {
  items: CertificationItem[];
  onAdd: (item: CertificationItem) => void;
  onUpdate: (id: string, data: Partial<CertificationItem>) => void;
  onRemove: (id: string) => void;
}

export function CertificationsForm({
  items,
  onAdd,
  onUpdate,
  onRemove,
}: CertificationsFormProps) {
  function handleAdd() {
    onAdd({
      id: generateId(),
      name: "",
      issuer: "",
      date: "",
      url: "",
    });
  }

  return (
    <SectionCard
      title="Certificações"
      actions={
        <Button type="button" variant="ghost" size="sm" onClick={handleAdd}>
          + Adicionar
        </Button>
      }
    >
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhuma certificação adicionada.
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
                aria-label="Remover certificação"
              >
                &times;
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Nome da certificação"
                placeholder="AWS Solutions Architect"
                value={item.name}
                onChange={(e) => onUpdate(item.id, { name: e.target.value })}
              />
              <Input
                label="Emissor"
                placeholder="Amazon Web Services"
                value={item.issuer}
                onChange={(e) => onUpdate(item.id, { issuer: e.target.value })}
              />
              <Input
                label="Data de emissão"
                type="month"
                value={item.date}
                onChange={(e) => onUpdate(item.id, { date: e.target.value })}
              />
              <Input
                label="URL (opcional)"
                placeholder="https://credential.net/..."
                value={item.url}
                onChange={(e) => onUpdate(item.id, { url: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
