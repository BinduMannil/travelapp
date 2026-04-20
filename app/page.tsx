import Link from "next/link";
import { PreferencesPanel } from "@/components/home/PreferencesPanel";
import { CoverTile } from "@/components/common/CoverTile";

const HERO_STRIP: Array<{
  label: string;
  sublabel: string;
  href: string;
  palette:
    | "rose"
    | "amber"
    | "emerald"
    | "sky"
    | "indigo"
    | "violet"
    | "fuchsia"
    | "teal";
  icon: string;
}> = [
  { label: "1 city", sublabel: "Tokyo, deep", href: "/city/tokyo", palette: "indigo", icon: "🗼" },
  { label: "12 attractions", sublabel: "Ranked", href: "/city/tokyo/attractions", palette: "amber", icon: "⛩️" },
  { label: "Michelin food", sublabel: "+ ¥1,300 ramen", href: "/city/tokyo/restaurants", palette: "rose", icon: "🍣" },
  { label: "Onsen etiquette", sublabel: "10 venues", href: "/city/tokyo/wellness", palette: "teal", icon: "♨️" },
  { label: "Your vibe", sublabel: "Pack accordingly", href: "/city/tokyo/packing", palette: "fuchsia", icon: "🎒" },
];

const PILOT_FEATURES: Array<{ label: string; icon: string; href: string }> = [
  { label: "Attractions", icon: "⛩️", href: "/city/tokyo/attractions" },
  { label: "Restaurants", icon: "🍣", href: "/city/tokyo/restaurants" },
  { label: "Neighborhoods", icon: "🏙️", href: "/city/tokyo/neighborhoods" },
  { label: "Hotels", icon: "🏨", href: "/city/tokyo/hotels" },
  { label: "Onsen & wellness", icon: "♨️", href: "/city/tokyo/wellness" },
  { label: "Itineraries", icon: "🗺️", href: "/city/tokyo/itinerary" },
  { label: "Packing list", icon: "🎒", href: "/city/tokyo/packing" },
  { label: "Daily costs", icon: "💴", href: "/city/tokyo/costs" },
];

const TIMELINE: Array<{
  days: string;
  title: string;
  body: string;
  href: string;
  palette: "indigo" | "amber" | "emerald" | "fuchsia";
  icon: string;
}> = [
  {
    days: "Day 1",
    title: "Old Tokyo",
    body: "Sensō-ji at dawn, Nakamise snacks, river walk to Skytree. Closed out with Gonpachi.",
    href: "/city/tokyo/itinerary/first-timer-3-days",
    palette: "amber",
    icon: "⛩️",
  },
  {
    days: "Day 2",
    title: "Harajuku → Shibuya",
    body: "Meiji Jingū forest, Ura-Harajuku indie shops, AFURI ramen, Shibuya Sky at sunset.",
    href: "/city/tokyo/itinerary/first-timer-3-days",
    palette: "fuchsia",
    icon: "🏙️",
  },
  {
    days: "Day 3",
    title: "Art + Ginza",
    body: "teamLab Planets, Tsukiji late morning, Ginza Chūō-dōri stroll, Michelin dinner.",
    href: "/city/tokyo/itinerary/first-timer-3-days",
    palette: "indigo",
    icon: "🎨",
  },
];

const INCLUDED: Array<{ title: string; body: string; icon: string; href: string }> = [
  {
    title: "Visa for your passport",
    body: "35 citizenships indexed, with stay limits and official sources.",
    icon: "🛂",
    href: "/city/tokyo/visa",
  },
  {
    title: "Packing that fits your dates",
    body: "Tuned to Tokyo's climate + your planned activities + kids if any.",
    icon: "🎒",
    href: "/city/tokyo/packing",
  },
  {
    title: "Airport → city",
    body: "N'EX, Skyliner, Keikyu, bus, taxi — all timed and priced.",
    icon: "🚄",
    href: "/city/tokyo/arrival",
  },
  {
    title: "Tipping + payments",
    body: "No tipping here. And the method × venue acceptance matrix.",
    icon: "💴",
    href: "/city/tokyo/payments",
  },
];

const COUNTRY_FEATURES: Array<{ label: string; icon: string; href: string; hint: string }> = [
  { label: "Must-try cuisine", icon: "🍜", href: "/country/japan/cuisine", hint: "12 dishes · origin · vegan notes" },
  { label: "Famous for", icon: "🎎", href: "/country/japan/famous-for", hint: "Knives, whisky, anime, denim" },
  { label: "Languages", icon: "🈴", href: "/country/japan/languages", hint: "All spoken, by share" },
];

export default function HomePage() {
  return (
    <main className="bg-slate-50">
      {/* HERO ---------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-slate-950" />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600/70 via-fuchsia-600/60 to-rose-500/70"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, rgba(255,255,255,.5), transparent 45%), radial-gradient(circle at 82% 10%, rgba(255,200,100,.4), transparent 50%), radial-gradient(circle at 60% 90%, rgba(255,100,180,.3), transparent 50%)",
          }}
          aria-hidden
        />

        <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 text-white sm:pb-16 sm:pt-24">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">
            Travel companion · Tokyo pilot
          </p>

          <h1 className="mt-4 text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.95] tracking-tight">
            <span className="bg-gradient-to-r from-white via-amber-100 to-pink-100 bg-clip-text text-transparent">
              TOKYO.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Seasons, visas for your passport, transit passes, tipping, must-try
            dishes, onsen etiquette, packing tuned to your dates — ranked by
            people who&rsquo;ve actually been.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/city/tokyo"
              className="rounded-full bg-white px-6 py-3 font-medium text-slate-900 shadow-xl shadow-black/20 transition hover:bg-slate-100"
            >
              Explore Tokyo →
            </Link>
            <Link
              href="/country/japan"
              className="rounded-full border border-white/40 px-6 py-3 font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              About Japan
            </Link>
          </div>
        </div>

        {/* portrait photo strip — mirrors the inspiration's horizontal vertical-card row */}
        <div className="mx-auto max-w-7xl px-6 pb-14">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {HERO_STRIP.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:ring-white/60"
              >
                <CoverTile
                  palette={s.palette}
                  icon={s.icon}
                  aspect="3/2"
                  className="rounded-2xl sm:!aspect-[3/4]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3">
                  <div className="text-sm font-semibold text-white">
                    {s.label}
                  </div>
                  <div className="text-xs text-white/80">{s.sublabel}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PREFERENCES --------------------------------------------------- */}
      <section className="mx-auto -mt-8 max-w-6xl px-6">
        <PreferencesPanel />
      </section>

      {/* TIMELINE — "What a trip here looks like" --------------------- */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                A first-timer&rsquo;s three days
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                One city. Deep.
              </h2>
            </div>
            <Link
              href="/city/tokyo/itinerary"
              className="hidden rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white/10 sm:inline-block"
            >
              All itineraries →
            </Link>
          </div>

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {TIMELINE.map((t) => (
              <li key={t.days} className="group">
                <CoverTile palette={t.palette} icon={t.icon} aspect="4/3" />
                <div className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60">
                  {t.days}
                </div>
                <h3 className="mt-1 text-xl font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-white/75">{t.body}</p>
                <Link
                  href={t.href}
                  className="mt-3 inline-block text-sm text-amber-200 underline underline-offset-4 hover:text-amber-100"
                >
                  See day plan →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURE TILES — "Jump straight in" --------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <header className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Inside Tokyo
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Jump straight in
            </h2>
          </div>
          <Link
            href="/city/tokyo"
            className="hidden text-sm text-brand-600 hover:underline sm:inline"
          >
            All 25 sections →
          </Link>
        </header>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PILOT_FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-2xl transition group-hover:from-brand-100 group-hover:to-fuchsia-100">
                {f.icon}
              </span>
              <div className="font-medium text-slate-900">{f.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED ---------------------------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            What&rsquo;s included
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            The tedious bits, done for you
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((i) => (
              <Link
                key={i.title}
                href={i.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg"
              >
                <div className="text-3xl">{i.icon}</div>
                <h3 className="mt-3 font-semibold">{i.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{i.body}</p>
                <div className="mt-3 text-sm text-brand-600 group-hover:underline">
                  Open →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT JAPAN --------------------------------------------------- */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            About Japan
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Culture that shapes every trip
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {COUNTRY_FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand-400 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-100 to-fuchsia-100 text-2xl">
                  {f.icon}
                </span>
                <div>
                  <div className="font-medium text-slate-900">{f.label}</div>
                  <div className="text-xs text-slate-500">{f.hint}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
