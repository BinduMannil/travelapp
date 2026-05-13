"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  JAPAN_AIRPORTS,
  JAPAN_CITY_PINS,
  JAPAN_ISLANDS,
  JAPAN_MAP_VIEWBOX,
  JAPAN_OFFSHORE,
  ORIGIN_CITIES,
  type AirportPin,
  type CityPin,
} from "@/lib/country-maps/japan";

const LS_ORIGIN = "journee:origin-iata";

/**
 * City pins that overlap (e.g. Tokyo + Yokohama or Kyoto + Osaka) get
 * their labels pushed onto staggered sides so they don't stack on top
 * of each other. Left-side labels are right-aligned and render their
 * text to the left of the pin; right-side is the default.
 */
const LABEL_SIDE: Record<string, "left" | "right"> = {
  yokohama: "left",
  osaka: "left",
};

/**
 * Interactive country map with toggle between cities and airports.
 * Labels on overlapping pins are pushed to staggered sides; every
 * unpublished city is a dashed ring (no persistent "guide soon" text)
 * with a native hover tooltip.
 */
export function CountryMap({
  countryName = "Japan",
}: {
  countryName?: string;
}) {
  const [layer, setLayer] = useState<"cities" | "airports">("cities");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedAirport, setSelectedAirport] = useState<string | null>(null);
  const [originIata, setOriginIata] = useState<string>("DXB");

  // Restore the user's previously-picked origin city.
  useEffect(() => {
    const saved = window.localStorage.getItem(LS_ORIGIN);
    if (saved && ORIGIN_CITIES.some((o) => o.iata === saved))
      setOriginIata(saved);
  }, []);

  function pickOrigin(iata: string) {
    setOriginIata(iata);
    window.localStorage.setItem(LS_ORIGIN, iata);
  }

  const airports = useMemo(() => JAPAN_AIRPORTS, []);
  const activeAirport = airports.find((a) => a.iata === selectedAirport);
  const activeOrigin = ORIGIN_CITIES.find((o) => o.iata === originIata);

  return (
    <section className="relative bg-washi-50">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        {/* LEFT — editorial kicker */}
        <div>
          <div className="h-[2px] w-12 bg-aizome-600" aria-hidden />
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-aizome-700 sm:text-5xl">
            Discover
            <br />
            {countryName}
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-sumi-800 sm:text-base">
            We are travellers at heart, so uncovering the best of{" "}
            {countryName} is something we have written at depth. Tap any
            city on the map to jump into the guide, or flip to the
            airports layer to see where you can land.
          </p>

          {/* Layer toggle */}
          <div className="mt-6 inline-flex rounded-full border border-washi-300 bg-white p-0.5 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <button
              type="button"
              onClick={() => setLayer("cities")}
              className={`rounded-full px-3 py-1 transition ${
                layer === "cities"
                  ? "bg-aizome-600 text-white"
                  : "text-sumi-700 hover:text-aizome-700"
              }`}
            >
              Cities
            </button>
            <button
              type="button"
              onClick={() => setLayer("airports")}
              className={`rounded-full px-3 py-1 transition ${
                layer === "airports"
                  ? "bg-aizome-600 text-white"
                  : "text-sumi-700 hover:text-aizome-700"
              }`}
            >
              Airports
            </button>
          </div>

          {/* Legend */}
          <ul className="mt-6 space-y-2 text-xs">
            {layer === "cities" ? (
              <>
                <li className="flex items-center gap-3 text-sumi-700">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-enji-600" />
                  <span>City with a full guide</span>
                </li>
                <li className="flex items-center gap-3 text-sumi-700">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full border border-dashed border-sumi-400"
                    aria-hidden
                  />
                  <span>Guide rolling out soon</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-3 text-sumi-700">
                  <span
                    className="inline-block h-0 w-0"
                    style={{
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderBottom: "8px solid #1f3a5f",
                    }}
                    aria-hidden
                  />
                  <span>International airport</span>
                </li>
                <li className="flex items-center gap-3 text-sumi-700">
                  <span
                    className="inline-block h-0 w-0"
                    style={{
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderBottom: "8px solid #9fba74",
                    }}
                    aria-hidden
                  />
                  <span>Domestic airport</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* RIGHT — the map */}
        <div className="relative">
          <svg
            viewBox={JAPAN_MAP_VIEWBOX}
            className="h-auto w-full"
            role="img"
            aria-label={`${countryName} — clickable ${layer} map`}
          >
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

            {/* Region accent blobs were retired — they made the dense
                Honshū corridor read as crowded. The cities + island
                labels carry the typography load on their own. */}

            {/* Island labels — sentence case so they pair with the city
                labels below instead of fighting them. */}
            {Object.values(JAPAN_ISLANDS).map((island, i) => (
              <text
                key={`label-${i}`}
                x={island.labelAt[0]}
                y={island.labelAt[1]}
                className="fill-sumi-500"
                fontSize="10"
                fontWeight="500"
                letterSpacing="0.05em"
                textAnchor="middle"
              >
                {island.label}
              </text>
            ))}

            {/* Pins — city layer */}
            {layer === "cities" &&
              JAPAN_CITY_PINS.map((c) => (
                <CityMapPin
                  key={c.slug}
                  city={c}
                  hovered={hovered === c.slug}
                  onHover={setHovered}
                />
              ))}

            {/* Pins — airport layer */}
            {layer === "airports" &&
              airports.map((a) => (
                <AirportMapPin
                  key={a.iata}
                  airport={a}
                  hovered={hovered === a.iata || selectedAirport === a.iata}
                  onHover={setHovered}
                  onSelect={(iata) =>
                    setSelectedAirport((cur) => (cur === iata ? null : iata))
                  }
                />
              ))}
          </svg>

          {/* Offshore annotations (cities layer only) */}
          {layer === "cities" && (
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {JAPAN_OFFSHORE.map((o) => (
                <div
                  key={o.slug}
                  className="rounded-xl border border-dashed border-washi-300 bg-white p-3"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sumi-700">
                    {o.note}
                  </div>
                  <div className="mt-0.5 text-base font-semibold text-sumi-900">
                    {o.name}
                  </div>
                  <div className="mt-1 text-[10px] italic text-sumi-600">
                    City guide rolls out in the next content pass.
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Airport-layer footer: origin picker + airport list / panel */}
          {layer === "airports" && (
            <div className="mt-6 space-y-4">
              {/* Origin picker */}
              <label className="flex flex-wrap items-center gap-3 rounded-xl border border-washi-200 bg-white px-3 py-2 text-xs">
                <span className="font-semibold uppercase tracking-[0.2em] text-sumi-700">
                  Flying from
                </span>
                <select
                  value={originIata}
                  onChange={(e) => pickOrigin(e.target.value)}
                  className="flex-1 rounded-md border border-washi-300 bg-white px-2 py-1.5 text-sm"
                >
                  {ORIGIN_CITIES.map((o) => (
                    <option key={o.iata} value={o.iata}>
                      {o.iata} · {o.city}, {o.country}
                    </option>
                  ))}
                </select>
              </label>

              {/* Either airport detail panel or the full list */}
              {activeAirport ? (
                <AirportPanel
                  airport={activeAirport}
                  originIata={originIata}
                  originCity={activeOrigin?.city ?? ""}
                  onClose={() => setSelectedAirport(null)}
                />
              ) : (
                <div className="grid gap-1.5 rounded-2xl border border-washi-200 bg-white p-4 text-xs sm:grid-cols-2">
                  {airports.map((a) => {
                    const directFromOrigin = a.direct_routes?.[originIata];
                    return (
                      <button
                        key={a.iata}
                        type="button"
                        onMouseEnter={() => setHovered(a.iata)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => setSelectedAirport(a.iata)}
                        className={`flex items-baseline justify-between rounded px-2 py-1 text-left transition ${
                          hovered === a.iata
                            ? "bg-washi-100"
                            : "hover:bg-washi-100"
                        }`}
                      >
                        <span className="text-sumi-900">
                          <span className="font-semibold tracking-[0.05em]">
                            {a.iata}
                          </span>{" "}
                          · {a.name}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-[0.18em] ${
                            directFromOrigin
                              ? "text-matcha-700"
                              : a.international
                                ? "text-aizome-600"
                                : "text-sumi-500"
                          }`}
                        >
                          {directFromOrigin
                            ? "Direct ✓"
                            : a.international
                              ? "Intl"
                              : "Domestic"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CityMapPin({
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
  const labelSide = LABEL_SIDE[city.slug] ?? "right";
  const labelX = labelSide === "right" ? x + 9 : x - 9;
  const labelAnchor = labelSide === "right" ? "start" : "end";

  const dot = (
    <g
      onMouseEnter={() => onHover(city.slug)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
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
      <circle
        cx={x}
        cy={y}
        r={hovered ? 6 : 4.2}
        className={
          isPublished
            ? "fill-enji-600 stroke-white"
            : "fill-washi-50 stroke-sumi-400"
        }
        strokeWidth={1.8}
        strokeDasharray={isPublished ? "0" : "1.8 1.8"}
        style={{ transition: "r 150ms" }}
      />
      <text
        x={labelX}
        y={y + 3.5}
        textAnchor={labelAnchor}
        className={`${
          hovered ? "fill-enji-700" : "fill-sumi-900"
        } font-semibold`}
        fontSize={hovered ? 12 : 10.5}
        style={{ transition: "font-size 150ms" }}
      >
        {city.name}
      </text>
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
        <g aria-label={`${city.name} guide — coming soon`}>
          <title>{`${city.name} guide — coming soon`}</title>
          {dot}
        </g>
      )}
    </g>
  );
}

function AirportMapPin({
  airport,
  hovered,
  onHover,
  onSelect,
}: {
  airport: (typeof JAPAN_AIRPORTS)[number];
  hovered: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (iata: string) => void;
}) {
  const [x, y] = airport.pos;
  const fill = airport.international ? "#1f3a5f" : "#6e8a49"; // aizome-600 / matcha-600
  return (
    <g
      onMouseEnter={() => onHover(airport.iata)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(airport.iata)}
      className="cursor-pointer"
    >
      <title>
        {airport.iata} · {airport.name} ({airport.city}){" "}
        {airport.international ? "— international" : "— domestic"}
      </title>
      <polygon
        points={`${x},${y - 6} ${x - 5},${y + 3} ${x + 5},${y + 3}`}
        fill={fill}
        stroke="white"
        strokeWidth={1}
        opacity={hovered ? 1 : 0.9}
      />
      <text
        x={x + 8}
        y={y + 4}
        className="fill-sumi-900 font-semibold"
        fontSize={hovered ? 11 : 9.5}
        letterSpacing="0.05em"
        style={{ transition: "font-size 150ms" }}
      >
        {airport.iata}
      </text>
    </g>
  );
}

/**
 * Detail panel that opens below the map when an airport is selected.
 * Surfaces direct-flight info from the user's chosen origin city,
 * plus a Skyscanner deep link to compare live fares.
 */
function AirportPanel({
  airport,
  originIata,
  originCity,
  onClose,
}: {
  airport: AirportPin;
  originIata: string;
  originCity: string;
  onClose: () => void;
}) {
  const direct = airport.direct_routes?.[originIata];
  const otherOrigins = Object.keys(airport.direct_routes ?? {}).filter(
    (i) => i !== originIata,
  );
  const skyscanner = `https://www.skyscanner.net/transport/flights/${originIata.toLowerCase()}/${airport.iata.toLowerCase()}/`;

  return (
    <article className="rounded-2xl border border-washi-200 bg-white p-5 text-sm shadow-sm">
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sumi-700">
            {airport.iata} · {airport.city}
          </div>
          <h3 className="mt-1 text-xl font-semibold text-sumi-900">
            {airport.name}
          </h3>
          <div
            className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
              airport.international ? "text-aizome-600" : "text-matcha-700"
            }`}
          >
            {airport.international
              ? "International airport"
              : "Domestic airport"}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-7 w-7 place-items-center rounded-full bg-washi-100 text-sumi-700 hover:bg-washi-200"
        >
          ×
        </button>
      </header>

      <div className="mt-5 rounded-xl border border-washi-200 bg-washi-50 p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sumi-700">
          From {originCity || originIata}
        </div>
        {direct ? (
          <>
            <div className="mt-1 text-base font-semibold text-matcha-700">
              Direct flights available ✓
            </div>
            <div className="mt-2 grid gap-1 text-xs text-sumi-800 sm:grid-cols-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sumi-700">
                  Airlines
                </span>
                <div className="mt-0.5">{direct.airlines.join(", ")}</div>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sumi-700">
                  Flight time
                </span>
                <div className="mt-0.5 tabular-nums">
                  ~{direct.duration_hours} h
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sumi-700">
                  Frequency
                </span>
                <div className="mt-0.5">{direct.frequency}</div>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-1 text-base font-semibold text-enji-700">
            No direct flights from {originCity || originIata}
          </div>
        )}
        <a
          href={skyscanner}
          target="_blank"
          rel="sponsored noopener"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-sumi-900 px-4 py-2 text-xs font-semibold text-washi-50 transition hover:bg-aizome-700"
        >
          Compare fares on Skyscanner →
        </a>
      </div>

      {otherOrigins.length > 0 && (
        <div className="mt-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sumi-700">
            Also flies direct from
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {otherOrigins.map((iata) => (
              <span
                key={iata}
                className="rounded-full border border-washi-300 bg-white px-2 py-0.5 text-[11px] font-semibold tracking-[0.05em] text-sumi-700"
              >
                {iata}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
