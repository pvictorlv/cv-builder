"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { type CVData, type TemplateName } from "@/types/cv";
import { getTemplateComponent } from "./templates/get-template";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

interface PdfPreviewProps {
  data: CVData;
  template: TemplateName;
}

export const PdfPreview = memo(function PdfPreview({ data, template }: PdfPreviewProps) {
  // Key based on item IDs + order forces PDFViewer remount on structural
  // changes (add/remove/reorder). Content-only edits keep the same key and
  // update through normal reconciliation. This works around @react-pdf's
  // custom reconciler not handling array reordering correctly.
  const structuralKey = [
    ...data.workExperience.items.map((i) => i.id),
    ...data.education.items.map((i) => i.id),
    ...data.certifications.items.map((i) => i.id),
    ...data.languages.items.map((i) => i.id),
  ].join(",");

  return (
    <PDFViewer
      key={structuralKey}
      style={{ width: "100%", height: "100%", border: "none" }}
      showToolbar={false}
    >
      {getTemplateComponent(template, data)}
    </PDFViewer>
  );
});
