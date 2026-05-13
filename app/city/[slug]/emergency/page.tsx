import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import { getCity, getCityEmergency } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Emergency quick-card",
    description:
      "Numbers, scenarios, and the single photo-on-your-phone that solves 80% of stress.",
  };
}

export default async function EmergencyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="emergency" />;
  if (getPlaceOption(slug)) notFound();
  const city = getCity(slug);
  const data = getCityEmergency(slug);
  if (!city || !data) notFound();

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Emergency quick-card" },
        ]}
        kanji="急"
        eyebrow="Emergency quick-card"
        title={`If it goes wrong, start here`}
        subtitle="緊 急"
        lede={`Tap-to-call numbers, step-by-step scenarios, and the single photo on your phone that solves most stress.`}
        palette="enji"
      />
      <div className="mx-auto max-w-4xl px-6 py-12">
<section className="mt-8 rounded-2xl border-2 border-enji-600 bg-enji-50 p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-enji-700">
          Save these numbers offline
        </div>
        <ul className="mt-4 divide-y divide-enji-100 overflow-hidden rounded-xl bg-white shadow-sm">
          {data.numbers.map((n) => {
            const isShort = n.number.replace(/\D/g, "").length <= 4;
            return (
              <li key={n.label + n.number}>
                <a
                  href={`tel:${n.number.replace(/\s|-/g, "")}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-enji-50/60"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sumi-700">
                      {n.label}
                    </div>
                    {n.notes && (
                      <div className="mt-1 text-xs text-sumi-700">
                        {n.notes}
                      </div>
                    )}
                  </div>
                  <div
                    className={`shrink-0 whitespace-nowrap font-semibold tabular-nums text-enji-700 ${
                      isShort ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                    }`}
                  >
                    {n.number}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-sans text-2xl font-semibold text-sumi-900">
          If this happens…
        </h2>
        <div className="mt-4 space-y-4">
          {data.scenarios.map((s) => (
            <details
              key={s.slug}
              className="group rounded-2xl border border-washi-200 bg-white open:shadow-md"
            >
              <summary className="cursor-pointer list-none p-5">
                <span className="font-sans text-lg font-semibold text-sumi-900 group-open:text-enji-700">
                  {s.title}
                </span>
                <span className="float-right text-sumi-700 group-open:rotate-180 transition" aria-hidden>
                  ▾
                </span>
              </summary>
              <ol className="list-decimal space-y-2 border-t border-washi-200 px-5 py-5 pl-10 text-sm text-sumi-900">
                {s.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-washi-200 bg-washi-100/60 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-sumi-700">
          Apps to install now
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-sumi-900">
          {data.useful_apps.map((a) => (
            <li key={a.name}>
              <strong>{a.name}</strong> — {a.purpose}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 rounded-2xl border-2 border-dashed border-enji-400 bg-enji-50/60 p-5 text-sm text-sumi-900">
        {data.final_note}
      </p>
    </div>
    </main>
  );
}
