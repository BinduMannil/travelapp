"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  CalendarDays,
  ChefHat,
  Coffee,
  Compass,
  Globe2,
  Languages,
  MapPinned,
  Route,
  Sparkles,
  Star,
  Wine,
} from "lucide-react";
import {
  getPlacesForCountry,
  type CountryContentCard,
  type CountryOption,
} from "@/lib/destinations/countries";
import {
  DestinationAtmosphereProvider,
  DestinationMotionLayer,
  DestinationThemeOverlay,
  getAtmosphereThemeForRender,
} from "@/components/destination/DestinationAtmosphere";
import {
  getUniqueDestinationImage,
  inferImageCategoryFromText,
  resetUsedImagesForPage,
} from "@/lib/imageRotation";

export type CountrySubpageKind =
  | "itinerary"
  | "cuisine"
  | "beverages"
  | "famous-for"
  | "languages";

type Module = {
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  image?: string;
};

const kindMeta: Record<
  CountrySubpageKind,
  {
    nav: string;
    eyebrow: string;
    title: (country: CountryOption) => string;
    body: (country: CountryOption) => string;
    icon: typeof Compass;
  }
> = {
  itinerary: {
    nav: "Itinerary",
    eyebrow: "Route builder",
    title: (country) => `Plan ${country.name} by rhythm, not checklist.`,
    body: (country) =>
      `Shape a ${country.name} route around cities, transfer days, seasons, food stops, and the pace that makes the trip feel coherent.`,
    icon: Route,
  },
  cuisine: {
    nav: "Cuisine",
    eyebrow: "Cuisine",
    title: (country) => `Eat your way through ${country.name}.`,
    body: (country) =>
      `${country.name}'s food guide belongs inside the same country system: regional dishes, market timing, cafe stops, and practical meal planning.`,
    icon: ChefHat,
  },
  beverages: {
    nav: "Beverages",
    eyebrow: "Beverages",
    title: (country) => `Drink culture in ${country.name}.`,
    body: (country) =>
      `Coffee, tea, wine, beer, juice, mineral water, and evening rituals are part of how a ${country.name} day finds its pace.`,
    icon: Wine,
  },
  "famous-for": {
    nav: "Famous for",
    eyebrow: "Famous for",
    title: (country) => `What ${country.name} is known for.`,
    body: (country) =>
      `The strongest travel signals in ${country.name}: landscapes, daily culture, craft, food, movement, neighborhoods, and the scenes people remember.`,
    icon: Star,
  },
  languages: {
    nav: "Language",
    eyebrow: "Language",
    title: (country) => `Language notes for ${country.name}.`,
    body: () =>
      `Use the phrase layer for greetings, taxis, restaurants, markets, directions, and moments when a few local words make travel easier.`,
    icon: Languages,
  },
};

const vietnamModules: Partial<Record<CountrySubpageKind, Module[]>> = {
  itinerary: [
    {
      eyebrow: "12-18 days",
      title: "North to South Classic",
      body: "Hanoi, Sapa, Ninh Binh, Hue, Da Nang, Hoi An, and Ho Chi Minh City create the full country arc.",
    },
    {
      eyebrow: "6-9 days",
      title: "Central Coast and Lanterns",
      body: "Da Nang, Hoi An, and Hue balance beach mornings, lantern evenings, imperial history, seafood, and the Hai Van Pass.",
    },
    {
      eyebrow: "7-11 days",
      title: "Southern Coffee and Islands",
      body: "Ho Chi Minh City, Can Tho, and Phu Quoc work for cafes, rooftop heat, Mekong dawn, floating markets, and island decompression.",
    },
  ],
  cuisine: [
    {
      eyebrow: "Phở",
      title: "Pho",
      body: "The noodle-soup reference point. Compare northern and southern styles before loading the bowl with condiments.",
    },
    {
      eyebrow: "Bánh mì",
      title: "Banh mi",
      body: "A crisp, portable meal that carries colonial, street-food, pickle, herb, and local shop culture in one bite.",
    },
    {
      eyebrow: "Bún chả",
      title: "Bun cha",
      body: "Grilled pork, herbs, noodles, and dipping broth. Social, smoky, and strongly Hanoi-coded.",
    },
  ],
  beverages: [
    {
      eyebrow: "Coffee",
      title: "Ca phe sua da",
      body: "Iced coffee with condensed milk: strong, sweet, and the default first order for many visitors.",
    },
    {
      eyebrow: "Coffee",
      title: "Egg coffee",
      body: "A Hanoi icon with whipped egg cream over coffee. Treat it like dessert, not a quick caffeine stop.",
    },
    {
      eyebrow: "Beer",
      title: "Bia hoi",
      body: "Fresh draft beer culture, especially visible in Hanoi: cheap, casual, social, and best with good timing.",
    },
  ],
  "famous-for": [
    {
      eyebrow: "Coffee",
      title: "Coffee culture",
      body: "Phin coffee, condensed milk, egg coffee, coconut coffee, roasteries, laptop cafes, and slow sidewalk mornings.",
    },
    {
      eyebrow: "Craft",
      title: "Tailoring",
      body: "Hoi An is the practical tailoring capital. Time matters: fabric choice, fitting, adjustment, and pickup need breathing room.",
    },
    {
      eyebrow: "Motion",
      title: "Motorbike rhythm",
      body: "Scooters shape how cities move, how roads are crossed, and how travelers understand distance, risk, rain, and daily life.",
    },
  ],
  languages: [
    {
      eyebrow: "Reality",
      title: "Vietnamese is tonal",
      body: "Phrasebook transliteration is support, not a guarantee. Saved addresses and translated text often work better than repetition.",
    },
    {
      eyebrow: "Useful phrase",
      title: "Xin chào",
      body: "A simple hello. Polite basics help in cafes, hotels, markets, and taxis.",
    },
    {
      eyebrow: "Useful phrase",
      title: "Cảm ơn",
      body: "Thank you. A small phrase that travels well across daily service moments.",
    },
  ],
};

function Arrow() {
  return <span aria-hidden className="text-lg leading-none text-[#d8aa4f] transition group-hover:translate-x-1">→</span>;
}

function countryPath(country: CountryOption, kind: CountrySubpageKind) {
  return `/country/${country.slug}/${kind}`;
}

function defaultModules(country: CountryOption, kind: CountrySubpageKind): Module[] {
  const places = getPlacesForCountry(country.slug);
  if (kind === "itinerary") {
    return (places.length ? places.slice(0, 4) : [{ name: country.name, summary: country.summary, slug: country.slug, kind: "country" }]).map((place, index) => ({
      eyebrow: index === 0 ? "Start here" : "Route stop",
      title: place.name,
      body: place.summary,
      href: "slug" in place && place.slug !== country.slug ? `/city/${place.slug}` : undefined,
    }));
  }

  const labels: Record<CountrySubpageKind, string[]> = {
    itinerary: [],
    cuisine: ["Regional specialties", "Market timing", "Signature meals"],
    beverages: ["Local drinks", "Cafe culture", "Evening rituals"],
    "famous-for": ["Landscape", "Culture", "Craft and movement"],
    languages: ["Greetings", "Daily phrases", "Travel context"],
  };

  return labels[kind].map((label, index) => ({
    eyebrow: label,
    title:
      kind === "languages"
        ? `${country.name} phrase ${index + 1}`
        : `${label} in ${country.name}`,
    body:
      index === 0
        ? country.summary
        : `Use this ${label.toLowerCase()} layer as part of the same ${country.name} country guide, connected to cities, routes, and trip planning.`,
  }));
}

function relatedLinks(country: CountryOption, activeKind: CountrySubpageKind) {
  const links = [
    { label: "Overview", href: `/country/${country.slug}`, icon: MapPinned },
    { label: "Itinerary", href: countryPath(country, "itinerary"), icon: CalendarDays },
    { label: "Cuisine", href: countryPath(country, "cuisine"), icon: ChefHat },
    { label: "Beverages", href: countryPath(country, "beverages"), icon: Coffee },
    { label: "Famous For", href: countryPath(country, "famous-for"), icon: Star },
    { label: "Language", href: countryPath(country, "languages"), icon: Globe2 },
  ];

  return links.filter((link) => !link.href.endsWith(`/${activeKind}`));
}

function featuredCards(country: CountryOption): CountryContentCard[] {
  const places = getPlacesForCountry(country.slug);
  return (
    country.featuredExperiences ??
    places.slice(0, 4).map((place) => ({
      eyebrow: place.kind,
      title: place.name,
      description: place.summary,
      href: `/city/${place.slug}`,
      image: place.image ?? country.image,
    }))
  );
}

export function CountrySubpageExperience({
  country,
  kind,
}: {
  country: CountryOption;
  kind: CountrySubpageKind;
}) {
  const isVietnam = country.slug === "vietnam";
  const atmosphereTheme = getAtmosphereThemeForRender({
    destinationSlug: country.slug,
    destinationType: "country",
  });
  const meta = kindMeta[kind];
  const modules =
    country.slug === "vietnam" && vietnamModules[kind]
      ? vietnamModules[kind]
      : defaultModules(country, kind);
  const usedImages = resetUsedImagesForPage();
  const heroImage = getUniqueDestinationImage({
    destinationSlug: country.slug,
    countrySlug: country.slug,
    category: inferImageCategoryFromText(kind),
    preferredImage: country.image,
    usedImages,
  });
  const cards = featuredCards(country).map((card) => ({
    ...card,
    image: getUniqueDestinationImage({
      destinationSlug: country.slug,
      countrySlug: country.slug,
      category: inferImageCategoryFromText(`${kind} ${card.eyebrow} ${card.title} ${card.description}`),
      preferredImage: card.image,
      usedImages,
    }),
  }));
  const Icon = meta.icon;

  return (
    <DestinationAtmosphereProvider destinationSlug={country.slug} destinationType="country">
    <main className={`${isVietnam ? "vietnam-editorial" : ""} min-h-screen overflow-x-hidden bg-[#020a0b] text-white`}>
      <section className="relative isolate min-h-[34rem] overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 -z-30 h-full w-full object-cover brightness-[1.06] contrast-[1.08] saturate-[1.28]"
        />
        <DestinationThemeOverlay theme={atmosphereTheme} className="-z-20" />
        <DestinationMotionLayer theme={atmosphereTheme} className="-z-10" />
        <div className="absolute inset-x-0 top-0 z-20 border-b border-white/8 bg-black/10 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-6 px-4 py-5 sm:px-5 xl:px-0">
            <Link href="/" className="min-w-0">
              <span className="block text-2xl font-bold uppercase tracking-[0.22em] text-white">
                JOURNEE
              </span>
              <span className="block text-[0.55rem] font-bold uppercase tracking-[0.28em]" style={{ color: "var(--destination-primary)" }}>
                by Dzeli
              </span>
            </Link>
            <nav className="hidden items-center gap-8 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white/86 lg:flex">
              {["Destinations", "Journeys", "Yachts", "Rail", "Aurora", "Expeditions", "Experiences", "Concierge"].map((item) => (
                <Link key={item} href={item === "Destinations" ? "/discover" : `/${item.toLowerCase()}`} className="transition hover:text-[var(--destination-primary)]">
                  {item}
                </Link>
              ))}
            </nav>
            <Link
              href="/concierge"
              className="rounded px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#15110a]"
              style={{ backgroundColor: "var(--destination-primary)" }}
            >
              Join
            </Link>
          </div>
        </div>

        <div className="mx-auto grid min-h-[34rem] max-w-[1160px] content-end px-4 pb-16 pt-28 sm:px-5 xl:px-0">
          <nav className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white/72 sm:tracking-[0.14em]">
            <Link href="/" className="hover:text-white">Home</Link> ·{" "}
            <Link href={`/country/${country.slug}`} className="hover:text-white">{country.name}</Link> · {meta.nav}
          </nav>
          <div className="mt-9 flex max-w-3xl items-center gap-4">
            <Icon className="hidden h-9 w-9 shrink-0 sm:block" style={{ color: "var(--destination-primary)" }} strokeWidth={1.4} />
            <p className="text-[0.76rem] font-bold uppercase tracking-[0.1em] drop-shadow-[0_2px_14px_rgba(0,0,0,.75)] sm:tracking-[0.16em]" style={{ color: "var(--destination-primary)" }}>
              {meta.eyebrow}
            </p>
          </div>
          <h1 className="mt-4 max-w-[11ch] font-sans text-[clamp(3.05rem,14vw,5.2rem)] font-semibold leading-[0.86] tracking-[-0.02em] text-white drop-shadow-[0_12px_38px_rgba(0,0,0,0.72)] md:text-[clamp(3.8rem,8vw,6.4rem)] lg:text-[clamp(4.6rem,7vw,7.6rem)] lg:leading-[0.84]">
            {meta.title(country)}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/88 drop-shadow-[0_3px_18px_rgba(0,0,0,.7)] sm:mt-6 sm:leading-8">
            {meta.body(country)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-4 py-12 sm:px-5 sm:py-16 xl:px-0">
        <div className="mb-7 max-w-3xl">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--destination-primary)" }}>
            {meta.nav} guide
          </p>
          <h2 className="mt-3 font-sans text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
            Keep the country page connected to real planning decisions.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {modules.map((item) => {
            const content = (
              <article className="group min-h-[13rem] rounded-lg border bg-white/[0.045] p-5 transition hover:bg-white/[0.075]" style={{ borderColor: "var(--destination-card-border)" }}>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--destination-primary)" }}>
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 font-sans text-xl font-semibold leading-tight text-white sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/66">{item.body}</p>
                {item.href ? (
                  <span className="mt-5 inline-flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--destination-primary)" }}>
                    Explore <Arrow />
                  </span>
                ) : null}
              </article>
            );
            return item.href ? (
              <Link key={`${item.eyebrow}-${item.title}`} href={item.href}>
                {content}
              </Link>
            ) : (
              <div key={`${item.eyebrow}-${item.title}`}>{content}</div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-4 py-8 sm:px-5 xl:px-0">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--destination-primary)" }}>
          Featured experiences
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link key={card.title} href={card.href} className="group relative min-h-[15rem] overflow-hidden rounded-lg border border-white/16 bg-white/[0.045]">
              <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,10,11,.9),rgba(2,10,11,.2)_64%)]" />
              <span className="relative flex h-full min-h-[15rem] flex-col justify-end p-5">
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--destination-primary)" }}>{card.eyebrow}</span>
                <strong className="mt-2 font-sans text-xl font-semibold leading-tight text-white">{card.title}</strong>
                <span className="mt-2 line-clamp-2 text-sm leading-6 text-white/68">{card.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-4 py-8 sm:px-5 xl:px-0">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--destination-primary)" }}>
          Related links
        </p>
        <div className="mt-4 grid border-y border-white/12 md:grid-cols-3">
          {relatedLinks(country, kind).slice(0, 6).map((item) => {
            const LinkIcon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="group flex items-center gap-4 border-white/12 py-4 pr-4 transition hover:bg-white/[0.035] md:border-r md:px-5">
                <LinkIcon className="h-6 w-6 shrink-0" style={{ color: "var(--destination-primary)" }} strokeWidth={1.4} />
                <span className="flex-1 text-sm font-semibold text-white/82">{item.label}</span>
                <Arrow />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-4 pb-10 pt-2 sm:px-5 xl:px-0">
        <Link href={country.routeCta?.href ?? countryPath(country, "itinerary")} className="group flex flex-col gap-4 rounded-lg border bg-white/[0.035] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7" style={{ borderColor: "var(--destination-card-border)" }}>
          <span className="flex min-w-0 items-center gap-5">
            <Sparkles className="h-9 w-9 shrink-0" style={{ color: "var(--destination-primary)" }} strokeWidth={1.3} />
            <span>
              <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--destination-primary)" }}>
                {country.routeCta?.eyebrow ?? "Route builder"}
              </span>
              <span className="mt-1 block font-sans text-xl font-semibold leading-snug text-white sm:text-2xl">
                {country.routeCta?.title ?? `Craft your perfect ${country.name} journey.`}
              </span>
            </span>
          </span>
          <span className="inline-flex w-fit items-center gap-3 rounded border px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.12em]" style={{ borderColor: "var(--destination-card-border)", color: "var(--destination-primary)" }}>
            {country.routeCta?.label ?? "Build route"} <Arrow />
          </span>
        </Link>
      </section>
    </main>
    </DestinationAtmosphereProvider>
  );
}
