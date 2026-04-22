import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getInterCityRoutes } from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import { formatLongDate } from "@/lib/legal/constants";
import {
  CurrencyProvider,
  CurrencySelector,
} from "@/lib/preferences/context";
import { NearbyDestinationsGrid } from "@/components/city/NearbyDestinationsGrid";
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
    <main>
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
          <NearbyDestinationsGrid
            routes={domestic}
            heading="Within Japan · same visa"
          />
        )}

        {foreign.length > 0 && (
          <NearbyDestinationsGrid
            routes={foreign}
            heading="International · check visa first"
          />
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
