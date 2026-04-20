import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getItineraries,
  getItinerary,
  type ItineraryBlock,
} from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

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
      <div className="w-16 shrink-0 text-right tabular-nums text-sm text-sumi-700">
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
          <p className="text-sm text-sumi-700">{block.note}</p>
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
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Itineraries", href: `/city/${slug}/itinerary` },
          { label: t.name },
        ]}
        kanji="旅"
        eyebrow={`${t.days} days · Pace ${t.pace}`}
        title={t.name}
        subtitle={t.trip_type_slugs.join(" · ")}
        lede={t.summary}
        palette="matcha"
      />
      <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-xs uppercase tracking-[0.25em] text-sumi-700">
        Best for: {t.best_for.join(", ")}
      </p>

      <section className="mt-8 space-y-8">
        {t.sections.map((sec) => (
          <article
            key={sec.day}
            className="rounded-lg border border-washi-200 p-6"
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

      <section className="mt-10 rounded-lg border border-dashed border-washi-200 bg-washi-100 p-5 text-sm text-sumi-700">
        <strong className="text-sumi-900">Heads-up:</strong> reservations
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
      </div>
    </main>
  );
}

export function generateStaticParams() {
  const list = getItineraries("tokyo");
  return list.map((t) => ({ slug: "tokyo", template: t.slug }));
}
