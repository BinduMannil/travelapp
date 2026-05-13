import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Bookmark,
  Bus,
  CalendarDays,
  Camera,
  ChevronRight,
  Coins,
  CreditCard,
  Landmark,
  Map,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Train,
  Trash2,
  Utensils,
  WalletCards,
  Waypoints,
} from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { mainNavigation } from "@/lib/routes";

const navItems = mainNavigation.slice(0, 6);

const images = {
  hero:
    "https://images.unsplash.com/photo-1742223626680-a33627c0bccc?auto=format&fit=crop&w=2600&q=90",
  bamboo:
    "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1800&q=88",
  torii:
    "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=900&q=86",
  tea:
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=86",
  lanterns:
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=900&q=86",
  market:
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=86",
  alley:
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=86",
  night:
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=88",
  garden:
    "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=88",
  shrine:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=88",
  bar:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=86",
  stones:
    "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=900&q=86",
  avatar:
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=200&q=80",
};

const tags = ["Culture", "Temples", "Food", "Hidden Gems", "Solo Female Travel"];

const scoreRows = [
  ["Safety", "4.7", ShieldCheck],
  ["Culture", "4.9", Landmark],
  ["Food", "4.8", Utensils],
  ["Transport", "4.6", Train],
  ["Budget", "4.4", WalletCards],
] as const;

const intelligence = [
  { title: "Best Months", value: "Mar - May", detail: "Sep - Nov", icon: CalendarDays },
  { title: "Typical Daily Budget", value: "$90 - $220", detail: "Per person", icon: WalletCards },
  { title: "Visa Reminder", value: "90 days visa-free", detail: "For Indian passport", icon: CreditCard },
  { title: "Local Transport", value: "Trains, Buses,", detail: "Walking, Taxis", icon: Bus },
  { title: "Safety Level", value: "Very High", detail: "Tourist friendly", icon: ShieldCheck },
  { title: "Solo Female Fit", value: "Excellent", detail: "Widely solo-friendly", icon: Sparkles },
] as const;

const moods = [
  { title: "Temples & Shrines", image: images.torii, icon: Landmark },
  { title: "Tea Houses", image: images.tea, icon: Sparkles },
  { title: "Bamboo Forests", image: images.bamboo, icon: Waypoints },
  { title: "Night Walks", image: images.lanterns, icon: MapPin },
  { title: "Food Markets", image: images.market, icon: Utensils },
  { title: "Hidden Alleys", image: images.alley, icon: Map },
] as const;

const itinerary = [
  {
    day: "DAY 1",
    title: "Historic Kyoto",
    image: images.shrine,
    stops: ["Fushimi Inari Taisha", "Kiyomizu-dera Temple", "Gion District Walk", "Pontocho Evening"],
  },
  {
    day: "DAY 2",
    title: "Arashiyama & Tea Culture",
    image: images.bamboo,
    stops: ["Bamboo Grove", "Tenryu-ji Temple", "Okochi Sanso Garden", "Traditional Tea Experience"],
  },
  {
    day: "DAY 3",
    title: "Nishiki Market & Hidden Streets",
    image: images.market,
    stops: ["Nishiki Market", "Philosopher's Path", "Local Shops", "Sunset at Kamogawa River"],
  },
] as const;

const hiddenGems = [
  { title: "Sake Bar Kazu", copy: "Cozy jazz bar with incredible local sake.", place: "Gion", image: images.bar },
  { title: "Otagi Nenbutsu-ji", copy: "Soulful old temple statues tucked into the hills.", place: "Arashiyama", image: images.stones },
  { title: "Camellia Tea House", copy: "Peaceful tea house in a quiet neighborhood.", place: "Higashiyama", image: images.tea },
  { title: "Sannenzaka Street", copy: "Traditional Kyoto street with old-world charm.", place: "Higashiyama", image: images.alley },
  { title: "Kifune Shrine", copy: "Beautiful shrine in a forest setting.", place: "Kurama", image: images.torii },
] as const;

const culture = [
  { title: "Temple Etiquette", copy: "Be quiet, dress modestly and follow posted rules.", icon: Landmark },
  { title: "Tipping", copy: "Tipping is not expected in Japan.", icon: Coins },
  { title: "Public Transport", copy: "Keep noise low and give seats to those in need.", icon: Train },
  { title: "Cash & Cards", copy: "Cash is widely used. Carry enough yen.", icon: CreditCard },
  { title: "Trash & Recycling", copy: "Use bins correctly. Keep the city clean.", icon: Trash2 },
  { title: "Photography", copy: "Ask before photographing people or inside temples.", icon: Camera },
] as const;

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
      {children}
    </p>
  );
}

function ImageBackdrop({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 33vw, 100vw"
      className={`z-0 object-cover ${className}`}
    />
  );
}

function HeaderNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-6 xl:px-0">
        <Link href="/" aria-label="JOURNEE home">
          <JourneeBrand direction="atlas-aperture" className="[&>span:first-child]:h-8 [&>span:first-child]:w-8 [&>span:first-child]:border-0 [&>span:first-child]:bg-transparent [&>span:first-child]:shadow-none [&>span:first-child_svg]:h-6 [&>span:first-child_svg]:w-6 [&>span:last-child]:text-xl [&>span:last-child]:tracking-[0.12em]" />
        </Link>

        <nav className="hidden items-center gap-8 text-[0.78rem] font-semibold text-white/86 lg:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item.label}
              label={item.label}
              href={item.href}
              className="transition hover:text-[#f0c96e]"
              activeClassName="text-[#f0c96e]"
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10"
          >
            <Search className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="hidden h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10 sm:grid"
          >
            <Bell className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <Image
            src={images.avatar}
            alt="Profile avatar"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-[#d8aa4f]/45 object-cover"
          />
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate min-h-[820px] overflow-hidden bg-[#050807] pt-28 text-white lg:min-h-[660px]">
      <Image
        src={images.hero}
        alt="Kyoto sunset with a pagoda overlooking the city"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover"
      />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(2,5,5,.86)_0%,rgba(2,5,5,.5)_42%,rgba(2,5,5,.22)_68%,rgba(2,5,5,.76)_100%)]" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(2,5,5,.34)_0%,rgba(2,5,5,.12)_36%,#050807_100%)]" />
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_72%_24%,rgba(216,170,79,.28),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(126,35,24,.22),transparent_34%)]" />

      <HeaderNav />

      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-10 px-5 pb-16 pt-24 lg:grid-cols-[1fr_300px] lg:items-center lg:px-0 lg:pt-32">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">Japan</p>
          <h1 className="mt-4 font-sans text-[5.8rem] font-semibold leading-[0.82] tracking-[-0.04em] text-[#fff7e5] drop-shadow-[0_18px_50px_rgba(0,0,0,.7)] sm:text-[7.5rem] lg:text-[8.5rem]">
            Kyoto
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-white/88 sm:text-lg">
            Timeless temples, serene gardens, and rich traditions woven into every street and season.
            A Kyoto travel guide for cinematic days, lantern-lit evenings, Kyoto temples, Kyoto food
            markets, and quieter local rituals.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/20 bg-black/28 px-4 py-2 text-[0.72rem] font-semibold text-white/88 shadow-[0_1px_0_rgba(255,255,255,.1)_inset] backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-[#d8aa4f] px-7 text-sm font-bold text-[#1b1307] shadow-[0_18px_50px_rgba(216,170,79,.24)] transition hover:bg-[#f0c96e]">
              Plan Your Journey <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-white/30 bg-black/22 px-7 text-sm font-semibold text-white backdrop-blur transition hover:border-[#d8aa4f]/70 hover:text-[#f0c96e]">
              <Bookmark className="h-4 w-4" /> Save Destination
            </button>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/16 bg-[#0a1110]/72 p-6 shadow-[0_24px_90px_rgba(0,0,0,.45)] backdrop-blur-2xl">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white/48">Destination Score</p>
          <div className="mt-3 flex items-end gap-3">
            <span className="font-sans text-5xl text-[#f1c56d]">4.8</span>
            <span className="pb-2 text-xs font-semibold text-white/62">
              <span className="block text-[#d8aa4f]">★★★★★</span>
              1,248 reviews
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {scoreRows.map(([label, value, Icon]) => (
              <div key={label} className="flex items-center justify-between gap-4 text-sm">
                <span className="inline-flex items-center gap-3 text-white/78">
                  <Icon className="h-4 w-4 text-white/68" strokeWidth={1.7} />
                  {label}
                </span>
                <span className="font-semibold text-white/86">{value}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function IntelligenceStrip() {
  return (
    <section className="relative z-20 -mt-12 px-5">
      <div className="mx-auto grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {intelligence.map(({ title, value, detail, icon: Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/12 bg-[#08110f]/78 p-5 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur-2xl"
          >
            <Icon className="h-6 w-6 text-[#d8aa4f]" strokeWidth={1.45} />
            <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white/45">{title}</p>
            <p className="mt-1 text-sm font-bold text-[#fff7e5]">{value}</p>
            <p className="text-xs font-medium text-white/62">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyKyoto() {
  return (
    <section className="mx-auto grid max-w-[1180px] gap-9 px-5 pt-24 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:px-0">
      <div>
        <SectionKicker>Why Kyoto</SectionKicker>
        <h2 className="mt-4 font-sans text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-[#fff7e5] md:text-6xl">
          A city that lives in quiet beauty.
        </h2>
        <p className="mt-6 max-w-md text-sm leading-7 text-white/66">
          Kyoto is Japan&apos;s cultural heart. From ancient temples and sacred shrines to world-class
          cuisine and beautifully preserved streets, every moment feels like stepping into a story.
        </p>
        <Link href="#moods" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#d8aa4f]">
          Explore the magic of Kyoto <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-white/12 bg-[#111] shadow-[0_24px_100px_rgba(0,0,0,.4)] md:min-h-[430px]">
        <ImageBackdrop src={images.bamboo} alt="Cinematic bamboo forest in Kyoto" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,7,.72),transparent_44%,rgba(216,170,79,.12)),linear-gradient(0deg,rgba(3,6,5,.45),transparent_55%)]" />
        <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-[#d8aa4f]/10 blur-3xl" />
      </div>
    </section>
  );
}

function MoodCards() {
  return (
    <section id="moods" className="mx-auto max-w-[1180px] px-5 pt-16 lg:px-0">
      <SectionKicker>Explore Kyoto by Mood</SectionKicker>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {moods.map(({ title, image, icon: Icon }) => (
          <article
            key={title}
            className="group relative min-h-[210px] overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04]"
          >
            <ImageBackdrop src={image} alt={title} className="transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/94 via-black/38 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <Icon className="mb-2 h-4 w-4 text-[#d8aa4f]" strokeWidth={1.5} />
              <h3 className="text-base font-bold leading-tight text-white">{title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ItinerarySection() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-16 lg:px-0">
      <SectionKicker>Explore 3-Day Kyoto Itinerary</SectionKicker>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {itinerary.map((day) => (
          <article
            key={day.day}
            className="relative min-h-[230px] overflow-hidden rounded-2xl border border-white/12 bg-[#0a1110]"
          >
            <ImageBackdrop src={day.image} alt={day.title} />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,6,.94),rgba(2,6,6,.54)_54%,rgba(2,6,6,.18)),linear-gradient(0deg,rgba(2,6,6,.45),transparent)]" />
            <div className="relative z-10 p-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">{day.day}</p>
              <h3 className="mt-4 max-w-[14rem] font-sans text-3xl font-semibold leading-[1.05] text-[#fff7e5]">
                {day.title}
              </h3>
              <ul className="mt-5 space-y-1.5 text-xs font-medium text-white/74">
                {day.stops.map((stop) => (
                  <li key={stop} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#d8aa4f]" />
                    {stop}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AtlasSection() {
  const points = [
    { name: "Arashiyama", x: "25%", y: "48%", color: "bg-[#b7d7b1]" },
    { name: "Kinkaku-ji", x: "43%", y: "35%", color: "bg-[#d2bd82]" },
    { name: "Gion District", x: "60%", y: "43%", color: "bg-[#d85d61]" },
    { name: "Kiyomizu-dera", x: "71%", y: "56%", color: "bg-[#ff8b5f]" },
    { name: "Nishiki Market", x: "53%", y: "59%", color: "bg-[#e68ea9]" },
    { name: "Fushimi Inari", x: "58%", y: "75%", color: "bg-[#cfd7df]" },
  ] as const;

  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-6 lg:px-0">
      <div className="relative overflow-hidden rounded-3xl border border-white/14 bg-[#07100f] p-6 shadow-[0_26px_90px_rgba(0,0,0,.34)] lg:p-8">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_45%,rgba(80,118,118,.28),transparent_34%),radial-gradient(circle_at_22%_78%,rgba(216,170,79,.16),transparent_32%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.28fr_0.72fr]">
          <div>
            <SectionKicker>Kyoto Atlas</SectionKicker>
            <h2 className="mt-4 font-sans text-4xl font-semibold leading-[1.04] text-[#fff7e5] md:text-5xl">
              Navigate the city like a local.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/62">
              Explore key neighborhoods, iconic landmarks, Kyoto hidden gems, temple districts, and
              food-market routes through a dark atlas interface.
            </p>
            <button className="mt-7 inline-flex h-13 items-center gap-3 rounded-xl bg-[#d8aa4f] px-6 py-4 text-sm font-bold text-[#1b1307] transition hover:bg-[#f0c96e]">
              Open Interactive Map <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-white/10 bg-[#081312]/70">
            <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:18px_18px]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 330" aria-hidden="true">
              <path d="M35 252 C150 210, 190 92, 310 132 S488 270, 710 112" fill="none" stroke="rgba(216,170,79,.72)" strokeWidth="2" strokeDasharray="6 8" />
              <path d="M72 110 C214 154, 350 86, 456 118 S618 240, 725 222" fill="none" stroke="rgba(111,177,177,.34)" strokeWidth="2" />
              <path d="M420 20 C388 96, 420 196, 365 318" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2" />
              <path d="M130 310 C205 240, 276 198, 362 210 S548 170, 682 292" fill="none" stroke="rgba(231,105,114,.38)" strokeWidth="2" />
            </svg>
            {points.map((point) => (
              <div
                key={point.name}
                className="absolute flex -translate-x-2 -translate-y-2 items-center gap-2"
                style={{ left: point.x, top: point.y }}
              >
                <span className={`h-3.5 w-3.5 rounded-full ${point.color} shadow-[0_0_18px_currentColor] ring-4 ring-white/10`} />
                <span className="rounded-full bg-black/42 px-2.5 py-1 text-[0.68rem] font-bold text-white/88 backdrop-blur">
                  {point.name}
                </span>
              </div>
            ))}
            <div className="absolute bottom-5 right-5 rounded-2xl border border-white/16 bg-[#06100f]/82 p-5 text-xs text-white/72 backdrop-blur-xl">
              {[
                ["Historic Sites", "bg-[#f1b75c]"],
                ["Cultural Spots", "bg-[#d2bd82]"],
                ["Food & Markets", "bg-[#e68ea9]"],
                ["Nature", "bg-[#b7d7b1]"],
                ["Unique Experiences", "bg-[#b7b4d7]"],
              ].map(([label, dot]) => (
                <p key={label} className="mt-3 first:mt-0">
                  <span className={`mr-3 inline-block h-3 w-3 rounded-full ${dot}`} />
                  {label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HiddenGems() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-16 lg:px-0">
      <div className="flex items-center justify-between gap-4">
        <SectionKicker>Hidden Gems</SectionKicker>
        <Link href="/city/kyoto/hidden-gems" className="inline-flex items-center gap-2 text-xs font-bold text-[#d8aa4f]">
          See all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {hiddenGems.map((gem) => (
          <article key={gem.title} className="group overflow-hidden rounded-2xl border border-white/12 bg-[#07100f]">
            <div className="relative h-44 overflow-hidden">
              <ImageBackdrop src={gem.image} alt={gem.title} className="transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-[#fff7e5]">{gem.title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/62">{gem.copy}</p>
              <p className="mt-3 text-xs font-bold text-[#d8aa4f]">{gem.place}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SafetyAndCulture() {
  return (
    <section className="mx-auto grid max-w-[1180px] gap-5 px-5 pt-8 lg:grid-cols-[0.48fr_0.52fr] lg:px-0">
      <article className="relative overflow-hidden rounded-3xl border border-white/14 bg-[#08100f] p-7 shadow-[0_22px_80px_rgba(0,0,0,.3)]">
        <Image
          src={images.night}
          alt="Kyoto night street and pagoda"
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover opacity-38"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#08100f_0%,rgba(8,16,15,.88)_52%,rgba(8,16,15,.38)_100%)]" />
        <div className="relative z-10 max-w-lg">
          <SectionKicker>Safety & Solo Female Travel</SectionKicker>
          <h2 className="mt-4 font-sans text-4xl font-semibold leading-[1.05] text-[#fff7e5]">
            Kyoto is one of the safest cities for solo female travelers.
          </h2>
          <ul className="mt-6 space-y-2.5 text-sm text-white/76">
            {[
              "Public transport is safe, clean and reliable.",
              "Women-only train cars are available during rush hours.",
              "Most areas are safe even at night.",
              "Locals are respectful and helpful.",
              "Use official transport at night where possible.",
            ].map((tip) => (
              <li key={tip} className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#d8aa4f]" strokeWidth={1.7} />
                {tip}
              </li>
            ))}
          </ul>
          <div className="mt-7 rounded-2xl border border-[#d8aa4f]/45 bg-black/38 p-5 backdrop-blur">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">Useful Phrase</p>
            <p className="mt-1 font-sans text-2xl font-semibold text-[#fff7e5]">&quot;Chikan desu!&quot;</p>
            <p className="mt-2 text-xs leading-5 text-white/65">
              Use this phrase loudly to call attention to groping or harassment on crowded trains.
              Move toward the nearest station staff, police box, or visible place where you can get help.
            </p>
          </div>
        </div>
      </article>

      <article className="rounded-3xl border border-white/14 bg-[#08100f] p-7 shadow-[0_22px_80px_rgba(0,0,0,.3)]">
        <SectionKicker>Culture & Etiquette</SectionKicker>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {culture.map(({ title, copy, icon: Icon }) => (
            <div key={title} className="border-white/10 sm:border-l sm:pl-6 first:border-l-0 first:pl-0">
              <Icon className="h-7 w-7 text-[#d8aa4f]" strokeWidth={1.45} />
              <h3 className="mt-4 text-base font-bold text-[#fff7e5]">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/62">{copy}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function BottomCta() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pb-14 pt-6 lg:px-0">
      <div className="flex flex-col gap-5 rounded-3xl border border-white/14 bg-[#08100f]/90 p-6 shadow-[0_22px_80px_rgba(0,0,0,.24)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/80">Plan your Kyoto journey</p>
          <p className="mt-1 text-sm text-white/58">
            Save, plan and personalize your perfect Kyoto itinerary with Kyoto safety tips and stays.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Save to Trip", Bookmark],
            ["Compare Dates", CalendarDays],
            ["See Stays", Landmark],
          ].map(([label, Icon]) => (
            <button
              key={label as string}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-white/16 bg-black/20 px-5 text-sm font-semibold text-white transition hover:border-[#d8aa4f]/60 hover:text-[#f0c96e]"
            >
              <Icon className="h-4 w-4 text-[#d8aa4f]" /> {label as string}
            </button>
          ))}
          <button className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#d8aa4f] px-5 text-sm font-bold text-[#1b1307] transition hover:bg-[#f0c96e]">
            Explore Nearby <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function KyotoDestinationPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] text-white">
      <HeroSection />
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(216,170,79,.12),transparent_28%),radial-gradient(circle_at_80%_34%,rgba(61,118,112,.12),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:96px_96px]" />
        <div className="relative z-10">
          <IntelligenceStrip />
          <WhyKyoto />
          <MoodCards />
          <ItinerarySection />
          <AtlasSection />
          <HiddenGems />
          <SafetyAndCulture />
          <BottomCta />
        </div>
      </div>
    </main>
  );
}
