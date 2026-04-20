import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FxCardCta } from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { PageHero } from "@/components/layout/PageHero";
import {
  getCity,
  getCountryForCity,
  getCountryPayments,
  type AcceptanceLevel,
} from "@/lib/data/seed";

const LEVEL_LABEL: Record<AcceptanceLevel, string> = {
  yes: "Yes",
  often: "Often",
  sometimes: "Sometimes",
  rare: "Rarely",
};

const LEVEL_STYLES: Record<AcceptanceLevel, string> = {
  yes: "bg-emerald-100 text-emerald-900",
  often: "bg-sky-100 text-sky-900",
  sometimes: "bg-amber-100 text-amber-900",
  rare: "bg-rose-100 text-rose-900",
};

const METHOD_ACCEPT_LABEL: Record<string, string> = {
  ubiquitous: "Ubiquitous",
  common: "Common",
  limited: "Limited",
  rare: "Rare",
};

export function generateMetadata(): Metadata {
  return {
    title: "Payments & cards",
    description:
      "Can I pay by Apple Pay at a ramen shop? Yes/Often/Sometimes/Rarely across 11 methods × 9 venue types.",
  };
}

export default async function PaymentsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const payments = getCountryPayments(countrySlug);
  if (!payments) notFound();

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Payments & cards" },
        ]}
        kanji="現"
        eyebrow="Payments & cards"
        title={`Paying in ${city.name}`}
        subtitle="支 払"
        lede={payments.summary}
        palette="enji"
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
      <section className="mt-0">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Acceptance by method
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {payments.methods.map((m) => (
            <article
              key={m.key}
              className="rounded-md border border-slate-200 p-3"
            >
              <header className="flex items-baseline justify-between gap-2">
                <div className="font-medium">{m.label}</div>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  {METHOD_ACCEPT_LABEL[m.accepted_level] ?? m.accepted_level}
                </span>
              </header>
              {m.notes && (
                <p className="mt-1 text-sm text-slate-600">{m.notes}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Method × venue matrix
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Green = yes, blue = often, amber = sometimes, rose = rare. Hover a
          cell for context.
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-3 py-2 font-medium text-slate-700">Venue</th>
                {payments.methods.map((m) => (
                  <th
                    key={m.key}
                    className="px-2 py-2 font-medium text-slate-700 text-center whitespace-nowrap"
                  >
                    {m.label.replace(" (with Suica or Visa)", "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.venues.map((v) => (
                <tr key={v.key}>
                  <th className="px-3 py-2 text-left font-medium text-slate-900 whitespace-nowrap">
                    {v.label}
                  </th>
                  {payments.methods.map((m) => {
                    const level = v.accepts[m.key] ?? "rare";
                    return (
                      <td
                        key={m.key}
                        className="px-2 py-2 text-center"
                        title={`${v.label} · ${m.label}: ${LEVEL_LABEL[level]}`}
                      >
                        <span
                          className={`inline-block rounded px-1.5 py-0.5 ${LEVEL_STYLES[level]}`}
                        >
                          {LEVEL_LABEL[level]}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg border border-slate-200 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            ATMs for foreign cards
          </h3>
          <p className="mt-2 text-sm text-slate-700">{payments.atm_notes}</p>
        </article>
        <article className="rounded-lg border border-slate-200 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Tax-free shopping
          </h3>
          <p className="mt-2 text-sm text-slate-700">{payments.tax_refund_note}</p>
        </article>
      </section>

      <div className="mt-10">
        <FxCardCta source="payments-bottom" />
      </div>
      <AffiliateDisclosure />
      </div>
    </main>
  );
}
