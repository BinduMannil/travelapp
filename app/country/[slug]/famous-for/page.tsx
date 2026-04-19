import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, getCountryFamousFor } from "@/lib/data/seed";

export function generateMetadata(): Metadata {
  return {
    title: "Famous for",
    description:
      "What the country exports to the world — crafts, food, pop culture, design, and wellness traditions worth a detour.",
  };
}

export default async function FamousForPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  const data = getCountryFamousFor(slug);
  if (!country || !data) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/country/${slug}`} className="hover:underline">
          {country.name}
        </Link>{" "}
        · Famous for
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        What {country.name} is famous for
      </h1>
      <p className="mt-3 text-slate-600">{data.summary}</p>

      <nav className="mt-6 flex flex-wrap gap-2 text-xs">
        {data.categories.map((c) => (
          <a
            key={c.slug}
            href={`#cat-${c.slug}`}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 hover:border-brand-500 hover:text-brand-700"
          >
            {c.label}
          </a>
        ))}
      </nav>

      <div className="mt-6 space-y-10">
        {data.categories.map((c) => (
          <section key={c.slug} id={`cat-${c.slug}`} className="scroll-mt-16">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {c.label}
            </h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {c.items.map((it) => (
                <article
                  key={it.name}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <h3 className="font-semibold">{it.name}</h3>
                  <p className="mt-1 text-sm text-slate-700">{it.why}</p>
                  {it.where_to_buy && (
                    <p className="mt-2 text-xs text-slate-500">
                      <strong>Where:</strong> {it.where_to_buy}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
