"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// Four standardised cookie categories used by the CMP banner. Matches the
// IAB TCF v2 top-level framing without the legal-vendor overhead.
export type ConsentCategory = "essential" | "preferences" | "analytics" | "marketing";

export type Consent = {
  essential: true; // always on — strictly required cookies
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  recordedAt: string | null; // ISO timestamp of the last decision, null = not decided
};

const DEFAULT_CONSENT: Consent = {
  essential: true,
  preferences: true,
  analytics: false,
  marketing: false,
  recordedAt: null,
};

const LS_KEY = "travelapp:consent";

type Value = {
  consent: Consent;
  decided: boolean;
  setConsent: (next: Partial<Omit<Consent, "essential" | "recordedAt">>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openPreferences: () => void;
  preferencesOpen: boolean;
  closePreferences: () => void;
};

const Ctx = createContext<Value | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent>(DEFAULT_CONSENT);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Consent;
        setConsentState({ ...DEFAULT_CONSENT, ...parsed, essential: true });
      }
    } catch {
      // ignore parse errors; fall back to default
    }
  }, []);

  const persist = useCallback((next: Consent) => {
    setConsentState(next);
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {
      // storage full / disabled; still update state
    }
  }, []);

  const setConsent: Value["setConsent"] = useCallback(
    (partial) => {
      const now = new Date().toISOString();
      persist({
        essential: true,
        preferences: partial.preferences ?? consent.preferences,
        analytics: partial.analytics ?? consent.analytics,
        marketing: partial.marketing ?? consent.marketing,
        recordedAt: now,
      });
    },
    [consent, persist],
  );

  const acceptAll = useCallback(() => {
    const now = new Date().toISOString();
    persist({
      essential: true,
      preferences: true,
      analytics: true,
      marketing: true,
      recordedAt: now,
    });
  }, [persist]);

  const rejectAll = useCallback(() => {
    const now = new Date().toISOString();
    persist({
      essential: true,
      preferences: false,
      analytics: false,
      marketing: false,
      recordedAt: now,
    });
  }, [persist]);

  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  const value = useMemo<Value>(
    () => ({
      consent,
      decided: consent.recordedAt !== null,
      setConsent,
      acceptAll,
      rejectAll,
      openPreferences,
      preferencesOpen,
      closePreferences,
    }),
    [
      consent,
      setConsent,
      acceptAll,
      rejectAll,
      openPreferences,
      preferencesOpen,
      closePreferences,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConsent() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useConsent must be used inside <ConsentProvider>");
  return v;
}
