import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getItineraries,
  getItinerary,
  type ItineraryBlock,
} from "@/lib/data/seed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; template: string }>;
}): Promise<Metadata> {
  const { slug, template } = await params;
  const t = getItinerary(slug, template);
  if (!t) return { title: "Itinerary" };
  return { title: t.name, description: t.summary };
}

function BlockLine({
  citySlug,
  block,
}: {
  citySlug: string;
  block: ItineraryBlock;
}) {
  const linkHref = block.attraction_slug
    ? `/city/${citySlug}/attractions/${block.attraction_slug}`
    : block.restaurant_slug
      ? `/city/${citySlug}/restaurants/${block.restaurant_slug}`
      : block.neighborhood_slug
        ? `/city/${citySlug}/neighborhoods/${block.neighborhood_slug}`
        : null;

  return (
    <li className="flex gap-4">
      <div className="w-16 shrink-0 text-right tabular-nums text-sm text-slate-500">
        {block.time}
      </div>
      <div className="flex-1">
        <div className="font-medium">
          {linkHref ? (
            <Link href={linkHref} className="text-brand-700 hover:underline">
              {block.title}
            </Link>
          ) : (
            block.title
          )}
        </div>
        {block.note && (
          <p className="text-sm text-slate-600">{block.note}</p>
        )}
      </div>
    </li>
  );
}

export default async function ItineraryDetailPage({
  params,
}: {
  params: Promise<{ slug: string; template: string }>;
}) {
  const { slug, template } = await params;
  const city = getCity(slug);
  const t = getItinerary(slug, template);
  if (!city || !t) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}/itinerary`} className="hover:underline">
          Itineraries
        </Link>{" "}
        · {t.name}
      </nav>

      <header className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">{t.name}</h1>
          <div className="mt-1 text-sm text-slate-500">
            {t.days} days · Pace: {t.pace}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 text-xs">
          {t.trip_type_slugs.map((s) => (
            <span
              key={s}
              className="rounded bg-brand-100 px-2 py-0.5 text-brand-800"
            >
              {s}
            </span>
          ))}
        </div>
      </header>

      <p className="mt-4 text-slate-700">{t.summary}</p>

      <p className="mt-4 text-xs text-slate-500">
        Best for: {t.best_for.join(", ")}
      </p>

      <section className="mt-8 space-y-8">
        {t.sections.map((sec) => (
          <article
            key={sec.day}
            className="rounded-lg border border-slate-200 p-6"
          >
            <h2 className="text-lg font-semibold">{sec.title}</h2>
            <ul className="mt-4 space-y-4">
              {sec.blocks.map((b, i) => (
                <BlockLine key={i} citySlug={slug} block={b} />
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
        <strong className="text-slate-900">Heads-up:</strong> reservations
        marked &ldquo;book ahead&rdquo; or &ldquo;T-30 days&rdquo; really do sell
        out that early. See{" "}
        <Link
          href={`/city/${slug}/calendar`}
          className="text-brand-600 underline"
        >
          holidays &amp; festivals
        </Link>{" "}
        before you lock in your dates.
      </section>
    </main>
  );
}

export function generateStaticParams() {
  const list = getItineraries("tokyo");
  return list.map((t) => ({ slug: "tokyo", template: t.slug }));
}
