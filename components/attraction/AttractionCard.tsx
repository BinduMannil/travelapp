import Link from "next/link";
import type { Attraction } from "@/lib/data/seed";
import { PriceDisplay } from "@/lib/preferences/context";
import { CoverTile, attractionCover } from "@/components/common/CoverTile";

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

const SIGNIFICANCE_LABEL: Record<string, string> = {
  historic: "Historic",
  religious: "Religious",
  nature: "Nature",
  scenic: "Scenic",
  architectural: "Architectural",
  cultural: "Cultural",
  activity: "Activity",
  culinary: "Culinary",
  shopping: "Shopping",
};

const ATTRACTION_IMAGES: Record<string, string> = {
  religious:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=82",
  landmark:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=82",
  art:
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1200&q=82",
  park:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=82",
  museum:
    "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?auto=format&fit=crop&w=1200&q=82",
  district:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=82",
  default:
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=82",
};

export function AttractionCard({
  citySlug,
  attraction,
}: {
  citySlug: string;
  attraction: Attraction;
}) {
  const importanceStars = "★".repeat(attraction.importance);
  const cover = attractionCover(attraction.category);
  const imageUrl =
    ATTRACTION_IMAGES[attraction.category] ?? ATTRACTION_IMAGES.default;

  return (
    <Link
      href={`/city/${citySlug}/attractions/${attraction.slug}`}
      className="group block overflow-hidden rounded-[1.25rem] border border-white/12 bg-sumi-900 text-white shadow-editorial-deep transition hover:-translate-y-1 hover:border-kintsugi-300/55"
    >
      <CoverTile
        palette={cover.palette}
        kanji={cover.kanji}
        imageUrl={imageUrl}
        imageAlt={attraction.name}
        aspect="3/2"
        badge={attraction.neighborhood}
      />
      <div className="p-5 sm:p-6">
        <header className="flex items-baseline justify-between gap-3">
          <h2 className="font-sans text-[clamp(1.3rem,4vw,1.85rem)] font-semibold leading-tight text-white group-hover:text-kintsugi-300">
            {attraction.name}
          </h2>
          <span
            className="text-xs text-kintsugi-300"
            title={`Importance ${attraction.importance}/5`}
            aria-label={`Importance ${attraction.importance} of 5`}
          >
            {importanceStars}
          </span>
        </header>
        <p className="mt-3 text-sm leading-7 text-white/66">{attraction.summary}</p>

      <div className="mt-3 flex flex-wrap gap-1 text-xs">
        {attraction.significance.slice(0, 3).map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/12 bg-white/[0.07] px-2 py-0.5 text-white/66"
          >
            {SIGNIFICANCE_LABEL[s] ?? s}
          </span>
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-white/12 pt-4 text-xs text-white/58">
        <div>
          <dt className="inline font-medium text-white/72">Time: </dt>
          <dd className="inline">{formatDuration(attraction.duration_minutes)}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-white/72">Cost: </dt>
          <dd className="inline tabular-nums">
            {attraction.cost_adult_minor === 0 ? (
              "Free"
            ) : (
              <PriceDisplay
                amountMinor={attraction.cost_adult_minor}
                currency={attraction.currency}
              />
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex flex-wrap gap-1 text-[10px]">
        {attraction.kid_friendly && (
          <span className="rounded bg-emerald-300/16 px-1.5 py-0.5 text-emerald-100">
            Kid-friendly
          </span>
        )}
        {attraction.accessibility.wheelchair_accessible && (
          <span className="rounded bg-sky-300/16 px-1.5 py-0.5 text-sky-100">
            Wheelchair
          </span>
        )}
        {attraction.indoor && (
          <span className="rounded bg-indigo-300/16 px-1.5 py-0.5 text-indigo-100">
            Indoor
          </span>
        )}
        {!attraction.photography_allowed && (
          <span className="rounded bg-rose-300/16 px-1.5 py-0.5 text-rose-100">
            No photos
          </span>
        )}
      </div>
      </div>
    </Link>
  );
}
