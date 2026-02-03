import { type CVData, type TemplateName } from "@/types/cv";
import { TemplateClassic } from "./template-classic";
import { TemplateModern } from "./template-modern";
import { TemplateCompact } from "./template-compact";
import { TemplateElegant } from "./template-elegant";
import { TemplateCreative } from "./template-creative";
import { TemplateExecutive } from "./template-executive";

export function getTemplateComponent(template: TemplateName, data: CVData) {
  switch (template) {
    case "modern":
      return <TemplateModern data={data} />;
    case "compact":
      return <TemplateCompact data={data} />;
    case "elegant":
      return <TemplateElegant data={data} />;
    case "creative":
      return <TemplateCreative data={data} />;
    case "executive":
      return <TemplateExecutive data={data} />;
    case "classic":
    default:
      return <TemplateClassic data={data} />;
  }
}
