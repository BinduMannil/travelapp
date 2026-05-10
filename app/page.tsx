/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
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

export default function HomePage() {
  return (
    <main className="bg-[#090b0b] text-washi-50">
      <CinematicDiscovery />

      <section className="relative isolate min-h-[110svh] overflow-hidden bg-[#080909] py-24 sm:py-32">
        <div
          className="image-drift absolute inset-0 -z-30 opacity-90"
          style={{
            backgroundImage: `url(${GLOBAL_IMAGES.islands})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-y-[7%] right-[-4vw] -z-20 hidden w-[58vw] rotate-[-3deg] overflow-hidden rounded-l-[4rem] border border-white/14 shadow-[0_44px_120px_rgba(0,0,0,.5)] lg:block"
          style={{
            backgroundImage: `url(${GLOBAL_IMAGES.city})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.34),rgba(0,0,0,.08),rgba(0,0,0,.5))]" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_22%,rgba(216,173,79,.18),transparent_27%),radial-gradient(circle_at_18%_70%,rgba(95,150,165,.23),transparent_35%),linear-gradient(90deg,rgba(5,7,7,.94),rgba(5,7,7,.68)_42%,rgba(5,7,7,.5)),linear-gradient(0deg,rgba(5,7,7,.95),rgba(5,7,7,.18)_55%,rgba(5,7,7,.62))]" />

        <div className="relative mx-auto grid min-h-[86svh] max-w-7xl content-center gap-14 px-6 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div className="max-w-xl">
            <p className="luxury-kicker text-kintsugi-300">Decision intelligence</p>
            <h2 className="luxury-display mt-5 text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[0.9] text-white">
              Before the place becomes a promise.
            </h2>
            <p className="mt-7 text-lg leading-9 text-white/78">
              Journee lets desire arrive first, then quietly tests the trip against the realities that decide whether a beautiful idea can become a beautiful journey.
            </p>
            <Link
              href={DECISION_LAYERS[0].href}
              className="mt-9 inline-flex rounded-full bg-white px-7 py-3 text-sm font-bold text-sumi-900 shadow-editorial-deep transition hover:bg-kintsugi-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
            >
              Start with cost →
            </Link>
          </div>

          <div className="relative min-h-[46rem]">
            <div className="absolute left-0 top-0 h-[31rem] w-[70%] overflow-hidden rounded-[2.2rem] border border-white/16 shadow-editorial-deep">
              <img src={GLOBAL_IMAGES.desert} alt="" className="h-full w-full object-cover saturate-[1.2]" loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.5)),linear-gradient(90deg,rgba(0,0,0,.36),transparent)]" />
            </div>
            <div className="absolute bottom-0 right-0 h-[30rem] w-[62%] overflow-hidden rounded-[2.2rem] border border-white/16 shadow-editorial-deep">
              <img src={GLOBAL_IMAGES.forest} alt="" className="h-full w-full object-cover saturate-[1.16]" loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.52))]" />
            </div>
            <div className="absolute left-[9%] top-[24rem] h-28 w-44 overflow-hidden rounded-[1.2rem] border border-white/18 shadow-editorial-deep sm:h-36 sm:w-64">
              <img src={GLOBAL_IMAGES.food} alt="" className="h-full w-full object-cover saturate-[1.25]" loading="lazy" />
            </div>
            <div className="relative ml-auto max-w-[34rem] pt-16">
              <div className="border-l border-kintsugi-300/52 bg-black/26 py-2 pl-6 backdrop-blur-md">
                {DECISION_LAYERS.map((layer, index) => (
                <Link
                  key={layer.title}
                  href={layer.href}
                  className="group block border-b border-white/14 py-5 text-white last:border-b-0 hover:text-kintsugi-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
                >
                  <span className="luxury-kicker text-kintsugi-300/78">{String(index + 1).padStart(2, "0")} · {layer.signal}</span>
                  <span className="mt-2 grid gap-4 sm:grid-cols-[.36fr_.64fr] sm:items-baseline">
                    <span className="font-display text-[clamp(2rem,3.3vw,3.5rem)] font-semibold leading-none">{layer.title}</span>
                    <span className="text-sm leading-7 text-white/74 group-hover:text-white">{layer.body}</span>
                  </span>
                </Link>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[100svh] overflow-hidden bg-sumi-900 py-28 text-washi-50 sm:py-40">
        <div
          className="image-drift absolute inset-0 -z-30 opacity-88"
          style={{
            backgroundImage: `url(${GLOBAL_IMAGES.mountains})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(6,7,7,.92),rgba(6,7,7,.55)_46%,rgba(6,7,7,.2)),linear-gradient(0deg,rgba(6,7,7,.96),rgba(6,7,7,.16)_56%,rgba(6,7,7,.45))]" />
        <div className="relative mx-auto grid min-h-[78svh] max-w-7xl content-center gap-12 px-6 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div className="max-w-lg">
            <p className="luxury-kicker text-kintsugi-300">Curated travel desk</p>
            <h2 className="luxury-display mt-4 text-[clamp(3rem,6.4vw,6.8rem)] font-semibold leading-[0.9] text-white">
              The practical layer, kept close to the wonder.
            </h2>
            <p className="mt-7 text-base leading-8 text-white/76">
              Flights, stays and protection should support the destination, not flatten it into checkout steps.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div className="lg:translate-y-16">
              <HotelCta city="your next destination" source="home-global" />
            </div>
            <div className="grid gap-5">
              <FlightCta destinationLabel="anywhere" destinationIata="anywhere" source="home-global" />
              <InsuranceCta source="home-global" />
            </div>
          </div>
          <div className="lg:col-start-2 mt-2 max-w-3xl text-white/78 [&_*]:text-white/78 [&_a]:text-kintsugi-300">
            <AffiliateDisclosure />
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[110svh] overflow-hidden bg-[#0b0a09] py-28 text-washi-50 sm:py-40">
        <div className="absolute inset-0 -z-30 grid grid-cols-1 lg:grid-cols-3" aria-hidden>
          <img src={GLOBAL_IMAGES.tokyo} alt="" className="h-full min-h-[28rem] w-full object-cover opacity-84 saturate-[1.1]" loading="lazy" />
          <img src={GLOBAL_IMAGES.culture} alt="" className="hidden h-full w-full object-cover opacity-78 saturate-[1.08] lg:block" loading="lazy" />
          <img src={GLOBAL_IMAGES.food} alt="" className="hidden h-full w-full object-cover opacity-78 saturate-[1.15] lg:block" loading="lazy" />
        </div>
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,5,5,.88),rgba(5,5,5,.52)_46%,rgba(5,5,5,.66)),linear-gradient(0deg,rgba(5,5,5,.95),rgba(5,5,5,.18)_55%,rgba(5,5,5,.55))]" aria-hidden />
        <div className="relative mx-auto grid min-h-[86svh] max-w-7xl content-center gap-14 px-6 lg:grid-cols-[.86fr_1.14fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="luxury-kicker text-kintsugi-300">Pilot depth</p>
            <h2 className="luxury-display mt-4 text-[clamp(3rem,6.6vw,7rem)] font-semibold leading-[0.9] text-white">
              Tokyo is the proof of detail, not the homepage identity.
            </h2>
            <p className="luxury-lede mt-6 max-w-xl text-white/70">
              Tokyo is the first fully composed editorial destination, showing how Journee can turn any place into atmosphere, context, and practical travel intelligence.
            </p>
          </div>
          <div className="space-y-6 border-l border-white/18 bg-black/24 py-4 pl-6 backdrop-blur-md">
            {PILOT_FEATURES.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group block border-b border-white/14 pb-6 last:border-b-0 last:pb-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
              >
                <span className="luxury-kicker text-kintsugi-300/82">{feature.meta}</span>
                <span className="mt-2 block font-display text-[clamp(2rem,4vw,4rem)] font-semibold leading-none text-white group-hover:text-kintsugi-300">
                  {feature.label}
                </span>
                <span className="mt-4 block max-w-2xl text-sm leading-7 text-white/72 group-hover:text-white">{feature.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#080909] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-y border-white/12 py-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <p className="luxury-kicker text-kintsugi-300">The Journee scale</p>
            <p className="font-display text-[clamp(2.4rem,5vw,5.4rem)] font-semibold leading-[0.96] text-white">
              World discovery flows into country context, city atmosphere, and topic intelligence without losing the feeling of the place.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
