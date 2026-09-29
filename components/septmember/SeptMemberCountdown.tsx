"use client";

import * as React from "react";

import { SEPTMEMBER_ENDS_AT_MS } from "@/lib/septmember";

function remainingParts(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex flex-col items-center">
      <span className="min-w-[2.25rem] rounded-md bg-black/25 px-1.5 py-0.5 font-heading text-base font-semibold tabular-nums sm:min-w-[2.75rem] sm:text-xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/75">
        {label}
      </span>
    </span>
  );
}

export function SeptMemberCountdown() {
  // Null until mounted so server and client markup match.
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = now === null ? null : SEPTMEMBER_ENDS_AT_MS - now;
  const ended = remaining !== null && remaining <= 0;
  const parts = remainingParts(remaining ?? 0);

  return (
    <div
      role="timer"
      aria-live="off"
      className="border-b border-black/10 bg-[#C45C26] px-4 py-2.5 text-white"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-5">
        <p className="text-balance text-xs font-semibold leading-snug sm:text-sm">
          {ended ? (
            "SeptMember has ended."
          ) : (
            <>
              SeptMember ends at midnight Pacific, Sept 30
              <span className="hidden sm:inline">
                {" "}
                — then Founder Bags and the daily mystery nugget are gone, and
                Lifetime goes back to $2,499
              </span>
            </>
          )}
        </p>
        {!ended ? (
          <div
            className="flex shrink-0 items-start gap-1.5 sm:gap-2"
            aria-label={
              remaining === null
                ? undefined
                : `${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes left`
            }
          >
            <Unit value={parts.days} label="Days" />
            <Unit value={parts.hours} label="Hrs" />
            <Unit value={parts.minutes} label="Min" />
            <Unit value={parts.seconds} label="Sec" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
