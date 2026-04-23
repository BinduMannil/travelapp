import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MoneyText } from "@/components/common/MoneyText";
import { getCity, getTransitOptions } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

const PAYMENT_LABELS: Record<string, string> = {
  suica: "Suica",
  pasmo: "PASMO",
  ic_card: "IC card",
  cash: "Cash",
  cash_single_ticket: "Paper ticket",
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  apple_pay: "Apple Pay",
};

const MODE_META: Record<
  string,
  { label: string; kanji: string; accent: string }
> = {
  metro: { label: "Metro / Subway", kanji: "地", accent: "aizome" },
  jr: { label: "JR heavy rail", kanji: "鉄", accent: "matcha" },
  taxi: { label: "Taxi", kanji: "車", accent: "kintsugi" },
  bus: { label: "Bus", kanji: "バ", accent: "enji" },
  bike: { label: "Bike", kanji: "輪", accent: "matcha" },
  walk: { label: "Walk", kanji: "歩", accent: "sumi" },
};

const ACCENT_TILE: Record<string, string> = {
  aizome: "bg-aizome-500 text-white",
  matcha: "bg-matcha-600 text-white",
  kintsugi: "bg-kintsugi-500 text-white",
  enji: "bg-enji-600 text-white",
  sumi: "bg-sumi-900 text-white",
};

export function generateMetadata(): Metadata {
  return {
    title: "Getting around",
    description:
      "Every way to get around the city ranked by usefulness, with pros, cons, prices, and payment methods.",
  };
}

export default async function TransitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const options = getTransitOptions(slug);

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Getting around" },
        ]}
        kanji="交"
        eyebrow="Getting around"
        title={`Getting around ${city.name}`}
        subtitle="交 通"
        lede="An IC card (Suica or PASMO) works on almost every train, subway, and bus — and at most convenience stores. Get one in the first hour after you land; it is by far the most versatile payment method."
        palette="sumi"
      />

      <section className="mx-auto max-w-5xl space-y-4 px-6 py-12">
        {options.map((o) => {
          const meta =
            MODE_META[o.mode] ?? {
              label: o.mode,
              kanji: "駅",
              accent: "sumi",
            };
          return (
            <article
              key={o.mode}
              className="rounded-2xl border border-washi-200 bg-white p-5 shadow-sm"
            >
              <header className="flex items-start gap-4">
                <span
                  aria-hidden
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-xl font-bold ${ACCENT_TILE[meta.accent] ?? ACCENT_TILE.sumi}`}
                >
                  {meta.kanji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sumi-700">
                    {meta.label}
                  </div>
                  <h2 className="mt-0.5 !font-sans text-base font-semibold leading-tight text-sumi-900">
                    {o.name}
                    {o.recommended && (
                      <span className="ml-2 rounded-full bg-matcha-100 px-2 py-0.5 align-middle text-[9px] font-semibold uppercase tracking-[0.2em] text-matcha-700">
                        Recommended
                      </span>
                    )}
                  </h2>
                  <p className="mt-1 text-sm text-sumi-700"><MoneyText>{o.price_note}</MoneyText></p>
                </div>
              </header>

              {(o.pros.length > 0 || o.cons.length > 0) && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {o.pros.length > 0 && (
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-700">
                        Pros
                      </div>
                      <ul className="mt-1.5 space-y-1.5 text-sm text-sumi-800">
                        {o.pros.map((p, i) => (
                          <li key={i} className="flex gap-2">
                            <span
                              aria-hidden
                              className="mt-0.5 shrink-0 text-emerald-600"
                            >
                              +
                            </span>
                            <span className="flex-1 leading-snug">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {o.cons.length > 0 && (
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rose-700">
                        Cons
                      </div>
                      <ul className="mt-1.5 space-y-1.5 text-sm text-sumi-800">
                        {o.cons.map((c, i) => (
                          <li key={i} className="flex gap-2">
                            <span
                              aria-hidden
                              className="mt-0.5 shrink-0 text-rose-500"
                            >
                              −
                            </span>
                            <span className="flex-1 leading-snug">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {(o.payment_methods.length > 0 || o.url) && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-washi-200 pt-3">
                  {o.payment_methods.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-sumi-700">
                        Pays with
                      </span>
                      {o.payment_methods.map((m) => (
                        <span
                          key={m}
                          className="rounded-full border border-washi-300 bg-washi-100 px-2 py-0.5 text-[11px] text-sumi-800"
                        >
                          {PAYMENT_LABELS[m] ?? m}
                        </span>
                      ))}
                    </div>
                  )}
                  {o.url && (
                    <a
                      href={o.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-enji-600 hover:underline"
                    >
                      Official info →
                    </a>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
