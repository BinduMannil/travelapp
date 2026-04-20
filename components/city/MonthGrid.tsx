"use client";

import type { ClimateRow } from "@/lib/data/seed";
import { TempDisplay } from "@/lib/preferences/context";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SEASON_LABEL: Record<ClimateRow["season_label"], string> = {
  peak: "Peak",
  shoulder: "Shoulder",
  off: "Off-season",
};

type TempBand = {
  key: "cold" | "cool" | "mild" | "warm" | "hot";
  label: string;
  /** Upper bound (°C, exclusive) for this band's avg_high_c. */
  upper: number;
  card: string;
  chip: string;
};

// Weather-based colour scale — cold indigo → warm matcha → hot crimson,
// tuned to the Japan palette so it still feels on-brand.
const TEMP_BANDS: TempBand[] = [
  {
    key: "cold",
    label: "Cold",
    upper: 8,
    card: "bg-aizome-50/60 border-aizome-200",
    chip: "bg-aizome-50 text-aizome-700",
  },
  {
    key: "cool",
    label: "Cool",
    upper: 16,
    card: "bg-washi-100 border-washi-300",
    chip: "bg-washi-200 text-sumi-700",
  },
  {
    key: "mild",
    label: "Mild",
    upper: 22,
    card: "bg-matcha-100/60 border-matcha-400/40",
    chip: "bg-matcha-100 text-matcha-700",
  },
  {
    key: "warm",
    label: "Warm",
    upper: 28,
    card: "bg-kintsugi-300/15 border-kintsugi-400/50",
    chip: "bg-kintsugi-300/40 text-enji-700",
  },
  {
    key: "hot",
    label: "Hot",
    upper: Infinity,
    card: "bg-enji-50 border-enji-200",
    chip: "bg-enji-100 text-enji-700",
  },
];

function bandFor(avgHigh: number): TempBand {
  return TEMP_BANDS.find((b) => avgHigh < b.upper) ?? TEMP_BANDS[TEMP_BANDS.length - 1];
}

function rainIntensity(mm: number): "dry" | "normal" | "wet" | "soaking" {
  if (mm < 60) return "dry";
  if (mm < 130) return "normal";
  if (mm < 200) return "wet";
  return "soaking";
}

const RAIN_COPY: Record<ReturnType<typeof rainIntensity>, string> = {
  dry: "Dry",
  normal: "Average rain",
  wet: "Wet",
  soaking: "Soaking",
};

export function MonthGrid({ rows }: { rows: ClimateRow[] }) {
  const byMonth = new Map(rows.map((r) => [r.month, r]));

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
          const row = byMonth.get(m);
          if (!row) return null;
          const band = bandFor(row.avg_high_c);
          const rain = rainIntensity(row.precip_mm);
          return (
            <div
              key={m}
              className={cn(
                "rounded-lg border p-4 text-sumi-900",
                band.card,
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-display text-lg font-semibold">
                  {MONTH_NAMES[m - 1]}
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em]",
                    band.chip,
                  )}
                >
                  {band.label}
                </span>
              </div>

              {/* Temperature bar: a simple thermometer-style sliver coloured
                  by the same band, filled in proportion to avg_high. */}
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-washi-200/70">
                <div
                  className={cn("h-full rounded-full", band.chip)}
                  style={{
                    width: `${Math.max(8, Math.min(100, ((row.avg_high_c + 5) / 40) * 100))}%`,
                  }}
                />
              </div>

              <div className="mt-2 text-sm tabular-nums">
                <TempDisplay celsius={row.avg_high_c} /> /{" "}
                <TempDisplay celsius={row.avg_low_c} />
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-sumi-700">
                <span aria-hidden>☂</span>
                <span className="tabular-nums">{row.precip_mm} mm</span>
                <span className="text-sumi-300">·</span>
                <span>{RAIN_COPY[rain]}</span>
              </div>
              <div className="text-xs text-sumi-700">
                {row.humidity_pct}% RH · Price {row.cost_index.toFixed(2)}×
              </div>

              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-sumi-700">
                {SEASON_LABEL[row.season_label]} season
              </div>
              <p className="mt-2 text-xs leading-relaxed text-sumi-800">
                {row.notes}
              </p>
            </div>
          );
        })}
      </div>

      {/* Temperature legend */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-sumi-700">
        <span className="text-sumi-600">Colour scale</span>
        {TEMP_BANDS.map((b, i) => {
          const prev = i === 0 ? -5 : TEMP_BANDS[i - 1].upper;
          const label =
            b.upper === Infinity
              ? `${prev}°C +`
              : `${prev}–${b.upper}°C`;
          return (
            <span
              key={b.key}
              className={cn(
                "rounded-full px-2 py-0.5 text-[9px] font-semibold",
                b.chip,
              )}
            >
              {b.label} · {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
