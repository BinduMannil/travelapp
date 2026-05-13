"use client";

import {
  DISTANCE_UNITS,
  TEMPERATURE_UNITS,
  TRAVEL_CURRENCIES,
  usePreferences,
} from "@/lib/preferences/context";
import { useI18n } from "@/lib/i18n/context";

function controlClass(active: boolean, compact: boolean) {
  return `${
    compact ? "min-w-11 px-3.5 py-2 text-xs" : "min-w-28 px-5 py-3 text-sm"
  } rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-kintsugi-300 ${
    active
      ? "bg-kintsugi-300 text-sumi-950 shadow-[0_10px_26px_rgba(216,170,79,.2)]"
      : "text-white/78 hover:bg-white/12 hover:text-white"
  }`;
}

export function PreferencesMenu({
  compact = false,
  stacked = false,
}: {
  compact?: boolean;
  stacked?: boolean;
}) {
  const {
    currency,
    setCurrency,
    tempUnit,
    setTempUnit,
    distanceUnit,
    setDistanceUnit,
  } = usePreferences();
  const { t } = useI18n();

  return (
    <div
      className={`text-sm ${
        stacked
          ? "grid gap-6"
          : "flex flex-wrap items-center gap-4 sm:gap-5"
      }`}
    >
      <label
        className={`${
          stacked ? "grid gap-3" : "inline-flex items-center gap-3.5"
        } min-w-0`}
      >
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/58">
          {t("settings.currency")}
        </span>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className={`rounded-full border border-white/18 bg-white/[0.08] font-semibold text-white tabular-nums shadow-inner shadow-black/20 outline-none backdrop-blur transition hover:border-kintsugi-300/60 focus:border-kintsugi-300 focus:ring-2 focus:ring-kintsugi-300/45 ${
            compact ? "min-w-[5.75rem] px-3.5 py-2.5 text-xs" : "min-w-[7.75rem] px-5 py-3.5"
          }`}
          aria-label="Currency"
        >
          {TRAVEL_CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <div
        role="radiogroup"
        aria-label="Temperature unit"
        className={`inline-flex gap-1.5 overflow-hidden rounded-full border border-white/18 bg-white/[0.075] p-2 ${
          stacked ? "w-fit" : ""
        }`}
      >
        {TEMPERATURE_UNITS.map((unit) => (
          <button
            key={unit.value}
            type="button"
            aria-pressed={tempUnit === unit.value}
            onClick={() => setTempUnit(unit.value)}
            className={controlClass(tempUnit === unit.value, compact)}
          >
            {compact ? unit.shortLabel : t(`settings.${unit.value === "c" ? "celsius" : "fahrenheit"}`)}
          </button>
        ))}
      </div>

      <div
        role="radiogroup"
        aria-label="Distance unit"
        className={`inline-flex gap-1.5 overflow-hidden rounded-full border border-white/18 bg-white/[0.075] p-2 ${
          stacked ? "w-fit" : ""
        }`}
      >
        {DISTANCE_UNITS.map((unit) => (
          <button
            key={unit.value}
            type="button"
            aria-pressed={distanceUnit === unit.value}
            onClick={() => setDistanceUnit(unit.value)}
            className={controlClass(distanceUnit === unit.value, compact)}
          >
            {compact ? unit.shortLabel : t(`settings.${unit.value === "km" ? "kilometers" : "miles"}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
