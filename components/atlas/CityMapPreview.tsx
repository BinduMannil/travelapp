"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CityDestinationPageData } from "@/lib/city/city-destination-data";
import { routes } from "@/lib/routes";

type AtlasPoint = CityDestinationPageData["atlas"]["points"][number];

type MapLayer = {
  key: string;
  label: string;
  href: (citySlug: string) => string;
};

const mapLayers: MapLayer[] = [
  { key: "landmarks", label: "Landmarks", href: (citySlug) => routes.citySection(citySlug, "attractions") },
  { key: "food", label: "Food", href: (citySlug) => routes.citySection(citySlug, "restaurants") },
  { key: "neighborhoods", label: "Neighborhoods", href: (citySlug) => routes.citySection(citySlug, "neighborhoods") },
  { key: "stays", label: "Stays", href: (citySlug) => routes.citySection(citySlug, "hotels") },
  { key: "experiences", label: "Experiences", href: () => "/experiences" },
  { key: "nature", label: "Nature", href: (citySlug) => routes.citySection(citySlug, "nearby") },
  { key: "transport", label: "Transport", href: (citySlug) => routes.citySection(citySlug, "transit") },
  { key: "hidden-gems", label: "Hidden Gems", href: (citySlug) => routes.citySection(citySlug, "hidden-gems") },
] as const;

const fallbackPositions = [
  ["24%", "49%"],
  ["42%", "35%"],
  ["61%", "43%"],
  ["72%", "57%"],
  ["52%", "61%"],
  ["58%", "75%"],
  ["35%", "68%"],
  ["78%", "38%"],
] as const;

const cityCenters: Record<string, { lat: number; lon: number; delta: number }> = {
  "ho-chi-minh-city": { lat: 10.7769, lon: 106.7009, delta: 0.052 },
  hanoi: { lat: 21.0278, lon: 105.8342, delta: 0.052 },
  "da-nang": { lat: 16.0544, lon: 108.2022, delta: 0.06 },
  "hoi-an": { lat: 15.8801, lon: 108.338, delta: 0.045 },
  hue: { lat: 16.4637, lon: 107.5909, delta: 0.052 },
  sapa: { lat: 22.3364, lon: 103.8438, delta: 0.052 },
  "phu-quoc": { lat: 10.2899, lon: 103.984, delta: 0.08 },
  "can-tho": { lat: 10.0452, lon: 105.7469, delta: 0.052 },
  "nha-trang": { lat: 12.2388, lon: 109.1967, delta: 0.055 },
  "da-lat": { lat: 11.9404, lon: 108.4583, delta: 0.05 },
  "ha-long": { lat: 20.9712, lon: 107.0448, delta: 0.07 },
  "ninh-binh": { lat: 20.2506, lon: 105.9745, delta: 0.06 },
  kyoto: { lat: 35.0116, lon: 135.7681, delta: 0.055 },
  tokyo: { lat: 35.6762, lon: 139.6503, delta: 0.07 },
};

function openStreetMapSrc(citySlug: string) {
  const center = cityCenters[citySlug] ?? cityCenters["ho-chi-minh-city"];
  const bbox = [
    center.lon - center.delta,
    center.lat - center.delta,
    center.lon + center.delta,
    center.lat + center.delta,
  ]
    .map((value) => value.toFixed(5))
    .join("%2C");

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${center.lat.toFixed(5)}%2C${center.lon.toFixed(5)}`;
}

function buildLayerPoints(points: AtlasPoint[], cityName: string) {
  return mapLayers.map((layer, index) => {
    const sourcePoint = points[index] ?? points[index % Math.max(points.length, 1)];
    const [x, y] = fallbackPositions[index % fallbackPositions.length];

    return {
      layer,
      name: sourcePoint?.name ?? `${cityName} ${layer.label}`,
      x: sourcePoint?.x ?? x,
      y: sourcePoint?.y ?? y,
    };
  });
}

export function CityMapPreview({
  citySlug,
  cityName,
  points,
}: {
  citySlug: string;
  cityName: string;
  points: AtlasPoint[];
}) {
  const [activeLayer, setActiveLayer] = useState(mapLayers[0].key);
  const layerPoints = useMemo(
    () => buildLayerPoints(points, cityName),
    [cityName, points],
  );
  const activePoint = layerPoints.find((point) => point.layer.key === activeLayer);

  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-white/10 bg-[#081312]/70">
      <iframe
        title={`${cityName} interactive atlas map`}
        src={openStreetMapSrc(citySlug)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 opacity-82 saturate-[0.82] invert-[0.88] hue-rotate-180 contrast-[0.92]"
      />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(4,8,7,.68),rgba(4,8,7,.18)_42%,rgba(4,8,7,.5)),radial-gradient(circle_at_55%_44%,rgba(216,170,79,.16),transparent_34%)]" />

      <div className="absolute left-4 right-4 top-4 z-20 flex flex-wrap gap-2">
        {mapLayers.map((layer) => {
          const active = activeLayer === layer.key;

          return (
            <button
              key={layer.key}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveLayer(layer.key)}
              className={`rounded-full border px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.08em] backdrop-blur-xl transition ${
                active
                  ? "border-[#d8aa4f]/72 bg-[#d8aa4f] text-[#140f08] shadow-[0_12px_28px_rgba(216,170,79,.22)]"
                  : "border-white/16 bg-black/42 text-white/76 hover:border-[#d8aa4f]/46 hover:text-[#f0c96e]"
              }`}
            >
              {layer.label}
            </button>
          );
        })}
      </div>

      {layerPoints.map((point) => {
        const active = activeLayer === point.layer.key;

        return (
          <Link
            key={point.layer.key}
            href={point.layer.href(citySlug)}
            aria-label={`Open ${point.layer.label.toLowerCase()} for ${cityName}: ${point.name}`}
            className={`absolute z-10 flex -translate-x-2 -translate-y-2 items-center gap-2 rounded-full outline-none transition focus:ring-2 focus:ring-[#d8aa4f]/70 ${
              active ? "opacity-100" : "opacity-48 hover:opacity-88"
            }`}
            style={{ left: point.x, top: point.y }}
          >
            <span
              className={`h-3.5 w-3.5 rounded-full border border-white/42 ${
                active ? "bg-[#d8aa4f] shadow-[0_0_22px_rgba(216,170,79,.88)]" : "bg-white/74"
              }`}
            />
            <span
              className={`max-w-[9.5rem] truncate rounded-full border px-2.5 py-1 text-[0.68rem] font-bold backdrop-blur-xl ${
                active
                  ? "border-[#d8aa4f]/58 bg-black/72 text-[#fff7e5]"
                  : "border-white/12 bg-black/46 text-white/78"
              }`}
            >
              {point.name}
            </span>
          </Link>
        );
      })}

      <div className="absolute bottom-5 right-5 z-20 max-w-[15rem] rounded-2xl border border-white/16 bg-[#06100f]/86 p-4 text-xs text-white/72 shadow-[0_18px_50px_rgba(0,0,0,.38)] backdrop-blur-xl">
        <p className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
          Active Layer
        </p>
        <p className="mt-2 truncate text-sm font-bold text-[#fff7e5]">
          {activePoint?.layer.label ?? "Landmarks"}
        </p>
        <p className="mt-1 truncate text-white/66">
          {activePoint?.name ?? cityName}
        </p>
      </div>
    </div>
  );
}
