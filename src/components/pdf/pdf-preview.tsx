"use client";

import dynamic from "next/dynamic";
import { type CVData, type TemplateName } from "@/types/cv";
import { TemplateClassic } from "./templates/template-classic";
import { TemplateModern } from "./templates/template-modern";
import { TemplateCompact } from "./templates/template-compact";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

interface PdfPreviewProps {
  data: CVData;
  template: TemplateName;
}

function getTemplateComponent(template: TemplateName, data: CVData) {
  switch (template) {
    case "modern":
      return <TemplateModern data={data} />;
    case "compact":
      return <TemplateCompact data={data} />;
    case "classic":
    default:
      return <TemplateClassic data={data} />;
  }
}

export function PdfPreview({ data, template }: PdfPreviewProps) {
  return (
    <PDFViewer
      style={{ width: "100%", height: "100%", border: "none" }}
      showToolbar={false}
    >
      {getTemplateComponent(template, data)}
    </PDFViewer>
  );
}
