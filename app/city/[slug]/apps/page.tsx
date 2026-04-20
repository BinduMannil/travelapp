import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
  const city = getCity(slug);
  if (!city) notFound();

  const apps = getMustHaveApps(slug);

  return (
    <main>
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

      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {apps.map((app) => (
            <article
              key={app.name}
              className="rounded-2xl border border-washi-200 bg-white p-5"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-lg font-semibold text-sumi-900">
                  {app.name}
                </h2>
                {app.free && (
                  <span className="rounded bg-matcha-100 px-1.5 py-0.5 text-xs font-medium text-matcha-700">
                    Free
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-sumi-900">
                {app.purpose}
              </p>
              {app.notes && (
                <p className="mt-2 text-sm leading-relaxed text-sumi-700">
                  {app.notes}
                </p>
              )}
              {(app.ios_url || app.android_url) && (
                <div className="mt-3 flex gap-3 text-sm">
                  {app.ios_url && (
                    <a
                      href={app.ios_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-enji-600 underline"
                    >
                      iOS
                    </a>
                  )}
                  {app.android_url && (
                    <a
                      href={app.android_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-enji-600 underline"
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
