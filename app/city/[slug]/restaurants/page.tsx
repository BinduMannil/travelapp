import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CUISINE_LABELS,
  DIETARY_LABELS,
  getCity,
  getRestaurants,
  type PriceBand,
} from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
} from "@/lib/preferences/context";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { RestaurantFilters } from "@/components/restaurant/RestaurantFilters";

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

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        · Restaurants
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Restaurants in {city.name}
      </h1>
      <p className="mt-3 text-slate-600">
        Ranked by a composite of Google star rating (weighted by review
        volume), Tabelog score where available, plus Michelin and Bib
        Gourmand recognition. Tap a card for menu highlights, reservation
        leads, and dietary notes.
      </p>

      <CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-6 flex items-center justify-end">
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
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

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RestaurantCard key={r.slug} citySlug={slug} restaurant={r} />
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
            No restaurants match those filters. Try loosening one.
          </p>
        )}
      </CurrencyProvider>
    </main>
  );
}
