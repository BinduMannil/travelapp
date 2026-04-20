import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getHotels,
  HOTEL_TIER_LABEL,
  HOTEL_TIER_ORDER,
  type HotelTier,
} from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
  PriceDisplay,
} from "@/lib/preferences/context";
import { CoverTile, hotelCover } from "@/components/common/CoverTile";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { HotelCta } from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Where to stay",
    description:
      "Hotels, ryokan, and capsules across every price tier with neighborhood, price in your currency, and direct booking links.",
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

const TIER_HINT: Record<HotelTier, string> = {
  hostel: "Dorm beds and private twins in shared buildings. ¥3,500-¥9,000/night.",
  capsule: "Tidy pod beds with shared showers. ¥4,000-¥7,000/night.",
  business: "Compact, clean, quiet. The ¥8,000-¥22,000 sweet spot.",
  ryokan_style: "Dormy Inn / Onyado Nono — business hotels with real onsen baths. ¥16,000-¥35,000.",
  mid_range: "Boutique, design, or reliable international chains. ¥20,000-¥50,000.",
  luxury: "International luxury towers. ¥50,000-¥160,000.",
  luxury_ryokan: "Traditional tatami + kaiseki at the top end. ¥100,000+.",
};

export default async function HotelsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tier?: string }>;
}) {
  const { slug } = await params;
  const { tier } = await searchParams;
  const city = getCity(slug);
  if (!city) notFound();

  const all = getHotels(slug);
  const activeTier = (
    HOTEL_TIER_ORDER.includes(tier as HotelTier) ? (tier as HotelTier) : null
  );
  const filtered = activeTier
    ? all.filter((h) => h.tier === activeTier)
    : all;

  const tierCounts = HOTEL_TIER_ORDER.map((t) => ({
    tier: t,
    count: all.filter((h) => h.tier === t).length,
  })).filter((t) => t.count > 0);

  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Where to stay" },
        ]}
        kanji="宿"
        eyebrow="Where to stay"
        title={`Where to stay`}
        subtitle="宿 泊"
        lede={`A hand-picked shortlist across every tier. Prices are nightly base rates; switch currency to compare to your home budget.`}
        palette="sumi"
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
<CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-sm">
            <Link
              href={`/city/${slug}/hotels`}
              className={`rounded-full border px-3 py-1 ${
                !activeTier
                  ? "border-brand-500 bg-brand-50 text-brand-800"
                  : "border-washi-200 bg-white text-sumi-800 hover:border-slate-300"
              }`}
            >
              All
              <span className="ml-1 text-xs text-sumi-700">{all.length}</span>
            </Link>
            {tierCounts.map((t) => (
              <Link
                key={t.tier}
                href={`/city/${slug}/hotels?tier=${t.tier}`}
                className={`rounded-full border px-3 py-1 ${
                  activeTier === t.tier
                    ? "border-brand-500 bg-brand-50 text-brand-800"
                    : "border-washi-200 bg-white text-sumi-800 hover:border-slate-300"
                }`}
              >
                {HOTEL_TIER_LABEL[t.tier]}
                <span className="ml-1 text-xs text-sumi-700">{t.count}</span>
              </Link>
            ))}
          </div>
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        {activeTier && (
          <p className="mt-4 rounded-lg border border-washi-200 bg-washi-100 p-3 text-sm text-sumi-800">
            <strong>{HOTEL_TIER_LABEL[activeTier]}:</strong>{" "}
            {TIER_HINT[activeTier]}
          </p>
        )}

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h) => {
            const cover = hotelCover(h.tier);
            return (
              <article
                key={h.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
              >
                <CoverTile
                  palette={cover.palette}
                  kanji={cover.kanji}
                  aspect="3/2"
                  badge={HOTEL_TIER_LABEL[h.tier]}
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-xs uppercase tracking-[0.25em] text-sumi-700">
                    {h.neighborhood}
                  </div>
                  <h2 className="mt-1 font-display text-lg font-semibold text-sumi-900">
                    {h.name}
                  </h2>
                  <div className="mt-2 text-sm tabular-nums text-sumi-900">
                    <PriceDisplay
                      amountMinor={h.price_night_min_minor}
                      currency={h.currency}
                    />
                    {h.price_night_max_minor > h.price_night_min_minor && (
                      <>
                        {" – "}
                        <PriceDisplay
                          amountMinor={h.price_night_max_minor}
                          currency={h.currency}
                        />
                      </>
                    )}
                    <span className="ml-1 text-xs text-sumi-700">/ night</span>
                  </div>
                  {h.notes && (
                    <p className="mt-2 text-sm text-sumi-700">{h.notes}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1 text-[10px]">
                    {h.kid_friendly && (
                      <span className="rounded-full bg-matcha-100 px-2 py-0.5 text-matcha-700">
                        Kid-friendly
                      </span>
                    )}
                    {h.wheelchair_accessible && (
                      <span className="rounded-full bg-aizome-50 px-2 py-0.5 text-aizome-700">
                        Wheelchair
                      </span>
                    )}
                    {h.lgbtq_friendly && (
                      <span className="rounded-full bg-sakura-100 px-2 py-0.5 text-enji-700">
                        LGBTQ+ friendly
                      </span>
                    )}
                  </div>
                  <AffiliateLink
                    href={h.booking_url}
                    partner="auto"
                    source={`hotel/${h.slug}`}
                    className="mt-auto inline-block rounded-full border border-sumi-200 bg-white px-4 py-2 text-center text-sm font-semibold text-sumi-900 transition hover:bg-sumi-900 hover:text-white"
                  >
                    Book direct →
                  </AffiliateLink>
                </div>
              </article>
            );
          })}
        </section>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-lg border border-dashed border-slate-300 p-6 text-center text-sumi-700">
            No hotels in that tier yet.
          </p>
        )}
      </CurrencyProvider>

      <p className="mt-10 text-xs text-sumi-700">
        Rates are typical flexible rates and vary with season, demand, and
        day-of-week. Add 10% consumption tax and 200-1,000¥ accommodation tax
        per person per night.
      </p>

      <div className="mt-8">
        <HotelCta city={city.name} source="hotels-bottom" />
      </div>
      <AffiliateDisclosure />
    </div>
    </main>
  );
}
