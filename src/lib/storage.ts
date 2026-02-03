import { STORAGE_KEYS, AI_DEFAULTS } from "./constants";
import { type CVData, type TemplateName, cvDataSchema, templateNameSchema, EMPTY_CV_DATA } from "@/types/cv";

export interface AISettings {
  model: string;
  temperature: number;
  maxTokens: number;
}

export function loadCVData(): CVData {
  if (typeof window === "undefined") return EMPTY_CV_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CV_DATA);
    if (!raw) return EMPTY_CV_DATA;
    const parsed = JSON.parse(raw);
    const result = cvDataSchema.safeParse(parsed);
    return result.success ? result.data : EMPTY_CV_DATA;
  } catch {
    return EMPTY_CV_DATA;
  }
}

export function saveCVData(data: CVData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.CV_DATA, JSON.stringify(data));
}

export function loadTemplate(): TemplateName {
  if (typeof window === "undefined") return "classic";
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEMPLATE);
    if (!raw) return "classic";
    const result = templateNameSchema.safeParse(raw);
    return result.success ? result.data : "classic";
  } catch {
    return "classic";
  }
}

export function saveTemplate(template: TemplateName): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.TEMPLATE, template);
}

export function loadAIApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(STORAGE_KEYS.AI_API_KEY) ?? "";
}

export function saveAIApiKey(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.AI_API_KEY, key);
}

export function loadAISettings(): AISettings {
  if (typeof window === "undefined") return { ...AI_DEFAULTS };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AI_SETTINGS);
    if (!raw) return { ...AI_DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<AISettings>;
    return {
      model: parsed.model || AI_DEFAULTS.model,
      temperature: parsed.temperature ?? AI_DEFAULTS.temperature,
      maxTokens: parsed.maxTokens ?? AI_DEFAULTS.maxTokens,
    };
  } catch {
    return { ...AI_DEFAULTS };
  }
}

export function saveAISettings(settings: AISettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.AI_SETTINGS, JSON.stringify(settings));
}
