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

export function AttractionCard({
  citySlug,
  attraction,
}: {
  citySlug: string;
  attraction: Attraction;
}) {
  const importanceStars = "★".repeat(attraction.importance);
  const cover = attractionCover(attraction.category);

  return (
    <Link
      href={`/city/${citySlug}/attractions/${attraction.slug}`}
      className="group block overflow-hidden rounded-2xl border border-washi-200 bg-white transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg"
    >
      <CoverTile
        palette={cover.palette}
        kanji={cover.kanji}
        aspect="3/2"
        badge={attraction.neighborhood}
      />
      <div className="p-4">
        <header className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold">{attraction.name}</h2>
          <span
            className="text-xs text-amber-600"
            title={`Importance ${attraction.importance}/5`}
            aria-label={`Importance ${attraction.importance} of 5`}
          >
            {importanceStars}
          </span>
        </header>
        <p className="mt-2 text-sm text-sumi-800">{attraction.summary}</p>

      <div className="mt-3 flex flex-wrap gap-1 text-xs">
        {attraction.significance.slice(0, 3).map((s) => (
          <span
            key={s}
            className="rounded bg-washi-100 px-2 py-0.5 text-sumi-800"
          >
            {SIGNIFICANCE_LABEL[s] ?? s}
          </span>
        ))}
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-sumi-700">
        <div>
          <dt className="inline font-medium text-sumi-700">Time: </dt>
          <dd className="inline">{formatDuration(attraction.duration_minutes)}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-sumi-700">Cost: </dt>
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
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-800">
            Kid-friendly
          </span>
        )}
        {attraction.accessibility.wheelchair_accessible && (
          <span className="rounded bg-sky-50 px-1.5 py-0.5 text-sky-800">
            Wheelchair
          </span>
        )}
        {attraction.indoor && (
          <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-indigo-800">
            Indoor
          </span>
        )}
        {!attraction.photography_allowed && (
          <span className="rounded bg-rose-50 px-1.5 py-0.5 text-rose-800">
            No photos
          </span>
        )}
      </div>
      </div>
    </Link>
  );
}
