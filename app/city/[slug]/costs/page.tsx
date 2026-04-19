import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getPriceItems } from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
} from "@/lib/currency/context";
import { CostTable } from "@/components/money/CostTable";

export function generateMetadata(): Metadata {
  return {
    title: "Daily costs",
    description:
      "Typical prices for coffee, meals, transit, taxis, SIM cards and more, with live currency conversion.",
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

export default async function CostsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const items = getPriceItems(slug);
  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

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
        · Daily costs
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">Daily costs — {city.name}</h1>
      <p className="mt-3 text-slate-600">
        Typical prices for common travel purchases. Pick your home currency to
        see conversions at today&rsquo;s rates.
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
        <section className="mt-4">
          <CostTable items={items} />
        </section>
      </CurrencyProvider>

      <p className="mt-10 text-xs text-slate-500">
        Prices are typical ranges for central Tokyo. Individual businesses vary
        — treat as a planning guide, not a guarantee.
      </p>
    </main>
  );
}
