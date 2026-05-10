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

  const firstCategory = orderedCategories[0];
  const firstEntries = firstCategory ? grouped.get(firstCategory) ?? [] : [];

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Good to know" },
        ]}
        kanji="知"
        eyebrow="Good to know"
        title="Good to know"
        subtitle="心 得"
        lede="The small things that keep a trip smooth — etiquette, toilets, trash rules, escalator sides, tax-free shopping, visa extensions."
        palette="sumi"
      />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <nav className="flex flex-wrap gap-3 text-xs">
          {orderedCategories.map((c) => (
            <a
              key={c}
              href={`#cat-${c}`}
              className="rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 font-semibold text-white/82 backdrop-blur transition hover:border-kintsugi-300 hover:bg-kintsugi-300 hover:text-sumi-950"
            >
              {GOOD_TO_KNOW_CATEGORY_LABEL[c] ?? c}
            </a>
          ))}
        </nav>

        {firstCategory && (
          <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="rounded-[1.45rem] border border-white/14 bg-[linear-gradient(180deg,rgba(34,31,28,0.94),rgba(13,12,11,0.96))] p-7 shadow-editorial-deep">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-kintsugi-200">
                Start here
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.92] text-white">
                Small rules shape the whole day.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/74">
                These notes are not trivia. They are the tiny operating system of
                a smoother trip: what to do, what to avoid, and what will surprise
                you before breakfast.
              </p>
            </aside>

            <div className="rounded-[1.45rem] border border-white/15 bg-[linear-gradient(135deg,rgba(244,238,224,0.99),rgba(229,219,199,0.96))] p-6 text-sumi-950 shadow-editorial-deep sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-enji-700">
                {GOOD_TO_KNOW_CATEGORY_LABEL[firstCategory] ?? firstCategory}
              </p>
              <div className="mt-5 space-y-5">
                {firstEntries.slice(0, 3).map((e) => (
                  <article key={e.title} className="border-t border-sumi-900/10 pt-5">
                    <h3 className="font-display text-2xl font-semibold leading-tight">
                      {e.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-sumi-800">
                      {e.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="mt-12 space-y-12">
          {orderedCategories.map((cat) => (
            <section key={cat} id={`cat-${cat}`} className="scroll-mt-20">
              <header className="mb-5 flex items-end justify-between gap-5 border-b border-white/12 pb-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.34em] text-kintsugi-200">
                  {GOOD_TO_KNOW_CATEGORY_LABEL[cat] ?? cat}
                </h2>
                <span className="text-xs font-medium text-white/48">
                  {(grouped.get(cat) ?? []).length} notes
                </span>
              </header>
              <div className="grid gap-4 md:grid-cols-2">
                {(grouped.get(cat) ?? []).map((e) => (
                  <article
                    key={e.title}
                    className="rounded-[1.15rem] border border-white/14 bg-[linear-gradient(180deg,rgba(255,253,246,0.98),rgba(239,231,215,0.96))] p-5 text-sumi-950 shadow-editorial"
                  >
                    <h3 className="font-display text-2xl font-semibold leading-tight">
                      {e.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-sumi-800">
                      {e.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12">
          <InsuranceCta source="good-to-know-bottom" />
        </div>
        <AffiliateDisclosure />
      </div>
    </main>
  );
}
