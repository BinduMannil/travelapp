import Link from "next/link";
import type { Restaurant } from "@/lib/data/seed";
import { CUISINE_LABELS, DIETARY_LABELS, popularityScore } from "@/lib/data/seed";
import { PriceDisplay } from "@/lib/preferences/context";
import { CoverTile, restaurantCover } from "@/components/common/CoverTile";

export function RestaurantCard({
  citySlug,
  restaurant,
}: {
  citySlug: string;
  restaurant: Restaurant;
}) {
  const score = popularityScore(restaurant).toFixed(1);
  const cover = restaurantCover(restaurant.cuisine);

  return (
    <Link
      href={`/city/${citySlug}/restaurants/${restaurant.slug}`}
      className="group block overflow-hidden rounded-2xl border border-washi-200 bg-white transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg"
    >
      <CoverTile
        palette={cover.palette}
        kanji={cover.kanji}
        aspect="3/2"
        badge={restaurant.price_band}
      />
      <div className="p-4">
        <header className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
          <span className="rounded bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-800">
            {score} / 10
          </span>
        </header>
        <div className="mt-1 text-xs text-sumi-700">
          {restaurant.neighborhood}
          {restaurant.michelin_stars > 0 && (
            <span className="ml-2 text-amber-600">
              {"★".repeat(restaurant.michelin_stars)} Michelin
            </span>
          )}
          {restaurant.bib_gourmand && (
            <span className="ml-2 text-emerald-700">Bib Gourmand</span>
          )}
        </div>

      {restaurant.signature_dishes.length > 0 && (
        <p className="mt-2 text-sm text-sumi-800">
          {restaurant.signature_dishes.slice(0, 2).join(" · ")}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-1 text-xs">
        {restaurant.cuisine.slice(0, 3).map((c) => (
          <span
            key={c}
            className="rounded bg-washi-100 px-2 py-0.5 text-sumi-800"
          >
            {CUISINE_LABELS[c] ?? c}
          </span>
        ))}
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-sumi-700">
        <div>
          <dt className="inline font-medium text-sumi-700">Per person: </dt>
          <dd className="inline tabular-nums">
            <PriceDisplay
              amountMinor={restaurant.avg_price_per_person_minor}
              currency={restaurant.currency}
            />
          </dd>
        </div>
        <div>
          <dt className="inline font-medium text-sumi-700">Reviews: </dt>
          <dd className="inline tabular-nums">
            {restaurant.google_rating.toFixed(1)}★ ·{" "}
            {restaurant.google_review_count.toLocaleString()} on Google
            {restaurant.tabelog_score
              ? ` · ${restaurant.tabelog_score.toFixed(2)} on Tabelog`
              : ""}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex flex-wrap gap-1 text-[10px]">
        {restaurant.dietary.map((d) => (
          <span
            key={d}
            className="rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-800"
          >
            {DIETARY_LABELS[d] ?? d}
          </span>
        ))}
        {restaurant.reservation_required && (
          <span className="rounded bg-amber-50 px-1.5 py-0.5 text-amber-800">
            Reservation{" "}
            {restaurant.reservations_lead_time_days >= 30
              ? `T-${restaurant.reservations_lead_time_days}`
              : "needed"}
          </span>
        )}
        {restaurant.kid_friendly && (
          <span className="rounded bg-sky-50 px-1.5 py-0.5 text-sky-800">
            Kid-friendly
          </span>
        )}
      </div>
      </div>
    </Link>
  );
}
