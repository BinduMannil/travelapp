import Link from "next/link";
import type { Restaurant } from "@/lib/data/seed";
import { CUISINE_LABELS, popularityScore } from "@/lib/data/seed";
import { PriceDisplay } from "@/lib/preferences/context";
import { CoverTile, restaurantCover } from "@/components/common/CoverTile";

const RESTAURANT_IMAGES: Record<string, string> = {
  sushi:
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=82",
  ramen:
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=82",
  tempura:
    "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=1200&q=82",
  kaiseki:
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=82",
  yakitori:
    "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?auto=format&fit=crop&w=1200&q=82",
  default:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=82",
};

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
  const imageUrl =
    RESTAURANT_IMAGES[restaurant.cuisine[0] ?? ""] ?? RESTAURANT_IMAGES.default;
  const accolade =
    restaurant.michelin_stars > 0
      ? `${"★".repeat(restaurant.michelin_stars)} Michelin`
      : restaurant.bib_gourmand
        ? "Bib Gourmand"
        : null;

  return (
    <Link
      href={`/city/${citySlug}/restaurants/${restaurant.slug}`}
      className="group block overflow-hidden rounded-[1.25rem] border border-white/12 bg-sumi-900 text-white shadow-editorial-deep transition hover:-translate-y-1 hover:border-kintsugi-300/55"
    >
      {/* Cover with overlaid badges */}
      <div className="relative">
        <CoverTile
          palette={cover.palette}
          kanji={cover.kanji}
          imageUrl={imageUrl}
          imageAlt={restaurant.name}
          aspect="3/2"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.22)_38%,rgba(0,0,0,.84))]" />
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

      <div className="p-5 sm:p-6">
        <h2 className="font-display text-[clamp(1.3rem,4vw,1.85rem)] font-semibold leading-tight text-white group-hover:text-kintsugi-300">
          {restaurant.name}
        </h2>

        {restaurant.signature_dishes.length > 0 && (
          <p className="mt-3 line-clamp-2 text-sm leading-7 text-white/66">
            {restaurant.signature_dishes.slice(0, 2).join(" · ")}
          </p>
        )}

        <div className="mt-5 flex items-baseline justify-between border-t border-white/12 pt-4 text-xs">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/42">
              Per person
            </div>
            <div className="mt-1 text-sm font-semibold text-white tabular-nums">
              <PriceDisplay
                amountMinor={restaurant.avg_price_per_person_minor}
                currency={restaurant.currency}
              />
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/42">
              Reviews
            </div>
            <div className="mt-1 text-sm font-semibold text-white tabular-nums">
              {restaurant.google_rating.toFixed(1)}
              <span className="ml-0.5 text-xs text-kintsugi-500">★</span>
              <span className="ml-1 text-[10px] font-normal text-white/42">
                ({restaurant.google_review_count.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
