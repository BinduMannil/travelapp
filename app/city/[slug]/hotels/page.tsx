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
import { HotelCta, PrivateStayCta } from "@/components/affiliate/AffiliateCtas";
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

// Tier blurbs with structured price ranges in JPY minor units so the
// band can render in whatever currency the user has picked.
const TIER_HINT: Record<
  HotelTier,
  { blurb: string; minMinor: number; maxMinor: number | null }
> = {
  hostel: {
    blurb: "Dorm beds and private twins in shared buildings.",
    minMinor: 3500,
    maxMinor: 9000,
  },
  capsule: {
    blurb: "Tidy pod beds with shared showers.",
    minMinor: 4000,
    maxMinor: 7000,
  },
  business: {
    blurb: "Compact, clean, quiet. The sweet spot for most travellers.",
    minMinor: 8000,
    maxMinor: 22000,
  },
  ryokan_style: {
    blurb:
      "Dormy Inn / Onyado Nono — business hotels with real onsen baths.",
    minMinor: 16000,
    maxMinor: 35000,
  },
  mid_range: {
    blurb: "Boutique, design, or reliable international chains.",
    minMinor: 20000,
    maxMinor: 50000,
  },
  luxury: {
    blurb: "International luxury towers.",
    minMinor: 50000,
    maxMinor: 160000,
  },
  luxury_ryokan: {
    blurb: "Traditional tatami + kaiseki at the top end.",
    minMinor: 100000,
    maxMinor: null,
  },
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
                  : "border-washi-200 bg-white text-sumi-800 hover:border-washi-300"
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
                    : "border-washi-200 bg-white text-sumi-800 hover:border-washi-300"
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
            {TIER_HINT[activeTier].blurb}{" "}
            <span className="tabular-nums">
              <PriceDisplay
                amountMinor={TIER_HINT[activeTier].minMinor}
                currency="JPY"
              />
              {TIER_HINT[activeTier].maxMinor !== null ? (
                <>
                  {" – "}
                  <PriceDisplay
                    amountMinor={TIER_HINT[activeTier].maxMinor!}
                    currency="JPY"
                  />
                </>
              ) : (
                "+"
              )}{" "}
              / night.
            </span>
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
                  {/* Body area — grows to fill so the Book button always
                      pins to the card bottom across every card in the row. */}
                  <div className="mt-2 flex-1">
                    {h.notes && (
                      <p className="text-sm leading-relaxed text-sumi-700">
                        {h.notes}
                      </p>
                    )}
                    {(h.kid_friendly || h.wheelchair_accessible) && (
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
                      </div>
                    )}
                  </div>

                  <AffiliateLink
                    href={h.booking_url}
                    partner="auto"
                    source={`hotel/${h.slug}`}
                    className="mt-5 inline-block rounded-full border border-sumi-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-sumi-900 transition hover:bg-sumi-900 hover:text-white"
                  >
                    Book direct →
                  </AffiliateLink>
                </div>
              </article>
            );
          })}
        </section>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-lg border border-dashed border-washi-300 p-6 text-center text-sumi-700">
            No hotels in that tier yet.
          </p>
        )}
      </CurrencyProvider>

      <p className="mt-10 text-xs text-sumi-700">
        Rates are typical flexible rates and vary with season, demand, and
        day-of-week. Add 10% consumption tax and 200-1,000¥ accommodation tax
        per person per night.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <HotelCta city={city.name} source="hotels-bottom" />
        <PrivateStayCta city={city.name} source="hotels-bottom" />
      </div>
      <AffiliateDisclosure />
    </div>
    </main>
  );
}
