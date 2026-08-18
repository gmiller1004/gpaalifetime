import Image from "next/image";

import { septMemberImages } from "@/lib/septmember";

const points = [
  {
    title: "At least $140 in gold",
    body: "Every Founder Bag is packed with paydirt that holds a minimum of $140 in gold value. You pan it. You keep it.",
  },
  {
    title: "A mystery nugget every day",
    body: "One Founder Bag each day includes a bonus mystery gold nugget. You won’t know until you open it — that’s the giveaway.",
  },
  {
    title: "Only with a new lifetime membership",
    body: "You can’t buy this bag later in the store. It’s only packed with new GPAA Lifetime memberships during SeptMember.",
  },
];

export function SeptMemberFounderBag() {
  return (
    <section
      id="founder-bag"
      className="border-b border-[var(--brand-border)] bg-[#f7f1e8] py-14 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-[#1a1410] shadow-lg">
          <Image
            src={septMemberImages.bagField}
            alt="The Founder Bag on a prospecting table with gold nuggets"
            width={1600}
            height={1200}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C45C26]">
            The Founder Bag
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            Real gold in a bag you can&apos;t buy later
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--brand-body)]">
            Named in memory of GPAA founder George &ldquo;Buzzard&rdquo; Massie.
            During SeptMember, every new lifetime member gets one — and one bag
            a day hides extra gold.
          </p>
          <div className="mt-8 grid gap-4">
            {points.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-[var(--brand-border)] bg-white p-4 shadow-sm"
              >
                <h3 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#1c1d1d]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
