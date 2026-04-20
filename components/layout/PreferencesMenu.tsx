"use client";

import { usePreferences } from "@/lib/preferences/context";

const CURRENCIES = [
  "JPY",
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "SGD",
  "HKD",
  "CNY",
  "KRW",
  "THB",
  "INR",
  "AED",
  "CHF",
];

export function PreferencesMenu() {
  const {
    currency,
    setCurrency,
    tempUnit,
    setTempUnit,
    distanceUnit,
    setDistanceUnit,
  } = usePreferences();

  return (
    <div className="flex items-center gap-1 text-xs sm:gap-2 sm:text-sm">
      <label className="inline-flex items-center gap-1">
        <span className="hidden text-slate-500 sm:inline">Currency</span>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="rounded-md border border-slate-200 bg-white px-2 py-1 tabular-nums"
          aria-label="Currency"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <div
        role="radiogroup"
        aria-label="Temperature unit"
        className="inline-flex overflow-hidden rounded-md border border-slate-200"
      >
        <button
          type="button"
          aria-pressed={tempUnit === "c"}
          onClick={() => setTempUnit("c")}
          className={`px-2 py-1 ${
            tempUnit === "c"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          °C
        </button>
        <button
          type="button"
          aria-pressed={tempUnit === "f"}
          onClick={() => setTempUnit("f")}
          className={`px-2 py-1 ${
            tempUnit === "f"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          °F
        </button>
      </div>

      <div
        role="radiogroup"
        aria-label="Distance unit"
        className="inline-flex overflow-hidden rounded-md border border-slate-200"
      >
        <button
          type="button"
          aria-pressed={distanceUnit === "km"}
          onClick={() => setDistanceUnit("km")}
          className={`px-2 py-1 ${
            distanceUnit === "km"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          km
        </button>
        <button
          type="button"
          aria-pressed={distanceUnit === "mi"}
          onClick={() => setDistanceUnit("mi")}
          className={`px-2 py-1 ${
            distanceUnit === "mi"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          mi
        </button>
      </div>
    </div>
  );
}
