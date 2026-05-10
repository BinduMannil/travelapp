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
    <article className="group overflow-hidden rounded-[1.25rem] border border-white/14 bg-white/[0.06] shadow-editorial-deep backdrop-blur-xl transition hover:-translate-y-1 hover:border-kintsugi-300/60 hover:bg-white/[0.1]">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="grid w-full text-left sm:grid-cols-[14rem_1fr]"
      >
        <div
          className={`relative min-h-64 overflow-hidden bg-gradient-to-br sm:min-h-full ${gradient}`}
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
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.2)_40%,rgba(0,0,0,.84))]" />
          <div className="absolute bottom-4 right-5 font-display text-7xl font-semibold leading-none text-white/26">
            {drink.kanji}
          </div>
          <div className="absolute left-4 top-4 rounded-full border border-white/18 bg-black/55 px-3 py-1 font-display text-sm text-white backdrop-blur-sm">
            {drink.kanji}
          </div>
        </div>

        <div className="flex min-h-64 flex-col justify-between p-5 sm:p-7">
          <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="font-display text-[clamp(1.65rem,4vw,2.55rem)] font-semibold leading-tight text-white">
                {drink.name}{" "}
                <span className="font-display text-white/50">
                  {drink.native_script}
                </span>
              </h3>
              <div className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-kintsugi-300/80">
                <em>{drink.romaji}</em>
                {drink.abv && <span> · {drink.abv} ABV</span>}
              </div>
            </div>
            <div
              aria-label={`Popularity ${stars} of 5`}
              className="text-xs tabular-nums tracking-tight text-kintsugi-300"
            >
              {"★".repeat(stars)}
              <span className="text-white/20">{"★".repeat(5 - stars)}</span>
            </div>
          </div>

          <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/70">{drink.made_of}</p>
          </div>

          <div className="mt-8 text-[0.64rem] font-bold uppercase tracking-[0.26em] text-kintsugi-300">
            {expanded ? "Collapse" : "How + where to try"} →
          </div>
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-white/12 px-5 py-5 sm:px-7">
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
      <span className="mr-2 text-[0.64rem] font-bold uppercase tracking-[0.24em] text-kintsugi-300">
        {label}
      </span>
      <span className="text-sm leading-7 text-white/76">{children}</span>
    </div>
  );
}
