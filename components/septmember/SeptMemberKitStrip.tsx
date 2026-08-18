import Image from "next/image";

import { septMemberImages } from "@/lib/septmember";

export function SeptMemberKitStrip() {
  return (
    <section className="border-b border-[var(--brand-border)] bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            What arrives with membership
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            The kit that says you&apos;re in for life
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">
            Hat, pan, card, and The Founder Bag. The kit is what every new
            lifetime member gets — the gold in the bag is this month&apos;s extra.
          </p>
        </div>
        <div className="relative mx-auto mt-10 overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-[#1a1410] shadow-lg">
          <Image
            src={septMemberImages.kit}
            alt="GPAA Lifetime Member hat, The Founder Bag, and a copper pan with gold nuggets"
            width={1600}
            height={1200}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1152px) 100vw, 1152px"
          />
        </div>
      </div>
    </section>
  );
}
