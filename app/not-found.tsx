import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This GPAA Gold Life page does not exist. Return to the lifetime membership bundle storefront.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 text-center text-[#1c1d1d]">
      <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
        GPAA Gold Life
      </p>
      <h1 className="font-heading text-3xl font-semibold text-[#1c1d1d]">
        Page not found
      </h1>
      <p className="max-w-md text-[#5f6368]">
        That path doesn&apos;t exist. Return to the Gold Life storefront home.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ size: "lg" }), "rounded-xl")}
      >
        Back home
      </Link>
    </div>
  );
}
