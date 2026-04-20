import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, getCountryFamousFor } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";
import { FamousCard } from "@/components/famous/FamousCard";

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
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: country.name, href: `/country/${slug}` },
          { label: "Famous for" },
        ]}
        kanji="和"
        eyebrow="Famous for"
        title={`Famous for`}
        subtitle="和 流"
        lede={`Beyond food — the things craftspeople, chefs, and designers fly in to buy.`}
        palette="kintsugi"
      />
      <div className="mx-auto max-w-5xl px-6 py-12">
<nav className="mt-6 flex flex-wrap gap-2 text-xs">
        {data.categories.map((c) => (
          <a
            key={c.slug}
            href={`#cat-${c.slug}`}
            className="rounded-full border border-washi-200 bg-white px-3 py-1 text-sumi-800 hover:border-brand-500 hover:text-brand-700"
          >
            {c.label}
          </a>
        ))}
      </nav>

      <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-sumi-700">
        Tap any card for where to find it.
      </p>
      <div className="mt-4 space-y-10">
        {data.categories.map((c) => (
          <section key={c.slug} id={`cat-${c.slug}`} className="scroll-mt-16">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
              {c.label}
            </h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {c.items.map((it) => (
                <FamousCard key={it.name} item={it} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
    </main>
  );
}
