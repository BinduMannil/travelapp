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
    <main className="editorial-page">
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
      {(() => {
        // Group methods by acceptance tier so the page reads "what works
        // everywhere" → "what works most places" → "what works only sometimes".
        const ORDER: Array<keyof typeof TIER_META> = [
          "ubiquitous",
          "common",
          "limited",
          "rare",
        ];
        const TIER_META = {
          ubiquitous: {
            label: "Works everywhere",
            sub: "Use without thinking.",
            dots: 4,
            accent: "matcha",
          },
          common: {
            label: "Works most places",
            sub: "Hotels, chains, department stores.",
            dots: 3,
            accent: "kintsugi",
          },
          limited: {
            label: "Works some places",
            sub: "Don't rely on it as your only option.",
            dots: 2,
            accent: "ume",
          },
          rare: {
            label: "Rarely works",
            sub: "Carry a backup.",
            dots: 1,
            accent: "enji",
          },
        } as const;

        const grouped = new Map<string, typeof payments.methods>();
        for (const m of payments.methods) {
          const tier = (TIER_META[m.accepted_level as keyof typeof TIER_META]
            ? m.accepted_level
            : "common") as keyof typeof TIER_META;
          const list = grouped.get(tier) ?? [];
          list.push(m);
          grouped.set(tier, list);
        }
        const carry = (grouped.get("ubiquitous") ?? [])
          .map((m) => m.label.split(" (")[0])
          .join(", ");

        return (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
              Acceptance by method
            </h2>

            {carry && (
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-matcha-400/40 bg-matcha-100/70 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white font-sans text-lg font-bold text-matcha-700 shadow-sm">
                  ¥
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-matcha-700">
                    What to carry
                  </div>
                  <div className="font-sans text-sumi-900">{carry}</div>
                </div>
              </div>
            )}

            <div className="mt-5 space-y-7">
              {ORDER.filter((tier) => grouped.has(tier)).map((tier) => {
                const meta = TIER_META[tier];
                return (
                  <div key={tier}>
                    <div className="flex items-baseline justify-between border-b border-washi-200 pb-2">
                      <div>
                        <div className="font-sans text-base font-semibold text-sumi-900">
                          {meta.label}
                        </div>
                        <div className="mt-0.5 text-xs text-sumi-700">
                          {meta.sub}
                        </div>
                      </div>
                      <SignalDots filled={meta.dots} accent={meta.accent} />
                    </div>

                    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                      {(grouped.get(tier) ?? []).map((m) => (
                        <li
                          key={m.key}
                          className="flex items-start gap-3 rounded-xl border border-washi-200 bg-white p-3 transition hover:border-enji-300 hover:shadow-sm"
                        >
                          <BrandTile mkey={m.key} label={m.label} />
                          <div className="min-w-0 flex-1">
                            <div className="font-sans text-sm font-semibold text-sumi-900">
                              {m.label}
                            </div>
                            {m.notes && (
                              <p className="mt-0.5 text-sumi-700">{m.notes}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })()}

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
          Method × venue matrix
        </h2>
        <p className="mt-1 text-xs text-sumi-700">
          Green = yes, blue = often, amber = sometimes, rose = rare. Hover a
          cell for context.
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-washi-200">
          <table className="min-w-full text-xs">
            <thead className="bg-washi-100 text-left">
              <tr>
                <th className="px-3 py-2 font-medium text-sumi-800">Venue</th>
                {payments.methods.map((m) => (
                  <th
                    key={m.key}
                    className="px-2 py-2 font-medium text-sumi-800 text-center whitespace-nowrap"
                  >
                    {m.label.replace(" (with Suica or Visa)", "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-washi-200">
              {payments.venues.map((v) => (
                <tr key={v.key}>
                  <th className="px-3 py-2 text-left font-medium text-sumi-900 whitespace-nowrap">
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
        <article className="rounded-lg border border-washi-200 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
            ATMs for foreign cards
          </h3>
          <p className="mt-2 text-sm text-sumi-800">{payments.atm_notes}</p>
        </article>
        <article className="rounded-lg border border-washi-200 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
            Tax-free shopping
          </h3>
          <p className="mt-2 text-sm text-sumi-800">{payments.tax_refund_note}</p>
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

const BRAND_META: Record<string, { mark: string; tint: string }> = {
  cash_jpy:    { mark: "¥",  tint: "bg-kintsugi-300/30 text-kintsugi-600 ring-kintsugi-400/40" },
  suica_ic:    { mark: "IC", tint: "bg-matcha-100 text-matcha-700 ring-matcha-400/40" },
  visa:        { mark: "V",  tint: "bg-aizome-50 text-aizome-700 ring-aizome-200" },
  mastercard:  { mark: "M",  tint: "bg-enji-50 text-enji-700 ring-enji-200" },
  amex:        { mark: "A",  tint: "bg-aizome-50 text-aizome-700 ring-aizome-200" },
  jcb:         { mark: "J",  tint: "bg-matcha-100 text-matcha-700 ring-matcha-400/40" },
  apple_pay:   { mark: "", tint: "bg-sumi-100 text-sumi-900 ring-sumi-200" },
  google_pay:  { mark: "G",  tint: "bg-washi-200 text-aizome-700 ring-washi-300" },
  paypay:      { mark: "P",  tint: "bg-enji-50 text-enji-700 ring-enji-200" },
  alipay:      { mark: "支", tint: "bg-enji-50 text-enji-700 ring-enji-200" },
  wise:        { mark: "W",  tint: "bg-matcha-100 text-matcha-700 ring-matcha-400/40" },
};

function BrandTile({ mkey, label }: { mkey: string; label: string }) {
  const meta = BRAND_META[mkey] ?? {
    mark: label.slice(0, 1).toUpperCase(),
    tint: "bg-washi-200 text-sumi-900 ring-washi-300",
  };
  return (
    <span
      aria-hidden
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-sans text-base font-bold ring-1 ${meta.tint}`}
    >
      {meta.mark}
    </span>
  );
}

const ACCENT_DOT: Record<string, string> = {
  matcha: "bg-matcha-600",
  kintsugi: "bg-kintsugi-500",
  ume: "bg-enji-700",
  enji: "bg-enji-600",
};

function SignalDots({ filled, accent }: { filled: number; accent: string }) {
  const onClass = ACCENT_DOT[accent] ?? "bg-sumi-900";
  return (
    <span
      aria-hidden
      className="flex items-end gap-1"
      title={`${filled} of 4`}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`block w-1.5 rounded-full ${i < filled ? onClass : "bg-washi-300"}`}
          style={{ height: `${6 + i * 4}px` }}
        />
      ))}
    </span>
  );
}
