/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { AmbientDestinationMotion } from "@/components/destination/AmbientDestinationMotion";
import { PreferencesPanel } from "@/components/home/PreferencesPanel";
import { EditorialCard } from "@/components/common/CoverTile";
import {
  FlightCta,
  HotelCta,
  InsuranceCta,
} from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";
import { getDestinationIdentity } from "@/lib/destination/identity";

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

const DISCOVERY_MOODS: Array<{
  label: string;
  mood: string;
  image: string;
}> = [
  { label: "Mountains", mood: "Thin air, rail passes, shoulder-season light", image: GLOBAL_IMAGES.mountains },
  { label: "Islands", mood: "Warm water, slow mornings, monsoon timing", image: GLOBAL_IMAGES.islands },
  { label: "Cities", mood: "Food, transit, neighborhoods, late nights", image: GLOBAL_IMAGES.city },
  { label: "Deserts", mood: "Heat windows, road miles, dusk rituals", image: GLOBAL_IMAGES.desert },
  { label: "Forests", mood: "Mist, trails, lodges, rain strategy", image: GLOBAL_IMAGES.forest },
  { label: "Villages", mood: "Craft, markets, quiet stays, local rhythm", image: GLOBAL_IMAGES.village },
];

const DECISION_LAYERS: Array<{
  title: string;
  body: string;
  signal: string;
  href: string;
}> = [
  {
    title: "Budget",
    body: "See what a day actually costs before falling in love with the photo.",
    signal: "daily spend",
    href: "/city/tokyo/costs",
  },
  {
    title: "Visa",
    body: "Start with what your passport can do, then discover places inside that freedom.",
    signal: "passport fit",
    href: "/city/tokyo/visa",
  },
  {
    title: "Weather",
    body: "Match mood to season: beaches, snow, desert air, festival windows.",
    signal: "best month",
    href: "/city/tokyo/weather",
  },
  {
    title: "Travel style",
    body: "Food, design, family, nightlife, wellness, culture, rail, outdoors.",
    signal: "trip shape",
    href: "/city/tokyo/itinerary",
  },
  {
    title: "Safety",
    body: "Know health, emergency, scams, medication, LGBTQ+ and accessibility context.",
    signal: "confidence",
    href: "/city/tokyo/health-safety",
  },
  {
    title: "Practical fit",
    body: "Transit, payments, connectivity, packing and arrival logistics in one place.",
    signal: "friction",
    href: "/city/tokyo/transit",
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

const DISCOVERY_PROMPTS = [
  { label: "Warm Islands Under $150/Day", href: "/discover?feel=warm-islands" },
  { label: "Visa-Easy Culture Capitals", href: "/discover?feel=visa-easy-culture" },
  { label: "Cool-Weather Food Cities", href: "/discover?feel=cool-food-cities" },
  { label: "Quiet Villages With Rail Access", href: "/discover?feel=quiet-rail-villages" },
];

export default function HomePage() {
  const identity = getDestinationIdentity("global");

  return (
    <main className="bg-[#090b0b] text-washi-50">
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-sumi-900 text-white">
        <img
          src={GLOBAL_IMAGES.hero}
          alt="A cinematic global travel landscape with mountains and open road"
          className="image-drift absolute inset-0 -z-30 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(7,9,9,.94),rgba(7,9,9,.58)_48%,rgba(7,9,9,.18)),linear-gradient(0deg,rgba(7,9,9,.86),transparent_54%)]" />
        <div className="absolute inset-0 -z-10 opacity-70" style={{ backgroundImage: identity.texture }} />
        <AmbientDestinationMotion identity={identity} />

        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-14 px-6 pb-20 pt-24 sm:pb-24 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="luxury-kicker text-kintsugi-300">Journee global travel discovery</p>
            <h1 className="luxury-display mt-5 text-[clamp(3.25rem,8.4vw,7.6rem)] font-semibold text-white">
              Where should the world take you next?
            </h1>
            <p className="luxury-lede mt-8 max-w-2xl text-washi-50/84">
              Discover destinations by budget, visa, weather, mood and travel style, then enter each country and city through cinematic intelligence built for real decisions.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/discover"
                className="rounded-full bg-white px-7 py-3 text-sm font-bold text-sumi-900 shadow-editorial-deep transition hover:bg-kintsugi-300"
              >
                Start Discovering →
              </Link>
              <Link
                href="/city/tokyo"
                className="rounded-full border border-white/45 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/12"
              >
                View Pilot City
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.35rem] border border-white/16 bg-black/28 p-5 shadow-editorial-deep backdrop-blur-xl sm:p-7">
            <p className="luxury-kicker text-white/50">Search by feeling</p>
            <div className="mt-6 grid gap-4">
              {DISCOVERY_PROMPTS.map((prompt) => (
                <Link
                  key={prompt.href}
                  href={prompt.href}
                  className="rounded-2xl border border-white/12 bg-white/[0.07] p-4 text-sm text-white/74 transition hover:border-kintsugi-300/60 hover:bg-white/[0.12] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
                >
                  {prompt.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="discover" className="relative z-10 mx-auto -mt-6 max-w-5xl px-6">
        <PreferencesPanel />
      </section>

      <section className="journee-scene relative overflow-hidden py-32 sm:py-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(95,150,165,.18),transparent_34%),radial-gradient(circle_at_82%_35%,rgba(209,170,99,.18),transparent_36%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <p className="luxury-kicker text-kintsugi-300">World moods</p>
              <h2 className="luxury-display mt-4 text-[clamp(2.8rem,6vw,6rem)] font-semibold text-white">
                The world opens in different climates.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/64 lg:ml-auto">
              Journee is built to compare unlike places without flattening them: mountains, islands, megacities, villages, deserts, forests, beaches and cultural capitals each deserve their own visual and practical rhythm.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.28fr_.72fr] lg:items-start">
            <article className="group relative min-h-[42rem] overflow-hidden rounded-[1.5rem] border border-white/12 bg-sumi-900 shadow-editorial-deep">
              <img
                src={DISCOVERY_MOODS[0].image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.2)_44%,rgba(0,0,0,.88)),linear-gradient(90deg,rgba(0,0,0,.64),transparent)]" />
              <div className="relative flex min-h-[42rem] flex-col justify-end p-7 sm:p-10">
                <div className="max-w-2xl border-l border-kintsugi-300/70 pl-6">
                  <p className="luxury-kicker text-kintsugi-300/82">Discovery mood</p>
                  <h3 className="mt-4 font-display text-[clamp(3.2rem,8vw,6.4rem)] font-semibold leading-[0.96] text-white">
                    {DISCOVERY_MOODS[0].label}
                  </h3>
                  <p className="mt-5 max-w-lg text-base leading-8 text-white/72">{DISCOVERY_MOODS[0].mood}</p>
                </div>
              </div>
            </article>

            <div className="grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-1">
              {DISCOVERY_MOODS.slice(1).map((mood, index) => (
              <article key={mood.label} className={`group relative min-h-[15rem] overflow-hidden rounded-[1.2rem] border border-white/12 bg-sumi-900 shadow-editorial-deep ${index === 1 ? "lg:-ml-14" : ""}`}>
                <img
                  src={mood.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.06),rgba(0,0,0,.38)_44%,rgba(0,0,0,.9))]" />
                <div className="relative flex min-h-[15rem] flex-col justify-end p-5">
                  <p className="luxury-kicker text-kintsugi-300/82">Discovery mood</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-white">
                    {mood.label}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/68">{mood.mood}</p>
                </div>
              </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#101313] py-32 sm:py-44">
        <div className="absolute inset-y-0 left-0 w-[58vw] opacity-18" style={{ backgroundImage: `url(${GLOBAL_IMAGES.desert})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,19,19,.76),rgba(16,19,19,.94)_48%,rgba(16,19,19,.98))]" />
        <div className="relative mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-[.68fr_1.32fr] lg:items-start">
          <div>
            <p className="luxury-kicker text-kintsugi-300">Decision intelligence</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.7rem,5.5vw,5.8rem)] font-semibold text-white">
              Discovery should start with the trip you can actually take.
            </h2>
            <p className="mt-7 max-w-md text-base leading-8 text-white/62">
              The pilot data is Tokyo, but the product model is global: every destination is evaluated through practical constraints and emotional fit.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {DECISION_LAYERS.map((layer) => (
              <Link
                key={layer.title}
                href={layer.href}
                className="group scene-glass rounded-[1.15rem] p-6 transition hover:-translate-y-1 hover:border-kintsugi-300/60 hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
              >
                <p className="luxury-kicker text-kintsugi-300/78">{layer.signal}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-white group-hover:text-kintsugi-300">
                  {layer.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{layer.body}</p>
              </Link>
            ))}
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
              The first complete content stack demonstrates how Journee will treat every destination: immersive city hub, country intelligence and topic-specific subpages.
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
