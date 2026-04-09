"use client";

import * as React from "react";

import { writeSubscribed } from "@/lib/mailchimp-storage";

export function useMailchimpSubscribe() {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const subscribe = React.useCallback(
    async (firstName: string, email: string) => {
      setError(null);
      setPending(true);
      try {
        const res = await fetch("/api/mailchimp/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, email }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        if (!res.ok) {
          setError(data.error ?? "Something went wrong. Try again.");
          return false;
        }
        writeSubscribed();
        setSuccess(true);
        return true;
      } catch {
        setError("Network error. Check your connection and try again.");
        return false;
      } finally {
        setPending(false);
      }
    },
    []
  );

  return { subscribe, pending, error, success, setError };
}
