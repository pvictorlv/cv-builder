"use client";

import { type ReactNode } from "react";
import { type CVData, type ProfessionalArea, type WorkExperienceItem, type EducationItem, type CertificationItem, type LanguageItem, type ContactInfo } from "@/types/cv";
import { PROFESSIONAL_AREAS } from "@/lib/constants";
import { Select } from "@/components/ui/select";
import { SectionCard } from "@/components/ui/section-card";
import { ContactInfoForm } from "./contact-info-form";
import { ProfessionalSummaryForm } from "./professional-summary-form";
import { WorkExperienceForm } from "./work-experience-form";
import { EducationForm } from "./education-form";
import { SkillsForm } from "./skills-form";
import { CertificationsForm } from "./certifications-form";
import { LanguagesForm } from "./languages-form";

const professionalAreaOptions = Object.entries(PROFESSIONAL_AREAS).map(([value, label]) => ({
  value,
  label,
}));

interface CvEditorProps {
  cvData: CVData;
  onProfessionalAreaChange: (area: ProfessionalArea) => void;
  onContactChange: (data: Partial<ContactInfo>) => void;
  onSummaryChange: (summary: string) => void;
  onAddWork: (item: WorkExperienceItem) => void;
  onUpdateWork: (id: string, data: Partial<WorkExperienceItem>) => void;
  onRemoveWork: (id: string) => void;
  onReorderWork: (fromIndex: number, toIndex: number) => void;
  onAddEducation: (item: EducationItem) => void;
  onUpdateEducation: (id: string, data: Partial<EducationItem>) => void;
  onRemoveEducation: (id: string) => void;
  onSkillsChange: (skills: string[]) => void;
  onReorderSkills: (fromIndex: number, toIndex: number) => void;
  onAddCertification: (item: CertificationItem) => void;
  onUpdateCertification: (id: string, data: Partial<CertificationItem>) => void;
  onRemoveCertification: (id: string) => void;
  onAddLanguage: (item: LanguageItem) => void;
  onUpdateLanguage: (id: string, data: Partial<LanguageItem>) => void;
  onRemoveLanguage: (id: string) => void;
  summaryAiButton?: ReactNode;
  skillsAiButton?: ReactNode;
  renderWorkAiButton?: (itemId: string) => ReactNode;
}

export function CvEditor({
  cvData,
  onProfessionalAreaChange,
  onContactChange,
  onSummaryChange,
  onAddWork,
  onUpdateWork,
  onRemoveWork,
  onReorderWork,
  onAddEducation,
  onUpdateEducation,
  onRemoveEducation,
  onSkillsChange,
  onReorderSkills,
  onAddCertification,
  onUpdateCertification,
  onRemoveCertification,
  onAddLanguage,
  onUpdateLanguage,
  onRemoveLanguage,
  summaryAiButton,
  skillsAiButton,
  renderWorkAiButton,
}: CvEditorProps) {
  return (
    <div className="space-y-4">
      <SectionCard title="Área Profissional">
        <Select
          id="professionalArea"
          label="Selecione sua área de atuação"
          options={professionalAreaOptions}
          value={cvData.professionalArea}
          onChange={(e) => onProfessionalAreaChange(e.target.value as ProfessionalArea)}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          A área selecionada influencia as sugestões de IA para resumo, experiências e habilidades.
        </p>
      </SectionCard>
      <ContactInfoForm data={cvData.contactInfo} onChange={onContactChange} />
      <ProfessionalSummaryForm
        summary={cvData.professionalSummary.summary}
        onChange={onSummaryChange}
        aiButton={summaryAiButton}
      />
      <WorkExperienceForm
        items={cvData.workExperience.items}
        onAdd={onAddWork}
        onUpdate={onUpdateWork}
        onRemove={onRemoveWork}
        onReorder={onReorderWork}
        renderAiButton={renderWorkAiButton}
      />
      <EducationForm
        items={cvData.education.items}
        onAdd={onAddEducation}
        onUpdate={onUpdateEducation}
        onRemove={onRemoveEducation}
      />
      <SkillsForm
        skills={cvData.skills.items}
        onChange={onSkillsChange}
        onReorder={onReorderSkills}
        aiButton={skillsAiButton}
      />
      <CertificationsForm
        items={cvData.certifications.items}
        onAdd={onAddCertification}
        onUpdate={onUpdateCertification}
        onRemove={onRemoveCertification}
      />
      <LanguagesForm
        items={cvData.languages.items}
        onAdd={onAddLanguage}
        onUpdate={onUpdateLanguage}
        onRemove={onRemoveLanguage}
      />
    </div>
  );
}
