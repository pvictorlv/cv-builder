import { z } from "zod";

export const contactInfoSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").or(z.literal("")),
  phone: z.string(),
  location: z.string(),
  linkedin: z.string().url("URL inválida").or(z.literal("")),
  portfolio: z.string().url("URL inválida").or(z.literal("")),
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;

export const professionalSummarySchema = z.object({
  summary: z.string().max(500, "Máximo de 500 caracteres"),
});

export type ProfessionalSummary = z.infer<typeof professionalSummarySchema>;

export const workExperienceItemSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
  description: z.string(),
});

export type WorkExperienceItem = z.infer<typeof workExperienceItemSchema>;

export const workExperienceSchema = z.object({
  items: z.array(workExperienceItemSchema),
});

export type WorkExperience = z.infer<typeof workExperienceSchema>;

export const educationItemSchema = z.object({
  id: z.string(),
  course: z.string(),
  institution: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
});

export type EducationItem = z.infer<typeof educationItemSchema>;

export const educationSchema = z.object({
  items: z.array(educationItemSchema),
});

export type Education = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
  items: z.array(z.string()),
});

export type Skills = z.infer<typeof skillsSchema>;

export const certificationItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  url: z.string().url("URL inválida").or(z.literal("")),
});

export type CertificationItem = z.infer<typeof certificationItemSchema>;

export const certificationsSchema = z.object({
  items: z.array(certificationItemSchema),
});

export type Certifications = z.infer<typeof certificationsSchema>;

export const languageLevelSchema = z.enum([
  "Básico",
  "Intermediário",
  "Avançado",
  "Fluente",
  "Nativo",
]);

export type LanguageLevel = z.infer<typeof languageLevelSchema>;

export const languageItemSchema = z.object({
  id: z.string(),
  language: z.string(),
  level: languageLevelSchema,
});

export type LanguageItem = z.infer<typeof languageItemSchema>;

export const languagesSchema = z.object({
  items: z.array(languageItemSchema),
});

export type Languages = z.infer<typeof languagesSchema>;

export const cvDataSchema = z.object({
  contactInfo: contactInfoSchema,
  professionalSummary: professionalSummarySchema,
  workExperience: workExperienceSchema,
  education: educationSchema,
  skills: skillsSchema,
  certifications: certificationsSchema,
  languages: languagesSchema,
});

export type CVData = z.infer<typeof cvDataSchema>;

export const templateNameSchema = z.enum(["classic", "modern", "compact"]);
export type TemplateName = z.infer<typeof templateNameSchema>;

export const EMPTY_CV_DATA: CVData = {
  contactInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
  },
  professionalSummary: {
    summary: "",
  },
  workExperience: {
    items: [],
  },
  education: {
    items: [],
  },
  skills: {
    items: [],
  },
  certifications: {
    items: [],
  },
  languages: {
    items: [],
  },
};
