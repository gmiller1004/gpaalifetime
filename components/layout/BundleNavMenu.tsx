"use client";

import * as React from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import type { BrandConfig } from "@/lib/brands";
import { getOtherBundleNavItems } from "@/lib/bundle-urls";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function BundleNavMenu({
  brand,
  siteHost,
}: {
  brand: BrandConfig;
  siteHost: string;
}) {
  const [open, setOpen] = React.useState(false);
  const items = getOtherBundleNavItems(brand.id, siteHost);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="shrink-0 border border-white/20 bg-white/10 text-white shadow-sm hover:bg-white/15"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <MenuIcon className="size-4" />
      </Button>
      <SheetContent side="left" className="w-full max-w-sm border-[var(--brand-border)] bg-white py-6 text-[var(--brand-body)]">
        <SheetHeader className="border-b border-[var(--brand-border)] px-2 pb-4 text-left">
          <SheetTitle className="font-heading text-lg text-[var(--brand-primary)]">
            Gold Life bundles
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-2 pt-4" aria-label="Partner bundles">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3 text-sm font-medium text-[#1c1d1d] transition-colors",
                "hover:bg-[var(--brand-body-dim)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
