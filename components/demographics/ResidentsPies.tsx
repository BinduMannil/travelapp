"use client";

import { PieChart, type PieSlice } from "@/components/common/PieChart";
import type { ResidentScope } from "@/lib/data/seed";

// A tuned 10-step palette drawn from the Japan tokens so the pies feel
// of a piece with the rest of the app instead of a generic rainbow.
const PALETTE = [
  "#7c0a18", // enji-700
  "#1f3a5f", // aizome-600
  "#6e8a49", // matcha-600
  "#d5a400", // kintsugi-500
  "#f3acb8", // sakura-300
  "#4b6789", // aizome-400
  "#9fba74", // matcha-400
  "#eaba59", // kintsugi-400
  "#b90c23", // enji-500
  "#3c3a36", // sumi-700
  "#c7c2ba", // sumi-200 (other)
];

function tint(slices: { label: string; value: number }[]): PieSlice[] {
  return slices.map((s, i) => ({
    label: s.label,
    value: s.value,
    color:
      s.label === "Other"
        ? PALETTE[PALETTE.length - 1]
        : PALETTE[i % (PALETTE.length - 1)],
  }));
}

export function ResidentsPies({
  country,
  city,
  source,
}: {
  country: ResidentScope;
  city: ResidentScope;
  source: string;
}) {
  return (
    <section className="scene-glass mt-12 rounded-[1.45rem] p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="luxury-kicker text-kintsugi-300">
            Foreign residents
          </div>
          <h2 className="mt-3 font-sans text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-tight text-white">
            Who lives here — by country of origin
          </h2>
        </div>
        <div className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-white/46">
          Source: MOJ · Tokyo bureau
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <ScopeHeader scope={country} />
          <div className="mt-5 rounded-[1.15rem] bg-white/[0.04] p-4 [&_.bg-washi-100]:bg-white/10 [&_.text-sumi-700]:text-white/48 [&_.text-sumi-900]:text-white">
            <PieChart
              slices={tint(country.slices)}
              donut
              size={200}
              label={country.name}
              center={`${country.percent_of_population.toFixed(1)}%`}
            />
          </div>
          <div className="mt-3 text-xs leading-6 text-white/62">
            {country.total_label} ·{" "}
            {country.percent_of_population.toFixed(1)}% of the resident
            population
          </div>
        </div>

        <div>
          <ScopeHeader scope={city} />
          <div className="mt-5 rounded-[1.15rem] bg-white/[0.04] p-4 [&_.bg-washi-100]:bg-white/10 [&_.text-sumi-700]:text-white/48 [&_.text-sumi-900]:text-white">
            <PieChart
              slices={tint(city.slices)}
              donut
              size={200}
              label={city.name}
              center={`${city.percent_of_population.toFixed(1)}%`}
            />
          </div>
          <div className="mt-3 text-xs leading-6 text-white/62">
            {city.total_label} ·{" "}
            {city.percent_of_population.toFixed(1)}% of the city population
          </div>
        </div>
      </div>

      <p className="mt-6 border-t border-white/12 pt-4 text-xs leading-6 text-white/50">
        {source}
      </p>
    </section>
  );
}

function ScopeHeader({ scope }: { scope: ResidentScope }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-white/12 pb-3">
      <div className="font-sans text-xl font-semibold text-white">
        {scope.name}
      </div>
      <div className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-kintsugi-300/70">
        Top {scope.slices.length - 1} + other
      </div>
    </div>
  );
}
