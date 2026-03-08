import { type CVData, type TemplateName } from "@/types/cv";
import { type SectionHeaders, type LocaleStrings } from "@/lib/constants";
import { TemplateClassic } from "./template-classic";
import { TemplateModern } from "./template-modern";
import { TemplateCompact } from "./template-compact";
import { TemplateElegant } from "./template-elegant";
import { TemplateCreative } from "./template-creative";
import { TemplateExecutive } from "./template-executive";

export interface TemplateOptions {
  headers?: SectionHeaders;
  locale?: LocaleStrings;
}

export function getTemplateComponent(template: TemplateName, data: CVData, options?: TemplateOptions) {
  const { headers, locale } = options ?? {};
  switch (template) {
    case "modern":
      return <TemplateModern data={data} headers={headers} locale={locale} />;
    case "compact":
      return <TemplateCompact data={data} headers={headers} locale={locale} />;
    case "elegant":
      return <TemplateElegant data={data} headers={headers} locale={locale} />;
    case "creative":
      return <TemplateCreative data={data} headers={headers} locale={locale} />;
    case "executive":
      return <TemplateExecutive data={data} headers={headers} locale={locale} />;
    case "classic":
    default:
      return <TemplateClassic data={data} headers={headers} locale={locale} />;
  }
}
