"use client";

import type { DemographicScope } from "@/lib/data/seed";

const TONE_BG: Record<string, string> = {
  enji: "bg-enji-500",
  aizome: "bg-aizome-500",
  matcha: "bg-matcha-500",
  kintsugi: "bg-kintsugi-500",
  sakura: "bg-sakura-300",
  ume: "bg-enji-700",
  sumi: "bg-sumi-700",
  washi: "bg-washi-300",
};
const TONE_TEXT: Record<string, string> = {
  enji: "text-enji-700",
  aizome: "text-aizome-700",
  matcha: "text-matcha-700",
  kintsugi: "text-kintsugi-500",
  sakura: "text-sakura-400",
  ume: "text-enji-700",
  sumi: "text-sumi-700",
  washi: "text-sumi-700",
};

/**
 * Population-at-a-glance card. Renders for either country or city scope:
 * a top stat strip (total / density / urban / median age / land area) and
 * stacked horizontal bar charts for age groups, religion, and largest
 * metros where data exists.
 */
export function PopulationBreakdown({ scope }: { scope: DemographicScope }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm">
      <header className="flex items-baseline justify-between gap-3 border-b border-washi-200 bg-washi-50 px-5 py-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sumi-700">
            Population
          </div>
          <div className="mt-1 text-xl font-semibold text-sumi-900">
            {scope.name}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold tabular-nums text-sumi-900">
            {scope.total_population_label}
          </div>
        </div>
      </header>

      <div className="grid gap-x-6 gap-y-3 border-b border-washi-200 px-5 py-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Median age" value={`${scope.median_age.toFixed(1)} yrs`} />
        <Stat
          label="Density"
          value={`${scope.density_per_km2.toLocaleString()} / km²`}
        />
        <Stat label="Urban" value={`${scope.urban_percent}%`} />
        <Stat
          label="Land area"
          value={`${scope.land_area_km2.toLocaleString()} km²`}
        />
      </div>

      <div className="space-y-5 px-5 py-5">
        <Bars title="Age groups" slices={scope.age_groups} />
        {scope.religion_breakdown && (
          <Bars title="Religion" slices={scope.religion_breakdown} />
        )}
        {scope.metros && scope.metros.length > 0 && (
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sumi-700">
              Largest metros
            </div>
            <ul className="mt-2 grid gap-1 text-sm text-sumi-900 sm:grid-cols-2">
              {scope.metros.map((m) => (
                <li key={m.name} className="flex items-baseline justify-between">
                  <span>{m.name}</span>
                  <span className="font-semibold tabular-nums text-sumi-700">
                    {m.population_m.toFixed(1)} M
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sumi-700">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-semibold tabular-nums text-sumi-900">
        {value}
      </div>
    </div>
  );
}

function Bars({
  title,
  slices,
}: {
  title: string;
  slices: { label: string; value: number; tone: string }[];
}) {
  const total = slices.reduce((s, x) => s + x.value, 0);
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sumi-700">
        {title}
      </div>
      {/* Single stacked bar */}
      <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-washi-200">
        {slices.map((s) => (
          <div
            key={s.label}
            className={`${TONE_BG[s.tone] ?? "bg-sumi-700"}`}
            style={{ width: `${(s.value / total) * 100}%` }}
            aria-label={`${s.label}: ${s.value}%`}
          />
        ))}
      </div>
      {/* Legend */}
      <ul className="mt-2 grid gap-x-4 gap-y-1 text-xs text-sumi-800 sm:grid-cols-2">
        {slices.map((s) => (
          <li
            key={s.label}
            className="flex items-baseline justify-between gap-3"
          >
            <span className="flex items-baseline gap-2">
              <span
                aria-hidden
                className={`inline-block h-2.5 w-2.5 rounded-sm ${TONE_BG[s.tone] ?? "bg-sumi-700"}`}
              />
              {s.label}
            </span>
            <span
              className={`tabular-nums ${TONE_TEXT[s.tone] ?? "text-sumi-700"}`}
            >
              {s.value.toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
