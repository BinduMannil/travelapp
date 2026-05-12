import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlaceOption } from "@/lib/destinations/countries";
import { VietnamCityDetailPage } from "@/components/vietnam/VietnamCityDetailPage";
import { getVietnamCity } from "@/lib/vietnam/frontend";
import { getCity, getTransitOptions } from "@/lib/data/seed";
import { PageHero } from "@/components/layout/PageHero";

const PAYMENT_LABELS: Record<string, string> = {
  suica: "Suica",
  pasmo: "PASMO",
  ic_card: "IC card",
  cash: "Cash",
  cash_single_ticket: "Paper ticket",
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  apple_pay: "Apple Pay",
};

const MODE_META: Record<
  string,
  { label: string; kanji: string; accent: string; image: string; mood: string }
> = {
  metro: {
    label: "Metro / Subway",
    kanji: "地",
    accent: "aizome",
    image:
      "https://images.unsplash.com/photo-1581059166814-7c2d9108ef4b?auto=format&fit=crop&w=1500&q=82",
    mood: "The default move for most central days.",
  },
  jr: {
    label: "JR heavy rail",
    kanji: "鉄",
    accent: "matcha",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1500&q=82",
    mood: "Big loops, major hubs, airport and Shinkansen links.",
  },
  taxi: {
    label: "Taxi",
    kanji: "車",
    accent: "kintsugi",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1500&q=82",
    mood: "Best late, tired, rainy, or dressed up.",
  },
  bus: {
    label: "Bus",
    kanji: "バ",
    accent: "enji",
    image:
      "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?auto=format&fit=crop&w=1500&q=82",
    mood: "Useful for gaps between rail lines.",
  },
  bike: {
    label: "Bike",
    kanji: "輪",
    accent: "matcha",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=82",
    mood: "Good in flatter districts and riverside routes.",
  },
  walk: {
    label: "Walk",
    kanji: "歩",
    accent: "sumi",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1500&q=82",
    mood: "The way Tokyo changes from station to street.",
  },
};

const ACCENT_TILE: Record<string, string> = {
  aizome: "bg-aizome-500 text-white",
  matcha: "bg-matcha-600 text-white",
  kintsugi: "bg-kintsugi-500 text-white",
  enji: "bg-enji-600 text-white",
  sumi: "bg-sumi-900 text-white",
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
  if (getPlaceOption(slug)) notFound();
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityDetailPage city={vietnamCity} kind="transit" />;
  const city = getCity(slug);
  if (!city) notFound();

  const options = getTransitOptions(slug);
  const recommended = options.find((o) => o.recommended) ?? options[0];
  const rest = options.filter((o) => o.mode !== recommended?.mode);

  return (
    <main className="editorial-page">
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

      <section className="relative mx-auto max-w-6xl px-6 py-20">
        {recommended && (
          <TransitFeature option={recommended} />
        )}

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {rest.map((option, index) => (
            <TransitModeCard key={option.mode} option={option} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

type TransitOption = ReturnType<typeof getTransitOptions>[number];

function getMeta(mode: string) {
  return (
    MODE_META[mode] ?? {
      label: mode,
      kanji: "駅",
      accent: "sumi",
      image:
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1500&q=82",
      mood: "A useful way through the city.",
    }
  );
}

function TransitFeature({ option }: { option: TransitOption }) {
  const meta = getMeta(option.mode);

  return (
    <article className="grid overflow-hidden rounded-[1.8rem] border border-white/16 bg-sumi-900 shadow-editorial-deep lg:grid-cols-[1.05fr_.95fr]">
      <div className="relative min-h-[28rem] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={meta.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,5,4,.9),transparent_60%),linear-gradient(90deg,rgba(6,5,4,.55),transparent)]" />
        <div className="relative flex min-h-[28rem] flex-col justify-between p-7 sm:p-10">
          <span className="w-fit rounded-full border border-kintsugi-300/60 bg-black/34 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-kintsugi-200 backdrop-blur">
            Recommended first move
          </span>
          <div>
            <p className="luxury-kicker text-kintsugi-300">{meta.label}</p>
            <h2 className="mt-3 max-w-xl font-sans text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-none text-white">
              {option.name}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-white/78">
              {meta.mood}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[linear-gradient(180deg,rgba(255,253,246,.99),rgba(247,240,225,.97))] p-7 text-sumi-900 sm:p-10">
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-sans text-2xl font-bold ${ACCENT_TILE[meta.accent] ?? ACCENT_TILE.sumi}`}
          >
            {meta.kanji}
          </span>
          <div>
            <p className="luxury-kicker text-enji-600">The practical rule</p>
            <p className="mt-2 text-sm leading-7 text-sumi-700">
              {option.price_note}
            </p>
          </div>
        </div>
        <ProsCons option={option} />
        <TransitFooter option={option} />
      </div>
    </article>
  );
}

function TransitModeCard({
  option,
  index,
}: {
  option: TransitOption;
  index: number;
}) {
  const meta = getMeta(option.mode);

  return (
    <article
      className={`overflow-hidden rounded-[1.45rem] border border-white/14 bg-washi-50 shadow-editorial-deep ${
        index % 2 === 1 ? "md:mt-10" : ""
      }`}
    >
      <div className="relative min-h-64 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={meta.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,5,4,.88),transparent_64%)]" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="luxury-kicker text-kintsugi-300">{meta.label}</p>
          <h2 className="mt-2 font-sans text-3xl font-semibold leading-tight text-white">
            {option.name}
          </h2>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm font-medium leading-7 text-sumi-800">
          {option.price_note}
        </p>
        <ProsCons option={option} compact />
        <TransitFooter option={option} />
      </div>
    </article>
  );
}

function ProsCons({
  option,
  compact = false,
}: {
  option: TransitOption;
  compact?: boolean;
}) {
  if (option.pros.length === 0 && option.cons.length === 0) return null;

  return (
    <div className={`mt-6 grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
      {option.pros.length > 0 && (
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
            Best for
          </div>
          <ul className="mt-2 space-y-2 text-sm text-sumi-800">
            {option.pros.slice(0, compact ? 2 : 3).map((p, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-emerald-600">
                  +
                </span>
                <span className="leading-snug">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {option.cons.length > 0 && (
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-rose-700">
            Watch for
          </div>
          <ul className="mt-2 space-y-2 text-sm text-sumi-800">
            {option.cons.slice(0, compact ? 1 : 2).map((c, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-rose-500">
                  -
                </span>
                <span className="leading-snug">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function TransitFooter({ option }: { option: TransitOption }) {
  if (option.payment_methods.length === 0 && !option.url) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-sumi-900/10 pt-4">
      {option.payment_methods.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-sumi-700">
            Pays with
          </span>
          {option.payment_methods.slice(0, 4).map((m) => (
            <span
              key={m}
              className="rounded-full border border-washi-300 bg-washi-100 px-2 py-0.5 text-[11px] text-sumi-800"
            >
              {PAYMENT_LABELS[m] ?? m}
            </span>
          ))}
        </div>
      )}
      {option.url && (
        <a
          href={option.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-enji-600 hover:underline"
        >
          Official Info →
        </a>
      )}
    </div>
  );
}
