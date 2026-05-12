import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import { getCity, getMustHaveApps } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

export function generateMetadata(): Metadata {
  return {
    title: "Must-have apps",
    description:
      "Apps worth installing before you fly: navigation, translation, transit payment, taxi, messaging, and disaster alerts.",
  };
}

export default async function AppsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (getPlaceOption(slug)) notFound();
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="apps" />;
  const city = getCity(slug);
  if (!city) notFound();

  const apps = getMustHaveApps(slug);
  const [lead, ...rest] = apps;

  return (
    <main className="editorial-page">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/city/${slug}` },
          { label: "Must-have apps" },
        ]}
        kanji="携"
        eyebrow="Must-have apps"
        title="Apps to install before you land"
        subtitle="必 携"
        lede="Install these while you still have fast Wi-Fi at home. All are free and most work offline once set up."
        palette="aizome"
      />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {lead && (
          <article className="rounded-[1.5rem] border border-white/15 bg-[radial-gradient(circle_at_20%_15%,rgba(204,61,104,0.2),transparent_32%),linear-gradient(135deg,rgba(18,26,35,0.96),rgba(11,11,10,0.98))] p-6 shadow-editorial-deep sm:p-8 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-kintsugi-200">
                Set up first
              </p>
              <h2 className="mt-4 font-sans text-[clamp(3rem,6vw,5.6rem)] font-semibold leading-[0.92] text-white">
                {lead.name}
              </h2>
              <p className="mt-5 text-lg font-medium leading-8 text-white/86">
                {lead.purpose}
              </p>
            </div>
            <div className="mt-7 rounded-[1.25rem] border border-white/14 bg-white/[0.08] p-5 backdrop-blur lg:mt-0">
              {lead.free && (
                <span className="rounded-full bg-kintsugi-300 px-3 py-1 text-xs font-semibold text-sumi-950">
                  Free
                </span>
              )}
              {lead.notes && (
                <p className="mt-4 text-sm leading-7 text-white/78">
                  {lead.notes}
                </p>
              )}
              {(lead.ios_url || lead.android_url) && (
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  {lead.ios_url && (
                    <a
                      href={lead.ios_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/24 bg-white px-4 py-2 font-semibold text-sumi-950 transition hover:bg-kintsugi-200"
                    >
                      iOS
                    </a>
                  )}
                  {lead.android_url && (
                    <a
                      href={lead.android_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/24 bg-white px-4 py-2 font-semibold text-sumi-950 transition hover:bg-kintsugi-200"
                    >
                      Android
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        )}

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {rest.map((app, index) => (
            <article
              key={app.name}
              className={[
                "rounded-[1.25rem] border border-white/14 p-5 shadow-editorial-deep backdrop-blur",
                index % 3 === 0
                  ? "bg-[linear-gradient(135deg,rgba(244,238,224,0.98),rgba(229,219,199,0.96))] text-sumi-950"
                  : "bg-white/[0.08] text-white",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={[
                      "text-[11px] font-semibold uppercase tracking-[0.12em]",
                      index % 3 === 0 ? "text-enji-700" : "text-kintsugi-200",
                    ].join(" ")}
                  >
                    {app.purpose}
                  </p>
                  <h2 className="mt-2 font-sans text-3xl font-semibold leading-none">
                    {app.name}
                  </h2>
                </div>
                {app.free && (
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      index % 3 === 0
                        ? "bg-matcha-100 text-matcha-800"
                        : "bg-kintsugi-300 text-sumi-950",
                    ].join(" ")}
                  >
                    Free
                  </span>
                )}
              </div>
              {app.notes && (
                <p
                  className={[
                    "mt-4 text-sm leading-7",
                    index % 3 === 0 ? "text-sumi-800" : "text-white/76",
                  ].join(" ")}
                >
                  {app.notes}
                </p>
              )}
              {(app.ios_url || app.android_url) && (
                <div className="mt-5 flex gap-4 text-sm">
                  {app.ios_url && (
                    <a
                      href={app.ios_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline decoration-current/40 underline-offset-4 hover:opacity-75"
                    >
                      iOS
                    </a>
                  )}
                  {app.android_url && (
                    <a
                      href={app.android_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline decoration-current/40 underline-offset-4 hover:opacity-75"
                    >
                      Android
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
