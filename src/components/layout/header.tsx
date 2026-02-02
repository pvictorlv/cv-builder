"use client";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenAISettings: () => void;
}

export function Header({ onOpenAISettings }: HeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold">CV Builder</h1>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Currículo otimizado para ATS
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onOpenAISettings}>
          Configurar IA
        </Button>
      </div>
    </header>
  );
}
