"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loadAIApiKey, saveAIApiKey } from "@/lib/storage";

interface AISettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AISettingsDialog({ open, onClose }: AISettingsDialogProps) {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (open) {
      setApiKey(loadAIApiKey());
    }
  }, [open]);

  function handleSave() {
    saveAIApiKey(apiKey.trim());
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Configurações de IA</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Insira sua API key do OpenRouter para usar as sugestões de IA.
          A key é armazenada apenas no seu navegador.
        </p>
        <Input
          id="api-key"
          label="API Key do OpenRouter"
          type="password"
          placeholder="sk-or-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>
    </div>
  );
}
