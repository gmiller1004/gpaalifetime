import { gpaaLifetimeKitItems } from "@/lib/kit-items";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KitShowcase() {
  return (
    <section className="border-b border-[var(--brand-border)] bg-[var(--brand-body-dim)] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            What shows up at your door
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            Member kit items lifetime prospectors actually use
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">
            Hat, pan, pin, card, and printed materials that mark you as a
            lifetime member—alongside the partner gear in your bundle. Exact
            items follow GPAA’s current lifetime program and may be updated from
            season to season.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gpaaLifetimeKitItems.map((item) => (
            <Card
              key={item.title}
              className="border-[var(--brand-border)] bg-white shadow-sm"
            >
              <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
                <CardTitle className="text-base leading-snug text-[var(--brand-primary)]">
                  {item.title}
                </CardTitle>
                {item.badge ? (
                  <Badge
                    variant="secondary"
                    className="shrink-0 border-[var(--brand-border)] bg-[var(--brand-body-dim)] text-[10px] text-[var(--brand-primary)]"
                  >
                    {item.badge}
                  </Badge>
                ) : null}
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-[#1c1d1d]">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
