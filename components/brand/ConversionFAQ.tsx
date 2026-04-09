import { ChevronDownIcon } from "lucide-react";

const faqs = [
  {
    q: "What is a Gold Life bundle?",
    a: "You’re getting full GPAA Lifetime Membership—claims and lease access, the Mining Guide and Online Property Guide, Gold Prospectors Magazine, chapters, and member programs—bundled with the partner equipment on this page (Minelab, Garrett, Gold Cube, depending on which offer you chose). Pick the equipment option that matches your budget and ground, then complete one secure checkout.",
  },
  {
    q: "Who can prospect with me on GPAA claims?",
    a: "Membership is structured for you, your spouse, children under 18, and guests—subject to current GPAA rules and each claim’s posting. Always read the latest member materials before you head out.",
  },
  {
    q: "Why lifetime instead of paying year by year?",
    a: "Lifetime means you’re not renewing membership each year—you invest once for ongoing member status and access (program rules still apply). Many members choose it so they can focus on digging, not deadlines.",
  },
  {
    q: "I’m new to detectors or highbankers. Is this still for me?",
    a: "Yes. Between local chapters, magazine how-tos, and member trip reports on claims, you’re not buying gear in isolation—you’re joining a network built to shorten the learning curve.",
  },
  {
    q: "Can I pay from my phone?",
    a: "Yes. Checkout is encrypted; you can use a card or, where available, Apple Pay or Google Pay so you can finish the order quickly—even if you’re not at a desk.",
  },
];

export function ConversionFAQ() {
  return (
    <section className="border-b border-[var(--brand-border)] bg-[#fdfcf8] py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
            Questions &amp; answers
          </p>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
            Before you add to cart
          </h2>
          <p className="mt-3 text-[var(--brand-body)]">
            Clear facts so you can decide with confidence—no fine-print surprises
            at the last step.
          </p>
        </div>
        <div className="mt-10 divide-y divide-[var(--brand-border)] rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-2 shadow-sm sm:px-6">
          {faqs.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-left text-base font-semibold text-[var(--brand-primary)] [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <ChevronDownIcon
                  className="mt-0.5 size-5 shrink-0 text-[var(--brand-muted)] transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#1c1d1d]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
