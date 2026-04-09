import Image from "next/image";

import { MagazineIssueDialog } from "@/components/brand/MagazineIssueDialog";
import { placeholderMagazineMockup } from "@/lib/placeholders";

export function GoldProspectorsMagazineSection() {
  return (
    <section className="border-b border-[var(--brand-border)] bg-[var(--brand-body-dim)] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
              Between trips
            </p>
            <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
              Gold Prospectors Magazine
            </h2>
            <p className="mt-3 text-[var(--brand-body)]">
              GPAA&apos;s bi-monthly magazine keeps you in rhythm with the field—gear
              tips, how-tos, and stories from prospectors who are already on the
              ground. It&apos;s the member read that turns a weekend plan into a
              smarter dig.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-8 rounded-2xl border border-[var(--brand-border)] bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-stretch lg:gap-10">
            <figure className="mx-auto flex w-full max-w-[260px] shrink-0 flex-col gap-2 lg:mx-0 lg:w-[min(100%,280px)]">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] shadow-md ring-1 ring-black/5">
                <Image
                  src={placeholderMagazineMockup}
                  alt="Gold Prospectors Magazine cover"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 260px, 280px"
                />
              </div>
              <figcaption className="text-center text-xs text-[var(--brand-muted)] lg:text-left">
                Bi-monthly print &amp; digital member magazine
              </figcaption>
            </figure>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-[var(--brand-body)] sm:text-base">
                Every issue blends{" "}
                <span className="font-medium text-[#1c1d1d]">
                  practical techniques
                </span>{" "}
                —detecting, panning, sluicing, and highbanking—with{" "}
                <span className="font-medium text-[#1c1d1d]">
                  trip reports and community news
                </span>{" "}
                so you see what worked (and what didn&apos;t) on real claims. You
                read it between outings, then show up with a sharper idea of what to
                test first.
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#1c1d1d] sm:text-base">
                <li>
                  Field-tested gear talk and how-to articles from working
                  prospectors—not just catalog copy.
                </li>
                <li>
                  Chapter highlights, event notices, and member voices from across
                  the country.
                </li>
                <li>
                  A steady pulse of ideas that pairs with your Mining Guide and
                  online resources so planning and reading stay connected.
                </li>
              </ul>
              <div className="mt-8 flex justify-center border-t border-[var(--brand-border)] pt-6">
                <MagazineIssueDialog />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
