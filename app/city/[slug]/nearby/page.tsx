import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getInterCityRoutes } from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
} from "@/lib/currency/context";
import { NearbyRouteCard } from "@/components/city/NearbyRouteCard";

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

export function generateMetadata(): Metadata {
  return {
    title: "Nearby cities",
    description:
      "Travel options to nearby cities with all modes compared — Shinkansen, bus, flight, rental — durations and prices in your currency.",
  };
}

export default async function NearbyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const routes = getInterCityRoutes(slug);
  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);
  const domestic = routes.filter((r) => r.in_same_country);
  const foreign = routes.filter((r) => !r.in_same_country);

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
        · Nearby cities
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">From {city.name}</h1>
      <p className="mt-3 text-slate-600">
        Every practical way to reach popular neighbouring destinations —
        switch between modes to compare time and cost. Domestic trips need no
        extra visa beyond what you have for {city.name}.
      </p>

      <CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-6 flex items-center justify-between">
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
          <span className="text-xs text-slate-500">
            Rates as of {snapshot.date}
          </span>
        </div>

        {domestic.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Within Japan · same visa
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {domestic.map((r) => (
                <NearbyRouteCard key={r.dest_slug} route={r} />
              ))}
            </div>
          </section>
        )}

        {foreign.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              International · check visa first
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {foreign.map((r) => (
                <NearbyRouteCard key={r.dest_slug} route={r} />
              ))}
            </div>
          </section>
        )}
      </CurrencyProvider>
    </main>
  );
}
