"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Cloud,
  Download,
  FileDown,
  FolderDown,
  HardDrive,
  Lightbulb,
  Map,
  MapPin,
  MoreVertical,
  Mountain,
  Pause,
  Play,
  Route,
  Settings,
  ShieldCheck,
  Smartphone,
  User,
  X,
} from "lucide-react";
import { MainNavLink } from "@/components/navigation/MainNavLink";

type OfflineMap = {
  id: string;
  name: string;
  mapType: "City Map" | "Region Map" | "Country Map";
  sizeGb: number;
  status: "available" | "downloading" | "paused";
  downloadedOn?: string;
  progress?: number;
  image: string;
};

type RecommendedMap = {
  id: string;
  name: string;
  mapType: "City Map" | "Region Map";
  sizeGb: number;
};

type StorageItem = {
  label: string;
  valueGb: number;
  color: string;
};

type DownloadQueueItem = {
  id: string;
  name: string;
  mapType: string;
  sizeGb: number;
  progress: number;
  image: string;
};

const navItems = [
  "Home",
  "Explore",
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

const offlineCenter = [
  { label: "Offline Maps", description: "Downloaded maps", icon: Map, active: true },
  { label: "Downloaded Trips", description: "View offline itineraries", icon: CalendarDays },
  { label: "Offline Guides", description: "Access saved guides", icon: BookOpen },
  { label: "Saved Routes", description: "My saved routes", icon: Route },
  { label: "Downloads", description: "All downloads", icon: FileDown },
  { label: "Sync & Settings", description: "Manage preferences", icon: Settings },
];

const offlineMaps: OfflineMap[] = [
  {
    id: "tokyo-japan",
    name: "Tokyo, Japan",
    mapType: "City Map",
    sizeGb: 1.2,
    status: "available",
    downloadedOn: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=420&q=80",
  },
  {
    id: "bali-indonesia",
    name: "Bali, Indonesia",
    mapType: "Region Map",
    sizeGb: 2.1,
    status: "available",
    downloadedOn: "May 10, 2025",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=420&q=80",
  },
  {
    id: "paris-france",
    name: "Paris, France",
    mapType: "City Map",
    sizeGb: 1.8,
    status: "downloading",
    progress: 72,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=420&q=80",
  },
  {
    id: "switzerland",
    name: "Switzerland",
    mapType: "Country Map",
    sizeGb: 3.6,
    status: "paused",
    progress: 31,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=420&q=80",
  },
];

const recommendedMaps: RecommendedMap[] = [
  { id: "kyoto-japan", name: "Kyoto, Japan", mapType: "City Map", sizeGb: 1.1 },
  { id: "barcelona-spain", name: "Barcelona, Spain", mapType: "City Map", sizeGb: 1 },
  { id: "new-york-usa", name: "New York, USA", mapType: "City Map", sizeGb: 1.3 },
  { id: "rome-italy", name: "Rome, Italy", mapType: "City Map", sizeGb: 1.2 },
];

const storageUsage: StorageItem[] = [
  { label: "Maps", valueGb: 6.1, color: "#f5b400" },
  { label: "Trips", valueGb: 3.2, color: "#2da8ff" },
  { label: "Guides", valueGb: 2.1, color: "#8b75ff" },
  { label: "Other", valueGb: 1, color: "#9da5ad" },
];

const downloadQueue: DownloadQueueItem[] = [
  {
    id: "paris-france-queue",
    name: "Paris, France",
    mapType: "City Map",
    sizeGb: 1.8,
    progress: 72,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=180&q=80",
  },
  {
    id: "switzerland-queue",
    name: "Switzerland",
    mapType: "Country Map",
    sizeGb: 3.6,
    progress: 31,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=180&q=80",
  },
];

const offlineContent = [
  { label: "Maps", value: "6.1 GB", icon: Map },
  { label: "Trips", value: "3.2 GB", icon: CalendarDays },
  { label: "Guides", value: "2.1 GB", icon: BookOpen },
  { label: "Routes", value: "0.8 GB", icon: Route },
  { label: "Other", value: "0.2 GB", icon: FolderDown },
];

const benefits = [
  {
    title: "Access Anywhere",
    text: "Use maps and guides without internet.",
    icon: MapPin,
  },
  {
    title: "Save Data",
    text: "Avoid roaming charges and save data.",
    icon: Smartphone,
  },
  {
    title: "Stay Prepared",
    text: "Always have what you need on the go.",
    icon: ShieldCheck,
  },
  {
    title: "Auto Sync",
    text: "We keep everything up to date for you.",
    icon: Cloud,
  },
];

const tabs = ["All Maps", "Country Maps", "Region Maps", "City Maps"] as const;

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-[#07131b]/78 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({
  children,
  count,
}: {
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-[1rem] font-bold text-white">{children}</h2>
      {typeof count === "number" ? (
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/70">
          {count}
        </span>
      ) : null}
    </div>
  );
}

function Toggle({
  enabled,
  onClick,
  label,
}: {
  enabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={enabled}
      aria-label={label}
      className={`relative h-7 w-12 rounded-full transition ${
        enabled ? "bg-[#f5b400]" : "bg-white/15"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-[#f5b400] shadow-[0_0_20px_rgba(245,180,0,0.35)]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Mountain className="h-8 w-8 text-[#f5b400]" strokeWidth={1.8} />
      <span className="text-xl font-medium tracking-[0.22em] text-white">JOURNEE</span>
    </div>
  );
}

function StorageRing({ items }: { items: StorageItem[] }) {
  const total = 32;
  const used = 12.4;
  const segments = useMemo(() => {
    let start = 0;
    return items.map((item) => {
      const amount = (item.valueGb / total) * 100;
      const segment = `${item.color} ${start}% ${start + amount}%`;
      start += amount;
      return segment;
    });
  }, [items]);

  return (
    <div
      className="grid h-28 w-28 place-items-center rounded-full"
      style={{
        background: `conic-gradient(${segments.join(", ")}, rgba(255,255,255,.14) 0 100%)`,
      }}
    >
      <div className="grid h-20 w-20 place-items-center rounded-full bg-[#07131b] text-center shadow-inner">
        <div>
          <div className="text-[1rem] font-semibold text-white">{used} GB</div>
          <div className="text-xs text-white/75">of 32 GB used</div>
        </div>
      </div>
    </div>
  );
}

export function OfflineAccessPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All Maps");
  const [autoSync, setAutoSync] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [pausedMaps, setPausedMaps] = useState<Record<string, boolean>>({
    switzerland: true,
    "paris-france": false,
  });

  const filteredMaps = offlineMaps.filter((mapItem) => {
    if (activeTab === "All Maps") return true;
    return activeTab === `${mapItem.mapType.split(" ")[0]} Maps`;
  });

  return (
    <main className="min-h-screen bg-[#03090d] font-sans text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,180,0,0.12),transparent_26%),radial-gradient(circle_at_74%_12%,rgba(45,168,255,0.08),transparent_24%),linear-gradient(180deg,#02070b_0%,#07131b_48%,#03080c_100%)]" />
      <div className="relative">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#03090d]/88 px-5 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1860px] items-center justify-between gap-6">
            <Logo />
            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-6 2xl:flex">
              {navItems.map((item) => (
                <MainNavLink
                  key={item}
                  label={item}
                  className="whitespace-nowrap text-sm font-medium text-white transition hover:text-[#f5b400]"
                  activeClassName="text-[#f5b400]"
                />
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-4">
              <div className="hidden items-center gap-2 text-sm font-bold text-[#f5b400] md:flex">
                <Download className="h-5 w-5" />
                <span>Offline Access</span>
              </div>
              <button
                type="button"
                aria-label="Notifications"
                className="relative rounded-full p-2 text-white transition hover:bg-white/10"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#f5b400] text-[10px] font-bold text-[#07131b]">
                  3
                </span>
              </button>
              <div className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-[#f5b400]/50 bg-[linear-gradient(135deg,#d7b38b,#5d342d)]">
                  <User className="h-5 w-5 text-white" />
                </div>
                <ChevronDown className="h-4 w-4 text-white/70" />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1860px] px-5 py-5">
          <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_340px] 2xl:grid-cols-[340px_minmax(0,1fr)_454px]">
            <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
              <Panel className="p-5">
                <h2 className="mb-4 text-sm font-extrabold uppercase text-[#f5b400]">
                  Offline Center
                </h2>
                <div className="space-y-1.5">
                  {offlineCenter.map(({ label, description, icon: Icon, active }) => (
                    <button
                      key={label}
                      type="button"
                      className={`flex w-full items-center gap-4 rounded-lg px-3.5 py-3 text-left transition ${
                        active
                          ? "bg-[#f5b400]/18 text-white shadow-[inset_0_0_28px_rgba(245,180,0,0.12)]"
                          : "text-white hover:bg-white/7"
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${active ? "text-[#f5b400]" : "text-white"}`} />
                      <span>
                        <span className="block text-[0.95rem] font-semibold">{label}</span>
                        <span className="block text-sm text-white/68">{description}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </Panel>

              <Panel className="p-5">
                <h2 className="mb-5 text-sm font-extrabold uppercase text-[#f5b400]">
                  Storage Overview
                </h2>
                <div className="flex items-center gap-5">
                  <StorageRing items={storageUsage} />
                  <div className="min-w-0 flex-1 space-y-3">
                    {storageUsage.map((item) => (
                      <div key={item.label} className="grid grid-cols-[1fr_auto] items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-sm"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-white/78">{item.label}</span>
                        </div>
                        <span className="text-sm font-medium tabular-nums text-white/86">
                          {item.valueGb.toFixed(1)} GB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-between rounded-md border border-[#f5b400]/55 px-4 py-3 text-sm font-semibold text-[#f5b400] transition hover:bg-[#f5b400]/10"
                >
                  <span className="flex items-center gap-3">
                    <HardDrive className="h-5 w-5" />
                    Manage Storage
                  </span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </Panel>

              <Panel className="p-5">
                <h2 className="mb-5 text-sm font-extrabold uppercase text-[#f5b400]">
                  Offline Mode
                </h2>
                <div className="flex gap-4">
                  <CheckCircle2 className="mt-0.5 h-8 w-8 shrink-0 text-[#49f36b]" />
                  <div>
                    <p className="font-bold text-[#9aff4d]">Offline mode is on</p>
                    <p className="mt-1 text-sm leading-6 text-white/72">
                      You can browse maps and access your downloaded content.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-md border border-[#f5b400]/70 px-4 py-3 text-sm font-bold text-[#f5b400] transition hover:bg-[#f5b400]/10"
                >
                  Go Offline Now
                </button>
              </Panel>
            </aside>

            <section className="min-w-0">
              <Panel className="overflow-hidden">
                <div className="flex flex-col gap-5 border-b border-white/10 p-5 md:flex-row md:items-start md:justify-between md:p-7">
                  <div>
                    <h1 className="text-2xl font-extrabold text-white md:text-3xl">
                      Offline Maps
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-white/76 md:text-[0.95rem]">
                      Download maps and content to access them anywhere, even without internet.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[#f5b400]/70 px-4 py-3 text-sm font-bold text-[#f5b400] transition hover:bg-[#f5b400]/10"
                  >
                    <Download className="h-5 w-5" />
                    Download New Map
                  </button>
                </div>

                <div className="overflow-x-auto border-b border-white/10 px-5 md:px-7">
                  <div className="flex min-w-max gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`border-b-2 px-3 py-4 text-sm font-semibold transition ${
                          activeTab === tab
                            ? "border-[#f5b400] text-[#f5b400]"
                            : "border-transparent text-white/82 hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 md:p-7">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <SectionTitle count={filteredMaps.length}>Downloaded Maps</SectionTitle>
                    <button
                      type="button"
                      className="hidden items-center gap-2 text-sm text-white/78 md:flex"
                    >
                      Sort by: <span className="font-semibold text-white">Recent</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {filteredMaps.map((mapItem) => {
                      const isPaused = pausedMaps[mapItem.id] ?? mapItem.status === "paused";
                      const isActiveDownload =
                        mapItem.status !== "available" && !isPaused;
                      return (
                        <article
                          key={mapItem.id}
                          className="grid gap-4 rounded-lg border border-white/10 bg-[#07131b]/58 p-3 transition hover:border-[#f5b400]/35 sm:grid-cols-[minmax(150px,190px)_minmax(0,1fr)] lg:grid-cols-[150px_minmax(0,1fr)_auto] 2xl:grid-cols-[220px_minmax(0,1fr)_auto]"
                        >
                          <div
                            className="relative min-h-[112px] overflow-hidden rounded-md bg-cover bg-center"
                            style={{ backgroundImage: `url(${mapItem.image})` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            {mapItem.status === "available" ? (
                              <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full border-2 border-[#49f36b] bg-[#07131b]/80 text-[#49f36b]">
                                <Check className="h-5 w-5" />
                              </span>
                            ) : (
                              <span className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-full border-[3px] border-[#f5b400] bg-[#07131b]/84 text-xs font-extrabold text-white">
                                {mapItem.progress}%
                              </span>
                            )}
                          </div>

                          <div className="flex min-w-0 flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <h3 className="text-lg font-extrabold text-white">{mapItem.name}</h3>
                              {mapItem.status === "available" ? (
                                <span className="ml-auto hidden items-center gap-2 text-sm text-white/82 md:flex">
                                  <span className="h-2 w-2 rounded-full bg-[#49f36b]" />
                                  Available Offline
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-1 text-sm text-white/78">
                              {mapItem.mapType} <span className="mx-2 text-white/45">•</span>{" "}
                              {mapItem.sizeGb.toFixed(1)} GB
                            </p>
                            {mapItem.status === "available" ? (
                              <p className="mt-2 text-sm text-white/72">
                                Downloaded on {mapItem.downloadedOn}
                              </p>
                            ) : (
                              <div className="mt-3 grid gap-2">
                                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                                  <ProgressBar value={mapItem.progress ?? 0} />
                                  <span className="text-sm tabular-nums text-white/72">
                                    {mapItem.status === "downloading" ? "1.3 GB" : "1.1 GB"} /{" "}
                                    {mapItem.sizeGb.toFixed(1)} GB
                                  </span>
                                </div>
                                <p
                                  className={`text-sm font-semibold ${
                                    isActiveDownload ? "text-white" : "text-[#f5b400]"
                                  }`}
                                >
                                  {isActiveDownload
                                    ? `Downloading... ${mapItem.progress}%`
                                    : "Paused"}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-2 lg:justify-end">
                            {mapItem.status === "available" ? (
                              <button
                                type="button"
                                className="rounded-md border border-[#f5b400]/65 px-5 py-2.5 text-sm font-bold text-[#f5b400] transition hover:bg-[#f5b400]/10"
                              >
                                Open Map
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  setPausedMaps((current) => ({
                                    ...current,
                                    [mapItem.id]: !isPaused,
                                  }))
                                }
                                className="grid h-12 w-12 place-items-center rounded-md border border-[#f5b400]/75 text-[#f5b400] transition hover:bg-[#f5b400]/10"
                                aria-label={isPaused ? "Resume download" : "Pause download"}
                              >
                                {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                              </button>
                            )}
                            <button
                              type="button"
                              aria-label={`More actions for ${mapItem.name}`}
                              className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10"
                            >
                              <MoreVertical className="h-5 w-5" />
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-white/10 p-5 md:p-7">
                  <div className="mb-4 flex items-center justify-between">
                    <SectionTitle>Recommended for You</SectionTitle>
                    <button type="button" className="text-sm font-semibold text-[#f5b400]">
                      View All
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                    {recommendedMaps.map((item) => (
                      <article
                        key={item.id}
                        className="rounded-lg border border-white/10 bg-[#07131b]/62 p-5 transition hover:border-[#f5b400]/40"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-base font-semibold text-white">{item.name}</h3>
                            <p className="mt-2 text-sm text-white/72">{item.mapType}</p>
                            <p className="mt-2 text-sm text-white/86">
                              {item.sizeGb.toFixed(1)} GB
                            </p>
                          </div>
                          <button
                            type="button"
                            aria-label={`Download ${item.name}`}
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-[#f5b400] transition hover:bg-[#f5b400]/10"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </Panel>
            </section>

            <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
              <Panel className="p-5">
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="text-sm font-extrabold uppercase text-[#f5b400]">
                    Download Queue
                  </h2>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white/70">
                    2
                  </span>
                </div>
                <div className="space-y-4">
                  {downloadQueue.map((item) => (
                    <article
                      key={item.id}
                        className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4 border-b border-white/8 pb-4 last:border-0 last:pb-0 2xl:grid-cols-[72px_minmax(0,1fr)_auto]"
                    >
                      <div
                        className="min-h-[64px] rounded-md bg-cover bg-center 2xl:min-h-[72px]"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-white">{item.name}</h3>
                        <p className="mt-1 text-sm text-white/76">
                          {item.mapType} <span className="mx-2">•</span> {item.sizeGb.toFixed(1)} GB
                        </p>
                        <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3">
                          <ProgressBar value={item.progress} />
                          <span className="text-xs tabular-nums text-white/78">
                            {item.progress}%
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name} from queue`}
                        className="text-white/75 transition hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </article>
                  ))}
                </div>
              </Panel>

              <Panel className="p-5">
                <h2 className="mb-4 flex items-center gap-3 text-sm font-extrabold uppercase text-[#f5b400]">
                  <Settings className="h-5 w-5 text-white/70" />
                  Sync Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">Auto-sync when online</p>
                      <p className="text-sm text-white/65">Keep your offline content up to date</p>
                    </div>
                    <Toggle
                      enabled={autoSync}
                      onClick={() => setAutoSync((value) => !value)}
                      label="Toggle auto-sync when online"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-4">
                    <div>
                      <p className="font-medium text-white">Wi-Fi only</p>
                      <p className="text-sm text-white/65">Download using Wi-Fi only</p>
                    </div>
                    <Toggle
                      enabled={wifiOnly}
                      onClick={() => setWifiOnly((value) => !value)}
                      label="Toggle Wi-Fi only downloads"
                    />
                  </div>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 border-t border-white/8 pt-4 text-left"
                  >
                    <div>
                      <p className="font-medium text-white">Auto-delete old content</p>
                      <p className="text-sm text-white/65">Remove unused downloads</p>
                    </div>
                    <span className="flex items-center gap-2 whitespace-nowrap font-medium text-white">
                      30 days <ChevronRight className="h-4 w-4 text-white/55" />
                    </span>
                  </button>
                </div>
              </Panel>

              <Panel className="p-5">
                <h2 className="mb-5 text-sm font-extrabold uppercase text-[#f5b400]">
                  Offline Content
                </h2>
                <div className="space-y-3">
                  {offlineContent.map(({ label, value, icon: Icon }) => (
                    <button
                      key={label}
                      type="button"
                      className="grid w-full grid-cols-[1fr_auto_auto] items-center gap-4 text-left text-white/84"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-white/80" />
                        {label}
                      </span>
                      <span className="font-medium tabular-nums text-white/88">{value}</span>
                      <ChevronRight className="h-4 w-4 text-white/45" />
                    </button>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-[1fr_auto] border-t border-white/10 pt-4 font-extrabold text-white">
                  <span>Total</span>
                  <span>12.4 GB</span>
                </div>
              </Panel>

              <Panel className="p-5">
                <h2 className="mb-3 flex items-center gap-3 text-sm font-extrabold uppercase text-[#f5b400]">
                  <Lightbulb className="h-5 w-5" />
                  Tips for Offline Travel
                </h2>
                <p className="pl-8 text-sm leading-6 text-white/74">
                  Download maps and guides before your trip and turn on offline mode to save data
                  and stay prepared anywhere.
                </p>
                <button
                  type="button"
                  className="mt-5 flex items-center gap-3 pl-8 text-sm font-bold text-[#f5b400]"
                >
                  View Offline Guide <ChevronRight className="h-4 w-4" />
                </button>
              </Panel>
            </aside>
          </div>

          <Panel className="mt-5 p-5">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {benefits.map(({ title, text, icon: Icon }, index) => (
                <article
                  key={title}
                  className={`flex items-center gap-5 xl:border-r xl:border-white/10 xl:last:border-r-0 ${
                    index > 0 ? "xl:pl-10" : ""
                  }`}
                >
                  <Icon className="h-10 w-10 shrink-0 text-[#f5b400]" strokeWidth={1.8} />
                  <div>
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-white/70">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}

export const offlineAccessData = {
  offline_maps: offlineMaps,
  offline_guides: [],
  downloaded_trips: [],
  saved_routes: [],
  download_queue: downloadQueue,
  sync_settings: {
    auto_sync_when_online: true,
    wifi_only: true,
    auto_delete_old_content_days: 30,
  },
  storage_usage: {
    used_gb: 12.4,
    total_gb: 32,
    categories: storageUsage,
  },
};
