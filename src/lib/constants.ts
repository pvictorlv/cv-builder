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

export type SectionHeaders = Record<keyof typeof SECTION_HEADERS, string>;

export interface LocaleStrings {
  sectionHeaders: SectionHeaders;
  months: string[];
  current: string;
}

export const LOCALE_TRANSLATIONS: Record<string, LocaleStrings> = {
  "inglês": {
    sectionHeaders: {
      professionalSummary: "PROFESSIONAL SUMMARY",
      workExperience: "PROFESSIONAL EXPERIENCE",
      projects: "PROJECTS",
      education: "EDUCATION",
      skills: "SKILLS",
      certifications: "CERTIFICATIONS",
      languages: "LANGUAGES",
    },
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    current: "Present",
  },
  "espanhol": {
    sectionHeaders: {
      professionalSummary: "RESUMEN PROFESIONAL",
      workExperience: "EXPERIENCIA PROFESIONAL",
      projects: "PROYECTOS",
      education: "FORMACIÓN ACADÉMICA",
      skills: "HABILIDADES",
      certifications: "CERTIFICACIONES",
      languages: "IDIOMAS",
    },
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    current: "Actual",
  },
  "francês": {
    sectionHeaders: {
      professionalSummary: "RÉSUMÉ PROFESSIONNEL",
      workExperience: "EXPÉRIENCE PROFESSIONNELLE",
      projects: "PROJETS",
      education: "FORMATION",
      skills: "COMPÉTENCES",
      certifications: "CERTIFICATIONS",
      languages: "LANGUES",
    },
    months: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
    current: "Actuel",
  },
  "alemão": {
    sectionHeaders: {
      professionalSummary: "BERUFSPROFIL",
      workExperience: "BERUFSERFAHRUNG",
      projects: "PROJEKTE",
      education: "AUSBILDUNG",
      skills: "KENNTNISSE",
      certifications: "ZERTIFIKATE",
      languages: "SPRACHEN",
    },
    months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    current: "Aktuell",
  },
  "italiano": {
    sectionHeaders: {
      professionalSummary: "PROFILO PROFESSIONALE",
      workExperience: "ESPERIENZA PROFESSIONALE",
      projects: "PROGETTI",
      education: "FORMAZIONE",
      skills: "COMPETENZE",
      certifications: "CERTIFICAZIONI",
      languages: "LINGUE",
    },
    months: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
    current: "Attuale",
  },
};

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
