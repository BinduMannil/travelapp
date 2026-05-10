/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { EditorialCard } from "@/components/common/CoverTile";
import {
  FlightCta,
  HotelCta,
  InsuranceCta,
} from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { CinematicDiscovery } from "@/components/home/CinematicDiscovery";

type Palette =
  | "enji"
  | "aizome"
  | "sakura"
  | "matcha"
  | "kintsugi"
  | "sumi"
  | "washi"
  | "ume"
  | "ocean"
  | "forest";

const GLOBAL_IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=85",
  mountains:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=84",
  islands:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=84",
  city:
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1400&q=84",
  desert:
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=84",
  forest:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=84",
  village:
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=84",
  culture:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=84",
  tokyo:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=84",
  food:
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1600&q=84",
};

const DECISION_LAYERS: Array<{
  title: string;
  body: string;
  signal: string;
  href: string;
  image: string;
  accent: string;
  glyph: string;
}> = [
  {
    title: "Budget",
    body: "See what a day actually costs before falling in love with the photo.",
    signal: "daily spend",
    href: "/city/tokyo/costs",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=84",
    accent: "from-kintsugi-300/32 via-transparent to-transparent",
    glyph: "$",
  },
  {
    title: "Visa",
    body: "Start with what your passport can do, then discover places inside that freedom.",
    signal: "passport fit",
    href: "/city/tokyo/visa",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=84",
    accent: "from-aizome-400/28 via-transparent to-transparent",
    glyph: "V",
  },
  {
    title: "Weather",
    body: "Match mood to season: beaches, snow, desert air, festival windows.",
    signal: "best month",
    href: "/city/tokyo/weather",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=84",
    accent: "from-ocean-400/28 via-transparent to-transparent",
    glyph: "W",
  },
  {
    title: "Travel style",
    body: "Food, design, family, nightlife, wellness, culture, rail, outdoors.",
    signal: "trip shape",
    href: "/city/tokyo/itinerary",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=84",
    accent: "from-ume-400/24 via-transparent to-transparent",
    glyph: "T",
  },
  {
    title: "Safety",
    body: "Know health, emergency, scams, medication, LGBTQ+ and accessibility context.",
    signal: "confidence",
    href: "/city/tokyo/health-safety",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=84",
    accent: "from-matcha-400/24 via-transparent to-transparent",
    glyph: "S",
  },
  {
    title: "Practical fit",
    body: "Transit, payments, connectivity, packing and arrival logistics in one place.",
    signal: "friction",
    href: "/city/tokyo/transit",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=84",
    accent: "from-sakura-400/24 via-transparent to-transparent",
    glyph: "P",
  },
];

const PILOT_FEATURES: Array<{
  label: string;
  href: string;
  kanji: string;
  palette: Palette;
  body: string;
  imageUrl: string;
  meta: string;
}> = [
  {
    label: "Tokyo city hub",
    href: "/city/tokyo",
    kanji: "東",
    palette: "sumi",
    body: "A fully detailed pilot city showing how Journee turns one destination into atmosphere, intelligence and practical trip decisions.",
    imageUrl: GLOBAL_IMAGES.tokyo,
    meta: "Pilot destination",
  },
  {
    label: "Japan country intelligence",
    href: "/country/japan",
    kanji: "日",
    palette: "enji",
    body: "Country-level guidance for language, cuisine, culture, residency, routes and national travel context.",
    imageUrl: GLOBAL_IMAGES.culture,
    meta: "Country layer",
  },
  {
    label: "Cuisine storytelling",
    href: "/country/japan/cuisine",
    kanji: "食",
    palette: "kintsugi",
    body: "Food pages as editorial journeys, not inventory: feature dishes, cultural rhythm, etiquette and where to try them.",
    imageUrl: GLOBAL_IMAGES.food,
    meta: "Subpage example",
  },
];

const PRODUCT_HIERARCHY = [
  {
    label: "Homepage",
    title: "Global discovery",
    body: "Compare the whole world by mood, budget, visa, weather and travel style.",
  },
  {
    label: "Country",
    title: "Country intelligence",
    body: "Understand national culture, language, rules, cuisine, residency and travel context.",
  },
  {
    label: "City",
    title: "Destination hub",
    body: "Enter the place itself: atmosphere, neighborhoods, stays, food, transit and timing.",
  },
  {
    label: "Subpage",
    title: "Topic depth",
    body: "Go deep on visa, safety, restaurants, payments, packing, weather, culture and transport.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#090b0b] text-washi-50">
      <CinematicDiscovery />

      <section className="relative overflow-hidden bg-[#11100d] py-28 sm:py-40">
        <div
          className="image-drift absolute inset-0 opacity-62"
          style={{
            backgroundImage: `url(${GLOBAL_IMAGES.city})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-0 hidden w-[42vw] opacity-70 mix-blend-screen lg:block"
          style={{
            backgroundImage: `url(${GLOBAL_IMAGES.islands})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(216,173,79,.24),transparent_30%),radial-gradient(circle_at_18%_72%,rgba(95,150,165,.24),transparent_34%),linear-gradient(90deg,rgba(7,8,8,.88),rgba(7,8,8,.68)_42%,rgba(7,8,8,.74)),linear-gradient(0deg,rgba(7,8,8,.94),rgba(7,8,8,.3)_48%,rgba(7,8,8,.74))]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kintsugi-300/40 to-transparent" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16 grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
            <div>
              <p className="luxury-kicker text-kintsugi-300">Decision intelligence</p>
              <h2 className="luxury-display mt-4 max-w-4xl text-[clamp(2.65rem,5vw,5.2rem)] font-semibold leading-[0.98] text-white">
                Choose with your eyes open.
              </h2>
            </div>
            <div className="max-w-2xl lg:ml-auto">
              <p className="font-display text-[clamp(1.55rem,2.7vw,2.7rem)] font-semibold leading-tight text-white">
                Fall for the place, then test the trip.
              </p>
              <p className="mt-5 text-base leading-8 text-white/76">
                Journee turns practical constraints into decision lenses: budget, passport freedom, seasonal weather, trip style, safety and arrival friction, all before the destination becomes expensive wishful thinking.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-stretch">
            <Link
              href={DECISION_LAYERS[0].href}
              className="group relative min-h-[32rem] overflow-hidden rounded-[1.55rem] border border-white/18 bg-sumi-900 shadow-editorial-deep transition hover:-translate-y-1 hover:border-kintsugi-300/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
            >
              <img
                src={DECISION_LAYERS[0].image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover saturate-[1.16] transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.24)_34%,rgba(0,0,0,.86)),linear-gradient(90deg,rgba(0,0,0,.72),rgba(0,0,0,.12))]" />
              <div className="relative flex min-h-[32rem] flex-col justify-between p-7 sm:p-10">
                <div className="flex items-start justify-between gap-5">
                  <p className="luxury-kicker rounded-full border border-white/22 bg-black/30 px-4 py-2 text-kintsugi-300 backdrop-blur">
                    Primary lens
                  </p>
                  <span className="rounded-full border border-white/22 bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                    {DECISION_LAYERS[0].signal}
                  </span>
                </div>
                <div className="max-w-2xl">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-kintsugi-300/60 bg-black/35 font-display text-3xl font-semibold text-kintsugi-300 backdrop-blur">
                    {DECISION_LAYERS[0].glyph}
                  </div>
                  <h3 className="font-display text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[0.9] text-white">
                    {DECISION_LAYERS[0].title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-8 text-white/82">
                    {DECISION_LAYERS[0].body}
                  </p>
                  <span className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-sumi-900 transition group-hover:bg-kintsugi-300">
                    Open cost lens →
                  </span>
                </div>
              </div>
            </Link>

            <div className="grid gap-6 sm:grid-cols-2">
              {DECISION_LAYERS.slice(1).map((layer, index) => (
                <Link
                  key={layer.title}
                  href={layer.href}
                  className={`group relative overflow-hidden rounded-[1.25rem] border border-white/16 bg-black/36 shadow-editorial-deep backdrop-blur-xl transition hover:-translate-y-1 hover:border-kintsugi-300/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300 ${
                    index === 1 || index === 3 ? "sm:translate-y-8" : ""
                  } ${index === 4 ? "sm:col-span-2" : ""}`}
                >
                  <div className="absolute inset-0">
                    <img
                      src={layer.image}
                      alt=""
                      className="h-full w-full object-cover opacity-48 saturate-[1.18] transition duration-700 group-hover:scale-105 group-hover:opacity-62"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${layer.accent}`} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.24),rgba(0,0,0,.72))]" />
                  </div>
                  <div className="relative flex min-h-[15.5rem] flex-col justify-between p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/24 bg-black/34 font-display text-xl font-semibold text-kintsugi-300 backdrop-blur">
                        {layer.glyph}
                      </span>
                      <span className="luxury-kicker text-kintsugi-300/88">{layer.signal}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-[clamp(1.8rem,3vw,2.7rem)] font-semibold leading-none text-white group-hover:text-kintsugi-300">
                        {layer.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/76">{layer.body}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sumi-900 py-28 text-washi-50 sm:py-40">
        <div
          className="absolute inset-0 opacity-24"
          style={{
            backgroundImage: `url(${GLOBAL_IMAGES.city})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,25,23,.94),rgba(28,25,23,.82)),linear-gradient(90deg,rgba(95,150,165,.24),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-14 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="luxury-kicker text-kintsugi-300">Curated travel desk</p>
              <h2 className="luxury-display mt-4 text-[clamp(2.8rem,6vw,5.7rem)] font-semibold text-white">
                Plan the trip after the place chooses you.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/72 lg:ml-auto">
              Flights, stays and protection belong inside discovery, not bolted on afterward. Journee keeps the practical layer close without letting it become the brand.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <HotelCta city="your next destination" source="home-global" />
            <FlightCta destinationLabel="anywhere" destinationIata="anywhere" source="home-global" />
            <InsuranceCta source="home-global" />
          </div>
          <div className="mt-5 max-w-3xl text-white/72 [&_*]:text-white/72 [&_a]:text-kintsugi-300">
            <AffiliateDisclosure />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0b0a09] py-28 text-washi-50 sm:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(209,170,99,.18),transparent_32%)]" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <div>
            <p className="luxury-kicker text-kintsugi-300">Pilot depth</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.8rem,6vw,5.8rem)] font-semibold text-white">
              Tokyo is the proof of detail, not the homepage identity.
            </h2>
            <p className="luxury-lede mt-6 max-w-xl text-white/70">
              Tokyo is the first fully composed editorial destination, showing how Journee can turn any place into atmosphere, context, and practical travel intelligence.
            </p>
          </div>
          <div className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {PILOT_FEATURES.slice(0, 2).map((f) => (
                <EditorialCard
                  key={f.href}
                  href={f.href}
                  imageUrl={f.imageUrl}
                  imageAlt={f.label}
                  eyebrow={f.meta}
                  title={f.label}
                  body={f.body}
                  meta={f.meta}
                  palette={f.palette}
                  kanji={f.kanji}
                  aspect="3/2"
                  variant="overlay"
                  className="sm:min-h-[34rem]"
                />
              ))}
            </div>
            <Link
              href={PILOT_FEATURES[2].href}
              className="group flex items-center justify-between gap-5 rounded-[1.1rem] border border-white/10 bg-white/[0.045] p-5 text-white backdrop-blur transition hover:border-kintsugi-300/50 hover:bg-white/[0.08]"
            >
              <span>
                <span className="luxury-kicker text-kintsugi-300/78">{PILOT_FEATURES[2].meta}</span>
                <span className="mt-2 block font-display text-xl font-semibold leading-tight group-hover:text-kintsugi-300">
                  {PILOT_FEATURES[2].label}
                </span>
              </span>
              <span className="text-kintsugi-300 transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#101313] py-28 sm:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 max-w-3xl">
            <p className="luxury-kicker text-kintsugi-300">Product hierarchy</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.6rem,5vw,5.2rem)] font-semibold text-white">
              One system, many scales of travel intelligence.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_HIERARCHY.map((item, index) => (
              <article key={item.label} className="rounded-[1.15rem] border border-white/12 bg-white/[0.055] p-6 backdrop-blur-xl">
                <div className="font-display text-3xl font-semibold text-kintsugi-300/64 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="luxury-kicker mt-6 text-white/42">{item.label}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/62">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
