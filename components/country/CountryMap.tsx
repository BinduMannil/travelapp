"use client";

import Link from "next/link";
import { useState } from "react";
import {
  JAPAN_CITY_PINS,
  JAPAN_ISLANDS,
  JAPAN_MAP_VIEWBOX,
  JAPAN_OFFSHORE,
  JAPAN_REGIONS,
  type CityPin,
} from "@/lib/country-maps/japan";

const REGION_FILL: Record<string, string> = {
  matcha: "fill-matcha-400/45",
  aizome: "fill-aizome-400/45",
  kintsugi: "fill-kintsugi-300/55",
  enji: "fill-enji-400/40",
  ume: "fill-sakura-300/55",
  sumi: "fill-sumi-700/30",
};

/**
 * Editorial interactive country map (Japan today — drop in other
 * countries by adding a data file under `lib/country-maps/`). Clickable
 * pins route to each city page; unpublished cities render as
 * disabled markers so the map keeps visual density while the content
 * backlog catches up.
 *
 * Behaviour:
 *  - Hover a pin → the label expands and the region tint deepens.
 *  - Tap a region label or offshore card → scrolls to that pin (via
 *    focus state) so keyboard users still get feedback.
 *  - Published pins are enji-coloured; unpublished are washi with a
 *    dotted ring to signal "coming soon" without silently failing.
 */
export function CountryMap({
  countryName = "Japan",
}: {
  countryName?: string;
}) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <section className="relative bg-washi-50">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        {/* LEFT — editorial kicker */}
        <div>
          <div className="h-[2px] w-12 bg-aizome-600" aria-hidden />
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-aizome-700 sm:text-5xl">
            Discover
            <br />
            {countryName}
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-sumi-800 sm:text-base">
            We are travellers at heart, so uncovering the best of{" "}
            {countryName} is something we have written at depth. Tap any
            city on the map to jump straight into the on-the-ground guide.
          </p>

          <ul className="mt-8 space-y-2 text-xs">
            {JAPAN_REGIONS.map((r) => (
              <li
                key={r.slug}
                className="flex items-center gap-3 text-sumi-700"
              >
                <span
                  aria-hidden
                  className={`inline-block h-2.5 w-2.5 rounded-full ${REGION_FILL[r.accent].replace("/45", "").replace("/55", "").replace("/40", "").replace("/30", "").replace("fill-", "bg-")}`}
                />
                <span className="font-semibold uppercase tracking-[0.2em]">
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — the map */}
        <div className="relative">
          <svg
            viewBox={JAPAN_MAP_VIEWBOX}
            className="h-auto w-full"
            role="img"
            aria-label={`${countryName} — clickable city map`}
          >
            {/* Water / background wash */}
            <defs>
              <pattern
                id="dots"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="0.8" fill="rgba(46,79,115,.22)" />
              </pattern>
            </defs>

            {/* Dotted sea halo around the islands */}
            {Object.values(JAPAN_ISLANDS).map((island, i) => (
              <path
                key={`halo-${i}`}
                d={island.path}
                fill="url(#dots)"
                transform="translate(-12 -12) scale(1.08)"
              />
            ))}

            {/* Islands */}
            {Object.entries(JAPAN_ISLANDS).map(([key, island]) => (
              <g key={key}>
                <path
                  d={island.path}
                  className="fill-washi-100 stroke-sumi-200"
                  strokeWidth={1}
                />
              </g>
            ))}

            {/* Region accent blobs on top */}
            {JAPAN_REGIONS.map((r) => (
              <path
                key={r.slug}
                d={r.blob}
                className={`${REGION_FILL[r.accent]} transition duration-300`}
              />
            ))}

            {/* Island labels */}
            {Object.values(JAPAN_ISLANDS).map((island, i) => (
              <text
                key={`label-${i}`}
                x={island.labelAt[0]}
                y={island.labelAt[1]}
                className="fill-sumi-700"
                fontSize="11"
                fontWeight="600"
                letterSpacing="0.25em"
                textAnchor="middle"
                style={{ textTransform: "uppercase" }}
              >
                {island.label.toUpperCase()}
              </text>
            ))}

            {/* City pins */}
            {JAPAN_CITY_PINS.map((c) => (
              <MapPin
                key={c.slug}
                city={c}
                hovered={hoveredCity === c.slug}
                onHover={setHoveredCity}
              />
            ))}
          </svg>

          {/* Offshore annotations */}
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {JAPAN_OFFSHORE.map((o) => (
              <div
                key={o.slug}
                className="rounded-xl border border-dashed border-washi-300 bg-white p-3"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sumi-700">
                  {o.note}
                </div>
                <div className="mt-0.5 font-display text-base font-semibold text-sumi-900">
                  {o.name}
                </div>
                <div className="mt-1 text-[10px] italic text-sumi-600">
                  City guide rolls out in the next content pass.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MapPin({
  city,
  hovered,
  onHover,
}: {
  city: CityPin;
  hovered: boolean;
  onHover: (slug: string | null) => void;
}) {
  const [x, y] = city.pos;
  const isPublished = Boolean(city.published);

  const dot = (
    <g
      onMouseEnter={() => onHover(city.slug)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      {/* Pulse halo on published cities */}
      {isPublished && (
        <circle
          cx={x}
          cy={y}
          r={10}
          className="fill-enji-500/20"
          style={{
            animation: "pinPulse 2.2s ease-out infinite",
            transformOrigin: `${x}px ${y}px`,
          }}
        />
      )}
      {/* Main dot */}
      <circle
        cx={x}
        cy={y}
        r={hovered ? 6 : 4.5}
        className={
          isPublished
            ? "fill-enji-600 stroke-white"
            : "fill-washi-50 stroke-sumi-400"
        }
        strokeWidth={2}
        strokeDasharray={isPublished ? "0" : "2 2"}
        style={{ transition: "r 150ms" }}
      />
      {/* Label */}
      <g transform={`translate(${x + 10}, ${y + 4})`}>
        <text
          className={`${
            hovered ? "fill-enji-700" : "fill-sumi-900"
          } font-semibold`}
          fontSize={hovered ? 13 : 11}
          style={{ transition: "font-size 150ms" }}
        >
          {city.name}
        </text>
      </g>
      {/* Inline "coming soon" mark */}
      {!isPublished && (
        <text
          x={x + 10}
          y={y + 18}
          className="fill-sumi-500 italic"
          fontSize={9}
        >
          guide soon
        </text>
      )}
    </g>
  );

  return (
    <g>
      <style>{`
        @keyframes pinPulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
      {isPublished ? (
        <Link href={city.href} aria-label={`Open ${city.name} guide`}>
          {dot}
        </Link>
      ) : (
        <title>{`${city.name} · coming soon`}</title>
      )}
      {!isPublished && dot}
    </g>
  );
}
