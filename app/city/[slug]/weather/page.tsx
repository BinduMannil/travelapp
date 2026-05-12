import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import { MonthGrid } from "@/components/city/MonthGrid";
import { getCity, getClimate } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
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
  if (getPlaceOption(slug)) notFound();
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="weather" />;
  const city = getCity(slug);
  if (!city) notFound();

  const rows = getClimate(slug);
  const peak = rows.filter((r) => r.season_label === "peak").map((r) => r.month);
  const off = rows.filter((r) => r.season_label === "off").map((r) => r.month);

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Weather & seasons" },
        ]}
        kanji="季"
        eyebrow="Weather & seasons"
        title={`When to visit ${city.name}`}
        subtitle="四 季"
        lede="Historical monthly averages help you pick when to go. Peak months have the best weather but also higher prices and crowds; off-season trades weather for value."
        palette="sumi"
      >
        <div className="flex flex-wrap gap-2 text-sm">
          {peak.length > 0 && (
            <span className="rounded-full bg-sakura-100/15 px-3 py-1 text-sakura-100 ring-1 ring-sakura-200/30">
              Peak: {peak.map((m) => monthName(m)).join(", ")}
            </span>
          )}
          {off.length > 0 && (
            <span className="rounded-full bg-matcha-400/15 px-3 py-1 text-matcha-100 ring-1 ring-matcha-400/30">
              Off: {off.map((m) => monthName(m)).join(", ")}
            </span>
          )}
        </div>
      </PageHero>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <MonthGrid rows={rows} />
        <p className="mt-10 text-xs text-sumi-700">
          Source: seeded historical normals. Live current weather will be added
          in a later update via OpenWeather.
        </p>
      </section>
    </main>
  );
}

function monthName(m: number) {
  return new Date(2000, m - 1, 1).toLocaleString("en-US", { month: "short" });
}
