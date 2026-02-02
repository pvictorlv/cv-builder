"use client";

import { type ReactNode } from "react";
import { type CVData, type WorkExperienceItem, type EducationItem, type CertificationItem, type LanguageItem, type ContactInfo } from "@/types/cv";
import { ContactInfoForm } from "./contact-info-form";
import { ProfessionalSummaryForm } from "./professional-summary-form";
import { WorkExperienceForm } from "./work-experience-form";
import { EducationForm } from "./education-form";
import { SkillsForm } from "./skills-form";
import { CertificationsForm } from "./certifications-form";
import { LanguagesForm } from "./languages-form";

interface CvEditorProps {
  cvData: CVData;
  onContactChange: (data: Partial<ContactInfo>) => void;
  onSummaryChange: (summary: string) => void;
  onAddWork: (item: WorkExperienceItem) => void;
  onUpdateWork: (id: string, data: Partial<WorkExperienceItem>) => void;
  onRemoveWork: (id: string) => void;
  onAddEducation: (item: EducationItem) => void;
  onUpdateEducation: (id: string, data: Partial<EducationItem>) => void;
  onRemoveEducation: (id: string) => void;
  onSkillsChange: (skills: string[]) => void;
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
  onContactChange,
  onSummaryChange,
  onAddWork,
  onUpdateWork,
  onRemoveWork,
  onAddEducation,
  onUpdateEducation,
  onRemoveEducation,
  onSkillsChange,
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
