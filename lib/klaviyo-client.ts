"use client";

type IdentifyProps = {
  email: string;
  first_name?: string;
};

type KlaviyoObject = {
  identify?: (properties: IdentifyProps) => Promise<unknown>;
  push?: (...args: unknown[]) => void;
};

/** Cookie this browser to the profile after they consent via the signup form. */
export function identifyKlaviyoProfile(email: string, firstName: string) {
  if (typeof window === "undefined") return;
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail) return;

  const properties: IdentifyProps = {
    email: trimmedEmail,
    first_name: firstName.trim().slice(0, 100) || undefined,
  };

  const client = window.klaviyo as KlaviyoObject | undefined;
  if (typeof client?.identify === "function") {
    void client.identify(properties);
    return;
  }
  if (typeof client?.push === "function") {
    client.push(["identify", properties]);
    return;
  }

  const queue = (window._klOnsite ??= []);
  queue.push(["identify", properties]);
}

declare global {
  interface Window {
    klaviyo?: KlaviyoObject;
    _klOnsite?: unknown[];
  }
}
