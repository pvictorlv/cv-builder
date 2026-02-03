import { v4 as uuidv4 } from "uuid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WORK_TYPE_LABELS } from "@/lib/constants";

export function generateId(): string {
  return uuidv4();
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];
  const monthIndex = parseInt(month, 10) - 1;
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return dateStr;
  return `${months[monthIndex]}/${year}`;
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDateRange(start: string, end: string, current: boolean): string {
  const s = formatDate(start);
  const e = current ? "Atual" : formatDate(end);
  if (!s && !e) return "";
  return `${s} – ${e}`;
}

export function formatCompanyWithType(company: string, type: string): string {
  if (type === "fulltime") return company;
  const label = WORK_TYPE_LABELS[type];
  if (!label) return company;
  return company ? `${company} · ${label}` : label;
}
