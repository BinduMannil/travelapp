import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getNeighborhoods } from "@/lib/data/seed";

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
    <main className="mx-auto max-w-6xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        · Neighborhoods
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        {city.name} neighborhoods
      </h1>
      <p className="mt-3 text-slate-600">
        Pick the one that matches your speed. The right base changes your trip
        more than any single attraction.
      </p>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {neighborhoods.map((n) => (
          <Link
            key={n.slug}
            href={`/city/${slug}/neighborhoods/${n.slug}`}
            className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-brand-500 hover:bg-brand-50"
          >
            <h2 className="text-lg font-semibold">{n.name}</h2>
            <p className="mt-1 text-sm text-slate-700">{n.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1 text-xs">
              {n.vibe.slice(0, 4).map((v) => (
                <span
                  key={v}
                  className="rounded bg-slate-100 px-2 py-0.5 text-slate-700"
                >
                  {v}
                </span>
              ))}
            </div>
            {n.best_for.length > 0 && (
              <p className="mt-3 text-xs text-slate-500">
                Best for: {n.best_for.join(", ")}
              </p>
            )}
          </Link>
        ))}
      </section>
    </main>
  );
}
