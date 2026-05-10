import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getInterCityRoutes } from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import { formatLongDate } from "@/lib/legal/constants";
import {
  CurrencyProvider,
  CurrencySelector,
} from "@/lib/preferences/context";
import { NearbyRouteCard } from "@/components/city/NearbyRouteCard";
import { CarRentalCta, FlightCta } from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { PageHero } from "@/components/layout/PageHero";

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
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Nearby cities" },
        ]}
        kanji="遠"
        eyebrow="Nearby cities"
        title={`From ${city.name}`}
        subtitle="遠 足"
        lede={`Every practical way to reach popular neighbouring destinations — switch between modes to compare time and cost. Domestic trips need no extra visa beyond what you have for ${city.name}.`}
        palette="matcha"
      />

      <div className="mx-auto max-w-5xl px-6 py-12">
      <CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-6 flex items-center justify-between">
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
          <span className="text-xs text-sumi-700">
            Rates as of {formatLongDate(snapshot.date)}
          </span>
        </div>

        {domestic.length > 0 && (
          <section className="mt-6">
            <h2 className="px-6 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
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
            <h2 className="px-6 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
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

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <FlightCta source="nearby-bottom" />
        <CarRentalCta source="nearby-bottom" />
      </div>
      <AffiliateDisclosure />
      </div>
    </main>
  );
}
