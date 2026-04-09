import { CheckCircle2Icon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    title: "Claims access",
    body:
      "More than 200 places to prospect across 90,000+ acres of GPAA claims and leases — keep what you find.",
  },
  {
    title: "Gold Prospectors Magazine",
    body:
      "GPAA’s bi-monthly publication: tips, field stories, community news, and how-to from working prospectors.",
  },
  {
    title: "Local GPAA chapters",
    body:
      "90+ chapters nationwide — learn from seasoned members and join local outings and events.",
  },
  {
    title: "Member community",
    body:
      "Claim reports and member experiences help you get on the gold with confidence.",
  },
];

export function Benefits() {
  return (
    <section className="border-b border-[var(--brand-border)] bg-[var(--brand-body-dim)] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            Lifetime member benefits
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            Why prospectors join GPAA before they buy another piece of gear
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">
            Every Gold Life bundle is built around the same lifetime GPAA core:
            where you can go, who you learn beside, and what you read between
            trips. Only the partner equipment in the bundle changes—Minelab,
            Garrett, Gold Cube, or another Gold Life partner offer.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {benefits.map((b) => (
            <Card
              key={b.title}
              className="border-[var(--brand-border)] bg-white shadow-sm"
            >
              <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-2">
                <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]" />
                <CardTitle className="text-base font-semibold leading-snug text-[var(--brand-primary)]">
                  {b.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-[#1c1d1d]">
                {b.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
