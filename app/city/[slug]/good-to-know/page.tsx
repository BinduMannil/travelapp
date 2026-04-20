import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InsuranceCta } from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import {
  getCity,
  getCountryForCity,
  getCountryGoodToKnow,
  GOOD_TO_KNOW_CATEGORY_LABEL,
} from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Good to know",
    description:
      "Etiquette, toilet and trash culture, smoking rules, tax refund, address quirks, visa extensions, and kid and accessibility notes.",
  };
}

export default async function GoodToKnowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const entries = getCountryGoodToKnow(countrySlug);
  if (entries.length === 0) notFound();

  const grouped = new Map<string, typeof entries>();
  for (const e of entries) {
    const list = grouped.get(e.category) ?? [];
    list.push(e);
    grouped.set(e.category, list);
  }

  const orderedCategories = Array.from(grouped.keys()).sort((a, b) => {
    const labelA = GOOD_TO_KNOW_CATEGORY_LABEL[a] ?? a;
    const labelB = GOOD_TO_KNOW_CATEGORY_LABEL[b] ?? b;
    return labelA.localeCompare(labelB);
  });

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Good to know" },
        ]}
        kanji="知"
        eyebrow="Good to know"
        title={`Good to know`}
        subtitle="心 得"
        lede={`The small things that keep a trip smooth — etiquette, toilets, trash rules, escalator sides, tax-free shopping, visa extensions.`}
        palette="sumi"
      />
      <div className="mx-auto max-w-4xl px-6 py-12">
<nav className="mt-6 flex flex-wrap gap-2 text-xs">
        {orderedCategories.map((c) => (
          <a
            key={c}
            href={`#cat-${c}`}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 hover:border-brand-500 hover:text-brand-700"
          >
            {GOOD_TO_KNOW_CATEGORY_LABEL[c] ?? c}
          </a>
        ))}
      </nav>

      <div className="mt-6 space-y-8">
        {orderedCategories.map((cat) => (
          <section key={cat} id={`cat-${cat}`} className="scroll-mt-16">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {GOOD_TO_KNOW_CATEGORY_LABEL[cat] ?? cat}
            </h2>
            <div className="mt-2 space-y-2">
              {(grouped.get(cat) ?? []).map((e) => (
                <article
                  key={e.title}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    {e.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10">
        <InsuranceCta source="good-to-know-bottom" />
      </div>
      <AffiliateDisclosure />
    </div>
    </main>
  );
}
