import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CUISINE_LABELS,
  DIETARY_LABELS,
  getCity,
  getRestaurant,
  getRestaurants,
  popularityScore,
} from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
  PriceDisplay,
} from "@/lib/preferences/context";
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

const DAY_LABEL: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; restaurant: string }>;
}): Promise<Metadata> {
  const { slug, restaurant } = await params;
  const r = getRestaurant(slug, restaurant);
  if (!r) return { title: "Restaurant" };
  return {
    title: r.name,
    description: r.signature_dishes.length
      ? `${r.cuisine.map((c) => CUISINE_LABELS[c] ?? c).join(", ")} in ${r.neighborhood}. Known for ${r.signature_dishes.slice(0, 2).join(" and ")}.`
      : `${r.cuisine.map((c) => CUISINE_LABELS[c] ?? c).join(", ")} in ${r.neighborhood}.`,
  };
}

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ slug: string; restaurant: string }>;
}) {
  const { slug, restaurant } = await params;
  const city = getCity(slug);
  const r = getRestaurant(slug, restaurant);
  if (!city || !r) notFound();

  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);
  const score = popularityScore(r).toFixed(1);

  const eyebrowBits = [
    r.neighborhood,
    r.price_band,
    r.michelin_stars > 0 ? `${"★".repeat(r.michelin_stars)} Michelin` : null,
    r.bib_gourmand ? "Bib Gourmand" : null,
  ].filter(Boolean) as string[];

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Restaurants", href: `/city/${slug}/restaurants` },
          { label: r.name },
        ]}
        kanji="食"
        eyebrow={eyebrowBits.join(" · ")}
        title={r.name}
        subtitle={r.cuisine.map((c) => CUISINE_LABELS[c] ?? c).join(" · ")}
        lede={
          r.signature_dishes.length
            ? `Known for ${r.signature_dishes.slice(0, 2).join(" and ")}. Popularity ${score} / 10.`
            : `Popularity ${score} / 10.`
        }
        palette="enji"
      />
      <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-wrap gap-1 text-xs">
        {r.cuisine.map((c) => (
          <span
            key={c}
            className="rounded-full bg-washi-100 px-2.5 py-1 text-sumi-800"
          >
            {CUISINE_LABELS[c] ?? c}
          </span>
        ))}
      </div>

      <CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-6 flex items-center justify-end">
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="mt-4 grid grid-cols-2 gap-3 rounded-lg border border-washi-200 bg-washi-100 p-4 text-sm sm:grid-cols-4">
          <Fact label="Per person">
            <PriceDisplay
              amountMinor={r.avg_price_per_person_minor}
              currency={r.currency}
            />
          </Fact>
          <Fact label="Google">
            {r.google_rating.toFixed(1)}★ ·{" "}
            {r.google_review_count.toLocaleString()}
          </Fact>
          {r.tabelog_score && (
            <Fact label="Tabelog">{r.tabelog_score.toFixed(2)}</Fact>
          )}
          <Fact label="Reservation">
            {r.reservation_required
              ? r.reservations_lead_time_days > 0
                ? `T-${r.reservations_lead_time_days} days`
                : "Required"
              : "Walk-in OK"}
          </Fact>
        </section>

        <section className="mt-6">
          <h2 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
            Signature dishes
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sumi-900">
            {r.signature_dishes.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>

        {r.notes && (
          <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <div className="text-xs font-semibold uppercase tracking-[0.25em]">
              Good to know
            </div>
            <p className="mt-1 text-sm leading-relaxed">{r.notes}</p>
          </section>
        )}

        <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Hours
            </h3>
            <p className="mt-2 text-sm text-sumi-900">{r.opening_hours}</p>
            {r.closed_days.length > 0 && (
              <p className="mt-1 text-xs text-sumi-700">
                Closed:{" "}
                {r.closed_days
                  .map((d) => DAY_LABEL[d] ?? d)
                  .join(", ")}
              </p>
            )}
          </div>
          <div>
            <h3 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Dietary
            </h3>
            {r.dietary.length === 0 ? (
              <p className="mt-2 text-sm text-sumi-700">
                No specific dietary labels. Ask when ordering.
              </p>
            ) : (
              <ul className="mt-2 flex flex-wrap gap-1 text-xs">
                {r.dietary.map((d) => (
                  <li
                    key={d}
                    className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-800"
                  >
                    {DIETARY_LABELS[d] ?? d}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Accessibility
            </h3>
            <p className="mt-2 text-sm text-sumi-900">
              {r.wheelchair_accessible
                ? "Wheelchair accessible"
                : "Not wheelchair accessible"}
            </p>
          </div>
          <div>
            <h3 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Inclusive
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-sumi-900">
              <li>Kids welcome: {r.kid_friendly ? "Yes" : "Not ideal"}</li>
              <li>LGBTQ+ friendly: {r.lgbtq_friendly ? "Yes" : "Check locally"}</li>
            </ul>
          </div>
        </section>

        {r.reservation_url && (
          <section className="mt-8 rounded-lg border border-washi-200 p-5">
            <h3 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Book
            </h3>
            <a
              href={r.reservation_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-md bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700"
            >
              Reservation page →
            </a>
            {r.reservations_lead_time_days >= 30 && (
              <p className="mt-3 text-xs text-sumi-700">
                Tables typically open {r.reservations_lead_time_days} days
                before the reservation date.
              </p>
            )}
          </section>
        )}
      </CurrencyProvider>
      </div>
    </main>
  );
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.25em] text-sumi-700">
        {label}
      </div>
      <div className="mt-0.5 font-semibold tabular-nums">{children}</div>
    </div>
  );
}

export function generateStaticParams() {
  const tokyoRestaurants = getRestaurants("tokyo");
  return tokyoRestaurants.map((r) => ({
    slug: "tokyo",
    restaurant: r.slug,
  }));
}
