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
    <div className="flex flex-wrap items-center gap-4 text-sm sm:gap-5">
      <label className="inline-flex items-center gap-3">
        <span className="font-semibold text-white/78">Currency</span>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="min-w-[5.75rem] rounded-full border border-white/24 bg-white px-4 py-2.5 font-semibold text-sumi-900 tabular-nums shadow-sm focus:outline-none focus:ring-2 focus:ring-kintsugi-300"
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
        className="inline-flex gap-1 overflow-hidden rounded-full border border-white/28 bg-white/10 p-1.5"
      >
        <button
          type="button"
          aria-pressed={tempUnit === "c"}
          onClick={() => setTempUnit("c")}
          className={`min-w-11 rounded-full px-3.5 py-2 font-semibold transition ${
            tempUnit === "c"
              ? "bg-kintsugi-300 text-sumi-900"
              : "text-white hover:bg-white/16"
          }`}
        >
          °C
        </button>
        <button
          type="button"
          aria-pressed={tempUnit === "f"}
          onClick={() => setTempUnit("f")}
          className={`min-w-11 rounded-full px-3.5 py-2 font-semibold transition ${
            tempUnit === "f"
              ? "bg-kintsugi-300 text-sumi-900"
              : "text-white hover:bg-white/16"
          }`}
        >
          °F
        </button>
      </div>

      <div
        role="radiogroup"
        aria-label="Distance unit"
        className="inline-flex gap-1 overflow-hidden rounded-full border border-white/28 bg-white/10 p-1.5"
      >
        <button
          type="button"
          aria-pressed={distanceUnit === "km"}
          onClick={() => setDistanceUnit("km")}
          className={`min-w-11 rounded-full px-3.5 py-2 font-semibold transition ${
            distanceUnit === "km"
              ? "bg-kintsugi-300 text-sumi-900"
              : "text-white hover:bg-white/16"
          }`}
        >
          km
        </button>
        <button
          type="button"
          aria-pressed={distanceUnit === "mi"}
          onClick={() => setDistanceUnit("mi")}
          className={`min-w-11 rounded-full px-3.5 py-2 font-semibold transition ${
            distanceUnit === "mi"
              ? "bg-kintsugi-300 text-sumi-900"
              : "text-white hover:bg-white/16"
          }`}
        >
          mi
        </button>
      </div>
    </div>
  );
}
