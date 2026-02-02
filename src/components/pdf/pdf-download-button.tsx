"use client";

import dynamic from "next/dynamic";
import { type CVData, type TemplateName } from "@/types/cv";
import { TemplateClassic } from "./templates/template-classic";
import { TemplateModern } from "./templates/template-modern";
import { TemplateCompact } from "./templates/template-compact";
import { Button } from "@/components/ui/button";

const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  { ssr: false },
);

interface PdfDownloadButtonProps {
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

function getFileName(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug ? `cv-${slug}.pdf` : "cv.pdf";
}

export function PdfDownloadButton({ data, template }: PdfDownloadButtonProps) {
  return (
    <BlobProvider document={getTemplateComponent(template, data)}>
      {({ url, loading }) => (
        <Button
          variant="primary"
          size="md"
          disabled={loading || !url}
          onClick={() => {
            if (!url) return;
            const a = document.createElement("a");
            a.href = url;
            a.download = getFileName(data.contactInfo.name);
            a.click();
          }}
        >
          {loading ? "Gerando..." : "Baixar PDF"}
        </Button>
      )}
    </BlobProvider>
  );
}
