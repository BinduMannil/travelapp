import Link from "next/link";
import type { Restaurant } from "@/lib/data/seed";
import { CUISINE_LABELS, popularityScore } from "@/lib/data/seed";
import { PriceDisplay } from "@/lib/preferences/context";
import { CoverTile, restaurantCover } from "@/components/common/CoverTile";

export function RestaurantCard({
  citySlug,
  restaurant,
}: {
  citySlug: string;
  restaurant: Restaurant;
}) {
  const score = popularityScore(restaurant);
  const stars = Math.max(1, Math.min(5, Math.round(score / 2)));
  const cover = restaurantCover(restaurant.cuisine);
  const cuisineLabel =
    CUISINE_LABELS[restaurant.cuisine[0]] ?? restaurant.cuisine[0];
  const accolade =
    restaurant.michelin_stars > 0
      ? `${"★".repeat(restaurant.michelin_stars)} Michelin`
      : restaurant.bib_gourmand
        ? "Bib Gourmand"
        : null;

  return (
    <Link
      href={`/city/${citySlug}/restaurants/${restaurant.slug}`}
      className="group block overflow-hidden rounded-2xl border border-washi-200 bg-white transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
    >
      {/* Cover with overlaid badges */}
      <div className="relative">
        <CoverTile
          palette={cover.palette}
          kanji={cover.kanji}
          aspect="3/2"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 font-display text-xs font-semibold text-sumi-900 shadow-sm">
          {restaurant.price_band}
        </span>
        {accolade && (
          <span className="absolute right-3 top-3 rounded-full bg-sumi-900/85 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-kintsugi-300 backdrop-blur-sm">
            {accolade}
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 text-white">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/80">
              {restaurant.neighborhood} · {cuisineLabel}
            </div>
          </div>
          <div
            aria-label={`Popularity ${stars} of 5`}
            className="text-xs tabular-nums tracking-tight text-kintsugi-300 drop-shadow"
          >
            {"★".repeat(stars)}
            <span className="text-white/30">{"★".repeat(5 - stars)}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h2 className="font-display text-lg font-semibold leading-snug text-sumi-900 group-hover:text-enji-700">
          {restaurant.name}
        </h2>

        {restaurant.signature_dishes.length > 0 && (
          <p className="mt-1.5 line-clamp-2 text-sumi-800">
            {restaurant.signature_dishes.slice(0, 2).join(" · ")}
          </p>
        )}

        <div className="mt-4 flex items-baseline justify-between border-t border-washi-200 pt-3 text-xs">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-sumi-700">
              Per person
            </div>
            <div className="mt-0.5 text-sm font-semibold text-sumi-900 tabular-nums">
              <PriceDisplay
                amountMinor={restaurant.avg_price_per_person_minor}
                currency={restaurant.currency}
              />
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.25em] text-sumi-700">
              Reviews
            </div>
            <div className="mt-0.5 text-sm font-semibold text-sumi-900 tabular-nums">
              {restaurant.google_rating.toFixed(1)}
              <span className="ml-0.5 text-xs text-kintsugi-500">★</span>
              <span className="ml-1 text-[10px] font-normal text-sumi-700">
                ({restaurant.google_review_count.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
