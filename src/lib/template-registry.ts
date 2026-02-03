import { type TemplateName } from "@/types/cv";

export type TemplateCategory = "ats" | "visual";

export interface TemplateInfo {
  value: TemplateName;
  label: string;
  description: string;
  category: TemplateCategory;
}

export const TEMPLATE_REGISTRY: TemplateInfo[] = [
  { value: "classic", label: "Clássico", description: "Espaçamento generoso, bullet points", category: "ats" },
  { value: "modern", label: "Moderno", description: "Divisores sutis, mais contemporâneo", category: "ats" },
  { value: "compact", label: "Compacto", description: "Cabe em 1 página, espaçamento justo", category: "ats" },
  { value: "elegant", label: "Elegante", description: "Sidebar escura com conteúdo em destaque", category: "visual" },
  { value: "creative", label: "Criativo", description: "Header colorido, tags de skills", category: "visual" },
  { value: "executive", label: "Executivo", description: "Accent stripe, layout duas colunas", category: "visual" },
];

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  ats: "ATS (Bot)",
  visual: "Visual (Humano)",
};

export function getTemplatesByCategory(category: TemplateCategory): TemplateInfo[] {
  return TEMPLATE_REGISTRY.filter((t) => t.category === category);
}

export function getTemplateInfo(name: TemplateName): TemplateInfo {
  return TEMPLATE_REGISTRY.find((t) => t.value === name) ?? TEMPLATE_REGISTRY[0];
}
