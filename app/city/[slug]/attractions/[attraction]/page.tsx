import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAttraction, getCity } from "@/lib/data/seed";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import {
  CurrencyProvider,
  CurrencySelector,
  PriceDisplay,
} from "@/lib/currency/context";

const SIGNIFICANCE_LABEL: Record<string, string> = {
  historic: "Historic",
  religious: "Religious",
  nature: "Nature",
  scenic: "Scenic",
  architectural: "Architectural",
  cultural: "Cultural",
  activity: "Activity",
  culinary: "Culinary",
  shopping: "Shopping",
};

const DRESS_LABEL: Record<string, string> = {
  casual: "Casual",
  smart_casual: "Smart casual",
  modest: "Modest (shoulders covered)",
  formal: "Formal",
  swimwear_ok: "Swimwear OK",
};

const RESELLER_LABEL: Record<string, string> = {
  klook: "Klook",
  getyourguide: "GetYourGuide",
  viator: "Viator",
  jtb: "JTB",
};

const DISPLAY_CURRENCIES = [
  "JPY",
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "SGD",
  "HKD",
  "CNY",
  "KRW",
  "THB",
  "INR",
  "AED",
  "CHF",
];

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; attraction: string }>;
}): Promise<Metadata> {
  const { slug, attraction } = await params;
  const a = getAttraction(slug, attraction);
  if (!a) return { title: "Attraction" };
  return { title: a.name, description: a.summary };
}

export default async function AttractionDetailPage({
  params,
}: {
  params: Promise<{ slug: string; attraction: string }>;
}) {
  const { slug, attraction } = await params;
  const city = getCity(slug);
  const a = getAttraction(slug, attraction);
  if (!city || !a) notFound();

  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

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
        ·{" "}
        <Link href={`/city/${slug}/attractions`} className="hover:underline">
          Attractions
        </Link>{" "}
        · {a.name}
      </nav>

      <header className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">{a.name}</h1>
          <div className="mt-1 text-sm text-slate-500">
            {a.neighborhood} · {"★".repeat(a.importance)}
            <span className="text-slate-300">
              {"★".repeat(5 - a.importance)}
            </span>
          </div>
        </div>
      </header>

      <p className="mt-4 text-lg text-slate-700">{a.summary}</p>

      <div className="mt-4 flex flex-wrap gap-1 text-xs">
        {a.significance.map((s) => (
          <span
            key={s}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700"
          >
            {SIGNIFICANCE_LABEL[s] ?? s}
          </span>
        ))}
      </div>

      <CurrencyProvider
        rates={rates}
        defaultCurrency={city.default_currency ?? "JPY"}
      >
        <div className="mt-6 flex items-center justify-end">
          <CurrencySelector currencies={DISPLAY_CURRENCIES} />
        </div>

        <section className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-4">
          <Fact label="Adult ticket">
            {a.cost_adult_minor === 0 ? (
              "Free"
            ) : (
              <PriceDisplay
                amountMinor={a.cost_adult_minor}
                currency={a.currency}
              />
            )}
          </Fact>
          {a.cost_child_minor > 0 && (
            <Fact label="Child ticket">
              <PriceDisplay
                amountMinor={a.cost_child_minor}
                currency={a.currency}
              />
            </Fact>
          )}
          <Fact label="Typical time">{formatDuration(a.duration_minutes)}</Fact>
          <Fact label="Setting">{a.indoor ? "Indoor" : "Outdoor"}</Fact>
        </section>

        <section className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            About
          </h2>
          <p className="leading-relaxed text-slate-800">{a.description}</p>
          {a.best_time_notes && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <div className="text-xs font-semibold uppercase tracking-wide">
                Best time to visit
              </div>
              <p className="mt-1 text-sm">{a.best_time_notes}</p>
            </div>
          )}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Dress code
            </h3>
            <p className="mt-2 text-sm text-slate-800">
              {a.dress_code ? DRESS_LABEL[a.dress_code] ?? a.dress_code : "—"}
            </p>
            {a.dress_notes && (
              <p className="mt-1 text-xs text-slate-600">{a.dress_notes}</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Photography
            </h3>
            <p className="mt-2 text-sm text-slate-800">
              {a.photography_allowed ? "Allowed" : "Restricted"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Accessibility
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-800">
              <li>
                Wheelchair:{" "}
                {a.accessibility.wheelchair_accessible ? "Yes" : "Limited"}
              </li>
              <li>
                Stroller:{" "}
                {a.accessibility.stroller_accessible ? "Yes" : "Limited"}
              </li>
              <li>
                Hearing loop: {a.accessibility.hearing_loop ? "Yes" : "No"}
              </li>
            </ul>
            {a.accessibility.notes && (
              <p className="mt-1 text-xs text-slate-600">
                {a.accessibility.notes}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Inclusive
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-800">
              <li>Kids welcome: {a.kid_friendly ? "Yes" : "Not ideal"}</li>
              <li>
                LGBTQ+ friendly: {a.lgbtq_friendly ? "Yes" : "Check locally"}
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Tickets &amp; booking
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {a.official_url && (
              <a
                href={a.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700"
              >
                Official site →
              </a>
            )}
            {Object.entries(a.reseller_urls).map(([k, url]) => (
              <a
                key={k}
                href={url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 hover:bg-slate-50"
              >
                {RESELLER_LABEL[k] ?? k} →
              </a>
            ))}
          </div>
          {Object.keys(a.reseller_urls).length > 0 && (
            <p className="mt-3 text-xs text-slate-500">
              Reseller links may include affiliate tags — clicking does not
              change the price you pay.
            </p>
          )}
        </section>
      </CurrencyProvider>
    </main>
  );
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 font-semibold tabular-nums">{children}</div>
    </div>
  );
}

export async function generateStaticParams() {
  const { getAttractions } = await import("@/lib/data/seed");
  const tokyoAttractions = getAttractions("tokyo");
  return tokyoAttractions.map((a) => ({
    slug: "tokyo",
    attraction: a.slug,
  }));
}
