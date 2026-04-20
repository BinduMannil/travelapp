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
import {
  convertMinor,
  formatPrice,
  type FxRate,
} from "@/lib/currency/convert";

export type TempUnit = "c" | "f";
export type DistanceUnit = "km" | "mi";

type PreferencesValue = {
  rates: ReadonlyArray<FxRate>;
  currency: string;
  setCurrency: (c: string) => void;
  tempUnit: TempUnit;
  setTempUnit: (u: TempUnit) => void;
  distanceUnit: DistanceUnit;
  setDistanceUnit: (u: DistanceUnit) => void;
};

const Context = createContext<PreferencesValue | null>(null);

const LS_KEYS = {
  currency: "travelapp:pref:currency",
  temp: "travelapp:pref:temp",
  distance: "travelapp:pref:distance",
};

export function PreferencesProvider({
  rates,
  defaultCurrency,
  children,
}: {
  rates: ReadonlyArray<FxRate>;
  defaultCurrency: string;
  children: ReactNode;
}) {
  const [currency, setCurrencyState] = useState(defaultCurrency);
  const [tempUnit, setTempUnitState] = useState<TempUnit>("c");
  const [distanceUnit, setDistanceUnitState] = useState<DistanceUnit>("km");

  useEffect(() => {
    const c = window.localStorage.getItem(LS_KEYS.currency);
    const t = window.localStorage.getItem(LS_KEYS.temp);
    const d = window.localStorage.getItem(LS_KEYS.distance);
    if (c) setCurrencyState(c);
    if (t === "c" || t === "f") setTempUnitState(t);
    if (d === "km" || d === "mi") setDistanceUnitState(d);
  }, []);

  const setCurrency = useCallback((c: string) => {
    setCurrencyState(c);
    window.localStorage.setItem(LS_KEYS.currency, c);
  }, []);
  const setTempUnit = useCallback((u: TempUnit) => {
    setTempUnitState(u);
    window.localStorage.setItem(LS_KEYS.temp, u);
  }, []);
  const setDistanceUnit = useCallback((u: DistanceUnit) => {
    setDistanceUnitState(u);
    window.localStorage.setItem(LS_KEYS.distance, u);
  }, []);

  const value = useMemo(
    () => ({
      rates,
      currency,
      setCurrency,
      tempUnit,
      setTempUnit,
      distanceUnit,
      setDistanceUnit,
    }),
    [
      rates,
      currency,
      setCurrency,
      tempUnit,
      setTempUnit,
      distanceUnit,
      setDistanceUnit,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function usePreferences() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error(
      "usePreferences must be used inside <PreferencesProvider>",
    );
  }
  return ctx;
}

// --- Display components ---------------------------------------------------

export function PriceDisplay({
  amountMinor,
  currency,
  locale = "en-US",
}: {
  amountMinor: number;
  currency: string;
  locale?: string;
}) {
  const { rates, currency: target } = usePreferences();
  const source = currency.toUpperCase();
  const targetUp = target.toUpperCase();

  const original = formatPrice(amountMinor, source, locale);
  if (targetUp === source) return <span>{original}</span>;

  const converted = convertMinor(amountMinor, source, targetUp, rates);
  if (converted === null) return <span title="Conversion unavailable">{original}</span>;
  return (
    <span title={`${original} · live rate`}>
      {formatPrice(converted, targetUp, locale)}
    </span>
  );
}

export function TempDisplay({ celsius }: { celsius: number }) {
  const { tempUnit } = usePreferences();
  if (tempUnit === "f") {
    const f = celsius * 1.8 + 32;
    return <span className="tabular-nums">{f.toFixed(0)}°F</span>;
  }
  return <span className="tabular-nums">{celsius.toFixed(1)}°C</span>;
}

export function DistanceDisplay({ km }: { km: number }) {
  const { distanceUnit } = usePreferences();
  if (distanceUnit === "mi") {
    return <span className="tabular-nums">{(km * 0.621371).toFixed(1)} mi</span>;
  }
  return <span className="tabular-nums">{km.toFixed(1)} km</span>;
}

// --- Back-compat shims -----------------------------------------------------
// Pages previously wrapped their own <CurrencyProvider> and showed a local
// <CurrencySelector>. The global provider in app/layout.tsx now handles
// currency, and the one set-it-here preferences panel lives on the home
// page, so these shims let existing pages keep compiling without visual
// changes while we migrate call sites.

type CurrencyProviderShimProps = {
  children: ReactNode;
  rates?: ReadonlyArray<FxRate>;
  defaultCurrency?: string;
};

export function CurrencyProvider({ children }: CurrencyProviderShimProps) {
  return <>{children}</>;
}

export function CurrencySelector(_props: { currencies?: ReadonlyArray<string> }) {
  return null;
}
