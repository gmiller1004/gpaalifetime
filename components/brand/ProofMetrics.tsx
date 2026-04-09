import { LandmarkIcon, MapPinIcon, UsersIcon } from "lucide-react";

const metrics = [
  {
    icon: MapPinIcon,
    value: "200+",
    label: "Prospecting areas on GPAA claims & leases",
    hint:
      "Use the Mining Guide and Online Property Guide for directions, GPS corners, maps, and updates—always follow posted rules.",
  },
  {
    icon: UsersIcon,
    value: "90+",
    label: "Local GPAA chapters coast to coast",
    hint:
      "Meetings, outings, and mentors who’ve already worked the ground you’re learning.",
  },
  {
    icon: LandmarkIcon,
    value: "1968",
    label: "Serving prospectors for generations",
    hint:
      "The GPAA was founded in 1968 to help everyday people find gold—still the same mission today.",
  },
];

export function ProofMetrics() {
  return (
    <section className="border-b border-[var(--brand-border)] bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
          What your membership opens
        </p>
        <h2 className="font-heading mt-2 text-center text-2xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-3xl">
          Places to go, people to learn from, history you can trust
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-body-dim)] p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex size-11 items-center justify-center rounded-full border border-[var(--brand-border)] bg-white text-[var(--brand-primary)]">
                <m.icon className="size-5" aria-hidden />
              </div>
              <p className="font-heading mt-4 text-3xl font-semibold tabular-nums text-[var(--brand-primary)]">
                {m.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1c1d1d]">
                {m.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--brand-muted)]">
                {m.hint}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
