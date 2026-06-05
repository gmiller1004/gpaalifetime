"use client";

import * as React from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import type { BrandConfig } from "@/lib/brands";
import { getOtherBundleNavItems, type BundleNavItem } from "@/lib/bundle-urls";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function PartnerBundleLink({
  item,
  onNavigate,
  className,
}: {
  item: BundleNavItem;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group block rounded-xl border border-transparent px-3 py-2.5 transition-colors",
        "hover:border-[var(--brand-border)] hover:bg-white/10",
        className
      )}
      style={{ borderLeftWidth: "3px", borderLeftColor: item.accentColor }}
    >
      <span className="block text-sm font-semibold text-white/95 group-hover:text-white">
        {item.label}
      </span>
      <span className="mt-0.5 block text-[11px] leading-snug text-white/55 group-hover:text-white/70">
        {item.tagline}
      </span>
    </Link>
  );
}

export function BundlePartnerDesktopNav({
  brand,
  siteHost,
}: {
  brand: BrandConfig;
  siteHost: string;
}) {
  const items = getOtherBundleNavItems(brand.id, siteHost);
  if (items.length === 0) return null;

  return (
    <nav
      className="hidden min-w-0 items-center gap-1 lg:flex"
      aria-label="Partner bundle offers"
    >
      <span className="mr-1 shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
        Bundles
      </span>
      {items.map((item) => (
        <PartnerBundleLink
          key={item.id}
          item={item}
          className="max-w-[11rem] px-2.5 py-2"
        />
      ))}
    </nav>
  );
}

export function BundleNavMenu({
  brand,
  siteHost,
}: {
  brand: BrandConfig;
  siteHost: string;
}) {
  const [open, setOpen] = React.useState(false);
  const items = getOtherBundleNavItems(brand.id, siteHost);
  const menuTitle = brand.membershipOnly
    ? "Partner bundle offers"
    : "Gold Life bundles";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="shrink-0 border border-white/20 bg-white/10 text-white shadow-sm hover:bg-white/15 lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <MenuIcon className="size-4" />
      </Button>
      <SheetContent
        side="left"
        className="w-full max-w-sm border-[var(--brand-border)] bg-white py-6 text-[var(--brand-body)]"
      >
        <SheetHeader className="border-b border-[var(--brand-border)] px-2 pb-4 text-left">
          <SheetTitle className="font-heading text-lg text-[var(--brand-primary)]">
            {menuTitle}
          </SheetTitle>
          {brand.membershipOnly ? (
            <p className="text-sm text-[var(--brand-muted)]">
              Lifetime GPAA plus partner gear — one secure checkout per bundle.
            </p>
          ) : null}
        </SheetHeader>
        <nav
          className="flex flex-col gap-2 px-2 pt-4"
          aria-label="Partner bundles"
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] px-4 py-3 transition-colors",
                "hover:border-[color-mix(in_srgb,var(--brand-primary)_20%,var(--brand-border))] hover:bg-white"
              )}
              style={{ borderLeftWidth: "3px", borderLeftColor: item.accentColor }}
            >
              <span className="block text-sm font-semibold text-[#1c1d1d]">
                {item.label}
              </span>
              <span className="mt-1 block text-xs leading-snug text-[var(--brand-muted)]">
                {item.tagline}
              </span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
