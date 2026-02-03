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
  return (
    <PDFViewer
      style={{ width: "100%", height: "100%", border: "none" }}
      showToolbar={false}
    >
      {getTemplateComponent(template, data)}
    </PDFViewer>
  );
});
