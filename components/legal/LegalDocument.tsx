import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function LegalDocument({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
        {title}
      </h1>
      <div
        className={cn(
          "mt-8 space-y-6 text-sm leading-relaxed text-[#1c1d1d] sm:text-base",
          "[&_h2]:font-heading [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[var(--brand-primary)]",
          "[&_h2:first-of-type]:mt-8",
          "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
          "[&_a]:text-[var(--brand-primary)] [&_a]:underline-offset-4 hover:[&_a]:underline"
        )}
      >
        {children}
      </div>
    </article>
  );
}
