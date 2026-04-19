import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getMustHaveApps } from "@/lib/data/seed";

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
    <main className="mx-auto max-w-4xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        · Must-have apps
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Apps to install before you land
      </h1>
      <p className="mt-3 text-slate-600">
        Install these while you still have fast Wi-Fi at home. All are free and
        most work offline once set up.
      </p>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {apps.map((app) => (
          <article
            key={app.name}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">{app.name}</h2>
              {app.free && (
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-900">
                  Free
                </span>
              )}
            </div>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {app.purpose}
            </p>
            {app.notes && (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
                    className="text-brand-600 underline"
                  >
                    iOS
                  </a>
                )}
                {app.android_url && (
                  <a
                    href={app.android_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 underline"
                  >
                    Android
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
