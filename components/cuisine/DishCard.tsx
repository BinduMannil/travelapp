"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dish } from "@/lib/data/seed";
import { ImageCarousel } from "@/components/common/ImageCarousel";

const KANJI_BY_SLUG: Record<string, string> = {
  sushi: "鮨",
  ramen: "麺",
  tempura: "天",
  tonkatsu: "豚",
  yakitori: "串",
  okonomiyaki: "好",
  takoyaki: "蛸",
  soba: "蕎",
  udon: "饂",
  kaiseki: "懐",
  wagyu: "牛",
  matcha: "抹",
};

const PALETTE_GRADIENT: Record<string, string> = {
  enji: "from-enji-500 via-enji-700 to-sumi-900",
  aizome: "from-aizome-500 via-aizome-700 to-sumi-900",
  sakura: "from-sakura-300 via-sakura-400 to-enji-700",
  matcha: "from-matcha-500 via-matcha-700 to-sumi-900",
  kintsugi: "from-kintsugi-300 via-kintsugi-500 to-enji-700",
  sumi: "from-sumi-700 via-sumi-900 to-black",
  ume: "from-sakura-400 via-enji-600 to-enji-900",
  ocean: "from-aizome-400 via-aizome-700 to-sumi-900",
  forest: "from-matcha-500 via-matcha-700 to-aizome-900",
};

/**
 * Menu-style dark card with a circular food portrait on top, an optional
 * TOP rank ribbon, and expand-on-tap for the full details. Photo rotates
 * + scales on hover; card lifts; the kanji mark behind the photo drifts.
 */
export function DishCard({
  dish,
  countryName,
  rank,
}: {
  dish: Dish;
  countryName: string;
  /** 1/2/3 for TOP ribbon; undefined for no ribbon. */
  rank?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);
  const kanji = KANJI_BY_SLUG[dish.slug] ?? "食";
  const gradient =
    PALETTE_GRADIENT[dish.palette ?? "enji"] ?? PALETTE_GRADIENT.enji;
  const images = (dish.hero_image_urls ?? []).length > 0
    ? dish.hero_image_urls!
    : dish.hero_image_url
      ? [dish.hero_image_url]
      : [];

  return (
    <article
      id={dish.slug}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-sumi-900 pt-20 text-washi-50 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Faint kanji ghost in the background — drifts on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-4 select-none font-display text-[8rem] font-bold leading-none text-washi-50/[0.04] transition duration-700 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[-6deg] group-hover:text-washi-50/[0.08]"
      >
        {kanji}
      </span>

      {/* Circular photo — protrudes over the top of the card */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-8">
        <div
          className={`relative h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br shadow-2xl ring-4 ring-sumi-900 transition duration-500 group-hover:rotate-[3deg] group-hover:scale-105 ${gradient}`}
        >
          {images.length > 0 && !allFailed ? (
            <ImageCarousel
              images={images}
              alt={dish.name}
              className="absolute inset-0 h-full w-full"
              onAllFailed={() => setAllFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold text-white/90 drop-shadow">
              {kanji}
            </div>
          )}
        </div>
      </div>

      {/* TOP rank ribbon */}
      {rank && rank <= 3 && (
        <div className="absolute left-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-washi-50 text-sumi-900 shadow-lg ring-2 ring-sumi-900">
          <div className="text-center leading-none">
            <div className="text-[8px] font-bold uppercase tracking-[0.15em]">
              Top
            </div>
            <div className="font-display text-lg font-bold">{rank}</div>
          </div>
        </div>
      )}

      {/* Originated + vegan chips (top-right) */}
      <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1 text-[9px] uppercase tracking-[0.15em]">
        {dish.originated_here && (
          <span className="rounded-full bg-kintsugi-500/90 px-2 py-0.5 font-semibold text-sumi-900">
            From {countryName}
          </span>
        )}
        {dish.vegan_version && (
          <span className="rounded-full bg-matcha-400/90 px-2 py-0.5 font-semibold text-sumi-900">
            Vegan possible
          </span>
        )}
      </div>

      {/* Title block */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={`dish-body-${dish.slug}`}
        className="relative z-[1] mt-12 flex flex-1 flex-col px-6 pb-5 text-center"
      >
        <div className="text-[11px] uppercase tracking-[0.3em] text-washi-50/70">
          <em className="not-italic">{dish.romaji}</em>
        </div>
        <h2 className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-washi-50">
          {dish.name}
        </h2>
        {/* Script flourish — Italianno handwritten accent */}
        <div className="mt-0.5 font-script text-2xl italic text-kintsugi-300">
          {dish.native_script}
        </div>

        <p className="mx-auto mt-4 max-w-xs text-[0.8rem] leading-relaxed text-washi-50/80">
          {dish.made_of}
        </p>

        <div className="mt-5 inline-flex items-center justify-center gap-1 self-center rounded-full border border-washi-50/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-washi-50/80 transition group-hover:border-kintsugi-300 group-hover:text-kintsugi-300">
          {expanded ? "Show less" : "Show more"}
          <span
            aria-hidden
            className={`inline-block transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </div>
      </button>

      {/* Expandable body */}
      <div
        id={`dish-body-${dish.slug}`}
        className={`relative z-[1] grid transition-all duration-500 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-washi-50/10 px-6 py-5 text-left">
            <Row label="Origin">{dish.origin}</Row>
            {dish.similar_to.length > 0 && (
              <Row label="Similar to">{dish.similar_to.join(" · ")}</Row>
            )}
            <Row label="How to try it">{dish.must_try_form}</Row>
            {dish.vegan_version && dish.vegan_notes && (
              <Row label="Vegan / vegetarian" accent="matcha">
                {dish.vegan_notes}
              </Row>
            )}

            {dish.where_in_tokyo && dish.where_in_tokyo.length > 0 && (
              <div className="mt-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-kintsugi-300">
                  Try in Tokyo
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {dish.where_in_tokyo.map((r) => (
                    <Link
                      key={r}
                      href={`/city/tokyo/restaurants/${r}`}
                      className="rounded-full bg-washi-50/10 px-2.5 py-1 text-[11px] font-medium text-washi-50 transition hover:bg-kintsugi-500 hover:text-sumi-900"
                    >
                      {r.replace(/-/g, " ")} →
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Row({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent?: "matcha";
}) {
  const labelClass =
    accent === "matcha" ? "text-matcha-400" : "text-kintsugi-300";
  return (
    <div className="mt-3 first:mt-0">
      <div
        className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${labelClass}`}
      >
        {label}
      </div>
      <div className="mt-1 text-sm leading-relaxed text-washi-50/85">
        {children}
      </div>
    </div>
  );
}
