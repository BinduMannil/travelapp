import Image from "next/image";
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

const WELLNESS_IMAGES: Record<string, string> = {
  onsen:
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1800&q=84",
  sento:
    "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1800&q=84",
  spa:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=84",
  head_spa:
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1800&q=84",
  shiatsu:
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=84",
};

const fallbackWellnessImage =
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=84";

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
  const [lead, ...rest] = sorted;

  return (
    <main className="editorial-page">
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
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-[1.45rem] border border-white/14 bg-[linear-gradient(180deg,rgba(34,29,25,0.94),rgba(13,12,11,0.96))] p-7 shadow-editorial-deep">
          <h2 className="text-xs font-semibold uppercase tracking-[0.34em] text-kintsugi-200">
            Bath etiquette
          </h2>
          <ul className="mt-7 space-y-4 text-sm leading-7 text-white/78">
            {data.etiquette_points.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-3 h-px w-8 shrink-0 bg-kintsugi-300" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </aside>

        {lead && (
          <article className="relative min-h-[540px] overflow-hidden rounded-[1.6rem] border border-white/18 bg-black shadow-editorial-deep">
            <Image
              src={WELLNESS_IMAGES[lead.type] ?? fallbackWellnessImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover opacity-82"
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.45)_45%,rgba(0,0,0,0.91))]" />
            <div className="relative flex min-h-[540px] flex-col justify-end p-6 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-kintsugi-200">
                {lead.neighborhood} · {WELLNESS_TYPE_LABEL[lead.type]}
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(3rem,7vw,6.25rem)] font-semibold leading-[0.9] text-white">
                {lead.name}
              </h2>
              <p className="mt-5 max-w-2xl rounded-2xl border border-white/14 bg-white/[0.08] p-4 text-sm leading-7 text-white/82 backdrop-blur">
                <span className="font-semibold text-kintsugi-200">Tattoos:</span>{" "}
                {lead.tattoo_policy}
              </p>
            </div>
          </article>
        )}
      </section>

      <CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-10 flex flex-col gap-4 rounded-[1.15rem] border border-white/12 bg-white/[0.07] p-4 shadow-editorial backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-medium text-white/70">
            Rates as of {formatLongDate(snapshot.date)}
          </span>
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
          {rest.map((v, index) => {
            const wide = index % 4 === 0;
            return (
              <article
                key={v.slug}
                className={[
                  "relative min-h-[430px] overflow-hidden rounded-[1.35rem] border border-white/16 bg-black shadow-editorial-deep",
                  wide ? "xl:col-span-7" : "xl:col-span-5",
                ].join(" ")}
              >
                <Image
                  src={WELLNESS_IMAGES[v.type] ?? fallbackWellnessImage}
                  alt=""
                  fill
                  sizes={
                    wide
                      ? "(min-width: 1280px) 58vw, (min-width: 768px) 50vw, 100vw"
                      : "(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
                  }
                  className="absolute inset-0 h-full w-full object-cover opacity-72"
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.5)_42%,rgba(0,0,0,0.94))]" />
                <div className="relative flex min-h-[430px] flex-col justify-end p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-kintsugi-200">
                    {v.neighborhood} · {WELLNESS_TYPE_LABEL[v.type]}
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(2.2rem,4.6vw,4.3rem)] font-semibold leading-[0.95] text-white">
                    {v.name}
                  </h2>

                  <div className="mt-4 text-base font-semibold tabular-nums text-white">
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
                    <span className="ml-1 text-xs font-medium text-white/62">
                      / admission
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-white/72">{v.hours}</div>

                  <p className="mt-4 rounded-2xl border border-white/14 bg-white/[0.08] p-4 text-sm leading-6 text-white/82 backdrop-blur">
                    <strong className="text-kintsugi-200">Tattoos:</strong>{" "}
                    {v.tattoo_policy}
                  </p>

                  <ul className="mt-4 space-y-2 text-sm leading-6 text-white/76">
                    {v.features.map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-1 shrink-0 text-kintsugi-300"
                        >
                          +
                        </span>
                        <span className="flex-1">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {v.url && (
                    <AffiliateLink
                      href={v.url}
                      partner="auto"
                      source={`wellness/${v.slug}`}
                      nonSponsored
                      className="mt-5 inline-flex w-fit text-sm font-semibold text-kintsugi-200 underline decoration-kintsugi-400/60 underline-offset-4 hover:text-white"
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
