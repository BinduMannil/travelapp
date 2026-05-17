"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  BadgeDollarSign,
  Camera,
  ChevronRight,
  Compass,
  Crosshair,
  Gem,
  Hotel,
  Landmark,
  MapPin,
  Martini,
  Plane,
  Plus,
  ReceiptText,
  Route,
  Save,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Train,
  Upload,
  Utensils,
  X,
} from "lucide-react";

type FieldCategory = {
  id: string;
  label: string;
  icon: typeof AlertTriangle;
  tone: string;
};

type Severity = "Low" | "Medium" | "High" | "Critical";

type CapturedImage = {
  id: string;
  name: string;
  url: string;
};

type GpsPoint = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

type FieldNoteDraft = {
  id: string;
  createdAt: string;
  title: string;
  note: string;
  category: string;
  country: string;
  city: string;
  neighborhood: string;
  severity: Severity;
  imageNames: string[];
  gps?: GpsPoint | null;
};

const STORAGE_KEY = "journee.internal.fieldNotes.v1";

const CATEGORIES: FieldCategory[] = [
  { id: "recommendation", label: "Recommendation", icon: Sparkles, tone: "from-emerald-300/24 to-white/[0.04]" },
  { id: "warning", label: "Warning", icon: AlertTriangle, tone: "from-amber-300/26 to-white/[0.04]" },
  { id: "scam", label: "Scam", icon: ShieldAlert, tone: "from-red-400/24 to-white/[0.04]" },
  { id: "police-authority", label: "Police / Authority", icon: Landmark, tone: "from-sky-300/22 to-white/[0.04]" },
  { id: "transport", label: "Transport", icon: Train, tone: "from-blue-300/24 to-white/[0.04]" },
  { id: "payments", label: "Payments", icon: BadgeDollarSign, tone: "from-lime-300/22 to-white/[0.04]" },
  { id: "nightlife", label: "Nightlife", icon: Martini, tone: "from-fuchsia-300/22 to-white/[0.04]" },
  { id: "hidden-gem", label: "Hidden Gem", icon: Gem, tone: "from-kintsugi-300/30 to-white/[0.04]" },
  { id: "restaurant", label: "Restaurant", icon: Utensils, tone: "from-orange-300/24 to-white/[0.04]" },
  { id: "hotel", label: "Hotel", icon: Hotel, tone: "from-violet-300/20 to-white/[0.04]" },
  { id: "airport", label: "Airport", icon: Plane, tone: "from-cyan-300/20 to-white/[0.04]" },
  { id: "customs", label: "Customs", icon: ReceiptText, tone: "from-stone-200/18 to-white/[0.04]" },
  { id: "apps", label: "Apps", icon: Smartphone, tone: "from-teal-300/20 to-white/[0.04]" },
  { id: "prices", label: "Prices", icon: BadgeDollarSign, tone: "from-yellow-300/24 to-white/[0.04]" },
];

const SEVERITIES: Severity[] = ["Low", "Medium", "High", "Critical"];

const QUICK_LOCATIONS = [
  { country: "Japan", city: "Tokyo", neighborhood: "Shinjuku" },
  { country: "Japan", city: "Tokyo", neighborhood: "Ginza" },
  { country: "Japan", city: "Tokyo", neighborhood: "Shibuya" },
  { country: "Vietnam", city: "Ho Chi Minh City", neighborhood: "District 1" },
];

function makeDraftId() {
  return `field-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatGps(gps: GpsPoint) {
  return `${gps.latitude.toFixed(5)}, ${gps.longitude.toFixed(5)} +/- ${Math.round(gps.accuracy)}m`;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-amber-200/80">
      {children}
    </label>
  );
}

export function FieldNotesCapture() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [country, setCountry] = useState("Japan");
  const [city, setCity] = useState("Tokyo");
  const [neighborhood, setNeighborhood] = useState("");
  const [severity, setSeverity] = useState<Severity>("Low");
  const [images, setImages] = useState<CapturedImage[]>([]);
  const [gps, setGps] = useState<GpsPoint | null>(null);
  const [gpsStatus, setGpsStatus] = useState("GPS optional");
  const [drafts, setDrafts] = useState<FieldNoteDraft[]>([]);
  const [savedMessage, setSavedMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeCategory = useMemo(
    () => CATEGORIES.find((category) => category.id === categoryId) ?? CATEGORIES[0],
    [categoryId],
  );
  const ActiveIcon = activeCategory.icon;
  const canSave = title.trim().length > 0 || note.trim().length > 0;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setDrafts(JSON.parse(raw) as FieldNoteDraft[]);
    } catch {
      setDrafts([]);
    }
  }, []);

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [images]);

  function clearForm() {
    setTitle("");
    setNote("");
    setCategoryId(CATEGORIES[0].id);
    setSeverity("Low");
    setNeighborhood("");
    setGps(null);
    setGpsStatus("GPS optional");
    setImages((current) => {
      current.forEach((image) => URL.revokeObjectURL(image.url));
      return [];
    });
  }

  function saveDraft() {
    if (!canSave) return;

    const nextDraft: FieldNoteDraft = {
      id: makeDraftId(),
      createdAt: new Date().toISOString(),
      title: title.trim() || activeCategory.label,
      note: note.trim(),
      category: activeCategory.label,
      country: country.trim(),
      city: city.trim(),
      neighborhood: neighborhood.trim(),
      severity,
      imageNames: images.map((image) => image.name),
      gps,
    };

    const nextDrafts = [nextDraft, ...drafts].slice(0, 40);
    setDrafts(nextDrafts);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
    setSavedMessage("Saved locally. Ready for the next observation.");
    window.setTimeout(() => setSavedMessage(""), 2600);
    clearForm();
  }

  function handleImages(files: FileList | null) {
    if (!files?.length) return;
    const nextImages = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 4)
      .map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        url: URL.createObjectURL(file),
      }));

    setImages((current) => [...current, ...nextImages].slice(0, 4));
  }

  function removeImage(id: string) {
    setImages((current) => {
      const target = current.find((image) => image.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return current.filter((image) => image.id !== id);
    });
  }

  function captureGps() {
    if (!navigator.geolocation) {
      setGpsStatus("GPS unavailable on this device");
      return;
    }

    setGpsStatus("Getting location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGps({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setGpsStatus("GPS attached");
      },
      () => {
        setGpsStatus("GPS skipped");
      },
      { enableHighAccuracy: true, maximumAge: 60000, timeout: 8000 },
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-stone-50">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-32 pt-4">
        <header className="sticky top-0 z-30 -mx-4 border-b border-white/10 bg-[#050505]/95 px-4 pb-4 pt-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.12em] text-amber-200/75">
                Journee Internal
              </p>
              <h1 className="mt-1 font-sans text-3xl font-black leading-none text-white">
                Field Notes
              </h1>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-200/25 bg-amber-200/10 text-amber-100">
              <Compass size={22} />
            </div>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-300">
            Private capture for real-world travel intelligence. Fast notes now,
            review and promote later.
          </p>
        </header>

        {savedMessage ? (
          <div className="mt-4 rounded-2xl border border-emerald-300/30 bg-emerald-400/12 px-4 py-3 text-sm font-bold text-emerald-100">
            {savedMessage}
          </div>
        ) : null}

        <section className="mt-5 rounded-[1.75rem] border border-white/12 bg-[radial-gradient(circle_at_20%_0%,rgba(245,197,107,.16),transparent_34%),linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.03)),#11100f] p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/12 bg-black/40 text-amber-100">
              <ActiveIcon size={24} />
            </div>
            <div className="min-w-0 flex-1">
              <FieldLabel>Capture</FieldLabel>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Title, place, or moment"
                className="mt-2 min-h-14 w-full rounded-2xl border border-white/12 bg-black/35 px-4 text-lg font-bold text-white outline-none placeholder:text-stone-500 focus:border-amber-200"
              />
            </div>
          </div>

          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Quick note. What happened? What should Journee remember?"
            className="mt-3 min-h-36 w-full resize-y rounded-2xl border border-white/12 bg-black/35 p-4 text-base leading-7 text-white outline-none placeholder:text-stone-500 focus:border-amber-200"
          />

          <div className="mt-4">
            <FieldLabel>Category</FieldLabel>
            <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                const selected = category.id === categoryId;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setCategoryId(category.id)}
                    className={`flex min-h-14 shrink-0 items-center gap-2 rounded-2xl border px-4 text-sm font-black transition active:scale-[0.98] ${
                      selected
                        ? "border-amber-200 bg-amber-200 text-black shadow-[0_16px_38px_rgba(245,197,107,.2)]"
                        : `border-white/12 bg-gradient-to-br ${category.tone} text-stone-100`
                    }`}
                  >
                    <Icon size={18} />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[1.5rem] border border-white/12 bg-white/[0.045] p-4">
          <div className="flex items-center justify-between gap-3">
            <FieldLabel>Location</FieldLabel>
            <button
              type="button"
              onClick={captureGps}
              className="flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 text-xs font-black uppercase tracking-[0.12em] text-stone-100 active:scale-[0.98]"
            >
              <Crosshair size={15} />
              {gps ? "GPS On" : "Attach GPS"}
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <input
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              placeholder="Country"
              className="min-h-[3.25rem] rounded-2xl border border-white/12 bg-black/35 px-4 text-base text-white outline-none placeholder:text-stone-500 focus:border-amber-200"
            />
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="City"
              className="min-h-[3.25rem] rounded-2xl border border-white/12 bg-black/35 px-4 text-base text-white outline-none placeholder:text-stone-500 focus:border-amber-200"
            />
          </div>
          <input
            value={neighborhood}
            onChange={(event) => setNeighborhood(event.target.value)}
            placeholder="Neighborhood, station, terminal, or area"
            className="mt-3 min-h-[3.25rem] w-full rounded-2xl border border-white/12 bg-black/35 px-4 text-base text-white outline-none placeholder:text-stone-500 focus:border-amber-200"
          />

          <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
            {QUICK_LOCATIONS.map((location) => (
              <button
                key={`${location.country}-${location.city}-${location.neighborhood}`}
                type="button"
                onClick={() => {
                  setCountry(location.country);
                  setCity(location.city);
                  setNeighborhood(location.neighborhood);
                }}
                className="min-h-11 shrink-0 rounded-full border border-white/12 bg-white/[0.06] px-4 text-sm font-bold text-stone-100 active:scale-[0.98]"
              >
                {location.city} / {location.neighborhood}
              </button>
            ))}
          </div>

          <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-stone-400">
            <MapPin size={14} />
            {gps ? formatGps(gps) : gpsStatus}
          </p>
        </section>

        <section className="mt-4 rounded-[1.5rem] border border-white/12 bg-white/[0.045] p-4">
          <FieldLabel>Severity</FieldLabel>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {SEVERITIES.map((item) => {
              const selected = item === severity;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSeverity(item)}
                  className={`min-h-12 rounded-2xl border px-2 text-sm font-black transition active:scale-[0.98] ${
                    selected
                      ? "border-amber-200 bg-amber-200 text-black"
                      : "border-white/12 bg-black/30 text-stone-100"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-4 rounded-[1.5rem] border border-white/12 bg-white/[0.045] p-4">
          <div className="flex items-center justify-between gap-3">
            <FieldLabel>Evidence</FieldLabel>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-xs font-black uppercase tracking-[0.12em] text-black active:scale-[0.98]"
            >
              <Upload size={15} />
              Add Image
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => handleImages(event.target.files)}
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/18 bg-black/28 text-sm font-bold text-stone-200 active:scale-[0.98]"
            >
              <Camera size={24} />
              Photo or Screenshot
            </button>
            {images.map((image) => (
              <div key={image.id} className="relative min-h-28 overflow-hidden rounded-2xl border border-white/12 bg-black">
                <div
                  className="h-full min-h-28 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${image.url})` }}
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-black/75 text-white"
                  aria-label={`Remove ${image.name}`}
                >
                  <X size={17} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[1.5rem] border border-white/12 bg-black/35 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <FieldLabel>Local Queue</FieldLabel>
              <p className="mt-1 text-sm text-stone-400">
                {drafts.length} private draft{drafts.length === 1 ? "" : "s"} on this device.
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.06]">
              <ReceiptText size={19} />
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {drafts.slice(0, 5).map((draft) => (
              <article key={draft.id} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.12em] text-amber-200/70">
                      {draft.category} / {draft.severity}
                    </p>
                    <h2 className="mt-1 text-base font-black text-white">{draft.title}</h2>
                  </div>
                  <ChevronRight className="mt-1 text-stone-500" size={18} />
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-300 line-clamp-2">
                  {draft.note || "No extra note added."}
                </p>
                <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-stone-500">
                  <Route size={14} />
                  {[draft.country, draft.city, draft.neighborhood].filter(Boolean).join(" / ")}
                </p>
              </article>
            ))}
            {!drafts.length ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-stone-300">
                Nothing saved yet. Capture a title or note, then hit quick save.
              </div>
            ) : null}
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050505]/96 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto grid max-w-3xl grid-cols-[1fr_auto] gap-3">
            <button
              type="button"
              onClick={saveDraft}
              disabled={!canSave}
              className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-amber-200 px-5 text-sm font-black uppercase tracking-[0.12em] text-black shadow-[0_18px_42px_rgba(245,197,107,.18)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400"
            >
              <Save size={18} />
              Quick Save
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="grid min-h-14 min-w-14 place-items-center rounded-2xl border border-white/12 bg-white/[0.06] text-white active:scale-[0.98]"
              aria-label="Clear field note"
            >
              <Plus className="rotate-45" size={22} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
