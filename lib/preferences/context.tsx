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
export type TemperatureUnit = "celsius" | "fahrenheit";
export type TravelDistanceUnit = "kilometers" | "miles";
export type TravelCurrency =
  | "AED"
  | "USD"
  | "EUR"
  | "GBP"
  | "JPY"
  | "SGD";

export const TRAVEL_CURRENCIES: ReadonlyArray<TravelCurrency> = [
  "AED",
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "SGD",
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
  selectedCurrency: TravelCurrency;
  setCurrency: (c: string) => void;
  setSelectedCurrency: (c: TravelCurrency) => void;
  tempUnit: TempUnit;
  selectedTemperatureUnit: TemperatureUnit;
  setTempUnit: (u: TempUnit) => void;
  setSelectedTemperatureUnit: (u: TemperatureUnit) => void;
  distanceUnit: DistanceUnit;
  selectedDistanceUnit: TravelDistanceUnit;
  setDistanceUnit: (u: DistanceUnit) => void;
  setSelectedDistanceUnit: (u: TravelDistanceUnit) => void;
};

const Context = createContext<PreferencesValue | null>(null);

const TRAVEL_PREFERENCES_STORAGE_KEY = "journee-travel-preferences";

type StoredTravelPreferences = {
  currency?: string;
  temperatureUnit?: TemperatureUnit;
  distanceUnit?: TravelDistanceUnit;
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
    const legacyTemperature = parsed.temperature;
    const legacyDistance = parsed.distance;
    const temperatureUnit =
      parsed.temperatureUnit === "celsius" || parsed.temperatureUnit === "fahrenheit"
        ? parsed.temperatureUnit
        : legacyTemperature === "f"
          ? "fahrenheit"
          : legacyTemperature === "c"
            ? "celsius"
            : undefined;
    const distanceUnit =
      parsed.distanceUnit === "kilometers" || parsed.distanceUnit === "miles"
        ? parsed.distanceUnit
        : legacyDistance === "mi"
          ? "miles"
          : legacyDistance === "km"
            ? "kilometers"
            : undefined;

    return {
      currency: isTravelCurrency(parsed.currency ?? null)
        ? parsed.currency
        : undefined,
      temperatureUnit,
      distanceUnit,
      temperature: temperatureUnitToLegacy(temperatureUnit),
      distance: distanceUnitToLegacy(distanceUnit),
    };
  } catch {
    return {};
  }
}

function writeStoredTravelPreferences(next: StoredTravelPreferences) {
  const current = readStoredTravelPreferences();
  const currency = isTravelCurrency(next.currency ?? current.currency ?? null)
    ? (next.currency ?? current.currency) as TravelCurrency
    : "AED";
  const temperatureUnit =
    next.temperatureUnit ??
    (next.temperature ? legacyToTemperatureUnit(next.temperature) : undefined) ??
    current.temperatureUnit ??
    "celsius";
  const distanceUnit =
    next.distanceUnit ??
    (next.distance ? legacyToDistanceUnit(next.distance) : undefined) ??
    current.distanceUnit ??
    "kilometers";

  window.localStorage.setItem(
    TRAVEL_PREFERENCES_STORAGE_KEY,
    JSON.stringify({
      currency,
      temperatureUnit,
      distanceUnit,
    }),
  );
}

function legacyToTemperatureUnit(unit: TempUnit): TemperatureUnit {
  return unit === "f" ? "fahrenheit" : "celsius";
}

function temperatureUnitToLegacy(unit?: TemperatureUnit): TempUnit | undefined {
  if (!unit) return undefined;
  return unit === "fahrenheit" ? "f" : "c";
}

function legacyToDistanceUnit(unit: DistanceUnit): TravelDistanceUnit {
  return unit === "mi" ? "miles" : "kilometers";
}

function distanceUnitToLegacy(unit?: TravelDistanceUnit): DistanceUnit | undefined {
  if (!unit) return undefined;
  return unit === "miles" ? "mi" : "km";
}

export function celsiusToFahrenheit(celsius: number) {
  return celsius * 1.8 + 32;
}

export function kilometersToMiles(km: number) {
  return km * 0.621371;
}

export function formatTemperatureValue(celsius: number, unit: TempUnit | TemperatureUnit) {
  if (unit === "f" || unit === "fahrenheit") return `${celsiusToFahrenheit(celsius).toFixed(0)}°F`;
  return `${celsius.toFixed(1)}°C`;
}

export function formatDistanceValue(km: number, unit: DistanceUnit | TravelDistanceUnit) {
  if (unit === "mi" || unit === "miles") return `${kilometersToMiles(km).toFixed(1)} mi`;
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
  const fallbackCurrency = isTravelCurrency(defaultCurrency) ? defaultCurrency : "AED";
  const [currency, setCurrencyState] = useState<TravelCurrency>(fallbackCurrency);
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
      temperatureUnit: stored.temperatureUnit ?? "celsius",
      distanceUnit: stored.distanceUnit ?? "kilometers",
    });
  }, [defaultCurrency]);

  const setCurrency = useCallback((c: string) => {
    const next = c.toUpperCase();
    if (!isTravelCurrency(next)) return;
    setCurrencyState(next);
    writeStoredTravelPreferences({ currency: next });
  }, []);
  const setSelectedCurrency = useCallback((c: TravelCurrency) => setCurrency(c), [setCurrency]);
  const setTempUnit = useCallback((u: TempUnit) => {
    setTempUnitState(u);
    writeStoredTravelPreferences({ temperatureUnit: legacyToTemperatureUnit(u) });
  }, []);
  const setSelectedTemperatureUnit = useCallback((u: TemperatureUnit) => {
    setTempUnitState(temperatureUnitToLegacy(u) ?? "c");
    writeStoredTravelPreferences({ temperatureUnit: u });
  }, []);
  const setDistanceUnit = useCallback((u: DistanceUnit) => {
    setDistanceUnitState(u);
    writeStoredTravelPreferences({ distanceUnit: legacyToDistanceUnit(u) });
  }, []);
  const setSelectedDistanceUnit = useCallback((u: TravelDistanceUnit) => {
    setDistanceUnitState(distanceUnitToLegacy(u) ?? "km");
    writeStoredTravelPreferences({ distanceUnit: u });
  }, []);

  const value = useMemo(
    () => ({
      rates,
      currency,
      selectedCurrency: currency,
      setCurrency,
      setSelectedCurrency,
      tempUnit,
      selectedTemperatureUnit: legacyToTemperatureUnit(tempUnit),
      setTempUnit,
      setSelectedTemperatureUnit,
      distanceUnit,
      selectedDistanceUnit: legacyToDistanceUnit(distanceUnit),
      setDistanceUnit,
      setSelectedDistanceUnit,
    }),
    [
      rates,
      currency,
      setCurrency,
      setSelectedCurrency,
      tempUnit,
      setTempUnit,
      setSelectedTemperatureUnit,
      distanceUnit,
      setDistanceUnit,
      setSelectedDistanceUnit,
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
