"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { type CVData, type TemplateName } from "@/types/cv";
import { getTemplateComponent } from "./templates/get-template";
import { Button } from "@/components/ui/button";

const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  { ssr: false },
);

interface PdfDownloadButtonProps {
  data: CVData;
  template: TemplateName;
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

export const PdfDownloadButton = memo(function PdfDownloadButton({ data, template }: PdfDownloadButtonProps) {
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
});
