import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getNeighborhoods } from "@/lib/data/seed";
import { CoverTile, neighborhoodCover } from "@/components/common/CoverTile";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Neighborhoods",
    description:
      "Tokyo's districts at a glance — vibe, who each one suits best, and how to get there.",
  };
}

export default async function NeighborhoodsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const neighborhoods = getNeighborhoods(slug);

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Neighborhoods" },
        ]}
        kanji="街"
        eyebrow="Neighborhoods"
        title={`Neighborhoods`}
        subtitle="地 区"
        lede={`Pick the one that matches your speed. The right base changes your trip more than any single attraction.`}
        palette="aizome"
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
<section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {neighborhoods.map((n) => {
          const cover = neighborhoodCover(n.vibe);
          return (
            <Link
              key={n.slug}
              href={`/city/${slug}/neighborhoods/${n.slug}`}
              className="group block overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
            >
              <CoverTile
                palette={cover.palette}
                kanji={cover.kanji}
                aspect="3/2"
                badge={n.vibe[0]}
              />
              <div className="p-5">
                <h2 className="font-display text-xl font-semibold text-sumi-900">
                  {n.name}
                </h2>
                <p className="mt-2 text-sm text-sumi-700">{n.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1 text-xs">
                  {n.vibe.slice(0, 4).map((v) => (
                    <span
                      key={v}
                      className="rounded-full bg-washi-100 px-2 py-0.5 text-sumi-700"
                    >
                      {v}
                    </span>
                  ))}
                </div>
                {n.best_for.length > 0 && (
                  <p className="mt-4 text-xs text-sumi-700">
                    <strong>Best for:</strong> {n.best_for.join(", ")}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
    </main>
  );
}
