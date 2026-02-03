"use client";

import { useRef } from "react";
import { type ContactInfo } from "@/types/cv";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/ui/section-card";

interface ContactInfoFormProps {
  data: ContactInfo;
  onChange: (data: Partial<ContactInfo>) => void;
}

export function ContactInfoForm({ data, onChange }: ContactInfoFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      const maxSize = 200;
      let w = img.width;
      let h = img.height;
      if (w > maxSize || h > maxSize) {
        if (w > h) {
          h = Math.round((h * maxSize) / w);
          w = maxSize;
        } else {
          w = Math.round((w * maxSize) / h);
          h = maxSize;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      onChange({ photoUrl: dataUrl });
    };
    img.src = URL.createObjectURL(file);

    // Reset so the same file can be re-selected
    e.target.value = "";
  }

  return (
    <SectionCard title="Informações de Contato">
      {/* Photo upload */}
      <div className="mb-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted transition-colors hover:border-muted-foreground/50"
        >
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt="Foto"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-center text-xs text-muted-foreground">
              Adicionar
              <br />
              foto
            </span>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        {data.photoUrl && (
          <button
            type="button"
            onClick={() => onChange({ photoUrl: "" })}
            className="text-sm text-destructive hover:underline"
          >
            Remover foto
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          id="name"
          label="Nome completo"
          placeholder="João da Silva"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="joao@email.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        <Input
          id="phone"
          label="Telefone"
          placeholder="(11) 99999-9999"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
        <Input
          id="location"
          label="Localização"
          placeholder="São Paulo, SP"
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
        />
        <Input
          id="linkedin"
          label="LinkedIn"
          placeholder="https://linkedin.com/in/seu-perfil"
          value={data.linkedin}
          onChange={(e) => onChange({ linkedin: e.target.value })}
        />
        <Input
          id="portfolio"
          label="Portfolio / GitHub"
          placeholder="https://github.com/seu-usuario"
          value={data.portfolio}
          onChange={(e) => onChange({ portfolio: e.target.value })}
        />
      </div>
    </SectionCard>
  );
}
