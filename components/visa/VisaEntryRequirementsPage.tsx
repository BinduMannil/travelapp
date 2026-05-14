/* eslint-disable @next/next/no-img-element */
"use client";

import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileText,
  Globe2,
  HeartPulse,
  Landmark,
  Luggage,
  MapPin,
  Plane,
  Plus,
  ShieldCheck,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { CinematicTopNav } from "@/components/layout/CinematicTopNav";
import { TopNavSearch } from "@/components/search/TopNavSearch";
import { JourneeGlassPanel } from "@/components/ui/JourneeGlassPanel";
import { SegmentedTabs, type SegmentedTabItem } from "@/components/ui/SegmentedTabs";
import { StatusBadge, type StatusBadgeVariant } from "@/components/ui/StatusBadge";
import { navigationHref } from "@/lib/routes";

type PassportCode = "US" | "AE" | "GB" | "IN";
type DestinationCode = "JP" | "KR" | "SG" | "GB" | "IN";
type Purpose = "tourism" | "business" | "transit" | "study";
type Stay = "short" | "standard" | "extended";
type ResultStatus = "Visa-free" | "eVisa" | "Visa required" | "Transit check";
type ActiveTab = "summary" | "documents" | "timing" | "rules";
type InsightCard = {
  label: string;
  value: string;
  icon: LucideIcon;
  copy?: string;
};

type PassportOption = {
  code: PassportCode;
  label: string;
  flag: string;
  note: string;
};

type DestinationOption = {
  code: DestinationCode;
  label: string;
  flag: string;
  city: string;
  image: string;
};

type VisaProfile = {
  status: ResultStatus;
  maxStay: number;
  fee: string;
  processing: string;
  entryType: string;
  confidence: "High" | "Medium" | "Needs review";
  summary: string;
  documents: string[];
  warnings: string[];
  rules: string[];
};

const navItems = [
  "Home",
  "Explore",
  "Atlas",
  "Trips",
  "Guides",
  "Journal",
  "Stays",
  "Flights",
  "Visa",
].map((label) => ({ label, href: navigationHref(label) }));

const passports: PassportOption[] = [
  {
    code: "US",
    label: "United States",
    flag: "US",
    note: "Strong visa-free access across Japan, Korea, Singapore, and the UK.",
  },
  {
    code: "AE",
    label: "United Arab Emirates",
    flag: "AE",
    note: "Broad short-stay access with several destination-specific eVisa rules.",
  },
  {
    code: "GB",
    label: "United Kingdom",
    flag: "GB",
    note: "Often eligible for short leisure stays, with ETA-style checks emerging.",
  },
  {
    code: "IN",
    label: "India",
    flag: "IN",
    note: "More frequent pre-arrival visa or eVisa planning required.",
  },
];

const destinations: DestinationOption[] = [
  {
    code: "JP",
    label: "Japan",
    flag: "JP",
    city: "Tokyo and Kyoto",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=84",
  },
  {
    code: "KR",
    label: "South Korea",
    flag: "KR",
    city: "Seoul",
    image:
      "https://images.unsplash.com/photo-1538485399081-7c8ed49f41ea?auto=format&fit=crop&w=1600&q=84",
  },
  {
    code: "SG",
    label: "Singapore",
    flag: "SG",
    city: "Marina Bay",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=84",
  },
  {
    code: "GB",
    label: "United Kingdom",
    flag: "GB",
    city: "London",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=84",
  },
  {
    code: "IN",
    label: "India",
    flag: "IN",
    city: "Delhi and Jaipur",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=84",
  },
];

const purposeTabs: SegmentedTabItem<Purpose>[] = [
  { value: "tourism", label: "Tourism" },
  { value: "business", label: "Business" },
  { value: "transit", label: "Transit" },
  { value: "study", label: "Study" },
];

const stayTabs: SegmentedTabItem<Stay>[] = [
  { value: "short", label: "1-14 days" },
  { value: "standard", label: "15-90 days" },
  { value: "extended", label: "90+ days" },
];

const experienceTabs: SegmentedTabItem<ActiveTab>[] = [
  { value: "summary", label: "Result" },
  { value: "documents", label: "Documents" },
  { value: "timing", label: "Time + fees" },
  { value: "rules", label: "Entry rules" },
];

const baseDocuments = [
  "Passport valid for the full stay",
  "Return or onward travel confirmation",
  "Accommodation address or trip itinerary",
  "Proof of funds for the stay",
];

const savedChecks = [
  { passport: "US" as PassportCode, destination: "JP" as DestinationCode, purpose: "tourism" as Purpose, stay: "standard" as Stay },
  { passport: "AE" as PassportCode, destination: "KR" as DestinationCode, purpose: "business" as Purpose, stay: "short" as Stay },
  { passport: "IN" as PassportCode, destination: "GB" as DestinationCode, purpose: "tourism" as Purpose, stay: "standard" as Stay },
];

function getVisaProfile(
  passport: PassportCode,
  destination: DestinationCode,
  purpose: Purpose,
  stay: Stay,
): VisaProfile {
  let profile: VisaProfile = {
    status: "Visa-free",
    maxStay: destination === "GB" ? 180 : 90,
    fee: "No consular visa fee",
    processing: "No pre-approval for standard entry",
    entryType: "Short-stay visitor",
    confidence: "High",
    summary: "This trip appears eligible for visa-free entry when the stay and purpose remain within visitor rules.",
    documents: baseDocuments,
    warnings: [
      "Final entry permission is decided by border officers on arrival.",
      "Airlines may check documentation before boarding.",
    ],
    rules: [
      "Work for a local employer is not permitted on visitor status.",
      "Passport details must match booking and arrival documents.",
      "Immigration may ask about trip purpose, funds, and onward travel.",
    ],
  };

  if (passport === "IN" || destination === "IN") {
    profile = {
      status: "eVisa",
      maxStay: destination === "IN" ? 60 : 30,
      fee: "Typically paid online before travel",
      processing: "3-5 business days recommended",
      entryType: "Pre-arrival electronic visa",
      confidence: "Medium",
      summary: "Plan for a pre-arrival electronic visa and keep approval evidence accessible during travel.",
      documents: [
        ...baseDocuments,
        "Recent passport-style photo",
        "Digital visa approval or application receipt",
      ],
      warnings: [
        "Apply through the official government portal, not a lookalike service.",
        "Name, passport number, and arrival date mismatches can cause delays.",
      ],
      rules: [
        "Carry a printed or offline copy of the approval.",
        "Entry may be limited to designated airports or seaports.",
        "Some purposes require a consular visa instead of an eVisa.",
      ],
    };
  }

  if (purpose === "study" || stay === "extended") {
    profile = {
      ...profile,
      status: "Visa required",
      maxStay: stay === "extended" ? 365 : profile.maxStay,
      fee: "Consular or permit fees vary",
      processing: "2-8 weeks depending on permit class",
      entryType: "Long-stay visa or permit",
      confidence: "Needs review",
      summary: "This scenario should be reviewed as a long-stay or regulated-purpose trip before booking.",
      documents: [
        ...profile.documents,
        "Acceptance, sponsor, or host documentation",
        "Long-stay application form",
        "Travel insurance or health coverage evidence",
      ],
      warnings: [
        "Visitor entry usually cannot be used for long-term study or residence.",
        "Processing can require embassy appointments and original documents.",
      ],
    };
  }

  if (purpose === "transit") {
    profile = {
      ...profile,
      status: "Transit check",
      maxStay: Math.min(profile.maxStay, 7),
      fee: profile.status === "Visa-free" ? "Usually no fee" : profile.fee,
      processing: "Check airline routing before ticketing",
      entryType: "Airside or landside transit",
      summary: "Transit rules depend on airport, terminal change, baggage collection, and overnight layover plans.",
      documents: [
        "Passport and confirmed onward ticket",
        "Visa for final destination if required",
        "Baggage-through confirmation from airline",
      ],
      warnings: [
        "Collecting baggage or changing airports can trigger entry requirements.",
        "Overnight layovers may need visitor entry permission.",
      ],
    };
  }

  if (purpose === "business" && profile.status === "Visa-free") {
    profile = {
      ...profile,
      summary: "Business meetings may fit visitor rules, but paid local work and service delivery usually do not.",
      documents: [...profile.documents, "Invitation letter or meeting agenda"],
      warnings: [
        ...profile.warnings,
        "Keep business activities limited to meetings, conferences, or negotiations.",
      ],
    };
  }

  return profile;
}

function statusVariant(status: ResultStatus): StatusBadgeVariant {
  if (status === "Visa-free") return "success";
  if (status === "eVisa") return "premium";
  if (status === "Transit check") return "warning";
  return "error";
}

function findPassport(code: PassportCode) {
  return passports.find((passport) => passport.code === code) ?? passports[0];
}

function findDestination(code: DestinationCode) {
  return destinations.find((destination) => destination.code === code) ?? destinations[0];
}

function FieldSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  icon,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  icon: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#e8c77b]">{label}</span>
      <span className="relative flex items-center rounded-2xl border border-white/12 bg-black/26">
        <span className="pointer-events-none absolute left-4 text-white/64">{icon}</span>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          className="h-13 w-full appearance-none rounded-2xl bg-transparent py-4 pl-12 pr-10 text-sm font-semibold text-white outline-none transition focus:ring-2 focus:ring-[#e8c77b]/55 [&>option]:bg-[#101517] [&>option]:text-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronRight className="pointer-events-none absolute right-4 h-4 w-4 rotate-90 text-white/46" />
      </span>
    </label>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8c77b]">
      {children}
    </p>
  );
}

export function VisaEntryRequirementsPage() {
  const [passport, setPassport] = useState<PassportCode>("US");
  const [destination, setDestination] = useState<DestinationCode>("JP");
  const [purpose, setPurpose] = useState<Purpose>("tourism");
  const [stay, setStay] = useState<Stay>("standard");
  const [activeTab, setActiveTab] = useState<ActiveTab>("summary");
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [journeyAdded, setJourneyAdded] = useState(false);

  const selectedPassport = findPassport(passport);
  const selectedDestination = findDestination(destination);
  const visaProfile = useMemo(
    () => getVisaProfile(passport, destination, purpose, stay),
    [passport, destination, purpose, stay],
  );
  const heroStats: InsightCard[] = [
    { label: "Passport", value: selectedPassport.label, icon: UserRound },
    { label: "Destination", value: selectedDestination.label, icon: MapPin },
    { label: "Max stay", value: `${visaProfile.maxStay} days`, icon: CalendarDays },
  ];
  const resultDetails: InsightCard[] = [
    { label: "Entry type", value: visaProfile.entryType, icon: Landmark },
    { label: "Guidance strength", value: visaProfile.confidence, icon: ShieldCheck },
    { label: "Processing", value: visaProfile.processing, icon: Clock3 },
    { label: "Fee", value: visaProfile.fee, icon: CircleDollarSign },
  ];
  const timingCards: InsightCard[] = [
    {
      label: "Processing time",
      value: visaProfile.processing,
      icon: Clock3,
      copy: "Start earlier if your route includes multiple countries.",
    },
    {
      label: "Fee guidance",
      value: visaProfile.fee,
      icon: CircleDollarSign,
      copy: "Use official portals and keep payment receipts offline.",
    },
    {
      label: "Best booking moment",
      value: visaProfile.status === "Visa-free" ? "Book after passport check" : "Book refundable until approved",
      icon: Plane,
      copy: "Avoid non-refundable plans when approval is pending.",
    },
    {
      label: "Support level",
      value: visaProfile.confidence,
      icon: Sparkles,
      copy: "Higher complexity means more document review before departure.",
    },
  ];

  const completedDocuments = visaProfile.documents.filter((document) =>
    checkedDocuments.includes(document),
  ).length;
  const documentProgress = Math.round((completedDocuments / visaProfile.documents.length) * 100);

  function updateDestination(nextDestination: DestinationCode) {
    setDestination(nextDestination);
    setCheckedDocuments([]);
    setJourneyAdded(false);
  }

  function applySavedCheck(check: (typeof savedChecks)[number]) {
    setPassport(check.passport);
    updateDestination(check.destination);
    setPurpose(check.purpose);
    setStay(check.stay);
    setActiveTab("summary");
  }

  function submitSearch(value: string) {
    const match = destinations.find((item) =>
      `${item.label} ${item.city}`.toLowerCase().includes(value.toLowerCase()),
    );
    if (match) {
      updateDestination(match.code);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020506] font-sans text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(232,199,123,.18),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(68,126,137,.18),transparent_28%),linear-gradient(180deg,#071113_0%,#020506_48%,#010202_100%)]" />
      <div
        className="fixed inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <CinematicTopNav
        navItems={navItems}
        notificationCount={2}
        avatarSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
        avatarAlt="Traveler profile"
        search={
          <TopNavSearch
            value={query}
            onValueChange={setQuery}
            onSearchSubmit={submitSearch}
            placeholder="Search destinations for entry rules..."
            label="Search visa destinations"
            className="ml-auto"
          />
        }
      />

      <section className="relative min-h-[760px] pt-16">
        <img
          src={selectedDestination.image}
          alt={`${selectedDestination.label} travel skyline`}
          className="absolute inset-0 h-full w-full object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,5,6,.96)_0%,rgba(2,5,6,.78)_45%,rgba(2,5,6,.38)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020506] to-transparent" />

        <div className="relative mx-auto grid max-w-[1500px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-20 xl:px-10">
          <div className="flex min-h-[560px] flex-col justify-end pb-8">
            <StatusBadge variant={statusVariant(visaProfile.status)}>
              {visaProfile.status}
            </StatusBadge>
            <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.6rem,9vw,8rem)] font-semibold leading-[0.88] text-[#fff8e6] drop-shadow-[0_18px_55px_rgba(0,0,0,.75)]">
              Entry rules,{" "}
              <span className="block italic text-[#e8c77b]">beautifully cleared.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
              Plan passport, visa, document, fee, and arrival requirements for
              {` ${selectedPassport.label} travelers entering ${selectedDestination.label}.`}
            </p>

            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {heroStats.map(({ label, value, icon: Icon }) => (
                <JourneeGlassPanel key={label} tone="dark" className="p-4">
                  <Icon className="h-5 w-5 text-[#e8c77b]" />
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/48">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </JourneeGlassPanel>
              ))}
            </div>
          </div>

          <JourneeGlassPanel tone="gold" className="self-end p-5 sm:p-6">
            <SectionKicker>Visa planner</SectionKicker>
            <div className="mt-5 grid gap-5">
              <FieldSelect
                label="Passport nationality"
                value={passport}
                onChange={setPassport}
                icon={<UserRound className="h-4 w-4" />}
                options={passports.map((item) => ({
                  value: item.code,
                  label: `${item.flag} ${item.label}`,
                }))}
              />
              <FieldSelect
                label="Destination"
                value={destination}
                onChange={updateDestination}
                icon={<Globe2 className="h-4 w-4" />}
                options={destinations.map((item) => ({
                  value: item.code,
                  label: `${item.flag} ${item.label}`,
                }))}
              />
              <div>
                <SectionKicker>Trip purpose</SectionKicker>
                <SegmentedTabs
                  items={purposeTabs}
                  value={purpose}
                  onValueChange={(nextPurpose) => {
                    setPurpose(nextPurpose);
                    setCheckedDocuments([]);
                    setJourneyAdded(false);
                  }}
                  aria-label="Trip purpose"
                  className="mt-3 rounded-2xl"
                  itemClassName="flex-1"
                />
              </div>
              <div>
                <SectionKicker>Stay duration</SectionKicker>
                <SegmentedTabs
                  items={stayTabs}
                  value={stay}
                  onValueChange={(nextStay) => {
                    setStay(nextStay);
                    setCheckedDocuments([]);
                    setJourneyAdded(false);
                  }}
                  aria-label="Stay duration"
                  className="mt-3 rounded-2xl"
                  itemClassName="flex-1"
                />
              </div>
            </div>
          </JourneeGlassPanel>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[1500px] gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:px-10">
        <div className="min-w-0 space-y-6">
          <JourneeGlassPanel tone="dark" className="overflow-hidden">
            <div className="border-b border-white/10 px-4 py-4 sm:px-6">
              <SegmentedTabs
                items={experienceTabs}
                value={activeTab}
                onValueChange={setActiveTab}
                variant="underline"
                aria-label="Visa result sections"
              />
            </div>

            <div className="p-5 sm:p-7">
              {activeTab === "summary" ? (
                <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[1.25rem] border border-white/10 bg-black/28 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <SectionKicker>Result card</SectionKicker>
                        <h2 className="mt-3 font-display text-4xl leading-tight text-white">
                          {visaProfile.status} for {selectedDestination.label}
                        </h2>
                      </div>
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#e8c77b] text-[#130f0a]">
                        {visaProfile.status === "Visa required" ? (
                          <FileText className="h-7 w-7" />
                        ) : (
                          <Check className="h-8 w-8" />
                        )}
                      </span>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-white/72">{visaProfile.summary}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {resultDetails.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-white/[.045] p-4">
                          <Icon className="h-5 w-5 text-[#e8c77b]" />
                          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/45">{label}</p>
                          <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {passports.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => setPassport(item.code)}
                        className={`rounded-[1.25rem] border p-5 text-left transition ${
                          item.code === passport
                            ? "border-[#e8c77b]/55 bg-[#e8c77b]/12"
                            : "border-white/10 bg-white/[.035] hover:border-white/24"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-semibold text-white">{item.flag} {item.label}</span>
                          {item.code === passport ? <CheckCircle2 className="h-5 w-5 text-[#e8c77b]" /> : null}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/58">{item.note}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeTab === "documents" ? (
                <div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <SectionKicker>Required documents checklist</SectionKicker>
                      <h2 className="mt-3 font-display text-4xl text-white">Pack the proof before the passport.</h2>
                    </div>
                    <StatusBadge variant={documentProgress === 100 ? "success" : "premium"}>
                      {documentProgress}% ready
                    </StatusBadge>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {visaProfile.documents.map((document) => {
                      const checked = checkedDocuments.includes(document);
                      return (
                        <button
                          key={document}
                          type="button"
                          onClick={() =>
                            setCheckedDocuments((current) =>
                              checked
                                ? current.filter((item) => item !== document)
                                : [...current, document],
                            )
                          }
                          className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                            checked
                              ? "border-emerald-200/30 bg-emerald-200/10"
                              : "border-white/10 bg-white/[.035] hover:border-[#e8c77b]/40"
                          }`}
                        >
                          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border ${
                            checked ? "border-emerald-200 bg-emerald-200 text-[#07110d]" : "border-white/18 text-white/48"
                          }`}>
                            {checked ? <Check className="h-5 w-5" /> : <FileCheck2 className="h-5 w-5" />}
                          </span>
                          <span className="text-sm font-semibold text-white">{document}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {activeTab === "timing" ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {timingCards.map(({ label, value, icon: Icon, copy }) => (
                    <div key={label} className="rounded-[1.25rem] border border-white/10 bg-white/[.04] p-5">
                      <Icon className="h-6 w-6 text-[#e8c77b]" />
                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-white/46">{label}</p>
                      <h3 className="mt-2 font-display text-3xl text-white">{value}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/62">{copy}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {activeTab === "rules" ? (
                <div className="grid gap-6 xl:grid-cols-2">
                  <div>
                    <SectionKicker>Entry rules and warnings</SectionKicker>
                    <h2 className="mt-3 font-display text-4xl text-white">What border officers may care about.</h2>
                    <div className="mt-6 space-y-3">
                      {visaProfile.rules.map((rule) => (
                        <div key={rule} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-4">
                          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#e8c77b]" />
                          <p className="text-sm leading-6 text-white/72">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {visaProfile.warnings.map((warning) => (
                      <div key={warning} className="flex gap-3 rounded-2xl border border-amber-200/20 bg-amber-200/10 p-4">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
                        <p className="text-sm leading-6 text-amber-50/82">{warning}</p>
                      </div>
                    ))}
                    <a
                      href="https://www.iatatravelcentre.com/"
                      className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#e8c77b]/45 px-5 text-sm font-bold text-[#e8c77b] transition hover:bg-[#e8c77b]/10"
                    >
                      Check airline-facing requirements
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </JourneeGlassPanel>

          <div className="grid gap-4 md:grid-cols-3">
            {destinations.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => updateDestination(item.code)}
                className={`group overflow-hidden rounded-[1.35rem] border text-left transition ${
                  item.code === destination
                    ? "border-[#e8c77b]/60 bg-[#e8c77b]/12"
                    : "border-white/10 bg-white/[.035] hover:border-white/24"
                }`}
              >
                <div className="relative h-36">
                  <img src={item.image} alt={`${item.label} destination`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 to-transparent" />
                  <StatusBadge variant={statusVariant(getVisaProfile(passport, item.code, purpose, stay).status)} className="absolute bottom-3 left-3">
                    {getVisaProfile(passport, item.code, purpose, stay).status}
                  </StatusBadge>
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold text-white">{item.flag} {item.label}</p>
                  <p className="mt-1 text-xs text-white/58">{item.city}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <JourneeGlassPanel tone="gold" className="p-5">
            <SectionKicker>Journey Builder</SectionKicker>
            <h2 className="mt-3 font-display text-3xl text-white">
              Add this entry plan to your trip.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/66">
              Attach the visa result, document checklist, and timing guidance to your active itinerary.
            </p>
            <button
              type="button"
              onClick={() => setJourneyAdded(true)}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#e8c77b] px-5 text-sm font-bold text-[#130f0a] shadow-[0_18px_45px_rgba(232,199,123,.22)] transition hover:bg-[#f6dc9a]"
            >
              {journeyAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {journeyAdded ? "Added to Journey Builder" : "Add result to Journey Builder"}
            </button>
          </JourneeGlassPanel>

          <JourneeGlassPanel tone="dark" className="p-5">
            <SectionKicker>Saved visa checks</SectionKicker>
            <div className="mt-4 space-y-3">
              {savedChecks.map((check) => {
                const savedDestination = findDestination(check.destination);
                const savedPassport = findPassport(check.passport);
                const savedProfile = getVisaProfile(check.passport, check.destination, check.purpose, check.stay);
                return (
                  <button
                    key={`${check.passport}-${check.destination}-${check.purpose}`}
                    type="button"
                    onClick={() => applySavedCheck(check)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[.035] p-4 text-left transition hover:border-[#e8c77b]/45"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-white">
                        {savedPassport.flag} to {savedDestination.flag} {savedDestination.label}
                      </span>
                      <StatusBadge variant={statusVariant(savedProfile.status)}>{savedProfile.status}</StatusBadge>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/42">
                      {check.purpose} · {check.stay === "short" ? "1-14 days" : check.stay === "standard" ? "15-90 days" : "90+ days"}
                    </p>
                  </button>
                );
              })}
            </div>
          </JourneeGlassPanel>

          <JourneeGlassPanel tone="default" className="p-5">
            <SectionKicker>Trip brief</SectionKicker>
            <div className="mt-5 flex gap-4">
              <img
                src={selectedDestination.image}
                alt={`${selectedDestination.label} trip preview`}
                className="h-24 w-24 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0">
                <p className="font-semibold text-white">Dubai to {selectedDestination.city}</p>
                <p className="mt-2 text-sm text-white/60">1 traveler · economy · flexible dates</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#e8c77b]">
                  <Luggage className="h-4 w-4" />
                  Documents {completedDocuments}/{visaProfile.documents.length}
                </p>
              </div>
            </div>
          </JourneeGlassPanel>

          <JourneeGlassPanel tone="default" className="p-5">
            <div className="flex items-center gap-3">
              <HeartPulse className="h-6 w-6 text-[#e8c77b]" />
              <SectionKicker>Planning note</SectionKicker>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/68">
              Visa information can change quickly. Treat this as planning guidance and verify final rules with official government or airline sources before departure.
            </p>
          </JourneeGlassPanel>
        </aside>
      </section>
    </main>
  );
}
