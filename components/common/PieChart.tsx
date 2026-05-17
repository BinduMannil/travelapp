"use client";

import { useMemo, useState } from "react";

export type PieSlice = {
  label: string;
  value: number; // any units; auto-normalised to the sum
  color: string; // any valid CSS colour
};

/**
 * Dependency-free SVG pie chart with a hover-to-highlight legend.
 * Slice geometry is computed from the running cumulative total — no
 * Math.PI juggling inline in JSX, no chart library.
 */
export function PieChart({
  slices,
  size = 220,
  donut = false,
  label,
  center,
}: {
  slices: PieSlice[];
  size?: number;
  donut?: boolean;
  /** Optional small kicker label over the chart (e.g. "Japan"). */
  label?: string;
  /** Text rendered in the middle (defaults to total when donut=true). */
  center?: string;
}) {
  const total = slices.reduce((s, x) => s + x.value, 0);
  const [hover, setHover] = useState<number | null>(null);

  const arcs = useMemo(() => {
    let cumulative = 0;
    return slices.map((s) => {
      const start = cumulative / total;
      cumulative += s.value;
      const end = cumulative / total;
      return { slice: s, start, end };
    });
  }, [slices, total]);

  const r = size / 2;
  const innerR = donut ? r * 0.58 : 0;

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="img"
          aria-label={label ? `${label} breakdown` : "Breakdown"}
        >
          {arcs.map(({ slice, start, end }, i) => (
            <path
              key={slice.label}
              d={arcPath(r, r, r, innerR, start, end)}
              fill={slice.color}
              stroke="white"
              strokeWidth={1.5}
              opacity={hover === null || hover === i ? 1 : 0.35}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ transition: "opacity 150ms" }}
            />
          ))}
        </svg>
        {(center !== undefined || donut) && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            {label && (
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-sumi-700">
                {label}
              </div>
            )}
            <div className="font-sans text-lg font-semibold text-sumi-900">
              {center ?? total.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      <ul className="flex-1 space-y-1 text-xs">
        {slices.map((s, i) => {
          const pct = ((s.value / total) * 100).toFixed(1);
          const active = hover === i;
          return (
            <li
              key={s.label}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={`flex items-baseline justify-between gap-3 rounded px-1.5 py-0.5 transition ${
                active ? "bg-washi-100" : ""
              }`}
            >
              <span className="flex items-baseline gap-2 text-sumi-900">
                <span
                  aria-hidden
                  className="inline-block h-2.5 w-2.5 shrink-0 translate-y-0.5 rounded-sm"
                  style={{ backgroundColor: s.color }}
                />
                {s.label}
              </span>
              <span className="tabular-nums text-sumi-700">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Build an SVG arc (or annulus segment if innerR > 0) from fractional
 * start/end positions in [0,1]. fraction 0 = 12 o'clock, going clockwise.
 */
function arcPath(
  cx: number,
  cy: number,
  r: number,
  innerR: number,
  startFraction: number,
  endFraction: number,
): string {
  // Clamp an exact full circle to just under 1 so we don't emit a 0-length
  // arc (which SVG renders as nothing).
  const end = endFraction - startFraction >= 1 ? startFraction + 0.9999 : endFraction;

  const startAngle = 2 * Math.PI * startFraction - Math.PI / 2;
  const endAngle = 2 * Math.PI * end - Math.PI / 2;

  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const largeArc = end - startFraction > 0.5 ? 1 : 0;

  if (innerR === 0) {
    return [
      `M ${cx} ${cy}`,
      `L ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");
  }

  const ix1 = cx + innerR * Math.cos(endAngle);
  const iy1 = cy + innerR * Math.sin(endAngle);
  const ix2 = cx + innerR * Math.cos(startAngle);
  const iy2 = cy + innerR * Math.sin(startAngle);
  return [
    `M ${x1} ${y1}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
    `L ${ix1} ${iy1}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2}`,
    "Z",
  ].join(" ");
}
