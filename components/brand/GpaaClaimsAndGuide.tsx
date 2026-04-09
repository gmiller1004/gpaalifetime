import { BookOpenIcon, MapPinnedIcon } from "lucide-react";

import { GpaaClaimsMap } from "./GpaaClaimsMap";

export function GpaaClaimsAndGuide() {
  return (
    <section className="border-b border-[var(--brand-border)] bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            Field access
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            GPAA claims access &amp; the Mining Guide
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">
            Lifetime membership is your key to knowing{" "}
            <span className="font-medium text-[#1c1d1d]">where you can prospect</span>{" "}
            on GPAA claims and leases—and{" "}
            <span className="font-medium text-[#1c1d1d]">how to read each site</span>{" "}
            before you load the truck.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] bg-white text-[var(--brand-primary)] shadow-sm">
                <MapPinnedIcon className="size-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-[var(--brand-primary)]">
                  Claims &amp; lease access
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--brand-body)]">
                  GPAA maintains a network of member claims and leases across the
                  U.S.—places you can work with other members under posted rules.
                  Your lifetime status keeps that access in your pocket as long as
                  you follow GPAA guidelines and each property&apos;s posting.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#1c1d1d]">
                  <li>
                    Prospect on GPAA claims and leases nationwide—subject to current
                    member rules and on-site postings.
                  </li>
                  <li>
                    Bring family and guests as allowed by GPAA—always check the
                    latest membership materials before you go.
                  </li>
                  <li>
                    Pair field time with chapters and publications so you&apos;re
                    not guessing at boundaries or seasonal closures.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] bg-white text-[var(--brand-primary)] shadow-sm">
                <BookOpenIcon className="size-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-[var(--brand-primary)]">
                  Mining Guide &amp; Online Property Guide
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--brand-body)]">
                  The{" "}
                  <span className="font-medium text-[#1c1d1d]">
                    Mining Guide &amp; Online Property Guide
                  </span>{" "}
                  is your roadmap: claim locations, access notes, and the context you
                  need to plan trips responsibly. Use it with GPAA publications and
                  chapter updates so your next outing matches what&apos;s open today.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#1c1d1d]">
                  <li>
                    Turn-by-turn style directions and property guidance to help you
                    arrive prepared—not surprised at the gate.
                  </li>
                  <li>
                    Works alongside claim postings and member reports so you
                    coordinate gear, season, and access in one workflow.
                  </li>
                  <li>
                    Treat every guide entry as a starting point—rules and postings
                    can change; always verify before you dig.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <GpaaClaimsMap />

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-[var(--brand-muted)]">
          GPAA programs, claim availability, and guide details are subject to change.
          Always follow the latest GPAA rules, claim postings, and land use
          requirements for your trip.
        </p>
      </div>
    </section>
  );
}
