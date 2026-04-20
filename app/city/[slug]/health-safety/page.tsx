import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InsuranceCta } from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import {
  getCity,
  getCountryForCity,
  getCountryHealthSafety,
} from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Health & safety",
    description:
      "Emergency numbers, earthquake / typhoon guidance, prohibited medications, English-friendly pharmacies, embassies, LGBTQ+ info, and printable dietary cards.",
  };
}

export default async function HealthSafetyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const data = getCountryHealthSafety(countrySlug);
  if (!data) notFound();

  return (
    <main>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Health & safety" },
        ]}
        kanji="守"
        eyebrow="Health & safety"
        title={`Safe travel starts here`}
        subtitle="安 全"
        lede={`Emergency numbers, hazards, medications, embassies, LGBTQ+ context, and printable dietary cards.`}
        palette="enji"
      />
      <div className="mx-auto max-w-5xl px-6 py-12">
<section className="mt-8 rounded-lg border border-rose-200 bg-rose-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-900">
          Emergency numbers
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.emergency_numbers.map((e) => (
            <div key={e.label} className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-[0.25em] text-sumi-700">
                {e.label}
              </div>
              <div className="text-2xl font-semibold tabular-nums">
                {e.number}
              </div>
              {e.notes && (
                <div className="mt-1 text-xs text-sumi-700">{e.notes}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
          Natural hazards
        </h2>
        <div className="mt-3 space-y-4">
          {data.hazards.map((h) => (
            <article
              key={h.type}
              className="rounded-lg border border-washi-200 p-4"
            >
              <h3 className="text-lg font-semibold">{h.title}</h3>
              <p className="mt-1 text-sm text-sumi-800">{h.body}</p>
              <div className="mt-3 rounded bg-amber-50 p-3 text-sm text-amber-900">
                <strong className="mr-1">What to do:</strong>
                {h.what_to_do}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-900">
          Prohibited &amp; restricted medications
        </h2>
        <p className="mt-2 text-sm text-amber-900">
          {data.prohibited_meds.summary}
        </p>
        <div className="mt-3">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-900">
            Watchlist
          </div>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-amber-900">
            {data.prohibited_meds.watchlist.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-sm text-amber-900">
          <strong>Allowed without paperwork:</strong>{" "}
          {data.prohibited_meds.allowed_without_cert}
        </p>
        <p className="mt-2 text-sm text-amber-900">
          <strong>Yakkan Shoumei:</strong>{" "}
          {data.prohibited_meds.yakkan_shoumei_note}
        </p>
        <a
          href={data.prohibited_meds.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-amber-900 underline"
        >
          Ministry of Health source →
        </a>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg border border-washi-200 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
            Pharmacies &amp; English-friendly care
          </h3>
          <div className="mt-2 space-y-2 text-sm">
            {data.pharmacies.map((p) => (
              <div key={p.name}>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-sumi-700">{p.hours}</div>
                {p.notes && (
                  <div className="text-sm text-sumi-800">{p.notes}</div>
                )}
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-600 underline"
                  >
                    Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-washi-200 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
            Tap water
          </h3>
          <p className="mt-2 text-sm text-sumi-800">{data.tap_water}</p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
            Solo travellers
          </h3>
          <p className="mt-2 text-sm text-sumi-800">{data.solo_notes}</p>
        </article>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
          LGBTQ+
        </h2>
        <article className="mt-3 rounded-lg border border-washi-200 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-sumi-700">
                City tolerance
              </div>
              <div className="mt-0.5">
                {"★".repeat(data.lgbtq.tolerance_score)}
                <span className="text-slate-300">
                  {"★".repeat(5 - data.lgbtq.tolerance_score)}
                </span>
                <span className="ml-2 text-sm text-sumi-700">
                  ({data.lgbtq.tolerance_score}/5)
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-sumi-800">
            <strong>Legal status:</strong> {data.lgbtq.country_legal_status}
          </p>
          <p className="mt-2 text-sm text-sumi-800">
            <strong>On the ground:</strong> {data.lgbtq.city_tolerance}
          </p>
          <div className="mt-3">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Safe &amp; friendly areas
            </div>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-sumi-800">
              {data.lgbtq.safe_neighborhoods.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Resources
            </div>
            <ul className="mt-1 space-y-1 text-sm">
              {data.lgbtq.resources.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 underline"
                  >
                    {r.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
          Printable allergy &amp; dietary cards
        </h2>
        <p className="mt-2 text-xs text-sumi-700">
          Show the Japanese text to restaurant staff when ordering.
        </p>
        <div className="mt-3 space-y-3">
          {data.dietary_cards.map((c) => (
            <article
              key={c.diet}
              className="rounded-lg border border-washi-200 p-4"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
                {c.label}
              </div>
              <p className="mt-2 text-base leading-relaxed text-sumi-900">
                {c.jp_text}
              </p>
              <p className="mt-2 text-sm italic text-sumi-700">
                {c.en_gloss}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
          Embassies in {city.name}
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {data.embassies.map((e) => (
            <article
              key={e.country}
              className="rounded-lg border border-washi-200 p-4"
            >
              <div className="font-semibold">{e.country}</div>
              <div className="text-sm text-sumi-800">{e.address}</div>
              <div className="mt-1 text-sm">
                <span className="text-sumi-700">Phone:</span> {e.phone}
              </div>
              {e.after_hours_phone && e.after_hours_phone !== e.phone && (
                <div className="text-xs text-sumi-700">
                  After hours: {e.after_hours_phone}
                </div>
              )}
              {e.url && (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs text-brand-600 underline"
                >
                  Website →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <InsuranceCta source="health-safety-bottom" />
      </div>
      <AffiliateDisclosure />

      <p className="mt-6 text-xs text-sumi-700">
        Reviewed: {data.reviewed_at}. Visa, medication, and LGBTQ+ policies
        change — verify critical items with an official source before you
        travel.
      </p>
    </div>
    </main>
  );
}
