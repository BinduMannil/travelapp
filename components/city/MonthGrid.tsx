"use client";

import type { ClimateRow } from "@/lib/data/seed";
import { TempDisplay } from "@/lib/preferences/context";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SEASON_LABEL: Record<ClimateRow["season_label"], string> = {
  peak: "Peak",
  shoulder: "Shoulder",
  off: "Off-season",
};

type TempBand = {
  key: "cold" | "cool" | "mild" | "warm" | "hot";
  label: string;
  /** Upper bound (°C, exclusive) for this band's avg_high_c. */
  upper: number;
  card: string;
  chip: string;
};

// Weather-based colour scale drawn from the Japan palette:
// cold = aizome indigo, cool = washi + sumi ink, mild = matcha green,
// warm = kintsugi gold, hot = enji crimson. Backgrounds use full
// palette tints (not /60 washes) so each card has clear destination-
// rooted colour character.
//
// When we add more countries each country will ship its own TEMP_BANDS
// via `lib/country-palettes/<slug>.ts` — see CONTRIBUTING.md.
const TEMP_BANDS: TempBand[] = [
  {
    key: "cold",
    label: "Cold",
    upper: 8,
    card: "bg-aizome-100 border-aizome-400",
    chip: "bg-aizome-600 text-white",
  },
  {
    key: "cool",
    label: "Cool",
    upper: 16,
    card: "bg-washi-200 border-sumi-200",
    chip: "bg-sumi-900 text-washi-50",
  },
  {
    key: "mild",
    label: "Mild",
    upper: 22,
    card: "bg-matcha-100 border-matcha-500",
    chip: "bg-matcha-600 text-white",
  },
  {
    key: "warm",
    label: "Warm",
    upper: 28,
    card: "bg-kintsugi-300/45 border-kintsugi-500",
    chip: "bg-kintsugi-500 text-sumi-900",
  },
  {
    key: "hot",
    label: "Hot",
    upper: Infinity,
    card: "bg-enji-100 border-enji-500",
    chip: "bg-enji-600 text-white",
  },
];

function bandFor(avgHigh: number): TempBand {
  return TEMP_BANDS.find((b) => avgHigh < b.upper) ?? TEMP_BANDS[TEMP_BANDS.length - 1];
}

function rainIntensity(mm: number): "dry" | "normal" | "wet" | "soaking" {
  if (mm < 60) return "dry";
  if (mm < 130) return "normal";
  if (mm < 200) return "wet";
  return "soaking";
}

const RAIN_COPY: Record<ReturnType<typeof rainIntensity>, string> = {
  dry: "Dry",
  normal: "Average rain",
  wet: "Wet",
  soaking: "Soaking",
};

/**
 * Seasonal decoration per month. Each entry renders a soft animated
 * SVG motif inside the card (snowflakes, sakura petals, rain, leaves,
 * fireworks, maple) plus a giant kanji ghost. Kept opacity-low so the
 * data stays readable.
 */
type Season =
  | "snow"
  | "plum"
  | "sakura"
  | "fresh"
  | "rain"
  | "fireworks"
  | "heat"
  | "typhoon"
  | "autumn"
  | "momiji";

const MONTH_SEASON: Record<number, { season: Season; kanji: string; accent: string }> = {
  1: { season: "snow", kanji: "雪", accent: "text-aizome-600" },
  2: { season: "plum", kanji: "梅", accent: "text-enji-600" },
  3: { season: "sakura", kanji: "桜", accent: "text-sakura-400" },
  4: { season: "sakura", kanji: "桜", accent: "text-sakura-400" },
  5: { season: "fresh", kanji: "緑", accent: "text-matcha-600" },
  6: { season: "rain", kanji: "雨", accent: "text-aizome-500" },
  7: { season: "fireworks", kanji: "花", accent: "text-enji-500" },
  8: { season: "heat", kanji: "暑", accent: "text-enji-600" },
  9: { season: "typhoon", kanji: "颱", accent: "text-aizome-600" },
  10: { season: "autumn", kanji: "紅", accent: "text-enji-600" },
  11: { season: "momiji", kanji: "楓", accent: "text-enji-700" },
  12: { season: "snow", kanji: "雪", accent: "text-aizome-600" },
};

function SeasonDecor({ season }: { season: Season }) {
  // Each motif is a small set of absolutely-positioned SVG elements with
  // a local @keyframes animation. Pointer-events disabled; layered behind
  // the card content.
  switch (season) {
    case "snow":
      return (
        <>
          <style>{`
            @keyframes snowFall {
              from { transform: translateY(-10%); }
              to   { transform: translateY(110%); }
            }
          `}</style>
          {[
            { x: 10, delay: 0, size: 8 },
            { x: 35, delay: 1.5, size: 6 },
            { x: 60, delay: 0.8, size: 10 },
            { x: 80, delay: 2.2, size: 7 },
          ].map((d, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className="pointer-events-none absolute text-aizome-400"
              style={{
                left: `${d.x}%`,
                top: 0,
                width: d.size,
                height: d.size,
                animation: `snowFall 7s ${d.delay}s linear infinite`,
                opacity: 0.55,
              }}
              aria-hidden
            >
              <path
                d="M12 2v20M2 12h20M4.2 4.2l15.6 15.6M19.8 4.2L4.2 19.8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          ))}
        </>
      );

    case "plum":
    case "sakura":
      return (
        <>
          <style>{`
            @keyframes petalDrift {
              0%   { transform: translate(0,-10%) rotate(0deg); }
              50%  { transform: translate(12px,50%) rotate(160deg); }
              100% { transform: translate(-6px,115%) rotate(320deg); }
            }
          `}</style>
          {[
            { x: 15, delay: 0, size: 11 },
            { x: 45, delay: 1.8, size: 9 },
            { x: 75, delay: 0.9, size: 13 },
            { x: 85, delay: 2.6, size: 8 },
          ].map((d, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className={`pointer-events-none absolute ${
                season === "plum" ? "text-enji-400" : "text-sakura-400"
              }`}
              style={{
                left: `${d.x}%`,
                top: 0,
                width: d.size,
                height: d.size,
                animation: `petalDrift 9s ${d.delay}s ease-in-out infinite`,
                opacity: 0.65,
              }}
              aria-hidden
            >
              <path
                d="M12 4c2 0 4 2 4 4 0 3-4 8-4 8s-4-5-4-8c0-2 2-4 4-4z"
                fill="currentColor"
              />
            </svg>
          ))}
        </>
      );

    case "fresh":
      return (
        <svg
          viewBox="0 0 120 120"
          className="pointer-events-none absolute -bottom-6 -right-4 h-24 w-24 text-matcha-600/30"
          aria-hidden
        >
          <path
            d="M60 20c25 0 45 18 45 45 0 6-1 12-3 17-22-3-44-18-54-35-4-7-5-15-3-22 4-3 9-5 15-5z"
            fill="currentColor"
          />
          <path
            d="M60 30v60M40 50c10 10 20 20 40 30"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        </svg>
      );

    case "rain":
      return (
        <>
          <style>{`
            @keyframes rainDrop {
              from { transform: translateY(-10%); opacity: .7; }
              to   { transform: translateY(120%); opacity: 0; }
            }
          `}</style>
          {[10, 25, 40, 55, 70, 85].map((x, i) => (
            <div
              key={i}
              className="pointer-events-none absolute h-4 w-[1.5px] bg-aizome-400/55"
              style={{
                left: `${x}%`,
                top: 0,
                animation: `rainDrop ${1.2 + (i % 3) * 0.25}s ${i * 0.15}s linear infinite`,
              }}
              aria-hidden
            />
          ))}
        </>
      );

    case "fireworks":
      return (
        <>
          <style>{`
            @keyframes sparkBurst {
              0%   { transform: scale(.4); opacity: 0; }
              35%  { transform: scale(1); opacity: 1; }
              100% { transform: scale(1.4); opacity: 0; }
            }
          `}</style>
          {[
            { x: 75, y: 15, delay: 0 },
            { x: 20, y: 30, delay: 1.5 },
          ].map((d, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className="pointer-events-none absolute h-6 w-6 text-enji-500"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                animation: `sparkBurst 3s ${d.delay}s ease-out infinite`,
                opacity: 0.7,
              }}
              aria-hidden
            >
              <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" />
              </g>
            </svg>
          ))}
        </>
      );

    case "heat":
      return (
        <>
          <style>{`
            @keyframes heatPulse {
              0%, 100% { transform: scale(1); opacity: .55; }
              50%      { transform: scale(1.08); opacity: .8; }
            }
          `}</style>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-4 top-4 h-10 w-10 text-enji-500"
            style={{ animation: "heatPulse 3.5s ease-in-out infinite", opacity: 0.55 }}
            aria-hidden
          >
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2" />
            </g>
          </svg>
        </>
      );

    case "typhoon":
      return (
        <>
          <style>{`
            @keyframes typhoonSpin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <svg
            viewBox="0 0 120 120"
            className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 text-aizome-600/35"
            style={{ animation: "typhoonSpin 18s linear infinite" }}
            aria-hidden
          >
            <path
              d="M60 18c20 0 38 16 38 38 0 8-3 15-8 21-4-18-24-28-40-22-8 3-14 10-14 18 0 4 2 8 6 10-18-4-30-22-30-40 0-14 20-25 48-25z"
              fill="currentColor"
            />
          </svg>
        </>
      );

    case "autumn":
    case "momiji":
      return (
        <>
          <style>{`
            @keyframes leafDrift {
              0%   { transform: translate(0,-10%) rotate(0deg); }
              50%  { transform: translate(18px,50%) rotate(180deg); }
              100% { transform: translate(-8px,115%) rotate(360deg); }
            }
          `}</style>
          {[
            { x: 10, delay: 0, size: 14, tint: "text-enji-600" },
            { x: 35, delay: 1.5, size: 11, tint: "text-kintsugi-500" },
            { x: 65, delay: 0.5, size: 15, tint: "text-enji-500" },
            { x: 85, delay: 2.4, size: 12, tint: "text-kintsugi-400" },
          ].map((d, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className={`pointer-events-none absolute ${d.tint}`}
              style={{
                left: `${d.x}%`,
                top: 0,
                width: d.size,
                height: d.size,
                animation: `leafDrift 11s ${d.delay}s ease-in-out infinite`,
                opacity: 0.7,
              }}
              aria-hidden
            >
              {/* stylised maple/momiji leaf */}
              <path
                d="M12 2l2.2 4.4 4.9.7-3.5 3.4.8 4.9L12 13l-4.4 2.4.8-4.9L4.9 7l4.9-.7z"
                fill="currentColor"
              />
              <path
                d="M12 13v7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          ))}
        </>
      );

    default:
      return null;
  }
}

export function MonthGrid({ rows }: { rows: ClimateRow[] }) {
  const byMonth = new Map(rows.map((r) => [r.month, r]));

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
          const row = byMonth.get(m);
          if (!row) return null;
          const band = bandFor(row.avg_high_c);
          const rain = rainIntensity(row.precip_mm);
          const seasonMeta = MONTH_SEASON[m];
          return (
            <div
              key={m}
              className={cn(
                "relative overflow-hidden rounded-2xl border p-5 text-sumi-900 shadow-sm",
                band.card,
              )}
            >
              {/* Seasonal background decoration — kanji ghost + motif. */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-2 -top-2 select-none font-sans text-6xl font-bold leading-none opacity-15",
                  seasonMeta.accent,
                )}
              >
                {seasonMeta.kanji}
              </span>
              <SeasonDecor season={seasonMeta.season} />

              {/* Content sits above the motif layer. */}
              <div className="relative">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="text-xl font-semibold">
                    {MONTH_NAMES[m - 1]}
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]",
                      band.chip,
                    )}
                  >
                    {band.label}
                  </span>
                </div>

                {/* Temperature bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-washi-200/70">
                  <div
                    className={cn("h-full rounded-full", band.chip)}
                    style={{
                      width: `${Math.max(
                        8,
                        Math.min(100, ((row.avg_high_c + 5) / 40) * 100),
                      )}%`,
                    }}
                  />
                </div>

                <div className="mt-3 text-base tabular-nums">
                  <TempDisplay celsius={row.avg_high_c} />{" "}
                  <span className="text-sumi-400">/</span>{" "}
                  <TempDisplay celsius={row.avg_low_c} />
                </div>

                <div className="mt-1.5 text-xs text-sumi-700">
                  <span className="tabular-nums">{row.precip_mm} mm</span>{" "}
                  <span className="text-sumi-400">·</span> {RAIN_COPY[rain]}
                </div>
                <div className="text-xs text-sumi-700">
                  {row.humidity_pct}% RH{" "}
                  <span className="text-sumi-400">·</span> Price{" "}
                  {row.cost_index.toFixed(2)}×
                </div>

                <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-sumi-700">
                  {SEASON_LABEL[row.season_label]} season
                </div>
                <p className="mt-2 text-xs leading-relaxed text-sumi-800">
                  {row.notes}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Temperature legend */}
      <div className="mt-6 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-sumi-700">
        <span className="text-sumi-600">Colour scale</span>
        {TEMP_BANDS.map((b, i) => {
          const prev = i === 0 ? -5 : TEMP_BANDS[i - 1].upper;
          const label =
            b.upper === Infinity ? `${prev}°C +` : `${prev}–${b.upper}°C`;
          return (
            <span
              key={b.key}
              className={cn(
                "rounded-full px-2 py-0.5 text-[9px] font-semibold",
                b.chip,
              )}
            >
              {b.label} · {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
