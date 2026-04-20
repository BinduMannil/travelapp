import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getCityArrival } from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
  PriceDisplay,
} from "@/lib/preferences/context";
import {
  AirportTransferCta,
  CarRentalCta,
  FlightCta,
  LuggageCta,
} from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";

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

const MODE_LABEL: Record<string, string> = {
  train: "Train",
  train_express: "Airport express",
  limousine_bus: "Limousine bus",
  taxi: "Taxi",
};

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export function generateMetadata(): Metadata {
  return {
    title: "Arrival & logistics",
    description:
      "Narita and Haneda → central Tokyo transfers, luggage storage, takuhaibin forwarding, and where to get yen.",
  };
}

export default async function ArrivalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const arrival = getCityArrival(slug);
  if (!city || !arrival) notFound();

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
        · Arrival &amp; logistics
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Getting into {city.name}
      </h1>
      <p className="mt-3 text-slate-600">
        Airport transfers, bag drop, and first-hour cash. Prices switch into
        your home currency.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <FlightCta source="arrival-top" />
        <AirportTransferCta city={city.name} source="arrival-top" />
      </div>

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

        <section className="mt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Airport → city
          </h2>
          <div className="mt-3 space-y-6">
            {arrival.airport_transfers.map((group) => (
              <article key={group.from_airport}>
                <header className="flex items-baseline gap-2">
                  <h3 className="text-lg font-semibold">
                    {group.airport_name}
                  </h3>
                  <span className="text-xs text-slate-500">
                    ({group.from_airport})
                  </span>
                </header>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {group.options.map((o) => (
                    <div
                      key={o.name}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        {MODE_LABEL[o.mode] ?? o.mode}
                      </div>
                      <div className="mt-1 font-semibold">{o.name}</div>
                      <div className="mt-2 grid grid-cols-2 gap-y-1 text-xs text-slate-700">
                        <div>
                          <span className="text-slate-500">Time: </span>
                          {formatDuration(o.duration_minutes)}
                        </div>
                        <div className="tabular-nums text-right">
                          <PriceDisplay
                            amountMinor={o.price_min_minor}
                            currency={o.currency}
                          />
                          {o.price_max_minor > o.price_min_minor && (
                            <>
                              {" – "}
                              <PriceDisplay
                                amountMinor={o.price_max_minor}
                                currency={o.currency}
                              />
                            </>
                          )}
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500">Service: </span>
                          {o.first_last_service}
                        </div>
                      </div>
                      {o.notes && (
                        <p className="mt-2 text-xs text-slate-600">{o.notes}</p>
                      )}
                      {o.url && (
                        <a
                          href={o.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-xs text-brand-600 underline"
                        >
                          Info →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Luggage: lockers, bag drop, forwarding
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {arrival.luggage_services.map((l) => (
              <article
                key={l.provider}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  {l.kind.replace("_", " ")}
                </div>
                <div className="mt-1 font-semibold">{l.provider}</div>
                <div className="mt-1 text-sm text-slate-700">{l.coverage}</div>
                <div className="mt-2 text-sm tabular-nums">
                  from{" "}
                  <PriceDisplay
                    amountMinor={l.price_from_minor}
                    currency={l.currency}
                  />
                </div>
                {l.notes && (
                  <p className="mt-2 text-xs text-slate-600">{l.notes}</p>
                )}
                {l.url && (
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-brand-600 underline"
                  >
                    Website →
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Cash &amp; exchange
          </h2>
          <div className="mt-3 space-y-2">
            {arrival.atm_exchange.map((row) => (
              <article
                key={row.name}
                className="rounded-lg border border-slate-200 p-3"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium">{row.name}</div>
                  <div className="text-xs text-slate-500">{row.hours}</div>
                </div>
                {row.type === "atm" && row.foreign_card_ok && (
                  <div className="mt-1 text-xs text-emerald-700">
                    Foreign cards accepted
                  </div>
                )}
                {row.notes && (
                  <p className="mt-1 text-sm text-slate-600">{row.notes}</p>
                )}
                {row.url && (
                  <a
                    href={row.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs text-brand-600 underline"
                  >
                    Info →
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      </CurrencyProvider>

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        <LuggageCta source="arrival-bottom" />
        <CarRentalCta source="arrival-bottom" />
      </div>
      <AffiliateDisclosure />
    </main>
  );
}
