import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCountry, getCountryBeverages } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";
import { BeverageCard } from "@/components/beverages/BeverageCard";

const CATEGORY_LABEL: Record<string, string> = {
  tea: "Tea",
  coffee: "Coffee",
  alcohol: "Alcohol",
};

const CATEGORY_ORDER = ["alcohol", "tea", "coffee"] as const;

export function generateMetadata(): Metadata {
  return {
    title: "Tea, coffee & alcohol",
    description:
      "Tea-or-coffee verdict, the country's signature alcoholic drinks, and where to try each.",
  };
}

export default async function BeveragesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  const data = getCountryBeverages(slug);
  if (!country || !data) notFound();

  const grouped = new Map<string, typeof data.drinks>();
  for (const d of data.drinks) {
    const list = grouped.get(d.category) ?? [];
    list.push(d);
    grouped.set(d.category, list);
  }

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: country.name, href: `/country/${slug}` },
          { label: "Tea, coffee & alcohol" },
        ]}
        kanji="酒"
        eyebrow="Tea, coffee & alcohol"
        title="What people drink here"
        subtitle="飲 物"
        lede={data.summary}
        palette="kintsugi"
      />

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Tea-or-coffee verdict card */}
        <section className="overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm">
          <div className="grid items-stretch sm:grid-cols-[140px_1fr]">
            <div
              className={`flex items-center justify-center bg-gradient-to-br p-6 font-display text-5xl text-white ${
                data.tea_or_coffee.verdict === "tea"
                  ? "from-matcha-500 via-matcha-700 to-aizome-900"
                  : data.tea_or_coffee.verdict === "coffee"
                    ? "from-sumi-700 via-sumi-900 to-black"
                    : "from-kintsugi-300 via-kintsugi-500 to-enji-700"
              }`}
            >
              {data.tea_or_coffee.verdict === "tea"
                ? "茶"
                : data.tea_or_coffee.verdict === "coffee"
                  ? "珈"
                  : "両"}
            </div>
            <div className="p-5 sm:p-6">
              <div className="text-[11px] uppercase tracking-[0.25em] text-sumi-700">
                Tea or coffee?
              </div>
              <h2 className="mt-1 font-display text-xl font-semibold text-sumi-900">
                {data.tea_or_coffee.headline}
              </h2>
              <p className="mt-3 text-sumi-800">{data.tea_or_coffee.body}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Note label="Tea culture" tint="matcha">
                  {data.tea_or_coffee.tea_culture_notes}
                </Note>
                <Note label="Coffee culture" tint="sumi">
                  {data.tea_or_coffee.coffee_culture_notes}
                </Note>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-8 text-[11px] uppercase tracking-[0.25em] text-sumi-700">
          Tap any drink for how to order it and where locals go.
        </p>

        {CATEGORY_ORDER.filter((c) => grouped.has(c)).map((cat) => (
          <section key={cat} id={`cat-${cat}`} className="mt-6">
            <h2 className="px-5 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
              {CATEGORY_LABEL[cat]}
            </h2>
            <div className="mt-3 space-y-3">
              {(grouped.get(cat) ?? []).map((d) => (
                <BeverageCard key={d.slug} drink={d} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function Note({
  label,
  tint,
  children,
}: {
  label: string;
  tint: "matcha" | "sumi";
  children: React.ReactNode;
}) {
  const tintClass =
    tint === "matcha"
      ? "border-matcha-400/40 bg-matcha-100/60"
      : "border-sumi-100 bg-washi-100";
  return (
    <div className={`rounded-lg border p-3 ${tintClass}`}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sumi-700">
        {label}
      </div>
      <p className="mt-1 text-sumi-900">{children}</p>
    </div>
  );
}
