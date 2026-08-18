const faqs = [
  {
    q: "What’s actually in The Founder Bag?",
    a: "Paydirt with at least $140 in gold. You pan it at home or at a chapter outing. One bag each day also hides a bonus mystery gold nugget.",
  },
  {
    q: "Can I buy the bag without joining?",
    a: "No. The Founder Bag only ships with a new GPAA Lifetime membership during SeptMember. After that, it’s gone — unless you already locked in the four extra years.",
  },
  {
    q: "What’s the difference between $900 and $1,500?",
    a: "Both include lifetime membership, the kit, and a Founder Bag that ships now. $900 is one bag and one shot at that day’s mystery nugget. $1,500 is five bags over five years — five days in the nugget hunt. The extra $600 is about $150 a bag, each with at least $140 in gold. A mystery nugget can be worth hundreds on its own.",
  },
  {
    q: "When do the extra bags arrive?",
    a: "On the same date you joined, for the next four years. Join September 15, 2026 and your kit and first Founder Bag ship now. Then another bag arrives September 15 in 2027, 2028, 2029, and 2030 — each with a chance at that day’s mystery nugget.",
  },
  {
    q: "Do I keep the gold I find on GPAA claims?",
    a: "Yes. Lifetime membership is your key to GPAA claims and leases. Follow the posted rules on every site, and what you find is yours.",
  },
  {
    q: "When does this end?",
    a: "SeptMember is only for a short window. Lifetime membership lasts forever. If you want Founder Bags on this date for the next four years, you have to lock that in during this event.",
  },
];

export function SeptMemberFAQ() {
  return (
    <section className="border-b border-[var(--brand-border)] bg-[var(--brand-body-dim)] py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-center text-3xl font-semibold tracking-tight text-[var(--brand-primary)] sm:text-4xl">
          Straight answers before you check out
        </h2>
        <dl className="mt-10 space-y-4">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-[var(--brand-border)] bg-white p-5 shadow-sm"
            >
              <dt className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
                {item.q}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[#1c1d1d]">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
