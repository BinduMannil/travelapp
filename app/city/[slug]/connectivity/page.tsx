import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const payload = getCountryConnectivity(countrySlug);
  if (!payload) notFound();

  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

  return (
    <main>
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
              className="rounded-lg border border-slate-200 p-5"
            >
              <header className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    {OPTION_LABEL[o.option] ?? o.option} · {o.kind}
                  </div>
                  <h2 className="mt-0.5 text-xl font-semibold">
                    {o.provider}
                  </h2>
                  <div className="text-sm text-slate-600">{o.plan_label}</div>
                </div>
                {o.price_minor > 0 && (
                  <div className="text-sm tabular-nums">
                    <PriceDisplay
                      amountMinor={o.price_minor}
                      currency={o.currency}
                    />
                  </div>
                )}
              </header>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Pros
                  </div>
                  <ul className="mt-1 space-y-1 text-sm text-slate-700">
                    {o.pros.map((p, i) => (
                      <li key={i}>· {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-rose-700">
                    Cons
                  </div>
                  <ul className="mt-1 space-y-1 text-sm text-slate-700">
                    {o.cons.map((c, i) => (
                      <li key={i}>· {c}</li>
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
        <article className="rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Plugs &amp; power
          </h3>
          <div className="mt-2 space-y-1 text-sm">
            <div>
              <span className="text-slate-500">Plug types: </span>
              {payload.power.plug_types.join(", ")}
            </div>
            <div>
              <span className="text-slate-500">Voltage: </span>
              {payload.power.voltage} V
            </div>
            <div>
              <span className="text-slate-500">Frequency: </span>
              {payload.power.frequency}
            </div>
          </div>
          {payload.power.converter_needed_from.length > 0 && (
            <p className="mt-3 text-xs text-slate-600">
              Plug adapter needed if travelling from:{" "}
              {payload.power.converter_needed_from.join(", ")}.
            </p>
          )}
          {payload.power.notes && (
            <p className="mt-2 text-sm text-slate-700">{payload.power.notes}</p>
          )}
        </article>

        <article className="rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            VPN
          </h3>
          <p className="mt-2 text-sm text-slate-700">{payload.vpn_note}</p>
        </article>
      </section>

      <AffiliateDisclosure />
    </div>
    </main>
  );
}
