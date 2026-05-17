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

// Four standardised cookie categories used by the CMP banner.
export type ConsentCategory = "necessary" | "analytics" | "affiliate" | "personalization";
export type ConsentStatus = "accepted" | "rejected" | "custom" | null;

export type Consent = {
  status: ConsentStatus;
  necessary: true; // always on — strictly required cookies
  analytics: boolean;
  affiliate: boolean;
  personalization: boolean;
  updatedAt: string | null; // ISO timestamp of the last decision, null = not decided
};

const DEFAULT_CONSENT: Consent = {
  status: null,
  necessary: true,
  analytics: false,
  affiliate: false,
  personalization: false,
  updatedAt: null,
};

const LS_KEY = "journee-cookie-consent";
const LEGACY_LS_KEY = "travelapp:consent";

type Value = {
  consent: Consent;
  decided: boolean;
  setConsent: (next: Partial<Omit<Consent, "necessary" | "updatedAt">>) => void;
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
        setConsentState({ ...DEFAULT_CONSENT, ...parsed, necessary: true });
        return;
      }

      const legacyRaw = window.localStorage.getItem(LEGACY_LS_KEY);
      if (legacyRaw) {
        const legacy = JSON.parse(legacyRaw) as {
          analytics?: boolean;
          marketing?: boolean;
          preferences?: boolean;
          recordedAt?: string | null;
        };
        if (legacy.recordedAt) {
          setConsentState({
            status: legacy.analytics || legacy.marketing || legacy.preferences ? "custom" : "rejected",
            necessary: true,
            analytics: Boolean(legacy.analytics),
            affiliate: Boolean(legacy.marketing),
            personalization: Boolean(legacy.preferences),
            updatedAt: legacy.recordedAt,
          });
        }
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
        status: partial.status ?? "custom",
        necessary: true,
        analytics: partial.analytics ?? consent.analytics,
        affiliate: partial.affiliate ?? consent.affiliate,
        personalization: partial.personalization ?? consent.personalization,
        updatedAt: now,
      });
      setPreferencesOpen(false);
    },
    [consent, persist],
  );

  const acceptAll = useCallback(() => {
    const now = new Date().toISOString();
    persist({
      status: "accepted",
      necessary: true,
      analytics: true,
      affiliate: true,
      personalization: true,
      updatedAt: now,
    });
    setPreferencesOpen(false);
  }, [persist]);

  const rejectAll = useCallback(() => {
    const now = new Date().toISOString();
    persist({
      status: "rejected",
      necessary: true,
      analytics: false,
      affiliate: false,
      personalization: false,
      updatedAt: now,
    });
    setPreferencesOpen(false);
  }, [persist]);

  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  const value = useMemo<Value>(
    () => ({
      consent,
      decided: consent.status !== null,
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
