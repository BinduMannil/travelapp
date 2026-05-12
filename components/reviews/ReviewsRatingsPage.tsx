/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell,
  BedDouble,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Edit3,
  Heart,
  Hotel,
  MapPin,
  Menu,
  MoreVertical,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  ThumbsUp,
  UsersRound,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

type ReviewCategory = "stays" | "activities" | "flights" | "guides" | "transport";
type TravelerType = "Solo" | "Couple" | "Family with kids" | "Friends" | "Business";
type ModerationStatus = "approved" | "pending" | "flagged";

type RatingMetric = {
  label: string;
  score: number;
};

type ReviewPhoto = {
  id: string;
  reviewId?: string;
  src: string;
  alt: string;
};

type VerifiedBooking = {
  id: string;
  reviewId: string;
  bookingReference: string;
  verifiedAt: string;
};

type HelpfulVote = {
  reviewId: string;
  count: number;
  userVoted: boolean;
};

type TravelerReview = {
  id: string;
  author: string;
  avatar: string;
  verified: boolean;
  travelerType: TravelerType;
  category: ReviewCategory;
  date: string;
  rating: number;
  title: string;
  body: string;
  relatedItem: {
    name: string;
    location: string;
  };
  tags: RatingMetric[];
  photo?: ReviewPhoto;
  moderationStatus: ModerationStatus;
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=82";

const navItems = [
  "Home",
  "Explore",
  "Map",
  "Trips",
  "Guides",
  "Journal",
  "Stays",
  "Flights",
  "Visa",
  "Budget",
  "Weather",
  "Currency",
  "Support",
];

const reviewCategories = [
  { id: "all", label: "All Reviews", count: 2174 },
  { id: "stays", label: "Stays", count: 1012 },
  { id: "activities", label: "Activities", count: 786 },
  { id: "flights", label: "Flights", count: 254 },
  { id: "guides", label: "Guides", count: 123 },
] as const;

const ratingBreakdown = [
  { stars: 5, count: 1248, percent: 57 },
  { stars: 4, count: 672, percent: 31 },
  { stars: 3, count: 189, percent: 9 },
  { stars: 2, count: 48, percent: 2 },
  { stars: 1, count: 17, percent: 1 },
];

const ratingHighlights: RatingMetric[] = [
  { label: "Overall Experience", score: 4.8 },
  { label: "Value for Money", score: 4.6 },
  { label: "Service Quality", score: 4.8 },
  { label: "Cleanliness", score: 4.7 },
  { label: "Location", score: 4.9 },
];

const reviewPhotos: ReviewPhoto[] = [
  {
    id: "photo_tokyo_tower",
    src: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=520&q=84",
    alt: "Tokyo Tower at sunset",
  },
  {
    id: "photo_pool",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=520&q=84",
    alt: "Luxury hotel pool",
  },
  {
    id: "photo_shibuya",
    src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=520&q=84",
    alt: "Shibuya city crossing",
  },
  {
    id: "photo_sushi",
    src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=520&q=84",
    alt: "Sushi dinner in Tokyo",
  },
  {
    id: "photo_fuji",
    src: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=520&q=84",
    alt: "Mount Fuji and lake",
  },
  {
    id: "photo_torii",
    src: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=520&q=84",
    alt: "Japanese shrine gate",
  },
];

const reviews: TravelerReview[] = [
  {
    id: "review_park_hyatt_tokyo_emma",
    author: "Emma Johnson",
    avatar,
    verified: true,
    travelerType: "Couple",
    category: "stays",
    date: "May 15, 2025",
    rating: 5,
    title: "Absolutely unforgettable experience!",
    body:
      "Our stay at Park Hyatt Tokyo was beyond amazing. The room had stunning city views and the service was exceptional. The location is perfect for exploring...",
    relatedItem: {
      name: "Park Hyatt Tokyo",
      location: "Tokyo, Japan",
    },
    tags: [
      { label: "Cleanliness", score: 5 },
      { label: "Location", score: 5 },
      { label: "Service", score: 5 },
      { label: "Value", score: 4 },
    ],
    photo: {
      id: "photo_review_park_hyatt_tokyo",
      reviewId: "review_park_hyatt_tokyo_emma",
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=620&q=86",
      alt: "Tokyo hotel room with skyline view",
    },
    moderationStatus: "approved",
  },
  {
    id: "review_shibuya_walk_michael",
    author: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=82",
    verified: true,
    travelerType: "Solo",
    category: "activities",
    date: "May 12, 2025",
    rating: 5,
    title: "Great walking tour in Shibuya",
    body:
      "The guide was fantastic and super knowledgeable. We tried amazing local food and discovered places I would never find on my own. Highly recommend!",
    relatedItem: {
      name: "Shibuya Food & Culture Walk",
      location: "Tokyo, Japan",
    },
    tags: [
      { label: "Experience", score: 5 },
      { label: "Guide", score: 5 },
      { label: "Value", score: 5 },
      { label: "Group Size", score: 4 },
    ],
    photo: {
      id: "photo_review_shibuya_walk",
      reviewId: "review_shibuya_walk_michael",
      src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=620&q=86",
      alt: "Shibuya nightlife walking tour",
    },
    moderationStatus: "approved",
  },
  {
    id: "review_disneysea_williams",
    author: "The Williams Family",
    avatar:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=180&q=82",
    verified: true,
    travelerType: "Family with kids",
    category: "activities",
    date: "May 10, 2025",
    rating: 4,
    title: "Wonderful family trip",
    body:
      "DisneySea was magical for the kids. Easy to get around and lots of family-friendly attractions. Will definitely come back again.",
    relatedItem: {
      name: "Tokyo DisneySea",
      location: "Tokyo, Japan",
    },
    tags: [
      { label: "Experience", score: 4 },
      { label: "Value", score: 4 },
      { label: "Family Friendly", score: 5 },
      { label: "Crowd", score: 3 },
    ],
    photo: {
      id: "photo_review_disneysea",
      reviewId: "review_disneysea_williams",
      src: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=620&q=86",
      alt: "Waterfront theme park view",
    },
    moderationStatus: "approved",
  },
];

const verifiedBookings: VerifiedBooking[] = reviews.map((review, index) => ({
  id: `verified_booking_${index + 1}`,
  reviewId: review.id,
  bookingReference: `JRN-TYO-${2400 + index}`,
  verifiedAt: "2025-05-16T09:00:00.000Z",
}));

const helpfulVotes: HelpfulVote[] = [
  { reviewId: "review_park_hyatt_tokyo_emma", count: 24, userVoted: false },
  { reviewId: "review_shibuya_walk_michael", count: 18, userVoted: false },
  { reviewId: "review_disneysea_williams", count: 15, userVoted: false },
];

const categoryFilters = [
  ["Stays", "1,012"],
  ["Activities & Tours", "786"],
  ["Flights", "254"],
  ["Guides", "123"],
  ["Transport", "64"],
];

const travelerTypeFilters = [
  ["Solo", "326"],
  ["Couples", "892"],
  ["Family", "541"],
  ["Friends", "429"],
  ["Business", "67"],
];

function navHref(item: string) {
  if (item === "Home") return "/";
  if (item === "Explore") return "/discover";
  if (item === "Map") return "/atlas";
  return `/${item.toLowerCase()}`;
}

function Stars({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#f5b21b]" aria-label={`${rating} star rating`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`${size} ${index < rating ? "fill-current" : "fill-transparent text-white/34"}`}
        />
      ))}
    </span>
  );
}

export function ReviewsRatingsPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof reviewCategories)[number]["id"]>("all");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTravelerTypes, setSelectedTravelerTypes] = useState<string[]>([]);

  const visibleReviews = useMemo(() => {
    return reviews.filter((review) => {
      const categoryMatch = activeCategory === "all" || review.category === activeCategory;
      const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(review.rating);
      const travelerMatch =
        selectedTravelerTypes.length === 0 ||
        selectedTravelerTypes.some((type) => review.travelerType.toLowerCase().includes(type.toLowerCase()));
      return categoryMatch && ratingMatch && travelerMatch;
    });
  }, [activeCategory, selectedRatings, selectedTravelerTypes]);

  return (
    <main className="min-h-screen bg-[#030708] font-sans text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(237,167,34,.18),transparent_28%),radial-gradient(circle_at_78%_7%,rgba(48,122,135,.17),transparent_30%),linear-gradient(180deg,#020506_0%,#071017_46%,#020506_100%)]" />

      <div className="relative mx-auto w-full max-w-[1920px] px-4 pb-8 pt-20 sm:px-5 lg:px-6">
        <section className="overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#061018]/76 shadow-[0_24px_90px_rgba(0,0,0,.34)] backdrop-blur-2xl">
          <div className="grid gap-0 2xl:grid-cols-[320px_minmax(0,1fr)_440px]">
            <aside className="hidden border-r border-white/10 p-5 2xl:block">
              <FiltersPanel
                selectedRatings={selectedRatings}
                selectedTravelerTypes={selectedTravelerTypes}
                onRatingToggle={(rating) =>
                  setSelectedRatings((current) =>
                    current.includes(rating) ? current.filter((item) => item !== rating) : [...current, rating],
                  )
                }
                onTravelerToggle={(type) =>
                  setSelectedTravelerTypes((current) =>
                    current.includes(type) ? current.filter((item) => item !== type) : [...current, type],
                  )
                }
                onClear={() => {
                  setSelectedRatings([]);
                  setSelectedTravelerTypes([]);
                  setActiveCategory("all");
                }}
              />
            </aside>

            <section className="min-w-0 2xl:border-r 2xl:border-white/10">
              <HeaderPanel />
              <MobileFilterChips
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                selectedRatings={selectedRatings}
                onRatingToggle={(rating) =>
                  setSelectedRatings((current) =>
                    current.includes(rating) ? current.filter((item) => item !== rating) : [...current, rating],
                  )
                }
              />
              <TabsAndSort activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
              <OverallRatingPanel />
              <div className="space-y-3 p-4 sm:p-5">
                {visibleReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
                {visibleReviews.length === 0 && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.035] p-8 text-center text-sm text-white/68">
                    No reviews match the selected filters.
                  </div>
                )}
                <Pagination />
              </div>
            </section>

            <aside className="space-y-4 p-4 sm:p-5 2xl:sticky 2xl:top-20 2xl:self-start">
              <TravelerPhotos />
              <ShareExperience />
              <TrustSafety />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#020506]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="JOURNEE home">
          <JourneeLogoMark className="h-9 w-9 text-[#eda722]" />
          <span className="text-2xl font-semibold uppercase tracking-[0.13em] text-white">JOURNEE</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-0.5 2xl:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={navHref(item)}
              className="px-3 py-5 text-sm font-semibold text-white/88 transition hover:text-[#f3b544]"
            >
              {item}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="ml-auto grid h-10 w-10 place-items-center rounded-full text-white/90 transition hover:bg-white/8 hover:text-[#f3b544] lg:ml-0"
          aria-label="Notifications"
        >
          <span className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[#f4aa16] text-[10px] font-bold text-[#061018]">
              3
            </span>
          </span>
        </button>
        <img src={avatar} alt="" className="h-10 w-10 rounded-full border border-[#e0aa3e]/55 object-cover" />
        <ChevronDown className="hidden h-4 w-4 text-white/72 sm:block" />
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white 2xl:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function HeaderPanel() {
  return (
    <div className="grid gap-5 border-b border-white/10 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(470px,.95fr)]">
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-white/72">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-white/40" />
          <span className="text-white">Reviews & Ratings</span>
        </div>
        <h1 className="mt-3 text-[1.95rem] font-bold leading-tight text-white sm:text-[2.25rem]">
          Reviews & Ratings
        </h1>
        <p className="mt-1.5 text-sm font-medium text-white/74">
          Real experiences from real travelers. Your trust, our priority.
        </p>
      </div>
      <div className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-3">
        <TrustBadge icon={ShieldCheck} title="Verified Reviews" copy="All reviews are verified from real bookings" green />
        <TrustBadge icon={ShieldCheck} title="Moderated for Trust" copy="Our team reviews all feedback for quality" />
        <TrustBadge icon={UsersRound} title="Traveler First" copy="Honest feedback helps everyone travel better" />
      </div>
    </div>
  );
}

function TrustBadge({
  icon: Icon,
  title,
  copy,
  green,
}: {
  icon: typeof ShieldCheck;
  title: string;
  copy: string;
  green?: boolean;
}) {
  return (
    <div className="flex gap-3 border-white/10 sm:border-r sm:pr-4 last:sm:border-r-0">
      <Icon className={`mt-0.5 h-8 w-8 shrink-0 ${green ? "text-[#34d846]" : "text-[#f3b544]"}`} />
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="mt-1 text-xs font-medium leading-5 text-white/64">{copy}</p>
      </div>
    </div>
  );
}

function FiltersPanel({
  selectedRatings,
  selectedTravelerTypes,
  onRatingToggle,
  onTravelerToggle,
  onClear,
}: {
  selectedRatings: number[];
  selectedTravelerTypes: string[];
  onRatingToggle: (rating: number) => void;
  onTravelerToggle: (type: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#07131b]/72 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Filters</h2>
        <button type="button" onClick={onClear} className="text-xs font-bold text-[#f3b544]">
          Clear all
        </button>
      </div>
      <label className="mt-4 block text-xs font-medium text-white/64">Search reviews</label>
      <div className="mt-2 flex items-center rounded-md border border-white/14 bg-[#061018] px-3 py-2.5">
        <input
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/38"
          placeholder="Search destinations, hotels, activities..."
        />
        <Search className="h-4 w-4 text-white/52" />
      </div>

      <FilterSelect label="Rating" value="All Ratings" />
      <div className="mt-3 space-y-2">
        {ratingBreakdown.map((rating) => (
          <FilterCheck
            key={rating.stars}
            checked={selectedRatings.includes(rating.stars)}
            onChange={() => onRatingToggle(rating.stars)}
          >
            <span className="w-4">{rating.stars}</span>
            <Stars rating={rating.stars} size="h-3.5 w-3.5" />
            <span className="ml-auto text-white/52">({rating.count.toLocaleString()})</span>
          </FilterCheck>
        ))}
      </div>

      <FilterSelect label="Category" value="All Categories" />
      <FilterList items={categoryFilters} />

      <FilterSelect label="Traveler Type" value="All Travelers" />
      <div className="mt-3 space-y-2">
        {travelerTypeFilters.map(([label, count]) => (
          <FilterCheck
            key={label}
            checked={selectedTravelerTypes.includes(label)}
            onChange={() => onTravelerToggle(label)}
          >
            <span>{label}</span>
            <span className="text-white/52">({count})</span>
          </FilterCheck>
        ))}
      </div>

      <FilterSelect label="Time Period" value="All Time" />
    </div>
  );
}

function FilterSelect({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5">
      <label className="block text-xs font-medium text-white/64">{label}</label>
      <button
        type="button"
        className="mt-2 flex w-full items-center justify-between rounded-md border border-white/14 bg-[#061018] px-3 py-2.5 text-sm font-semibold text-white"
      >
        {value}
        <ChevronDown className="h-4 w-4 text-white/62" />
      </button>
    </div>
  );
}

function FilterList({ items }: { items: string[][] }) {
  return (
    <div className="mt-3 space-y-2">
      {items.map(([label, count]) => (
        <FilterCheck key={label}>
          <span>{label}</span>
          <span className="text-white/52">({count})</span>
        </FilterCheck>
      ))}
    </div>
  );
}

function FilterCheck({
  children,
  checked = false,
  onChange,
}: {
  children: React.ReactNode;
  checked?: boolean;
  onChange?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center gap-2 text-left text-sm font-medium text-white/78 transition hover:text-white"
    >
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-sm border ${
          checked ? "border-[#f3b544] bg-[#f3b544] text-[#071018]" : "border-white/30 text-transparent"
        }`}
      >
        <Check className="h-3 w-3" />
      </span>
      {children}
    </button>
  );
}

function MobileFilterChips({
  activeCategory,
  onCategoryChange,
  selectedRatings,
  onRatingToggle,
}: {
  activeCategory: (typeof reviewCategories)[number]["id"];
  onCategoryChange: (category: (typeof reviewCategories)[number]["id"]) => void;
  selectedRatings: number[];
  onRatingToggle: (rating: number) => void;
}) {
  return (
    <div className="border-b border-white/10 p-4 2xl:hidden">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
        <SlidersHorizontal className="h-4 w-4 text-[#f3b544]" />
        Filters
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {reviewCategories.slice(0, 5).map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold ${
              activeCategory === category.id
                ? "border-[#f3b544] bg-[#f3b544] text-[#071018]"
                : "border-white/12 bg-white/[0.035] text-white/72"
            }`}
          >
            {category.label}
          </button>
        ))}
        {[5, 4, 3].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onRatingToggle(rating)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold ${
              selectedRatings.includes(rating)
                ? "border-[#f3b544] bg-[#f3b544] text-[#071018]"
                : "border-white/12 bg-white/[0.035] text-white/72"
            }`}
          >
            {rating} stars
          </button>
        ))}
      </div>
    </div>
  );
}

function TabsAndSort({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: (typeof reviewCategories)[number]["id"];
  onCategoryChange: (category: (typeof reviewCategories)[number]["id"]) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex gap-5 overflow-x-auto">
        {reviewCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={`relative shrink-0 py-2 text-sm font-semibold transition ${
              activeCategory === category.id ? "text-[#f3b544]" : "text-white/72 hover:text-white"
            }`}
          >
            {category.label}
            <span className="ml-2 text-white/70">{category.count.toLocaleString()}</span>
            {activeCategory === category.id && (
              <span className="absolute bottom-[-13px] left-0 right-0 h-0.5 rounded-full bg-[#f3b544]" />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs font-medium text-white/60">
        Sort by
        <button className="flex items-center gap-3 rounded-md border border-white/14 bg-[#061018] px-3 py-2 text-sm font-semibold text-white">
          Most Recent
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function OverallRatingPanel() {
  return (
    <section className="grid gap-5 border-b border-white/10 bg-[#061018]/42 p-5 lg:grid-cols-[230px_minmax(280px,1fr)_300px]">
      <div>
        <h2 className="text-lg font-semibold text-white">Overall Rating</h2>
        <div className="mt-4 text-6xl font-bold leading-none text-white">4.8</div>
        <div className="mt-3">
          <Stars rating={5} size="h-6 w-6" />
        </div>
        <p className="mt-3 text-sm font-medium text-white/70">Based on 2,174 reviews</p>
      </div>

      <div className="space-y-3">
        {ratingBreakdown.map((item) => (
          <div key={item.stars} className="grid grid-cols-[42px_minmax(0,1fr)_92px] items-center gap-3 text-sm">
            <div className="flex items-center gap-1 font-semibold text-white">
              {item.stars}
              <Star className="h-3.5 w-3.5 text-white/72" />
            </div>
            <div className="h-2 rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f3b544] to-[#ffb000]"
                style={{ width: `${item.percent}%` }}
              />
            </div>
            <div className="text-right font-medium text-white/68">
              {item.count.toLocaleString()} ({item.percent}%)
            </div>
          </div>
        ))}
      </div>

      <div className="border-white/10 lg:border-l lg:pl-7">
        <h2 className="text-lg font-semibold text-white">Rating Highlights</h2>
        <div className="mt-4 space-y-3">
          {ratingHighlights.map((item, index) => {
            const icons = [Sparkles, Heart, Hotel, BedDouble, MapPin];
            const Icon = icons[index];
            return (
              <div key={item.label} className="flex items-center gap-3 text-sm">
                <Icon className="h-4 w-4 text-white/78" />
                <span className="min-w-0 flex-1 font-medium text-white/74">{item.label}</span>
                <span className="font-semibold text-white">{item.score.toFixed(1)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: TravelerReview }) {
  const vote = helpfulVotes.find((item) => item.reviewId === review.id);
  const booking = verifiedBookings.find((item) => item.reviewId === review.id);

  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-[#061018]/78 shadow-[inset_0_1px_0_rgba(255,255,255,.05)]">
      <div className="grid gap-4 p-4 lg:grid-cols-[230px_minmax(0,1fr)_190px]">
        <div className="flex gap-3 border-white/10 lg:border-r lg:pr-5">
          <img src={review.avatar} alt="" className="h-14 w-14 rounded-full border border-white/18 object-cover" />
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-white">{review.author}</h3>
            {review.verified && (
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#26c63f]/15 px-2 py-0.5 text-[11px] font-bold text-[#34d846]">
                <Check className="h-3 w-3" />
                Verified
              </span>
            )}
            <p className="mt-2 text-sm font-medium leading-5 text-white/68">
              {review.travelerType}
              <span className="mx-2 text-white/36">•</span>
              {review.date}
            </p>
            <p className="mt-2 text-[11px] font-medium text-white/42">{booking?.bookingReference}</p>
          </div>
        </div>

        <div className="min-w-0">
          <Stars rating={review.rating} size="h-4 w-4" />
          <h3 className="mt-2 text-lg font-bold leading-snug text-white">{review.title}</h3>
          <p className="mt-1 text-sm font-medium leading-6 text-white/70">{review.body}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {review.tags.map((tag) => (
              <span
                key={tag.label}
                className="rounded-md border border-white/12 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-white/76"
              >
                {tag.label} <span className="font-bold text-[#f3b544]">{tag.score}</span>
              </span>
            ))}
          </div>
        </div>

        {review.photo && (
          <img
            src={review.photo.src}
            alt={review.photo.alt}
            className="h-28 w-full rounded-lg border border-white/10 object-cover lg:h-32"
          />
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-white/66">
          <Hotel className="h-4 w-4 shrink-0 text-white/78" />
          <span className="truncate">{review.relatedItem.name}</span>
          <span className="text-white/34">•</span>
          <span className="shrink-0">{review.relatedItem.location}</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button type="button" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#34d846]">
            <ThumbsUp className="h-4 w-4" />
            Helpful ({vote?.count ?? 0})
          </button>
          <button type="button" className="text-white/66" aria-label="More review actions">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

function TravelerPhotos() {
  return (
    <section className="rounded-xl border border-white/10 bg-[#07131b]/78 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Traveler Photos</h2>
        <button className="text-sm font-bold text-[#f3b544]">View all</button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {reviewPhotos.map((photo) => (
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            className="aspect-[1.08/1] rounded-lg border border-white/10 object-cover"
          />
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm font-medium text-white/70">
        <Camera className="h-4 w-4 text-[#f3b544]" />
        +1,248 more photos from travelers
      </p>
    </section>
  );
}

function ShareExperience() {
  return (
    <section className="rounded-xl border border-white/10 bg-[#07131b]/78 p-5">
      <h2 className="text-lg font-bold text-white">Share Your Experience</h2>
      <p className="mt-3 text-sm font-medium leading-6 text-white/70">
        Help fellow travelers by sharing your honest experience. Your review makes a difference.
      </p>
      <button className="mt-5 flex w-full items-center justify-center gap-3 rounded-md bg-[#f3b544] px-4 py-3 text-sm font-bold text-[#071018] shadow-[0_12px_35px_rgba(243,181,68,.2)] transition hover:bg-[#ffc24b]">
        <Edit3 className="h-4 w-4" />
        Write a Review
      </button>
      <p className="mt-5 flex items-center gap-2 text-sm font-medium text-white/58">
        <Clock3 className="h-4 w-4" />
        Takes less than 3 minutes
      </p>
    </section>
  );
}

function TrustSafety() {
  const items = [
    "All reviews are from verified bookings",
    "We moderate reviews to ensure authenticity",
    "No incentives for positive reviews",
    "Your privacy is always protected",
  ];
  return (
    <section className="rounded-xl border border-white/10 bg-[#07131b]/78 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Trust & Safety</h2>
        <button className="text-sm font-bold text-[#f3b544]">Learn more</button>
      </div>
      <div className="mt-5 space-y-5">
        {items.map((item, index) => {
          const icons = [ShieldCheck, Star, ShieldCheck, ShieldCheck];
          const Icon = icons[index];
          return (
            <div key={item} className="flex gap-3 text-sm font-medium leading-5 text-white/72">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white/78" />
              {item}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Pagination() {
  return (
    <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <PageButton icon={<ChevronLeft className="h-4 w-4" />} label="Previous" />
        {[1, 2, 3].map((page) => (
          <PageButton key={page} label={String(page)} active={page === 1} />
        ))}
        <span className="px-2 text-white/50">...</span>
        <PageButton label="109" />
        <PageButton icon={<ChevronRight className="h-4 w-4" />} label="Next" />
      </div>
      <p className="text-center text-sm font-medium text-white/60 sm:ml-auto sm:text-right">
        Showing 1-20 of 2,174 reviews
      </p>
    </div>
  );
}

function PageButton({ label, active, icon }: { label: string; active?: boolean; icon?: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`grid h-9 min-w-9 place-items-center rounded-md border px-3 text-sm font-semibold ${
        active
          ? "border-[#f3b544] text-[#f3b544]"
          : "border-white/10 bg-white/[0.025] text-white/66 hover:text-white"
      }`}
    >
      {icon ?? label}
    </button>
  );
}
