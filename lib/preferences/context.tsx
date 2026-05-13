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
import { useI18n } from "@/lib/i18n/context";

export type TempUnit = "c" | "f";
export type DistanceUnit = "km" | "mi";
export type TravelCurrency =
  | "USD"
  | "EUR"
  | "GBP"
  | "AED"
  | "JPY"
  | "CAD"
  | "AUD"
  | "INR"
  | "SGD"
  | "CHF";

export const TRAVEL_CURRENCIES: ReadonlyArray<TravelCurrency> = [
  "USD",
  "EUR",
  "GBP",
  "AED",
  "JPY",
  "CAD",
  "AUD",
  "INR",
  "SGD",
  "CHF",
];

export const TEMPERATURE_UNITS: ReadonlyArray<{
  value: TempUnit;
  label: string;
  shortLabel: string;
}> = [
  { value: "c", label: "Celsius", shortLabel: "°C" },
  { value: "f", label: "Fahrenheit", shortLabel: "°F" },
];

export const DISTANCE_UNITS: ReadonlyArray<{
  value: DistanceUnit;
  label: string;
  shortLabel: string;
}> = [
  { value: "km", label: "Kilometers", shortLabel: "km" },
  { value: "mi", label: "Miles", shortLabel: "mi" },
];

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

const TRAVEL_PREFERENCES_STORAGE_KEY = "journee-travel-preferences";

type StoredTravelPreferences = {
  currency?: string;
  temperature?: TempUnit;
  distance?: DistanceUnit;
};

function isTravelCurrency(value: string | null): value is TravelCurrency {
  return TRAVEL_CURRENCIES.includes(value as TravelCurrency);
}

function readStoredTravelPreferences(): StoredTravelPreferences {
  try {
    const stored = window.localStorage.getItem(TRAVEL_PREFERENCES_STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored) as StoredTravelPreferences;

    return {
      currency: isTravelCurrency(parsed.currency ?? null)
        ? parsed.currency
        : undefined,
      temperature:
        parsed.temperature === "c" || parsed.temperature === "f"
          ? parsed.temperature
          : undefined,
      distance:
        parsed.distance === "km" || parsed.distance === "mi"
          ? parsed.distance
          : undefined,
    };
  } catch {
    return {};
  }
}

function writeStoredTravelPreferences(next: StoredTravelPreferences) {
  const current = readStoredTravelPreferences();
  window.localStorage.setItem(
    TRAVEL_PREFERENCES_STORAGE_KEY,
    JSON.stringify({ ...current, ...next }),
  );
}

export function celsiusToFahrenheit(celsius: number) {
  return celsius * 1.8 + 32;
}

export function kilometersToMiles(km: number) {
  return km * 0.621371;
}

export function formatTemperatureValue(celsius: number, unit: TempUnit) {
  if (unit === "f") return `${celsiusToFahrenheit(celsius).toFixed(0)}°F`;
  return `${celsius.toFixed(1)}°C`;
}

export function formatDistanceValue(km: number, unit: DistanceUnit) {
  if (unit === "mi") return `${kilometersToMiles(km).toFixed(1)} mi`;
  return `${km.toFixed(1)} km`;
}

export function formatCurrencyValue(
  amountMinor: number,
  currency: string,
  locale = "en-US",
) {
  return formatPrice(amountMinor, currency.toUpperCase(), locale);
}

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
    const stored = readStoredTravelPreferences();
    const storedCurrency = stored.currency ?? null;
    if (isTravelCurrency(storedCurrency)) setCurrencyState(storedCurrency);
    if (stored.temperature) setTempUnitState(stored.temperature);
    if (stored.distance) setDistanceUnitState(stored.distance);
    writeStoredTravelPreferences({
      currency: isTravelCurrency(storedCurrency)
        ? storedCurrency
        : isTravelCurrency(defaultCurrency)
          ? defaultCurrency
          : "AED",
      temperature: stored.temperature ?? "c",
      distance: stored.distance ?? "km",
    });
  }, [defaultCurrency]);

  const setCurrency = useCallback((c: string) => {
    const next = c.toUpperCase();
    if (!isTravelCurrency(next)) return;
    setCurrencyState(next);
    writeStoredTravelPreferences({ currency: next });
  }, []);
  const setTempUnit = useCallback((u: TempUnit) => {
    setTempUnitState(u);
    writeStoredTravelPreferences({ temperature: u });
  }, []);
  const setDistanceUnit = useCallback((u: DistanceUnit) => {
    setDistanceUnitState(u);
    writeStoredTravelPreferences({ distance: u });
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

export function useTravelPreferences() {
  return usePreferences();
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
  const { intlLocale } = useI18n();
  const source = currency.toUpperCase();
  const targetUp = target.toUpperCase();
  const displayLocale = locale ?? intlLocale;

  const original = formatPrice(amountMinor, source, displayLocale);
  if (targetUp === source) return <span>{original}</span>;

  const converted = convertMinor(amountMinor, source, targetUp, rates);
  if (converted === null) return <span title="Conversion unavailable">{original}</span>;
  return (
    <span title={`${original} · live rate`}>
      {formatPrice(converted, targetUp, displayLocale)}
    </span>
  );
}

export function TempDisplay({ celsius }: { celsius: number }) {
  const { tempUnit } = usePreferences();
  return <span className="tabular-nums">{formatTemperatureValue(celsius, tempUnit)}</span>;
}

export function DistanceDisplay({ km }: { km: number }) {
  const { distanceUnit } = usePreferences();
  return <span className="tabular-nums">{formatDistanceValue(km, distanceUnit)}</span>;
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
