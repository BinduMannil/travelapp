"use client";

import { useState } from "react";
import type { InterCityRoute } from "@/lib/data/seed";
import { NearbyRouteCard } from "./NearbyRouteCard";

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
 * Grid of NearbyRouteCards with a section-wide background layer that
 * crossfades to the hovered city's hero photo. Hovering a card lifts
 * the bleed behind every sibling, not just the card itself, so the
 * surrounding washi background borrows the destination's colour too.
 */
export function NearbyDestinationsGrid({
  routes,
  heading,
}: {
  routes: InterCityRoute[];
  heading: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRoute = routes.find((r) => r.dest_slug === hovered);
  const hoveredGradient = hoveredRoute
    ? PALETTE_GRADIENT[hoveredRoute.palette ?? "sumi"] ?? PALETTE_GRADIENT.sumi
    : null;
  const hoveredImage = hoveredRoute?.hero_image_urls?.[0];

  return (
    <section className="relative mt-6 overflow-hidden rounded-3xl">
      {/* Background wash — fades in the hovered city's photo + gradient. */}
      <div className="absolute inset-0 -z-10 bg-washi-50" aria-hidden />
      {hoveredGradient && (
        <div
          key={`g-${hovered}`}
          className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-700 ${hoveredGradient}`}
          style={{ opacity: 0.18 }}
          aria-hidden
        />
      )}
      {hoveredImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={`img-${hovered}`}
          src={hoveredImage}
          alt=""
          aria-hidden
          loading="lazy"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full animate-[bgFade_700ms_ease-out_both] object-cover opacity-15"
        />
      )}
      <style>{`
        @keyframes bgFade {
          from { opacity: 0; }
          to   { opacity: 0.15; }
        }
      `}</style>

      <h2 className="px-6 pt-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
        {heading}
      </h2>
      <div className="grid grid-cols-1 items-stretch gap-4 p-5 lg:grid-cols-2">
        {routes.map((r) => (
          <div
            key={r.dest_slug}
            onMouseEnter={() => setHovered(r.dest_slug)}
            onMouseLeave={() =>
              setHovered((cur) => (cur === r.dest_slug ? null : cur))
            }
            onFocus={() => setHovered(r.dest_slug)}
            onBlur={() =>
              setHovered((cur) => (cur === r.dest_slug ? null : cur))
            }
            className="flex"
          >
            <NearbyRouteCard route={r} />
          </div>
        ))}
      </div>
    </section>
  );
}
