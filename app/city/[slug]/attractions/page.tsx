import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
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
  if (getPlaceOption(slug)) notFound();
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="attractions" />;
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
  const featureCards = featured.slice(0, 2);

  return (
    <main className="editorial-page">
      <AttractionHeroCarousel
        citySlug={slug}
        cityName={city.name}
        attractions={featured}
        lede={heroLede}
      />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(200,155,60,.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(141,20,36,.22),transparent_38%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
<CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <section className="mb-24 grid gap-16 xl:grid-cols-[minmax(18rem,.62fr)_minmax(0,1.38fr)] xl:items-center">
          <div className="max-w-md">
            <p className="luxury-kicker text-kintsugi-300">First scenes</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.45rem,4.7vw,4.8rem)] font-semibold text-white">
              Begin with the places that change the room tone.
            </h2>
            <p className="mt-7 max-w-sm text-base leading-8 text-white/70">
              Start with a few places that change the shape of the day: temples, museums, viewpoints, parks and neighborhoods worth planning around.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2 xl:gap-12">
            {featureCards.map((a) => (
              <AttractionCard key={a.slug} citySlug={slug} attraction={a} />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <CategoryTabs
            tabs={tabs}
            total={all.length}
            activeCategory={activeCategory}
          />
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filtered.map((a) => (
            <AttractionCard key={a.slug} citySlug={slug} attraction={a} />
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-lg border border-dashed border-white/20 p-6 text-center text-white/70">
            No attractions in this category yet.
          </p>
        )}
      </CurrencyProvider>

      <div className="mt-10">
        <ToursCta city={city.name} source="attractions-bottom" />
      </div>
      <div className="text-white/70 [&_*]:text-white/70 [&_a]:text-kintsugi-300">
        <AffiliateDisclosure />
      </div>
    </div>
    </div>
    </main>
  );
}
