"use client";

import { useEffect, useRef, useState } from "react";
import {
  DISTANCE_UNITS,
  TEMPERATURE_UNITS,
  TRAVEL_CURRENCIES,
  type TravelCurrency,
  useTravelPreferences,
} from "@/lib/preferences/context";

export function ProfileTravelPreferencesDropdown({
  className = "",
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={menuRef} className={`relative z-[70] ${className}`}>
      <button
        type="button"
        aria-label="Open travel preferences"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="rounded-full border border-[#d8aa4f]/40 bg-[#07100f]/86 px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#f3d9a2] shadow-[0_10px_34px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.08)] outline-none backdrop-blur-xl transition hover:border-[#d8aa4f]/70 hover:bg-[#0b1715]/92 focus:ring-2 focus:ring-[#d8aa4f]/55"
      >
        Preferences
      </button>

      {open ? (
        <div className="absolute right-0 top-full mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-white/12 bg-[#061011]/92 p-4 text-white shadow-[0_26px_80px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-2xl">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-[#f3b544]">
                Travel Preferences
              </p>
              <p className="mt-1 text-xs leading-5 text-white/58">
                Currency and units apply across Journee.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close travel preferences"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/10 px-2 py-1 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-white/60 transition hover:border-white/24 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="space-y-4">
            <CurrencyPreference />
            <TemperaturePreference />
            <DistancePreference />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function TravelPreferencesControls({
  variant = "dropdown",
}: {
  variant?: "dropdown" | "settings";
}) {
  return (
    <div className={variant === "settings" ? "grid gap-4" : "space-y-4"}>
      <CurrencyPreference variant={variant} />
      <TemperaturePreference variant={variant} />
      <DistancePreference variant={variant} />
    </div>
  );
}

function CurrencyPreference({ variant = "dropdown" }: { variant?: "dropdown" | "settings" }) {
  const { selectedCurrency, setSelectedCurrency } = useTravelPreferences();

  return (
    <label className={variant === "settings" ? "block w-full lg:w-[292px]" : "block"}>
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-white/58">
        Currency
      </span>
      <select
        value={selectedCurrency}
        onChange={(event) => setSelectedCurrency(event.target.value as TravelCurrency)}
        className="h-10 w-full appearance-none rounded-md border border-white/12 bg-[#03090a] px-3 text-sm font-semibold text-white outline-none transition hover:border-[#d8aa4f]/55 focus:border-[#d8aa4f] focus:ring-2 focus:ring-[#d8aa4f]/30"
        aria-label="Currency"
      >
        {TRAVEL_CURRENCIES.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </label>
  );
}

function TemperaturePreference({ variant = "dropdown" }: { variant?: "dropdown" | "settings" }) {
  const { tempUnit, setTempUnit } = useTravelPreferences();

  return (
    <PreferenceGroup label="Temperature" variant={variant}>
      {TEMPERATURE_UNITS.map((unit) => (
        <SegmentButton
          key={unit.value}
          active={tempUnit === unit.value}
          onClick={() => setTempUnit(unit.value)}
        >
          {unit.label}
        </SegmentButton>
      ))}
    </PreferenceGroup>
  );
}

function DistancePreference({ variant = "dropdown" }: { variant?: "dropdown" | "settings" }) {
  const { distanceUnit, setDistanceUnit } = useTravelPreferences();

  return (
    <PreferenceGroup label="Distance" variant={variant}>
      {DISTANCE_UNITS.map((unit) => (
        <SegmentButton
          key={unit.value}
          active={distanceUnit === unit.value}
          onClick={() => setDistanceUnit(unit.value)}
        >
          {unit.label}
        </SegmentButton>
      ))}
    </PreferenceGroup>
  );
}

function PreferenceGroup({
  label,
  variant,
  children,
}: {
  label: string;
  variant: "dropdown" | "settings";
  children: React.ReactNode;
}) {
  return (
    <div className={variant === "settings" ? "w-full lg:w-[292px]" : ""}>
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-white/58">
        {label}
      </span>
      <div className="grid grid-cols-2 gap-2">{children}</div>
    </div>
  );
}

function SegmentButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-10 rounded-md border px-2 text-xs font-bold transition sm:text-sm ${
        active
          ? "border-[#d8aa4f] bg-[#d8aa4f]/18 text-[#f3b544]"
          : "border-white/10 bg-white/[0.045] text-white/74 hover:border-white/20 hover:text-white"
      }`}
    >
      <span className="block truncate">{children}</span>
    </button>
  );
}
