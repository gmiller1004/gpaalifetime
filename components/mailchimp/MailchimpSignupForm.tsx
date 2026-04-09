"use client";

import * as React from "react";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { useMailchimpSubscribe } from "./use-mailchimp-subscribe";

const inputClass = cn(
  "h-10 w-full rounded-lg border border-[var(--brand-border)] bg-white px-3 text-sm text-[var(--brand-body)] shadow-sm",
  "outline-none transition focus-visible:border-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/20"
);

export function MailchimpSignupForm({
  variant = "inline",
  className,
}: {
  variant?: "inline" | "modal";
  className?: string;
}) {
  const fieldId = React.useId();
  const { subscribe, pending, error, success } = useMailchimpSubscribe();
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await subscribe(firstName, email);
  }

  if (success) {
    return (
      <p
        className={cn(
          "text-sm font-medium text-[var(--brand-primary)]",
          variant === "modal" && "text-center"
        )}
        role="status"
      >
        You&apos;re on the list. Thanks!
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        variant === "inline"
          ? "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
          : "flex flex-col gap-3",
        className
      )}
      noValidate
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:max-w-[200px]">
        <Label htmlFor={`${fieldId}-fname`}>First name</Label>
        <input
          id={`${fieldId}-fname`}
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={inputClass}
          disabled={pending}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:max-w-[280px]">
        <Label htmlFor={`${fieldId}-email`}>Email</Label>
        <input
          id={`${fieldId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          disabled={pending}
        />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="inline-flex h-10 shrink-0 gap-2 bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)] hover:brightness-95"
      >
        {pending ? (
          <>
            <Loader2Icon className="size-4 animate-spin" aria-hidden />
            Joining…
          </>
        ) : (
          "Get updates"
        )}
      </Button>
      {error ? (
        <p className="w-full text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
