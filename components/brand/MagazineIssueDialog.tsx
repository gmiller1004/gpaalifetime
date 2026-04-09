"use client";

import { BookOpenIcon, ExternalLinkIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const MAGAZINE_ISSUE_URL =
  "https://mydigitalpublication.com/publication/?i=858866" as const;

const ctaClass = cn(
  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold shadow-sm transition-colors",
  "bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)]",
  "hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
);

export function MagazineIssueDialog() {
  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition-colors sm:w-auto",
          "bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)]",
          "hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
        )}
      >
        <BookOpenIcon className="size-4 shrink-0" aria-hidden />
        View an issue
      </DialogTrigger>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-border bg-[var(--brand-body-dim)] px-5 py-5">
          <DialogTitle className="text-[var(--brand-primary)]">
            Gold Prospectors Magazine
          </DialogTitle>
          <DialogDescription className="text-pretty">
            The digital reader runs in a full browser tab—not inside this page. Use
            the button below to open this issue so pages, zoom, and search work
            reliably.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 px-5 py-6">
          <a
            href={MAGAZINE_ISSUE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClass}
          >
            Open digital issue
            <ExternalLinkIcon className="size-4 shrink-0" aria-hidden />
          </a>
          <p className="text-center text-xs text-muted-foreground">
            A new tab will open. You can close this window anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
