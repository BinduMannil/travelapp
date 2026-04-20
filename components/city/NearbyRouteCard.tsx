"use client";

import { useState } from "react";
import type { InterCityRoute } from "@/lib/data/seed";
import { PriceDisplay } from "@/lib/preferences/context";

const MODE_LABEL: Record<string, string> = {
  shinkansen: "Shinkansen",
  limited_express: "Limited express",
  jr: "JR train",
  highway_bus: "Highway bus",
  domestic_flight: "Flight",
  rental_car: "Drive",
};

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function NearbyRouteCard({ route }: { route: InterCityRoute }) {
  const [activeMode, setActiveMode] = useState(route.options[0]?.mode);
  const active = route.options.find((o) => o.mode === activeMode);

  return (
    <article className="rounded-lg border border-slate-200 p-5">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-xl font-semibold">{route.dest_name}</h2>
        {route.in_same_country && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs text-emerald-900">
            No extra visa — same country
          </span>
        )}
      </header>

      <div className="mt-3 flex flex-wrap gap-1 text-xs">
        {route.options.map((o) => (
          <button
            key={o.mode + o.name}
            type="button"
            onClick={() => setActiveMode(o.mode)}
            className={`rounded-full border px-3 py-1 ${
              activeMode === o.mode
                ? "border-brand-500 bg-brand-50 text-brand-800"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            {MODE_LABEL[o.mode] ?? o.mode}
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-4 space-y-2 text-sm">
          <div className="font-medium text-slate-900">{active.name}</div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-slate-700">
            <div>
              <span className="text-slate-500">Time: </span>
              <span className="font-medium">
                {formatDuration(active.duration_minutes)}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Typical price: </span>
              <span className="font-medium tabular-nums">
                <PriceDisplay
                  amountMinor={active.price_min_minor}
                  currency={active.currency}
                />
                {active.price_max_minor > active.price_min_minor && (
                  <>
                    {" – "}
                    <PriceDisplay
                      amountMinor={active.price_max_minor}
                      currency={active.currency}
                    />
                  </>
                )}
              </span>
            </div>
          </div>
          {active.notes && (
            <p className="text-slate-600">{active.notes}</p>
          )}
          {active.booking_url && (
            <a
              href={active.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-brand-600 underline"
            >
              Book →
            </a>
          )}
        </div>
      )}
    </article>
  );
}
