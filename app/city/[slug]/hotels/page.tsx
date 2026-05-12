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

const HOTEL_IMAGES: Record<string, string> = {
  "nine-hours-shinjuku":
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=82",
  "ks-house-tokyo":
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1400&q=82",
  "wise-owl-hostels-river-tokyo":
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=82",
  "apa-shinjuku-kabukicho":
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=82",
  "richmond-hotel-asakusa":
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=82",
  "gracery-shinjuku":
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=82",
  "shibuya-granbell":
    "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1400&q=82",
  "onyado-nono-asakusa":
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=82",
  "hoshinoya-tokyo":
    "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&w=1400&q=82",
  "park-hyatt-tokyo":
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=82",
  "aman-tokyo":
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=82",
  "the-tokyo-edition-toranomon":
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1400&q=82",
};

const FALLBACK_HOTEL_IMAGE =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=82";

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
  const featured = [
    all.find((h) => h.slug === "hoshinoya-tokyo"),
    all.find((h) => h.slug === "aman-tokyo"),
  ].filter(Boolean) as typeof all;

  const tierCounts = HOTEL_TIER_ORDER.map((t) => ({
    tier: t,
    count: all.filter((h) => h.tier === t).length,
  })).filter((t) => t.count > 0);

  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

  return (
    <main className="editorial-page">
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
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(200,155,60,.13),transparent_32%),radial-gradient(circle_at_78%_18%,rgba(141,20,36,.22),transparent_34%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
<CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        {!activeTier && featured.length > 0 && (
          <section className="mb-14 grid gap-8 lg:grid-cols-[1.18fr_.82fr] lg:items-stretch">
            <FeaturedHotelCard hotel={featured[0]} />
            <div className="grid gap-8">
              <div className="scene-glass rounded-[1.5rem] p-6 sm:p-8">
                <p className="luxury-kicker text-kintsugi-300">
                  Stay strategy
                </p>
                <h2 className="mt-4 max-w-lg font-sans text-[clamp(2.15rem,4vw,3.6rem)] font-semibold leading-[1.02] text-white">
                  Choose the room by the trip you want to have.
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/76">
                  Tokyo rewards location discipline. Pick a neighborhood first,
                  then decide whether you want efficiency, ritual, skyline, or
                  a room worth returning to before dinner.
                </p>
              </div>
              {featured[1] && <CompactHotelFeature hotel={featured[1]} />}
            </div>
          </section>
        )}

        <section className="scene-glass rounded-[1.5rem] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-2.5 text-sm">
            <Link
              href={`/city/${slug}/hotels`}
              data-active={!activeTier}
              className={`editorial-pill px-4 py-2 text-sm font-semibold leading-none ${
                !activeTier
                  ? "font-bold"
                  : ""
              }`}
            >
              <span>All</span>
              <span className="editorial-pill-count">{all.length}</span>
            </Link>
            {tierCounts.map((t) => (
              <Link
                key={t.tier}
                href={`/city/${slug}/hotels?tier=${t.tier}`}
                data-active={activeTier === t.tier}
                className={`editorial-pill px-4 py-2 text-sm font-semibold leading-none ${
                  activeTier === t.tier
                    ? "font-bold"
                    : ""
                }`}
              >
                <span>{HOTEL_TIER_LABEL[t.tier]}</span>
                <span className="editorial-pill-count">{t.count}</span>
              </Link>
            ))}
          </div>
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>
        </section>

        {activeTier && (
          <p className="mt-6 rounded-[1.15rem] border border-washi-200 bg-washi-100 p-4 text-sm leading-7 text-sumi-800">
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

        <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filtered.map((h, index) => (
            <HotelStayCard key={h.slug} hotel={h} index={index} />
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-lg border border-dashed border-washi-300 p-6 text-center text-sumi-700">
            No hotels in that tier yet.
          </p>
        )}
      </CurrencyProvider>

      <p className="mt-10 max-w-3xl text-xs leading-6 text-white/62">
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
    </div>
    </main>
  );
}

function HotelStayCard({
  hotel,
  index,
}: {
  hotel: ReturnType<typeof getHotels>[number];
  index: number;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-[1.5rem] border border-white/14 bg-sumi-900 text-white shadow-editorial-deep ${
        index % 3 === 1 ? "md:mt-12" : ""
      }`}
    >
      <div className="relative min-h-72 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HOTEL_IMAGES[hotel.slug] ?? FALLBACK_HOTEL_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,5,4,.86),transparent_58%),linear-gradient(90deg,rgba(6,5,4,.45),transparent)]" />
        <div className="absolute left-5 top-5 rounded-full bg-washi-50 px-3 py-1 text-xs font-bold text-sumi-900">
          {HOTEL_TIER_LABEL[hotel.tier]}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="luxury-kicker text-kintsugi-300">
            {hotel.neighborhood}
          </p>
          <h2 className="mt-2 font-sans text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-none text-white">
            {hotel.name}
          </h2>
        </div>
      </div>
      <div className="grid gap-6 bg-[linear-gradient(180deg,rgba(255,253,246,.98),rgba(245,238,222,.96))] p-6 text-sumi-900 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <div className="text-sm font-semibold tabular-nums text-sumi-900">
            <PriceDisplay
              amountMinor={hotel.price_night_min_minor}
              currency={hotel.currency}
            />
            {hotel.price_night_max_minor > hotel.price_night_min_minor && (
              <>
                {" – "}
                <PriceDisplay
                  amountMinor={hotel.price_night_max_minor}
                  currency={hotel.currency}
                />
              </>
            )}
            <span className="ml-1 text-xs text-sumi-700">/ night</span>
          </div>
          {hotel.notes && (
            <p className="mt-3 text-sm leading-7 text-sumi-700">
              {hotel.notes}
            </p>
          )}
          {(hotel.kid_friendly || hotel.wheelchair_accessible) && (
            <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
              {hotel.kid_friendly && (
                <span className="rounded-full bg-matcha-100 px-2.5 py-1 font-semibold text-matcha-700">
                  Kid-friendly
                </span>
              )}
              {hotel.wheelchair_accessible && (
                <span className="rounded-full bg-aizome-50 px-2.5 py-1 font-semibold text-aizome-700">
                  Wheelchair
                </span>
              )}
            </div>
          )}
        </div>
        <AffiliateLink
          href={hotel.booking_url}
          partner="auto"
          source={`hotel/${hotel.slug}`}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-sumi-900 px-5 text-sm font-bold text-white transition hover:bg-enji-700"
        >
          Book Direct →
        </AffiliateLink>
      </div>
    </article>
  );
}

function FeaturedHotelCard({
  hotel,
}: {
  hotel: ReturnType<typeof getHotels>[number];
}) {
  return (
    <article className="group relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/16 bg-sumi-900 shadow-editorial-deep">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HOTEL_IMAGES[hotel.slug] ?? FALLBACK_HOTEL_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,5,4,.9),rgba(6,5,4,.44)_55%,rgba(6,5,4,.18)),linear-gradient(0deg,rgba(6,5,4,.9),transparent_58%)]" />
      <div className="relative flex min-h-[34rem] flex-col justify-between p-7 sm:p-10">
        <span className="w-fit rounded-full border border-kintsugi-300/60 bg-black/34 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-kintsugi-200 backdrop-blur">
          Signature stay
        </span>
        <div className="max-w-2xl">
          <p className="luxury-kicker text-kintsugi-300">
            {hotel.neighborhood} · {HOTEL_TIER_LABEL[hotel.tier]}
          </p>
          <h2 className="luxury-display mt-4 max-w-[10ch] text-[clamp(3rem,7vw,6.2rem)] font-semibold text-white">
            {hotel.name}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/80">
            {hotel.notes}
          </p>
        </div>
      </div>
    </article>
  );
}

function CompactHotelFeature({
  hotel,
}: {
  hotel: ReturnType<typeof getHotels>[number];
}) {
  return (
    <article className="relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/16 bg-sumi-900 shadow-editorial-deep">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HOTEL_IMAGES[hotel.slug] ?? FALLBACK_HOTEL_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,5,4,.9),rgba(6,5,4,.2)_64%)]" />
      <div className="relative flex min-h-72 flex-col justify-end p-6">
        <p className="luxury-kicker text-kintsugi-300">
          {HOTEL_TIER_LABEL[hotel.tier]}
        </p>
        <h3 className="mt-2 font-sans text-3xl font-semibold leading-tight text-white">
          {hotel.name}
        </h3>
      </div>
    </article>
  );
}
