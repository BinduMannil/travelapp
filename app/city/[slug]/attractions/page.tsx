import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ATTRACTION_CATEGORIES,
  getAttractions,
  getCity,
} from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
} from "@/lib/preferences/context";
import { AttractionCard } from "@/components/attraction/AttractionCard";
import { AttractionHeroCarousel } from "@/components/attraction/AttractionHeroCarousel";
import { CategoryTabs } from "@/components/attraction/CategoryTabs";
import { ToursCta } from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";

export function generateMetadata(): Metadata {
  return {
    title: "Attractions",
    description:
      "Hand-picked attractions with importance, cost, typical duration, dress code, accessibility, and direct booking links.",
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

export default async function AttractionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { slug } = await params;
  const { category } = await searchParams;
  const city = getCity(slug);
  if (!city) notFound();

  const all = getAttractions(slug);
  const tabs = ATTRACTION_CATEGORIES.map((c) => ({
    slug: c.slug,
    label: c.label,
    count: all.filter((a) => a.category === c.slug).length,
  })).filter((t) => t.count > 0);

  const activeCategory = category ?? null;
  const filtered = activeCategory
    ? all.filter((a) => a.category === activeCategory)
    : all;

  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

  const heroLede =
    "Hand-picked shortlist ranked by importance. Tap a card for dress code, accessibility, and tickets.";
  // Rank by importance desc, fall back to seed order.
  const featured = [...all].sort((a, b) => b.importance - a.importance);

  return (
    <main>
      <AttractionHeroCarousel
        citySlug={slug}
        cityName={city.name}
        attractions={featured}
        lede={heroLede}
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
<CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <CategoryTabs
            tabs={tabs}
            total={all.length}
            activeCategory={activeCategory}
          />
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <AttractionCard key={a.slug} citySlug={slug} attraction={a} />
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-lg border border-dashed border-washi-300 p-6 text-center text-sumi-700">
            No attractions in this category yet.
          </p>
        )}
      </CurrencyProvider>

      <div className="mt-10">
        <ToursCta city={city.name} source="attractions-bottom" />
      </div>
      <AffiliateDisclosure />
    </div>
    </main>
  );
}
