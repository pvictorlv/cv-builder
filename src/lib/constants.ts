export const STORAGE_KEYS = {
  CV_DATA: "cv-builder:cv-data",
  TEMPLATE: "cv-builder:template",
  AI_API_KEY: "cv-builder:ai-api-key",
  AI_SETTINGS: "cv-builder:ai-settings",
} as const;

export const SECTION_HEADERS = {
  professionalSummary: "RESUMO PROFISSIONAL",
  workExperience: "EXPERIÊNCIA PROFISSIONAL",
  projects: "PROJETOS",
  education: "FORMAÇÃO ACADÊMICA",
  skills: "HABILIDADES",
  certifications: "CERTIFICAÇÕES",
  languages: "IDIOMAS",
} as const;

export const WORK_TYPE_LABELS: Record<string, string> = {
  fulltime: "Tempo integral",
  freelance: "Freelance",
  sideproject: "Projeto pessoal",
  internship: "Estágio",
};

export const WORK_TYPE_FIELD_LABELS: Record<string, { company: string; companyPlaceholder: string }> = {
  fulltime: { company: "Empresa", companyPlaceholder: "Tech Corp" },
  freelance: { company: "Cliente", companyPlaceholder: "Nome do cliente" },
  sideproject: { company: "Projeto", companyPlaceholder: "Nome do projeto" },
  internship: { company: "Empresa", companyPlaceholder: "Tech Corp" },
};

export const AI_DEFAULTS: { model: string; temperature: number; maxTokens: number } = {
  model: "openai/gpt-4.1-mini",
  temperature: 0.5,
  maxTokens: 20000,
};

export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export const PROFESSIONAL_AREAS = {
  tech: "Tecnologia / Desenvolvimento",
  support: "Suporte / Atendimento ao Cliente",
  hr: "Recursos Humanos",
} as const;

export type ProfessionalArea = keyof typeof PROFESSIONAL_AREAS;
