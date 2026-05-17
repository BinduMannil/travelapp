import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import {
  getCity,
  getCountryConnectivity,
  getCountryForCity,
} from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
  PriceDisplay,
} from "@/lib/preferences/context";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { EsimCta } from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { PageHero } from "@/components/layout/PageHero";

const DISPLAY_CURRENCIES = [
  "USD",
  "JPY",
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

const OPTION_LABEL: Record<string, string> = {
  esim: "eSIM",
  physical_sim: "Physical SIM",
  pocket_wifi: "Pocket Wi-Fi",
  public_wifi: "Public Wi-Fi",
};

const AVAILABILITY_META: Record<
  string,
  { label: string; tint: string; kanji: string }
> = {
  pre_arrival: {
    label: "Buy before you fly",
    tint: "bg-matcha-100 text-matcha-700 ring-matcha-400/40",
    kanji: "発",
  },
  airport_pickup: {
    label: "Reserve · Collect on Arrival",
    tint: "bg-kintsugi-300/25 text-enji-700 ring-kintsugi-400/50",
    kanji: "着",
  },
  in_country: {
    label: "Buy in country",
    tint: "bg-aizome-50 text-aizome-700 ring-aizome-200",
    kanji: "内",
  },
  on_site: {
    label: "Free · No Purchase",
    tint: "bg-washi-200 text-sumi-800 ring-washi-300",
    kanji: "無",
  },
};

export function generateMetadata(): Metadata {
  return {
    title: "Connectivity & power",
    description:
      "eSIM vs pocket Wi-Fi vs physical SIM comparison, plug type and voltage, VPN notes.",
  };
}

export default async function ConnectivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="connectivity" />;
  if (getPlaceOption(slug)) notFound();
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const payload = getCountryConnectivity(countrySlug);
  if (!payload) notFound();

  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Connectivity" },
        ]}
        kanji="信"
        eyebrow="Connectivity & power"
        title={`Staying online`}
        subtitle="通 信"
        lede={`eSIM, pocket Wi-Fi, plug types, and VPN notes — everything you need to arrive connected.`}
        palette="matcha"
      />
      <div className="mx-auto max-w-5xl px-6 py-12">
<div className="mt-6">
        <EsimCta source="connectivity-top" />
      </div>

      {(() => {
        const preFly = payload.connectivity.filter(
          (o) => o.availability === "pre_arrival",
        );
        const pickup = payload.connectivity.filter(
          (o) => o.availability === "airport_pickup",
        );
        if (preFly.length === 0 && pickup.length === 0) return null;
        return (
          <section className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-matcha-400/40 bg-matcha-100/70 p-4">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-matcha-700">
                <span className="font-sans text-lg leading-none">発</span>
                Buy before you fly
              </div>
              <p className="mt-2 text-sm text-sumi-900">
                {preFly.length > 0
                  ? `${preFly.map((o) => o.provider.split(" ")[0]).join(", ")} — activate the moment you land. No airport queue.`
                  : "Nothing in this category."}
              </p>
            </div>
            <div className="rounded-2xl border border-kintsugi-400/50 bg-kintsugi-300/15 p-4">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-enji-700">
                <span className="font-sans text-lg leading-none">着</span>
                Reserve · Collect on Arrival
              </div>
              <p className="mt-2 text-sm text-sumi-900">
                {pickup.length > 0
                  ? `${pickup.map((o) => o.provider.split(" ")[0]).join(", ")} — booked online, picked up at Narita or Haneda.`
                  : "Nothing in this category."}
              </p>
            </div>
          </section>
        );
      })()}

      <CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-6 flex items-center justify-end">
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="mt-4 space-y-4">
          {payload.connectivity.map((o) => (
            <article
              key={o.provider}
              className="rounded-2xl border border-washi-200 bg-white p-5 shadow-sm"
            >
              <header className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sumi-700">
                      {OPTION_LABEL[o.option] ?? o.option}
                    </span>
                    <span className="rounded-full border border-washi-300 bg-washi-100 px-2 py-0.5 text-[10px] font-medium text-sumi-700">
                      {o.kind}
                    </span>
                  </div>
                  <h2 className="mt-1.5 !font-sans text-base font-semibold leading-snug tracking-tight text-sumi-900">
                    {o.provider}{" "}
                    <span className="font-normal text-sumi-700">
                      · {o.plan_label}
                    </span>
                  </h2>
                  {o.availability && AVAILABILITY_META[o.availability] && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ring-1 ${AVAILABILITY_META[o.availability].tint}`}
                      >
                        <span className="font-sans text-sm leading-none">
                          {AVAILABILITY_META[o.availability].kanji}
                        </span>
                        {AVAILABILITY_META[o.availability].label}
                      </span>
                    </div>
                  )}
                  {o.pre_arrival_note && (
                    <p className="mt-1.5 text-xs text-sumi-700">
                      {o.pre_arrival_note}
                    </p>
                  )}
                </div>
                {o.price_minor > 0 && (
                  <div className="shrink-0 rounded-full bg-washi-100 px-3 py-1 text-sm font-semibold tabular-nums text-sumi-900">
                    <PriceDisplay
                      amountMinor={o.price_minor}
                      currency={o.currency}
                    />
                  </div>
                )}
              </header>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                    Pros
                  </div>
                  <ul className="mt-1.5 space-y-1.5 text-sm text-sumi-800">
                    {o.pros.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-0.5 shrink-0 text-emerald-600"
                        >
                          +
                        </span>
                        <span className="flex-1 leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-rose-700">
                    Cons
                  </div>
                  <ul className="mt-1.5 space-y-1.5 text-sm text-sumi-800">
                    {o.cons.map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-0.5 shrink-0 text-rose-500"
                        >
                          −
                        </span>
                        <span className="flex-1 leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {o.url && (
                <AffiliateLink
                  href={o.url}
                  partner="auto"
                  source={`connectivity/${o.provider.toLowerCase().replace(/\s+/g, "-")}`}
                  className="mt-3 inline-block text-sm text-brand-600 underline"
                >
                  Provider site →
                </AffiliateLink>
              )}
            </article>
          ))}
        </section>
      </CurrencyProvider>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg border border-washi-200 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
            Plugs &amp; power
          </h3>
          <div className="mt-2 space-y-1 text-sm">
            <div>
              <span className="text-sumi-700">Plug types: </span>
              {payload.power.plug_types.join(", ")}
            </div>
            <div>
              <span className="text-sumi-700">Voltage: </span>
              {payload.power.voltage} V
            </div>
            <div>
              <span className="text-sumi-700">Frequency: </span>
              {payload.power.frequency}
            </div>
          </div>
          {payload.power.converter_needed_from.length > 0 && (
            <p className="mt-3 text-xs text-sumi-700">
              Plug adapter needed if travelling from:{" "}
              {payload.power.converter_needed_from.join(", ")}.
            </p>
          )}
          {payload.power.notes && (
            <p className="mt-2 text-sm text-sumi-800">{payload.power.notes}</p>
          )}
        </article>

        <article className="rounded-lg border border-washi-200 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
            VPN
          </h3>
          <p className="mt-2 text-sm text-sumi-800">{payload.vpn_note}</p>
        </article>
      </section>

      <AffiliateDisclosure />
    </div>
    </main>
  );
}
