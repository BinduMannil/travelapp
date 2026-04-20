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

const SEASON_STYLES: Record<ClimateRow["season_label"], string> = {
  peak: "bg-rose-50 border-rose-200 text-rose-900",
  shoulder: "bg-amber-50 border-amber-200 text-amber-900",
  off: "bg-emerald-50 border-emerald-200 text-emerald-900",
};

const SEASON_LABEL: Record<ClimateRow["season_label"], string> = {
  peak: "Peak",
  shoulder: "Shoulder",
  off: "Off-season",
};

export function MonthGrid({ rows }: { rows: ClimateRow[] }) {
  const byMonth = new Map(rows.map((r) => [r.month, r]));
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
        const row = byMonth.get(m);
        if (!row) return null;
        return (
          <div
            key={m}
            className={cn(
              "rounded-lg border p-4",
              SEASON_STYLES[row.season_label],
            )}
          >
            <div className="flex items-baseline justify-between">
              <div className="text-lg font-semibold">{MONTH_NAMES[m - 1]}</div>
              <div className="text-xs font-medium uppercase tracking-[0.25em]">
                {SEASON_LABEL[row.season_label]}
              </div>
            </div>
            <div className="mt-2 text-sm">
              <div>
                <TempDisplay celsius={row.avg_high_c} /> /{" "}
                <TempDisplay celsius={row.avg_low_c} />
              </div>
              <div className="text-sumi-700">
                {row.precip_mm} mm · {row.humidity_pct}% RH
              </div>
              <div className="text-sumi-700">
                Price index {row.cost_index.toFixed(2)}×
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-sumi-800">
              {row.notes}
            </p>
          </div>
        );
      })}
    </div>
  );
}
