"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";

interface SkillsFormProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  aiButton?: ReactNode;
}

export function SkillsForm({ skills, onChange, aiButton }: SkillsFormProps) {
  const [input, setInput] = useState("");

  function addSkill() {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    onChange([...skills, trimmed]);
    setInput("");
  }

  function removeSkill(skill: string) {
    onChange(skills.filter((s) => s !== skill));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  return (
    <SectionCard title="Habilidades" actions={aiButton}>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Digite uma habilidade e pressione Enter"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button type="button" variant="secondary" onClick={addSkill}>
          Adicionar
        </Button>
      </div>
      {skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 text-muted-foreground hover:text-foreground"
                aria-label={`Remover ${skill}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
