"use client";

import { useState, useEffect } from "react";
import { type TemplateName } from "@/types/cv";
import { loadCVData, loadTemplate, saveTemplate } from "@/lib/storage";
import { useCvForm } from "@/hooks/use-cv-form";
import { useAutosave } from "@/hooks/use-autosave";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { CvEditor } from "@/components/cv-form/cv-editor";
import { PdfPreview } from "@/components/pdf/pdf-preview";
import { PdfDownloadButton } from "@/components/pdf/pdf-download-button";
import { TemplateSelector } from "@/components/pdf/template-selector";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AISettingsDialog } from "@/components/ai/ai-settings-dialog";
import { AISuggestionButton } from "@/components/ai/ai-suggestion-button";
import { CvAnalysisDialog } from "@/components/ai/cv-analysis-dialog";
import { CvUploadButton } from "@/components/cv-form/cv-upload-button";
import { TranslatedExportButton } from "@/components/pdf/translated-export-button";
import { ToastProvider } from "@/components/ui/toast";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [template, setTemplate] = useState<TemplateName>("classic");
  const [aiSettingsOpen, setAiSettingsOpen] = useState(false);
  const [useExperienceForSummary, setUseExperienceForSummary] = useState(false);

  const form = useCvForm();

  useEffect(() => {
    const saved = loadCVData();
    form.setAll(saved);
    setTemplate(loadTemplate());
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAutosave(form.cvData);

  const debouncedCvData = useDebouncedValue(form.cvData, 500);

  function handleTemplateChange(t: TemplateName) {
    setTemplate(t);
    saveTemplate(t);
  }

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <Header onOpenAISettings={() => setAiSettingsOpen(true)} />

        <main className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col gap-4 p-4 lg:flex-row">
          {/* Editor */}
          <div className="flex-1 overflow-y-auto lg:max-h-[calc(100vh-8rem)]">
            <div className="mb-4 flex items-center gap-2">
              <CvUploadButton onParsed={form.setAll} />
              <span className="text-xs text-muted-foreground">Importe um PDF para preencher automaticamente</span>
            </div>
            <CvEditor
              cvData={form.cvData}
              onProfessionalAreaChange={form.setProfessionalArea}
              onContactChange={form.setContact}
              onSummaryChange={form.setSummary}
              onAddWork={form.addWork}
              onUpdateWork={form.updateWork}
              onRemoveWork={form.removeWork}
              onReorderWork={form.reorderWork}
              onAddEducation={form.addEducation}
              onUpdateEducation={form.updateEducation}
              onRemoveEducation={form.removeEducation}
              onSkillsChange={form.setSkills}
              onReorderSkills={form.reorderSkills}
              onAddCertification={form.addCertification}
              onUpdateCertification={form.updateCertification}
              onRemoveCertification={form.removeCertification}
              onAddLanguage={form.addLanguage}
              onUpdateLanguage={form.updateLanguage}
              onRemoveLanguage={form.removeLanguage}
              summaryAiButton={
                <div className="flex items-center gap-3">
                  {form.cvData.workExperience.items.length > 0 && (
                    <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground select-none">
                      <input
                        type="checkbox"
                        checked={useExperienceForSummary}
                        onChange={(e) => setUseExperienceForSummary(e.target.checked)}
                        className="h-3.5 w-3.5 accent-primary"
                      />
                      Usar experiências
                    </label>
                  )}
                  <AISuggestionButton
                    action="improve-summary"
                    context={{
                      summary: form.cvData.professionalSummary.summary,
                      professionalArea: form.cvData.professionalArea,
                      ...(useExperienceForSummary && {
                        workExperience: form.cvData.workExperience.items.map(
                          ({ role, company, description }) => ({ role, company, description }),
                        ),
                      }),
                    }}
                    onAccept={(result) => form.setSummary(result)}
                    label="Melhorar com IA"
                  />
                </div>
              }
              skillsAiButton={
                <AISuggestionButton
                  action="suggest-skills"
                  context={{
                    currentSkills: form.cvData.skills.items,
                    professionalArea: form.cvData.professionalArea,
                  }}
                  onAccept={(result) => {
                    const newSkills = result
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    form.setSkills([...form.cvData.skills.items, ...newSkills]);
                  }}
                  label="Sugerir skills"
                />
              }
              renderWorkAiButton={(itemId) => {
                const item = form.cvData.workExperience.items.find(
                  (w) => w.id === itemId,
                );
                if (!item) return null;
                return (
                  <AISuggestionButton
                    action="improve-bullets"
                    context={{
                      role: item.role,
                      company: item.company,
                      description: item.description,
                      type: item.type,
                      professionalArea: form.cvData.professionalArea,
                    }}
                    onAccept={(result) => form.updateWork(itemId, { description: result })}
                    label="Melhorar com IA"
                  />
                );
              }}
            />
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-3 lg:w-[600px] lg:shrink-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <TemplateSelector value={template} onChange={handleTemplateChange} />
              <div className="flex items-center gap-2">
                <CvAnalysisDialog data={debouncedCvData} />
                <PdfDownloadButton data={debouncedCvData} template={template} />
              </div>
            </div>
            <TranslatedExportButton data={debouncedCvData} template={template} />
            <div className="h-[700px] overflow-hidden rounded-lg border border-border bg-white lg:h-[calc(100vh-11rem)]">
              <PdfPreview data={debouncedCvData} template={template} />
            </div>
          </div>
        </main>

        <Footer />
        <AISettingsDialog
          open={aiSettingsOpen}
          onClose={() => setAiSettingsOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}
