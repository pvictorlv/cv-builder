export const STORAGE_KEYS = {
  CV_DATA: "cv-builder:cv-data",
  TEMPLATE: "cv-builder:template",
  AI_API_KEY: "cv-builder:ai-api-key",
} as const;

export const SECTION_HEADERS = {
  professionalSummary: "RESUMO PROFISSIONAL",
  workExperience: "EXPERIÊNCIA PROFISSIONAL",
  education: "FORMAÇÃO ACADÊMICA",
  skills: "HABILIDADES",
  certifications: "CERTIFICAÇÕES",
  languages: "IDIOMAS",
} as const;

export const AI_MODEL = "deepseek/deepseek-chat";
export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
