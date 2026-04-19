import Link from "next/link";
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
} from "@/lib/currency/context";
import { AttractionCard } from "@/components/attraction/AttractionCard";
import { CategoryTabs } from "@/components/attraction/CategoryTabs";

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
        · Attractions
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Attractions in {city.name}
      </h1>
      <p className="mt-3 text-slate-600">
        Curated shortlist, ranked by importance. Tap a card for full details,
        dress code, accessibility notes, and how to get tickets.
      </p>

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
          <p className="mt-8 rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
            No attractions in this category yet.
          </p>
        )}
      </CurrencyProvider>
    </main>
  );
}
