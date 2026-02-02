"use client";

import { type ContactInfo } from "@/types/cv";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/ui/section-card";

interface ContactInfoFormProps {
  data: ContactInfo;
  onChange: (data: Partial<ContactInfo>) => void;
}

export function ContactInfoForm({ data, onChange }: ContactInfoFormProps) {
  return (
    <SectionCard title="Informações de Contato">
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
