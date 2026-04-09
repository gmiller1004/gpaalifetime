"use client";

import * as React from "react";

const VariantPreferenceContext = React.createContext<{
  preferredVariantId: string | null;
  setPreferredVariantId: (id: string | null) => void;
}>({
  preferredVariantId: null,
  setPreferredVariantId: () => {},
});

export function VariantPreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferredVariantId, setPreferredVariantId] = React.useState<
    string | null
  >(null);

  const value = React.useMemo(
    () => ({ preferredVariantId, setPreferredVariantId }),
    [preferredVariantId]
  );

  return (
    <VariantPreferenceContext.Provider value={value}>
      {children}
    </VariantPreferenceContext.Provider>
  );
}

export function useVariantPreference() {
  return React.useContext(VariantPreferenceContext);
}
