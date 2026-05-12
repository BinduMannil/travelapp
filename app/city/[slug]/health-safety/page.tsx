import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InsuranceCta } from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { SocialRiskBriefing } from "@/components/legal/SocialRiskBriefing";
import {
  getCity,
  getCountryForCity,
  getCountryHealthSafety,
} from "@/lib/data/seed";
import { getLegalSocialRisksLive } from "@/lib/data/legal-social-risks";
import { PageHero } from "@/components/layout/PageHero";
import { formatLongDate } from "@/lib/legal/constants";

export function generateMetadata(): Metadata {
  return {
    title: "Health & safety",
    description:
      "Japan travel safety guide with emergency numbers, earthquake safety, typhoon guidance, medication rules, women-only train cars, solo female travel tips, embassies, LGBTQ+ info, and dietary cards.",
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
  const legalSocialRisks = await getLegalSocialRisksLive({
    countrySlug,
    citySlug: slug,
  });

  return (
    <main className="editorial-page">
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
        lede={`Emergency numbers, hazards, medication rules, Tokyo safety tips, solo female travel notes, embassies, LGBTQ+ context, and printable dietary cards.`}
        palette="enji"
      />
      <SocialRiskBriefing
        risks={legalSocialRisks}
        destinationName={city.name}
        focusCategories={[
          "drugs_medication_controlled_substances",
          "police_official_interaction",
          "public_conduct",
          "photography_filming",
          "lgbtq_relationships",
        ]}
      />
      <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="mt-8 rounded-lg border border-rose-200 bg-rose-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-rose-900">
          Emergency numbers
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.emergency_numbers.map((e) => (
            <div key={e.label} className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-[0.12em] text-sumi-700">
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

      <section className="mt-10 overflow-hidden rounded-2xl border border-enji-200 bg-[linear-gradient(135deg,#fffaf0,#f7efe2)] shadow-sm">
        <div className="border-b border-enji-100 px-5 py-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-enji-700">
            Solo female travel safety
          </p>
          <h2 className="mt-2 font-sans text-3xl font-semibold leading-tight text-sumi-950 sm:text-4xl">
            Crowded trains and harassment awareness
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-sumi-800">
            Japan and Tokyo are widely used by solo travelers, including women traveling alone, but crowded public transport needs the same practical awareness you would use in any major city.
          </p>
        </div>
        <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-enji-100 p-5 md:border-b-0 md:border-r sm:p-6">
            <div className="rounded-xl border border-enji-200 bg-white/72 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-enji-700">
                Useful phrase
              </p>
              <p className="mt-3 font-sans text-4xl font-semibold text-sumi-950">
                Chikan desu!
              </p>
              <p className="mt-3 text-sm leading-7 text-sumi-800">
                This phrase is used to call attention to groping or molestation in crowded public spaces, especially packed trains.
              </p>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <ul className="space-y-4 text-sm leading-7 text-sumi-800">
              <li>
                <strong>Call attention loudly.</strong> If something happens, say &ldquo;Chikan desu!&rdquo; clearly and move away from the person if you can.
              </li>
              <li>
                <strong>Move toward staff or a kōban.</strong> Go to a station staff member, ticket gate, train office, or nearby police box where possible.
              </li>
              <li>
                <strong>Use women-only train cars where available.</strong> Some Tokyo lines mark women-only cars during peak commute hours; platform signs and train decals usually show the details.
              </li>
              <li>
                <strong>Keep support details accessible.</strong> Save emergency contacts, travel insurance, hotel address, embassy details, and offline maps before late returns.
              </li>
            </ul>
            <p className="mt-5 rounded-xl border border-sumi-200 bg-white/62 p-4 text-xs leading-6 text-sumi-700">
              Editorial guidance for Japan travel safety and public transport safety; verify official emergency procedures with local authorities when needed.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
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
              <p className="mt-3 border-l-2 border-amber-400 pl-3 text-sm text-sumi-800">
                <strong className="text-amber-700">What to do.</strong>{" "}
                {h.what_to_do}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-amber-900">
          Prohibited &amp; restricted medications
        </h2>
        <p className="mt-2 text-sm text-amber-900">
          {data.prohibited_meds.summary}
        </p>
        <div className="mt-3">
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-900">
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
            Tap water
          </h3>
          <p className="mt-2 text-sm text-sumi-800">{data.tap_water}</p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
            Solo travellers
          </h3>
          <p className="mt-2 text-sm text-sumi-800">{data.solo_notes}</p>
        </article>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
          LGBTQ+
        </h2>
        <article className="mt-3 overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm">
          {/* Header: city + tolerance rating */}
          <div className="flex items-center justify-between gap-4 border-b border-washi-200 bg-washi-50 px-5 py-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sumi-700">
                City tolerance
              </div>
              <div className="mt-1 text-xl font-semibold text-sumi-900 tabular-nums">
                {data.lgbtq.tolerance_score}
                <span className="ml-1 text-sm font-normal text-sumi-700">
                  / 5
                </span>
              </div>
            </div>
            <div
              aria-label={`Tolerance ${data.lgbtq.tolerance_score} of 5`}
              className="text-xl tracking-tight"
            >
              <span className="text-kintsugi-500">
                {"★".repeat(data.lgbtq.tolerance_score)}
              </span>
              <span className="text-washi-300">
                {"★".repeat(5 - data.lgbtq.tolerance_score)}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-4 px-5 py-5">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sumi-700">
                Legal status
              </div>
              <p className="mt-1 text-sm text-sumi-900">
                {data.lgbtq.country_legal_status}
              </p>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sumi-700">
                On the ground
              </div>
              <p className="mt-1 text-sm text-sumi-900">
                {data.lgbtq.city_tolerance}
              </p>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sumi-700">
                Safe &amp; friendly areas
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-sumi-900">
                {data.lgbtq.safe_neighborhoods.map((n) => (
                  <li key={n} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 text-sumi-400"
                    >
                      ·
                    </span>
                    <span className="flex-1 leading-snug">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources footer */}
          <div className="border-t border-washi-200 bg-washi-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sumi-700">
              Resources
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {data.lgbtq.resources.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-enji-600 hover:underline"
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
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
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
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-sumi-700">
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
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-sumi-700">
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
        Reviewed: {formatLongDate(data.reviewed_at)}. Visa, medication, and LGBTQ+ policies
        change — verify critical items with an official source before you
        travel.
      </p>
    </div>
    </main>
  );
}
