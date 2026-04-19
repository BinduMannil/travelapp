import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getCityWellness,
  WELLNESS_TYPE_LABEL,
} from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
  PriceDisplay,
} from "@/lib/currency/context";

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
    title: "Wellness & onsen",
    description:
      "Where to actually bathe in Tokyo — urban onsen, community sentō, head spas, and shiatsu — with prices, hours, and tattoo policies.",
  };
}

export default async function WellnessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const data = getCityWellness(slug);
  if (!city || !data) notFound();

  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

  const sorted = [...data.venues].sort(
    (a, b) => a.display_order - b.display_order,
  );

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
        · Wellness &amp; onsen
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Wellness &amp; bathing in {city.name}
      </h1>
      <p className="mt-3 text-slate-600">{data.summary}</p>

      <section className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Bath etiquette — the short version
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {data.etiquette_points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      <CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Rates as of {snapshot.date}
          </span>
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {sorted.map((v) => (
            <article
              key={v.slug}
              className="flex flex-col rounded-lg border border-slate-200 bg-white p-5"
            >
              <header>
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  {WELLNESS_TYPE_LABEL[v.type]} · {v.neighborhood}
                </div>
                <h2 className="mt-0.5 text-lg font-semibold">{v.name}</h2>
              </header>

              <div className="mt-2 text-sm tabular-nums text-slate-800">
                <PriceDisplay
                  amountMinor={v.price_min_minor}
                  currency={v.currency}
                />
                {v.price_max_minor > v.price_min_minor && (
                  <>
                    {" – "}
                    <PriceDisplay
                      amountMinor={v.price_max_minor}
                      currency={v.currency}
                    />
                  </>
                )}
                <span className="ml-1 text-xs text-slate-500">
                  / admission
                </span>
              </div>

              <div className="mt-2 text-xs text-slate-600">{v.hours}</div>

              <p className="mt-3 text-xs text-amber-900">
                <strong>Tattoos:</strong> {v.tattoo_policy}
              </p>

              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                {v.features.map((f, i) => (
                  <li key={i}>· {f}</li>
                ))}
              </ul>

              {v.url && (
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-brand-600 underline"
                >
                  Website →
                </a>
              )}
            </article>
          ))}
        </section>
      </CurrencyProvider>
    </main>
  );
}
