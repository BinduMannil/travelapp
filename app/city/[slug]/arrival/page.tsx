import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import { getCity, getCityArrival } from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import { formatLongDate } from "@/lib/legal/constants";
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
      "Vietnam city arrival logistics, transfers, luggage, cash, SIM setup, and first-hour planning.",
  };
}

export default async function ArrivalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (getPlaceOption(slug)) notFound();
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="arrival" />;
  const city = getCity(slug);
  const arrival = getCityArrival(slug);
  if (!city || !arrival) notFound();

  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Arrival & logistics" },
        ]}
        kanji="着"
        eyebrow="Arrival & logistics"
        title={`Getting into ${city.name}`}
        subtitle="到 着"
        lede="Airport transfers, bag drop, and first-hour cash. Prices switch into your home currency."
        palette="sumi"
      />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          <FlightCta source="arrival-top" />
          <AirportTransferCta city={city.name} source="arrival-top" />
        </div>

      <CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-sumi-700">
            Rates as of {formatLongDate(snapshot.date)}
          </span>
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="mt-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
            Airport → city
          </h2>
          <div className="mt-3 space-y-6">
            {arrival.airport_transfers.map((group) => (
              <article key={group.from_airport}>
                <header className="flex items-baseline gap-2">
                  <h3 className="text-lg font-semibold">
                    {group.airport_name}
                  </h3>
                  <span className="text-xs text-sumi-700">
                    ({group.from_airport})
                  </span>
                </header>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {group.options.map((o) => (
                    <div
                      key={o.name}
                      className="rounded-lg border border-washi-200 p-4"
                    >
                      <div className="text-xs uppercase tracking-[0.12em] text-sumi-700">
                        {MODE_LABEL[o.mode] ?? o.mode}
                      </div>
                      <div className="mt-1 font-semibold">{o.name}</div>
                      <div className="mt-2 grid grid-cols-2 gap-y-1 text-xs text-sumi-800">
                        <div>
                          <span className="text-sumi-700">Time: </span>
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
                          <span className="text-sumi-700">Service: </span>
                          {o.first_last_service}
                        </div>
                      </div>
                      {o.notes && (
                        <p className="mt-2 text-xs text-sumi-700">{o.notes}</p>
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
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
            Luggage: lockers, bag drop, forwarding
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {arrival.luggage_services.map((l) => (
              <article
                key={l.provider}
                className="rounded-lg border border-washi-200 p-4"
              >
                <div className="text-xs uppercase tracking-[0.12em] text-sumi-700">
                  {l.kind.replace("_", " ")}
                </div>
                <div className="mt-1 font-semibold">{l.provider}</div>
                <div className="mt-1 text-sm text-sumi-800">{l.coverage}</div>
                <div className="mt-2 text-sm tabular-nums">
                  from{" "}
                  <PriceDisplay
                    amountMinor={l.price_from_minor}
                    currency={l.currency}
                  />
                </div>
                {l.notes && (
                  <p className="mt-2 text-xs text-sumi-700">{l.notes}</p>
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
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
            Cash &amp; exchange
          </h2>
          <div className="mt-3 space-y-2">
            {arrival.atm_exchange.map((row) => (
              <article
                key={row.name}
                className="rounded-lg border border-washi-200 p-3"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium">{row.name}</div>
                  <div className="text-xs text-sumi-700">{row.hours}</div>
                </div>
                {row.type === "atm" && row.foreign_card_ok && (
                  <div className="mt-1 text-xs text-emerald-700">
                    Foreign cards accepted
                  </div>
                )}
                {row.notes && (
                  <p className="mt-1 text-sm text-sumi-700">{row.notes}</p>
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
      </div>
    </main>
  );
}
