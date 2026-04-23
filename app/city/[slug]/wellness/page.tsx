import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getCityWellness,
  WELLNESS_TYPE_LABEL,
} from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import { formatLongDate } from "@/lib/legal/constants";
import {
  CurrencyProvider,
  CurrencySelector,
  PriceDisplay,
} from "@/lib/preferences/context";
import { CoverTile, wellnessCover } from "@/components/common/CoverTile";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { ToursCta } from "@/components/affiliate/AffiliateCtas";
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
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Wellness & onsen" },
        ]}
        kanji="湯"
        eyebrow="Wellness & onsen"
        title={`Where to actually bathe`}
        subtitle="温 泉"
        lede={`Onsen, sentō, head spa, shiatsu — with tattoo policies and etiquette in one place.`}
        palette="enji"
      />
      <div className="mx-auto max-w-5xl px-6 py-12">
<section className="mt-6 rounded-lg border border-washi-200 bg-washi-100 p-4">
        <h2 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
          Bath etiquette — the short version
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sumi-800">
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
          <span className="text-xs text-sumi-700">
            Rates as of {formatLongDate(snapshot.date)}
          </span>
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {sorted.map((v) => {
            const cover = wellnessCover(v.type);
            return (
              <article
                key={v.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
              >
                <CoverTile
                  palette={cover.palette}
                  kanji={cover.kanji}
                  aspect="3/2"
                  badge={WELLNESS_TYPE_LABEL[v.type]}
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-xs uppercase tracking-[0.25em] text-sumi-700">
                    {v.neighborhood}
                  </div>
                  <h2 className="mt-1 font-display text-lg font-semibold text-sumi-900">
                    {v.name}
                  </h2>

                  <div className="mt-2 text-sm tabular-nums text-sumi-900">
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
                    <span className="ml-1 text-xs text-sumi-700">
                      / admission
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-sumi-700">{v.hours}</div>

                  <p className="mt-3 rounded-lg bg-kintsugi-300/20 p-2 text-xs text-sumi-900">
                    <strong>Tattoos:</strong> {v.tattoo_policy}
                  </p>

                  <ul className="mt-3 space-y-1.5 text-sm text-sumi-700">
                    {v.features.map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-0.5 shrink-0 text-sumi-300"
                        >
                          ·
                        </span>
                        <span className="flex-1 leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {v.url && (
                    <AffiliateLink
                      href={v.url}
                      partner="auto"
                      source={`wellness/${v.slug}`}
                      nonSponsored
                      className="mt-auto inline-block pt-3 text-sm font-semibold text-enji-600 hover:underline"
                    >
                      Website →
                    </AffiliateLink>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </CurrencyProvider>

      <div className="mt-10">
        <ToursCta city={city.name} source="wellness-bottom" />
      </div>
      <AffiliateDisclosure />
    </div>
    </main>
  );
}
