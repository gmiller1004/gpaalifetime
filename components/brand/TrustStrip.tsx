import { CalendarDaysIcon, GemIcon, LandmarkIcon } from "lucide-react";

const items = [
  {
    title: "Offer windows",
    body: "Lifetime Gold Life bundles are released in limited runs—when GPAA closes an allocation, this package may change or pause.",
    icon: GemIcon,
  },
  {
    title: "Who’s covered",
    body:
      "Your membership covers you, your spouse, children under 18, and up to four guests on claims—follow current GPAA rules and each claim’s posting.",
    icon: CalendarDaysIcon,
  },
  {
    title: "Since 1968",
    body: "The GPAA has helped everyday Americans find gold for over fifty years—through publications, claims, and local chapters.",
    icon: LandmarkIcon,
  },
];

export function TrustStrip() {
  return (
    <section className="border-b border-[var(--brand-border)] bg-[#fdf5e6] py-8">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:gap-6 sm:px-6">
        {items.map(({ title, body, icon: Icon }) => (
          <div
            key={title}
            className="flex gap-3 text-left sm:flex-col sm:gap-2 sm:text-center"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] bg-white text-[var(--brand-primary)] shadow-sm">
              <Icon className="size-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--brand-primary)]">
                {title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--brand-body)]">
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
