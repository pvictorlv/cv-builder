import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function SectionCard({ title, children, actions, className }: SectionCardProps) {
  return (
    <section className={cn("rounded-lg border border-border bg-background p-4", className)}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h2>
        {actions}
      </div>
      {children}
    </section>
  );
}
