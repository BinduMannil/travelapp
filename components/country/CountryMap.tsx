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
  matcha: "fill-matcha-500/34",
  aizome: "fill-aizome-500/34",
  kintsugi: "fill-kintsugi-400/42",
  enji: "fill-enji-500/30",
  ume: "fill-sakura-400/38",
  sumi: "fill-sumi-700/24",
};

const JAPAN_STATS = [
  { label: "Population", value: "124M" },
  { label: "Area", value: "377,975 km²" },
  { label: "Islands", value: "14,000+" },
  { label: "Currency", value: "JPY" },
  { label: "Time zone", value: "UTC+9" },
  { label: "Major cities", value: `${JAPAN_CITY_PINS.length + JAPAN_OFFSHORE.length}` },
];

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
 *  - Published pins are enji-coloured; planned guides are washi with a
 *    dotted ring, but still link to their city landing page.
 */
export function CountryMap({
  countryName = "Japan",
}: {
  countryName?: string;
}) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <section className="relative isolate overflow-hidden bg-[#0b0907] px-4 py-20 text-washi-50 sm:px-6 sm:py-28">
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_12%,rgba(216,173,79,.18),transparent_32%),radial-gradient(circle_at_86%_48%,rgba(46,79,115,.24),transparent_34%),linear-gradient(180deg,rgba(11,9,7,.96),rgba(22,17,13,.9))]"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.88fr_1.32fr] lg:items-center xl:gap-16">
        {/* LEFT — editorial kicker */}
        <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.055] p-6 shadow-editorial-deep backdrop-blur-xl sm:p-8 lg:p-9">
          <div className="h-px w-16 bg-gradient-to-r from-kintsugi-300 to-transparent" aria-hidden />
          <p className="luxury-kicker mt-6 text-kintsugi-300">Japan atlas</p>
          <h2 className="mt-4 max-w-[10ch] font-sans text-[clamp(2.75rem,5.4vw,5.6rem)] font-semibold leading-[0.95] tracking-tight text-white">
            Discover {countryName}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-washi-50/72 sm:text-base sm:leading-8">
            We are travellers at heart, so uncovering the best of{" "}
            {countryName} is something we have written at depth. Tap any
            city on the map to jump straight into the on-the-ground guide.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {JAPAN_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-black/22 px-4 py-4"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-washi-50/48">
                  {stat.label}
                </div>
                <div className="mt-1 font-sans text-xl font-semibold text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 text-xs">
            {JAPAN_REGIONS.map((r) => (
              <li
                key={r.slug}
                className="flex min-h-10 items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 text-washi-50/74"
              >
                <span
                  aria-hidden
                  className={`inline-block h-2.5 w-2.5 rounded-full ${REGION_FILL[r.accent].replace("/45", "").replace("/55", "").replace("/40", "").replace("/30", "").replace("fill-", "bg-")}`}
                />
                <span className="font-semibold uppercase tracking-[0.12em]">
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — the map */}
        <div className="relative overflow-hidden rounded-[2rem] border border-kintsugi-300/22 bg-[#efe5d1] p-4 shadow-[0_36px_100px_rgba(0,0,0,.42)] sm:p-6 lg:p-8">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,.62),transparent_24%),radial-gradient(circle_at_72%_62%,rgba(216,173,79,.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,.5),rgba(197,174,130,.2))]"
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(75,54,33,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(75,54,33,.14)_1px,transparent_1px)] [background-size:28px_28px]"
            aria-hidden
          />
          <svg
            viewBox={JAPAN_MAP_VIEWBOX}
            className="relative h-auto w-full drop-shadow-[0_24px_38px_rgba(41,30,18,.22)]"
            role="img"
            aria-label={`${countryName} — clickable city map`}
          >
            {/* Water / background wash */}
            <defs>
              <filter id="islandShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="7" floodColor="rgba(43,31,18,.24)" />
              </filter>
              <pattern
                id="dots"
                width="9"
                height="9"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1.5" cy="1.5" r="0.85" fill="rgba(46,79,115,.2)" />
              </pattern>
            </defs>

            {/* Dotted sea halo around the islands */}
            {Object.values(JAPAN_ISLANDS).map((island, i) => (
              <path
                key={`halo-${i}`}
                d={island.path}
                fill="url(#dots)"
                opacity="0.72"
                transform="translate(-15 -15) scale(1.1)"
              />
            ))}

            {/* Islands */}
            {Object.entries(JAPAN_ISLANDS).map(([key, island]) => (
              <g key={key}>
                <path
                  d={island.path}
                  className="fill-[#fff7e7] stroke-[#7b684a]"
                  filter="url(#islandShadow)"
                  strokeWidth={1.35}
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
                className="fill-[#594832]"
                fontSize="11"
                fontWeight="700"
                letterSpacing="0.28em"
                textAnchor="middle"
                style={{ textTransform: "uppercase", paintOrder: "stroke", stroke: "rgba(255,247,231,.78)", strokeWidth: 3 }}
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
          <div className="relative mt-6 grid gap-3 border-t border-[#7b684a]/18 pt-5 sm:grid-cols-2">
            {JAPAN_OFFSHORE.map((o) => (
              <Link
                key={o.slug}
                href={o.href}
                className="rounded-2xl border border-[#7b684a]/18 bg-white/58 p-4 text-[#2f271d] shadow-[0_14px_34px_rgba(63,46,28,.1)] backdrop-blur transition hover:-translate-y-0.5 hover:border-enji-500/45 hover:bg-white/78"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#7a5a25]">
                  {o.note}
                </div>
                <div className="mt-1 font-sans text-lg font-semibold text-[#1c1711]">
                  {o.name}
                </div>
                <div className="mt-2 text-xs leading-5 text-[#5e5140]">
                  City guide rolls out in the next content pass.
                </div>
              </Link>
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
          r={11}
          className="fill-kintsugi-400/24"
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
        r={hovered ? 6.5 : 5}
        className={
          isPublished
            ? "fill-enji-700 stroke-[#fff8e8]"
            : "fill-[#fff8e8] stroke-[#7b684a]"
        }
        strokeWidth={2}
        strokeDasharray={isPublished ? "0" : "2 2"}
        style={{
          transition: "r 150ms",
          filter: "drop-shadow(0 5px 6px rgba(41,30,18,.24))",
        }}
      />
      {/* Label */}
      <g transform={`translate(${x + 10}, ${y + 4})`}>
        <text
          className={`${
            hovered ? "fill-enji-800" : "fill-[#2d2419]"
          } font-semibold`}
          fontSize={hovered ? 13 : 11}
          style={{
            transition: "font-size 150ms",
            paintOrder: "stroke",
            stroke: "rgba(255,248,232,.86)",
            strokeWidth: 4,
          }}
        >
          {city.name}
        </text>
      </g>
      {/* Inline "coming soon" mark */}
      {!isPublished && (
        <text
          x={x + 10}
          y={y + 18}
          className="fill-[#7a6a52] italic"
          fontSize={9}
          style={{
            paintOrder: "stroke",
            stroke: "rgba(255,248,232,.72)",
            strokeWidth: 3,
          }}
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
      <Link href={city.href} aria-label={`Open ${city.name} guide`}>
        {dot}
      </Link>
      {!isPublished ? <title>{`${city.name} · guide planned`}</title> : null}
    </g>
  );
}
