"use client";

import { useConsent } from "@/lib/consent/context";

export function PreferencesTrigger({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { openPreferences } = useConsent();
  return (
    <button
      type="button"
      onClick={openPreferences}
      className={className}
    >
      {children ?? "Cookie preferences"}
    </button>
  );
}
