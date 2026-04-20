"use client";

import { useState } from "react";
import type { Beverage } from "@/lib/data/seed";
import { ImageCarousel } from "@/components/common/ImageCarousel";

const PALETTE_GRADIENT: Record<string, string> = {
  enji: "from-enji-500 via-enji-700 to-sumi-900",
  aizome: "from-aizome-500 via-aizome-700 to-sumi-900",
  sakura: "from-sakura-300 via-sakura-400 to-enji-700",
  matcha: "from-matcha-500 via-matcha-700 to-sumi-900",
  kintsugi: "from-kintsugi-300 via-kintsugi-500 to-enji-700",
  sumi: "from-sumi-700 via-sumi-900 to-black",
  ume: "from-sakura-400 via-enji-600 to-enji-900",
};

export function BeverageCard({ drink }: { drink: Beverage }) {
  const [expanded, setExpanded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);
  const gradient =
    PALETTE_GRADIENT[drink.palette ?? "enji"] ?? PALETTE_GRADIENT.enji;
  const images = (drink.hero_image_urls ?? []).length > 0
    ? drink.hero_image_urls!
    : drink.hero_image_url
      ? [drink.hero_image_url]
      : [];
  const stars = Math.max(1, Math.min(5, parseInt(drink.popularity, 10) || 3));

  return (
    <article className="group overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-300 hover:shadow-lg">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-stretch gap-0 text-left"
      >
        <div
          className={`relative w-28 shrink-0 overflow-hidden bg-gradient-to-br sm:w-36 ${gradient}`}
        >
          {images.length > 0 && !allFailed ? (
            <ImageCarousel
              images={images}
              alt={drink.name}
              className="absolute inset-0 h-full w-full"
              onAllFailed={() => setAllFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold text-white/90 drop-shadow">
              {drink.kanji}
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 font-display text-xs text-white backdrop-blur-sm">
            {drink.kanji}
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-sumi-900">
                {drink.name}{" "}
                <span className="font-display text-sumi-700">
                  {drink.native_script}
                </span>
              </h3>
              <div className="text-[11px] uppercase tracking-[0.2em] text-sumi-700">
                <em>{drink.romaji}</em>
                {drink.abv && <span> · {drink.abv} ABV</span>}
              </div>
            </div>
            <div
              aria-label={`Popularity ${stars} of 5`}
              className="text-xs tabular-nums tracking-tight text-kintsugi-500"
            >
              {"★".repeat(stars)}
              <span className="text-washi-300">{"★".repeat(5 - stars)}</span>
            </div>
          </div>

          <p className="mt-2 line-clamp-2 text-sumi-800">{drink.made_of}</p>

          <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-enji-600">
            {expanded ? "Tap to collapse ▴" : "Tap for how + where to try ▾"}
          </div>
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-washi-200 px-4 py-4 sm:px-5">
            <Row label="How to try it">{drink.how_to_try}</Row>
            <Row label="Where">{drink.where_to_try}</Row>
          </div>
        </div>
      </div>
    </article>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-2 first:mt-0">
      <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-700">
        {label}
      </span>
      <span className="text-sumi-900">{children}</span>
    </div>
  );
}
