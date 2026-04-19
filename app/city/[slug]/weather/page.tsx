import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MonthGrid } from "@/components/city/MonthGrid";
import { getCity, getClimate } from "@/lib/data/seed";

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Metadata {
  return {
    title: "Weather & seasons",
    description:
      "Month-by-month average highs, lows, rainfall, humidity, and price index for each season.",
  };
}

export default async function WeatherPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const rows = getClimate(slug);
  const peak = rows.filter((r) => r.season_label === "peak").map((r) => r.month);
  const off = rows.filter((r) => r.season_label === "off").map((r) => r.month);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        · Weather &amp; seasons
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Weather &amp; seasons — {city.name}
      </h1>
      <p className="mt-3 text-slate-600">
        Historical monthly averages help you pick when to go. Peak months have
        the best weather but also higher prices and crowds; off-season trades
        weather for value.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        {peak.length > 0 && (
          <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-900 ring-1 ring-rose-200">
            Peak: {peak.map((m) => monthName(m)).join(", ")}
          </span>
        )}
        {off.length > 0 && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-900 ring-1 ring-emerald-200">
            Off: {off.map((m) => monthName(m)).join(", ")}
          </span>
        )}
      </div>

      <section className="mt-8">
        <MonthGrid rows={rows} />
      </section>

      <p className="mt-10 text-xs text-slate-500">
        Source: seeded historical normals. Live current weather will be added
        in a later update via OpenWeather.
      </p>
    </main>
  );
}

function monthName(m: number) {
  return new Date(2000, m - 1, 1).toLocaleString("en-US", { month: "short" });
}
