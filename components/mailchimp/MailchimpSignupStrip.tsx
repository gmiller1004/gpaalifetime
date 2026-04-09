"use client";

import { MailchimpSignupForm } from "./MailchimpSignupForm";

export function MailchimpSignupStrip() {
  return (
    <section
      className="border-b border-[var(--brand-border)] bg-white px-4 py-8 sm:px-6"
      aria-labelledby="gpaa-mailchimp-strip-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="gpaa-mailchimp-strip-heading"
          className="font-heading text-lg font-semibold tracking-tight text-[var(--brand-primary)] sm:text-xl"
        >
          Stay in the loop
        </h2>
        <p className="mt-1 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--brand-body)] sm:text-base">
          Get updates on new bundles and offers from GPAA—no spam, unsubscribe
          anytime.
        </p>
        <div className="mt-4">
          <MailchimpSignupForm variant="inline" />
        </div>
      </div>
    </section>
  );
}
