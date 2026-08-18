import { SEPTMEMBER_YOUTUBE_EMBED } from "@/lib/septmember";

export function SeptMemberHero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--brand-border)] bg-[#1a1410]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-16">
        <div className="order-2 flex min-w-0 flex-col gap-5 lg:order-1">
          <p className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F4D58D]">
            SeptMember Gold Giveaway
          </p>
          <h1 className="font-heading text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Join GPAA for life. Take home gold you can pan this month.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Lifetime claims access, the Mining Guide, magazine, and chapters —
            plus The Founder Bag, an exclusive paydirt bag with at least{" "}
            <span className="font-semibold text-white">$140 in gold</span>. One
            bag every day hides a bonus mystery nugget.
          </p>
          <ul className="flex flex-col gap-2 text-sm text-white/80 sm:text-base">
            <li>You keep what you find on GPAA claims — for life.</li>
            <li>The Founder Bag is only here during SeptMember.</li>
            <li>
              Five bags means five days in the nugget hunt — and a nugget can be
              worth hundreds.
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <a
              href="#choose-your-offer"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#D4AF37] px-6 text-sm font-semibold text-[#1c1d1d] shadow-md hover:brightness-95"
            >
              See the two offers
            </a>
            <a
              href="#founder-bag"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10"
            >
              What&apos;s in the bag
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
            <div className="relative aspect-video w-full">
              <iframe
                src={`${SEPTMEMBER_YOUTUBE_EMBED}?rel=0&modestbranding=1`}
                title="SeptMember Gold Giveaway — The Founder Bag"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-white/50">
            Watch how The Founder Bag came together — in memory of GPAA founder
            George &ldquo;Buzzard&rdquo; Massie.
          </p>
        </div>
      </div>
    </section>
  );
}
