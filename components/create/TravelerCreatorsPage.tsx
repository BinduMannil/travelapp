/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import {
  ArrowRight,
  Award,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Diamond,
  Eye,
  HeartHandshake,
  Map,
  MessageCircle,
  PenLine,
  Quote,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";

const images = {
  hero:
    "https://images.pexels.com/photos/17260502/pexels-photo-17260502.jpeg?auto=compress&cs=tinysrgb&w=2600",
  maya:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=86",
  kenji:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=86",
  luca:
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=86",
  youssef:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=86",
  olivia:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=86",
  bali:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1500&q=86",
  kyoto:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1500&q=86",
  amalfi:
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1500&q=86",
  marrakech:
    "https://images.pexels.com/photos/36209446/pexels-photo-36209446.jpeg?auto=compress&cs=tinysrgb&w=1500",
  newYork:
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1500&q=86",
  halong:
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1500&q=86",
  tokyoNight:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1500&q=86",
  profileCover:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1500&q=86",
  ubud:
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=86",
};

const navItems = [
  ["Home", "/"],
  ["Explore", "/explore"],
  ["Trips", "/trips"],
  ["Guides", "/guides"],
  ["Journal", "/journal"],
  ["Create", "/create"],
  ["Stays", "/stays"],
  ["Flights", "/flights"],
  ["Visa", "/visa"],
  ["Budget", "/budget"],
  ["Weather", "/weather"],
  ["Support", "/support"],
];

const benefits = [
  {
    title: "Write Journals",
    text: "Shape trips into polished field notes with photos, atmosphere, and practical detail.",
    icon: PenLine,
  },
  {
    title: "Publish Guides",
    text: "Turn local knowledge into city guides travelers can trust before they arrive.",
    icon: Map,
  },
  {
    title: "Share Hidden Gems",
    text: "Reveal quiet corners, intimate rituals, and routes most itineraries miss.",
    icon: Diamond,
  },
  {
    title: "Build Followers",
    text: "Grow a loyal readership around your pace, perspective, and travel taste.",
    icon: Users,
  },
  {
    title: "Receive Ratings",
    text: "Earn thoughtful feedback from travelers who used your stories in the real world.",
    icon: Star,
  },
  {
    title: "Become Verified",
    text: "Unlock a creator badge, premium visibility, and more publishing features.",
    icon: ShieldCheck,
  },
];

const creators = [
  {
    name: "Maya Sharma",
    focus: "Bali, Indonesia",
    followers: "24.3K",
    rating: "4.8",
    story: "10 Hidden Beaches in Bali You Need to See",
    image: images.bali,
    avatar: images.maya,
  },
  {
    name: "Kenji Tanaka",
    focus: "Kyoto, Japan",
    followers: "18.7K",
    rating: "4.9",
    story: "A Local's Guide to Kyoto Beyond the Temples",
    image: images.kyoto,
    avatar: images.kenji,
  },
  {
    name: "Luca Moretti",
    focus: "Amalfi Coast, Italy",
    followers: "31.2K",
    rating: "4.7",
    story: "Amalfi Coast Road Trip Itinerary",
    image: images.amalfi,
    avatar: images.luca,
  },
  {
    name: "Youssef El Amrani",
    focus: "Marrakech, Morocco",
    followers: "16.4K",
    rating: "4.8",
    story: "Best Rooftop Spots in Marrakech",
    image: images.marrakech,
    avatar: images.youssef,
  },
  {
    name: "Olivia Brooks",
    focus: "New York, USA",
    followers: "27.1K",
    rating: "4.6",
    story: "48 Hours in New York City Like a Local",
    image: images.newYork,
    avatar: images.olivia,
  },
];

const stories = [
  {
    title: "Sunrise Magic in Halong Bay",
    author: "Linh Tran",
    location: "Halong Bay, Vietnam",
    preview:
      "Waking up at 5AM was worth it. The bay is a dream painted in green and gold.",
    image: images.halong,
    avatar: images.maya,
    rating: "4.9",
    reviews: "124",
    saves: 706,
    comments: 28,
    views: "3.2K",
    tag: "Vietnam",
    age: "2 hours ago",
  },
  {
    title: "My Marrakech: A Photographer's Dream",
    author: "Youssef El Amrani",
    location: "Marrakech, Morocco",
    preview:
      "Colors, textures, smells. Every corner tells a story. Here is my Marrakech.",
    image: images.marrakech,
    avatar: images.youssef,
    rating: "4.8",
    reviews: "98",
    saves: 512,
    comments: 17,
    views: "2.1K",
    tag: "Morocco",
    age: "1 day ago",
  },
  {
    title: "Tokyo at Night: A Different World",
    author: "Kenji Tanaka",
    location: "Tokyo, Japan",
    preview:
      "When the lights come on, Tokyo transforms. Here are my favorite night spots.",
    image: images.tokyoNight,
    avatar: images.kenji,
    rating: "4.7",
    reviews: "76",
    saves: 438,
    comments: 22,
    views: "1.8K",
    tag: "Japan",
    age: "2 days ago",
  },
];

const guides = [
  {
    title: "Bali: 7 Days of Paradise",
    text: "The perfect Bali itinerary for first-time visitors.",
    rating: "4.9",
    saves: "342",
    image: images.bali,
  },
  {
    title: "Hidden Bali: Local Secrets",
    text: "10 hidden places only locals know about.",
    rating: "4.8",
    saves: "276",
    image: images.ubud,
  },
];

function ToggleButton({
  active,
  children,
  activeChildren,
  onClick,
  className = "",
}: {
  active: boolean;
  children: React.ReactNode;
  activeChildren: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition duration-300 ${active
        ? "border-[#f3c15f] bg-[#f3c15f] text-[#16100a] shadow-[0_0_34px_rgba(243,193,95,.24)]"
        : "border-[#d8aa4f]/42 bg-white/[.03] text-[#f4d38a] hover:border-[#f3c15f] hover:bg-[#f3c15f]/10"
      } ${className}`}
      aria-pressed={active}
    >
      {active ? activeChildren : children}
    </button>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f0b849] text-[#15100a] shadow-[0_0_18px_rgba(240,184,73,.34)]">
      <Check className="h-3.5 w-3.5 stroke-[3]" />
    </span>
  );
}

export function TravelerCreatorsPage() {
  const [following, setFollowing] = useState<Record<string, boolean>>({
    "Maya Sharma": false,
  });
  const [savedStories, setSavedStories] = useState<Record<string, boolean>>({});
  const [likedRatings, setLikedRatings] = useState<Record<string, boolean>>({});
  const [shared, setShared] = useState(false);
  const [carouselShift, setCarouselShift] = useState(0);

  const heroStats = useMemo(
    () => [
      ["18K", "published stories"],
      ["92", "verified countries"],
      ["4.8", "average creator rating"],
    ],
    [],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#050504] text-white">
      <section className="relative min-h-[760px] overflow-hidden lg:min-h-[820px]">
        <img
          src={images.hero}
          alt="Travel creator writing at sunset over a dramatic Cappadocia-like landscape"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(231,171,77,.18),transparent_33%),linear-gradient(90deg,rgba(4,6,6,.96)_0%,rgba(5,6,6,.74)_38%,rgba(5,6,6,.26)_70%,rgba(5,6,6,.82)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#050504] via-[#050504]/82 to-transparent" />

        <header className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between gap-5 px-5 py-5 sm:px-8">
          <Link href="/" aria-label="JOURNEE home">
            <JourneeBrand className="[&>span:first-child]:h-9 [&>span:first-child]:w-9 [&>span:first-child_svg]:h-5 [&>span:first-child_svg]:w-5 [&>span:last-child]:text-lg" />
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-6 text-xs font-medium text-white/74 xl:flex">
            {navItems.map(([label, href]) => (
              <MainNavLink
                key={label}
                label={label}
                href={href}
                className="relative transition hover:text-white"
                activeClassName="text-[#f0b849]"
                inactiveClassName="text-white/74"
                underlineClassName="absolute -bottom-3 left-0 h-px w-full bg-[#f0b849]"
              />
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/20 text-white/76 backdrop-blur transition hover:border-[#d8aa4f]/60 hover:text-white">
              <Sparkles className="h-4 w-4" />
            </button>
            <img
              src={images.maya}
              alt="Creator profile"
              className="h-10 w-10 rounded-full border border-[#d8aa4f]/70 object-cover"
            />
          </div>
        </header>

        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-10 px-5 pb-24 pt-28 sm:px-8 lg:grid-cols-[minmax(0,760px)_1fr] lg:pt-36">
          <div>
            <p className="text-xs font-bold uppercase text-[#e6ae49]">
              SHARE. INSPIRE. EXPLORE.
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[1.04] text-white sm:text-7xl lg:text-8xl">
              Become A
              <span className="block text-white">JOURNEE Creator</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base font-normal leading-8 text-white/78 sm:text-lg">
              Share journeys, publish city guides, earn followers, and help
              travelers discover the world through real experiences.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#stories"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#f0b849] px-6 py-4 text-sm font-bold text-[#17100a] shadow-[0_20px_80px_rgba(240,184,73,.24)] transition hover:bg-[#ffd071]"
              >
                Start Writing <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#creators"
                className="inline-flex items-center justify-center rounded-lg border border-white/32 bg-black/18 px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:border-[#f0b849] hover:bg-white/8"
              >
                Explore Creators
              </Link>
            </div>
          </div>

          <div className="hidden self-end rounded-lg border border-white/12 bg-black/30 p-5 shadow-[0_28px_100px_rgba(0,0,0,.4)] backdrop-blur-xl lg:block">
            <div className="flex items-start gap-4">
              <Quote className="mt-1 h-5 w-5 text-[#f0b849]" />
              <p className="text-sm leading-7 text-white/74">
                Real trips become trusted intelligence when the right traveler
                writes with patience, context, and feeling.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {heroStats.map(([value, label]) => (
                <div key={label} className="border-l border-white/12 pl-4">
                  <p className="text-2xl font-extrabold text-white">{value}</p>
                  <p className="mt-1 text-xs font-medium text-white/52">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015))]">
        <div className="mx-auto grid max-w-[1500px] gap-px px-5 py-8 sm:px-8 md:grid-cols-2 xl:grid-cols-6">
          {benefits.map(({ title, text, icon: Icon }) => (
            <article
              key={title}
              className="group min-h-48 border-white/10 bg-[#0c0b09]/72 p-6 transition duration-300 hover:bg-[#14100b] hover:shadow-[0_0_54px_rgba(216,170,79,.12)] md:border-l"
            >
              <Icon className="h-8 w-8 text-[#e8b24f] transition duration-300 group-hover:scale-105" />
              <h2 className="mt-6 text-base font-bold text-white">{title}</h2>
              <p className="mt-2 text-sm font-normal leading-6 text-white/58">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="creators" className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase text-[#d8aa4f]">Verified voices</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Featured Creators
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCarouselShift((value) => Math.max(0, value - 1))}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/72 transition hover:border-[#d8aa4f] hover:text-white"
              aria-label="Previous creators"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCarouselShift((value) => Math.min(1, value + 1))}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/72 transition hover:border-[#d8aa4f] hover:text-white"
              aria-label="Next creators"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-7 overflow-hidden">
          <div
            className="grid gap-5 transition-transform duration-500 md:grid-cols-2 xl:grid-cols-5"
            style={{ transform: `translateX(-${carouselShift * 2.5}rem)` }}
          >
            {creators.map((creator) => (
              <article
                key={creator.name}
                className="group overflow-hidden rounded-lg border border-white/12 bg-[#0c0b09]/84 shadow-[0_26px_90px_rgba(0,0,0,.25)] transition duration-300 hover:-translate-y-1 hover:border-[#d8aa4f]/70"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={creator.image}
                    alt={`${creator.focus} destination`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-black/15" />
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="absolute bottom-4 left-5 h-16 w-16 rounded-full border-2 border-[#d8aa4f] object-cover shadow-[0_0_26px_rgba(216,170,79,.28)]"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{creator.name}</h3>
                    <VerifiedBadge />
                  </div>
                  <p className="mt-1 text-sm font-normal text-white/58">{creator.focus}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 text-xs font-medium text-white/72">
                    <span className="inline-flex items-center gap-2">
                      <Users className="h-4 w-4" /> {creator.followers} Followers
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#f0b849]">
                      <Star className="h-4 w-4 fill-current" /> {creator.rating}
                    </span>
                  </div>
                  <p className="mt-5 min-h-12 text-sm font-normal leading-6 text-white/70">
                    Recent: {creator.story}
                  </p>
                  <ToggleButton
                    active={!!following[creator.name]}
                    onClick={() =>
                      setFollowing((value) => ({
                        ...value,
                        [creator.name]: !value[creator.name],
                      }))
                    }
                    activeChildren="Following"
                    className="mt-5 w-full"
                  >
                    Follow
                  </ToggleButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stories"
        className="mx-auto grid max-w-[1500px] gap-8 border-t border-white/10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_430px]"
      >
        <div>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase text-[#d8aa4f]">Editorial feed</p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Latest Stories From Travelers
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {["All Destinations", "Trending"].map((item) => (
                <button
                  key={item}
                  className="rounded-lg border border-white/14 bg-white/[.03] px-4 py-3 text-xs font-medium text-white/82 transition hover:border-[#d8aa4f]/70"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 space-y-5">
            {stories.map((story) => (
              <article
                key={story.title}
                className="group grid overflow-hidden rounded-lg border border-white/12 bg-[#0b0b09]/86 transition duration-300 hover:border-[#d8aa4f]/60 hover:bg-[#11100d] md:grid-cols-[320px_1fr]"
              >
                <div className="relative min-h-64 overflow-hidden md:min-h-full">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-md bg-black/60 px-3 py-1.5 text-[11px] font-bold uppercase text-white backdrop-blur">
                    {story.tag}
                  </span>
                </div>
                <div className="flex min-h-64 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 text-xs font-medium text-white/58">
                      <img
                        src={story.avatar}
                        alt={story.author}
                        className="h-8 w-8 rounded-full border border-[#d8aa4f]/50 object-cover"
                      />
                      <span className="font-semibold text-white/80">{story.author}</span>
                      <VerifiedBadge />
                      <span>{story.age}</span>
                      <span>{story.location}</span>
                    </div>
                    <button
                      onClick={() =>
                        setSavedStories((value) => ({
                          ...value,
                          [story.title]: !value[story.title],
                        }))
                      }
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${savedStories[story.title]
                        ? "border-[#f0b849] bg-[#f0b849] text-[#17100a]"
                        : "border-white/12 text-white/72 hover:border-[#d8aa4f]"
                      }`}
                      aria-label={savedStories[story.title] ? "Saved story" : "Save story"}
                    >
                      <Bookmark className={`h-4 w-4 ${savedStories[story.title] ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold leading-tight text-white">
                    {story.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm font-normal leading-7 text-white/68">
                    {story.preview}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
                    <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-white/68">
                      <button
                        onClick={() =>
                          setLikedRatings((value) => ({
                            ...value,
                            [story.title]: !value[story.title],
                          }))
                        }
                        className={`inline-flex items-center gap-1.5 transition ${likedRatings[story.title] ? "text-[#f0b849]" : "hover:text-[#f0b849]"}`}
                      >
                        <Star className={`h-4 w-4 ${likedRatings[story.title] ? "fill-current" : ""}`} />
                        {story.rating} ({story.reviews})
                      </button>
                      <span className="inline-flex items-center gap-1.5">
                        <Bookmark className="h-4 w-4" /> {savedStories[story.title] ? story.saves + 1 : story.saves}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MessageCircle className="h-4 w-4" /> {story.comments}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Eye className="h-4 w-4" /> {story.views}
                      </span>
                    </div>
                    <button className="inline-flex items-center gap-3 rounded-full bg-[#f0b849] px-5 py-3 text-xs font-bold text-[#17100a] transition hover:bg-[#ffd071]">
                      Read Story <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-7 lg:sticky lg:top-6 lg:self-start">
          <article className="overflow-hidden rounded-lg border border-white/12 bg-[#0b0b09]/88 shadow-[0_28px_100px_rgba(0,0,0,.34)]">
            <div className="relative h-36">
              <img
                src={images.profileCover}
                alt="Mountain lake creator cover"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b09] via-transparent to-black/10" />
            </div>
            <div className="-mt-12 px-6 pb-6 text-center">
              <img
                src={images.maya}
                alt="Maya Sharma"
                className="relative mx-auto h-24 w-24 rounded-full border-4 border-[#efe6d5] object-cover shadow-[0_0_32px_rgba(216,170,79,.22)]"
              />
              <div className="mt-4 flex items-center justify-center gap-2">
                <h2 className="text-xl font-semibold text-white">Maya Sharma</h2>
                <VerifiedBadge />
              </div>
              <p className="mt-1 text-sm font-medium text-white/50">@maya.explores</p>
              <p className="mt-1 text-sm font-normal text-white/68">Bali, Indonesia</p>
              <p className="mx-auto mt-4 max-w-sm text-sm font-normal leading-6 text-white/68">
                Digital nomad and storyteller sharing slow travel, hidden gems,
                and meaningful experiences.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {["Nature", "Hidden Gems", "Luxury Travel", "Wellness"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs font-medium text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 divide-x divide-white/10">
                {[
                  ["24.3K", "Followers"],
                  ["128", "Stories"],
                  ["4.8", "Rating"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-xl font-bold text-white">{value}</p>
                    <p className="text-xs font-normal text-white/52">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <ToggleButton
                  active={!!following["Maya Sharma"]}
                  onClick={() =>
                    setFollowing((value) => ({
                      ...value,
                      "Maya Sharma": !value["Maya Sharma"],
                    }))
                  }
                  activeChildren="Following"
                >
                  Follow
                </ToggleButton>
                <button className="rounded-lg border border-white/18 bg-white/[.03] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#d8aa4f]">
                  Message
                </button>
              </div>
            </div>
          </article>

          <article className="rounded-lg border border-white/12 bg-[#0b0b09]/88 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Top Guides</h2>
              <button className="text-xs font-medium text-[#f0b849]">View all</button>
            </div>
            <div className="mt-5 space-y-4">
              {guides.map((guide) => (
                <div key={guide.title} className="grid grid-cols-[104px_1fr_auto] gap-4">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="h-24 w-full rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-semibold leading-5 text-white">{guide.title}</h3>
                    <p className="mt-1 text-xs font-normal leading-5 text-white/58">{guide.text}</p>
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#f0b849]">
                      <Star className="h-3.5 w-3.5 fill-current" /> {guide.rating} ({guide.saves})
                    </p>
                  </div>
                  <button
                    className="self-end text-white/56 transition hover:text-[#f0b849]"
                    aria-label={`Bookmark ${guide.title}`}
                  >
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-[#d8aa4f]/24 bg-[linear-gradient(135deg,rgba(216,170,79,.14),rgba(255,255,255,.025))] p-5">
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-[#f0b849]" />
              <h2 className="text-lg font-bold text-white">Creator tools</h2>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <button className="rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-xs font-medium text-white/72 transition hover:border-[#d8aa4f] hover:text-white">
                <HeartHandshake className="mx-auto mb-2 h-4 w-4 text-[#f0b849]" />
                Rate
              </button>
              <button className="rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-xs font-medium text-white/72 transition hover:border-[#d8aa4f] hover:text-white">
                <MessageCircle className="mx-auto mb-2 h-4 w-4 text-[#f0b849]" />
                Comment
              </button>
              <button
                onClick={() => setShared((value) => !value)}
                className={`rounded-lg border px-3 py-3 text-xs font-medium transition ${shared
                  ? "border-[#f0b849] bg-[#f0b849] text-[#17100a]"
                  : "border-white/10 bg-black/20 text-white/72 hover:border-[#d8aa4f] hover:text-white"
                }`}
              >
                {shared ? (
                  <Send className="mx-auto mb-2 h-4 w-4" />
                ) : (
                  <Share2 className="mx-auto mb-2 h-4 w-4 text-[#f0b849]" />
                )}
                {shared ? "Shared" : "Share"}
              </button>
            </div>
          </article>
        </aside>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#060605]/88 p-3 backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="#stories"
            className="rounded-lg bg-[#f0b849] px-4 py-3 text-center text-sm font-bold text-[#17100a]"
          >
            Start Writing
          </Link>
          <Link
            href="#creators"
            className="rounded-lg border border-white/18 px-4 py-3 text-center text-sm font-bold text-white"
          >
            Creators
          </Link>
        </div>
      </div>
    </main>
  );
}
