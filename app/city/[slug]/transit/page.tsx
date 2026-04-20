import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getTransitOptions } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

const PAYMENT_LABELS: Record<string, string> = {
  suica: "Suica",
  pasmo: "PASMO",
  ic_card: "IC card",
  cash: "Cash",
  cash_single_ticket: "Cash (paper ticket)",
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  apple_pay: "Apple Pay",
};

const MODE_LABELS: Record<string, string> = {
  metro: "Metro / Subway",
  jr: "JR heavy rail",
  taxi: "Taxi",
  bus: "Bus",
  bike: "Bike",
  walk: "Walk",
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
        {options.map((o) => (
          <article
            key={o.mode}
            className="rounded-lg border border-slate-200 p-5"
          >
            <header className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  {MODE_LABELS[o.mode] ?? o.mode}
                </div>
                <h2 className="mt-0.5 text-xl font-semibold">
                  {o.name}
                  {o.recommended && (
                    <span className="ml-2 rounded bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 align-middle">
                      Recommended
                    </span>
                  )}
                </h2>
              </div>
              <div className="text-right text-sm text-slate-700">
                {o.price_note}
              </div>
            </header>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {o.pros.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Pros
                  </div>
                  <ul className="mt-1 space-y-1 text-sm text-slate-700">
                    {o.pros.map((p, i) => (
                      <li key={i}>· {p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {o.cons.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-rose-700">
                    Cons
                  </div>
                  <ul className="mt-1 space-y-1 text-sm text-slate-700">
                    {o.cons.map((c, i) => (
                      <li key={i}>· {c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {o.payment_methods.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500">Pays with:</span>
                {o.payment_methods.map((m) => (
                  <span
                    key={m}
                    className="rounded bg-slate-100 px-2 py-0.5 text-slate-700"
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
                className="mt-3 inline-block text-sm text-brand-600 underline"
              >
                Official info →
              </a>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
