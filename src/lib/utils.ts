import { v4 as uuidv4 } from "uuid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WORK_TYPE_LABELS } from "@/lib/constants";

export function generateId(): string {
  return uuidv4();
}

const PT_MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function formatDate(dateStr: string, months?: string[]): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const m = months ?? PT_MONTHS;
  const monthIndex = parseInt(month, 10) - 1;
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return dateStr;
  return `${m[monthIndex]}/${year}`;
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDateRange(start: string, end: string, current: boolean, locale?: { months: string[]; current: string }): string {
  const s = formatDate(start, locale?.months);
  const e = current ? (locale?.current ?? "Atual") : formatDate(end, locale?.months);
  if (!s && !e) return "";
  return `${s} – ${e}`;
}

export function formatCompanyWithType(company: string, type: string, location?: string): string {
  const parts: string[] = [];
  if (company) parts.push(company);
  if (type !== "fulltime") {
    const label = WORK_TYPE_LABELS[type];
    if (label) parts.push(label);
  }
  if (location) parts.push(location);
  return parts.join(" · ");
}
