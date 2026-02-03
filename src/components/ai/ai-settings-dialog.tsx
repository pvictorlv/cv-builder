"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loadAIApiKey, saveAIApiKey, loadAISettings, saveAISettings } from "@/lib/storage";
import { AI_DEFAULTS } from "@/lib/constants";

interface AISettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AISettingsDialog({ open, onClose }: AISettingsDialogProps) {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(AI_DEFAULTS.model);
  const [temperature, setTemperature] = useState(AI_DEFAULTS.temperature);
  const [maxTokens, setMaxTokens] = useState(AI_DEFAULTS.maxTokens);

  useEffect(() => {
    if (open) {
      setApiKey(loadAIApiKey());
      const settings = loadAISettings();
      setModel(settings.model);
      setTemperature(settings.temperature);
      setMaxTokens(settings.maxTokens);
    }
  }, [open]);

  function handleSave() {
    saveAIApiKey(apiKey.trim());
    saveAISettings({ model: model.trim(), temperature, maxTokens });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Configurações de IA</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Insira sua API key do OpenRouter e ajuste os parâmetros do modelo.
          Tudo é armazenado apenas no seu navegador.
        </p>
        <div className="space-y-3">
          <Input
            id="api-key"
            label="API Key do OpenRouter"
            type="password"
            placeholder="sk-or-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Input
            id="ai-model"
            label="Modelo"
            placeholder={AI_DEFAULTS.model}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <div>
            <label htmlFor="ai-temperature" className="text-sm font-medium text-foreground">
              Temperature: {temperature.toFixed(2)}
            </label>
            <input
              id="ai-temperature"
              type="range"
              min={0}
              max={2}
              step={0.05}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="mt-1 w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Preciso</span>
              <span>Criativo</span>
            </div>
          </div>
          <Input
            id="ai-max-tokens"
            label="Max Tokens"
            type="number"
            min={1}
            max={100000}
            value={maxTokens}
            onChange={(e) => setMaxTokens(Number(e.target.value) || AI_DEFAULTS.maxTokens)}
          />
        </div>
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
