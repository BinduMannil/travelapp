import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CUISINE_LABELS,
  DIETARY_LABELS,
  getCity,
  getRestaurants,
  popularityScore,
  type PriceBand,
} from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
} from "@/lib/preferences/context";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { RestaurantFilters } from "@/components/restaurant/RestaurantFilters";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Restaurants",
    description:
      "Popular Tokyo restaurants ranked by a composite of Google reviews, Tabelog, and Michelin, with price, cuisine, and dietary filters.",
  };
}

const DISPLAY_CURRENCIES = [
  "JPY",
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "SGD",
  "HKD",
  "CNY",
  "KRW",
  "THB",
  "INR",
  "AED",
  "CHF",
];

const BAND_ORDER: PriceBand[] = ["$", "$$", "$$$", "$$$$", "$$$$$"];

function isPriceBand(x: string): x is PriceBand {
  return BAND_ORDER.includes(x as PriceBand);
}

export default async function RestaurantsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    price?: string;
    cuisine?: string;
    diet?: string;
    reservations?: string;
  }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const city = getCity(slug);
  if (!city) notFound();

  const all = getRestaurants(slug);

  const activePrice: PriceBand | null =
    sp.price && isPriceBand(sp.price) ? sp.price : null;
  const activeCuisine = sp.cuisine ?? null;
  const activeDiet = sp.diet ?? null;
  const walkInOnly = sp.reservations === "walkin";

  const filtered = all.filter((r) => {
    if (activePrice && r.price_band !== activePrice) return false;
    if (activeCuisine && !r.cuisine.includes(activeCuisine)) return false;
    if (activeDiet && !r.dietary.includes(activeDiet)) return false;
    if (walkInOnly && r.reservation_required) return false;
    return true;
  });

  const priceBands = BAND_ORDER.map((band) => ({
    band,
    count: all.filter((r) => r.price_band === band).length,
  })).filter((b) => b.count > 0);

  const cuisineCounts = new Map<string, number>();
  for (const r of all) {
    for (const c of r.cuisine) {
      cuisineCounts.set(c, (cuisineCounts.get(c) ?? 0) + 1);
    }
  }
  const cuisines = Array.from(cuisineCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => ({
      slug,
      label: CUISINE_LABELS[slug] ?? slug,
      count,
    }));

  const dietaryCounts = new Map<string, number>();
  for (const r of all) {
    for (const d of r.dietary) {
      dietaryCounts.set(d, (dietaryCounts.get(d) ?? 0) + 1);
    }
  }
  const dietary = Array.from(dietaryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => ({
      slug,
      label: DIETARY_LABELS[slug] ?? slug,
      count,
    }));

  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);
  const featured = [...all].sort((a, b) => popularityScore(b) - popularityScore(a)).slice(0, 2);

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Restaurants" },
        ]}
        kanji="食"
        eyebrow="Restaurants"
        title={`Restaurants`}
        subtitle="名 店"
        lede={`Ranked by a composite of Google star rating, Tabelog score, and Michelin / Bib Gourmand recognition. Filter by price, cuisine, dietary, walk-in.`}
        palette="kintsugi"
      />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(200,155,60,.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(141,20,36,.22),transparent_38%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
<CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <section className="mb-20 grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="luxury-kicker text-kintsugi-300">Tokyo table culture</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.7rem,5.5vw,5.8rem)] font-semibold text-white">
              Begin with the rooms that define the night.
            </h2>
            <p className="mt-7 text-base leading-8 text-white/64">
              The ranking stays practical, but the entry point should feel like a reservation diary: counters, quiet rooms, steam, craft and glow.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {featured.map((r) => (
              <RestaurantCard key={r.slug} citySlug={slug} restaurant={r} />
            ))}
          </div>
        </section>

        <div className="flex items-center justify-end">
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="scene-glass mt-6 rounded-[1.35rem] p-5 sm:p-7">
          <RestaurantFilters
            priceBands={priceBands}
            cuisines={cuisines}
            dietary={dietary}
            active={{
              price: activePrice,
              cuisine: activeCuisine,
              diet: activeDiet,
              reservations: walkInOnly,
            }}
          />
        </section>

        <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filtered.map((r) => (
            <RestaurantCard key={r.slug} citySlug={slug} restaurant={r} />
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-lg border border-dashed border-white/20 p-6 text-center text-white/70">
            No restaurants match those filters. Try loosening one.
          </p>
        )}
      </CurrencyProvider>
    </div>
    </div>
    </main>
  );
}
