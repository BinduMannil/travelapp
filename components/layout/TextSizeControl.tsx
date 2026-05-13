"use client";

import { useEffect, useState } from "react";

const LS_KEY = "journee:pref:text-scale";
const BASE_PX = 15; // matches html { font-size: 15px } in globals.css

const STEPS = [
  { value: 0.9, label: "Small" },
  { value: 1.0, label: "Default" },
  { value: 1.15, label: "Large" },
  { value: 1.3, label: "Extra large" },
] as const;

/**
 * Text-size adjuster — three-button A− A A+ widget that scales the
 * root font-size. Because everything in globals.css and the Tailwind
 * type scale is rem-based, this cascades through every page.
 *
 * The chosen scale persists in localStorage so the next visit honours
 * it. We apply the scale directly on the <html> element rather than
 * via state in PreferencesProvider so the change is instant and
 * doesn't require any consumer to re-render.
 */
export function TextSizeControl() {
  const [scale, setScale] = useState<number>(1);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = parseFloat(window.localStorage.getItem(LS_KEY) ?? "");
      if (!Number.isNaN(saved) && STEPS.some((s) => s.value === saved)) {
        applyScale(saved);
        setScale(saved);
      }
    } catch {
      /* noop — storage may be disabled */
    }
    setHydrated(true);
  }, []);

  function applyScale(s: number) {
    document.documentElement.style.fontSize = `${BASE_PX * s}px`;
    try {
      window.localStorage.setItem(LS_KEY, String(s));
    } catch {
      /* noop */
    }
  }

  function setStep(s: number) {
    setScale(s);
    applyScale(s);
  }

  function nudge(dir: 1 | -1) {
    const idx = STEPS.findIndex((s) => s.value === scale);
    const safeIdx = idx === -1 ? 1 : idx;
    const next = Math.max(0, Math.min(STEPS.length - 1, safeIdx + dir));
    setStep(STEPS[next].value);
  }

  if (!hydrated) return null;

  const currentLabel =
    STEPS.find((s) => s.value === scale)?.label ?? "Default";

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-sumi-100 bg-white/70 p-0.5 text-sumi-800"
      role="group"
      aria-label="Adjust text size"
    >
      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label="Decrease text size"
        title={`Smaller text (now: ${currentLabel})`}
        disabled={scale <= STEPS[0].value}
        className="grid h-6 w-6 place-items-center rounded-full text-xs font-semibold transition hover:bg-washi-100 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        A<span className="-ml-0.5 text-[8px]">−</span>
      </button>
      <button
        type="button"
        onClick={() => setStep(1)}
        aria-label="Reset text size"
        title="Reset to default text size"
        className={`grid h-6 w-6 place-items-center rounded-full text-sm font-semibold transition hover:bg-washi-100 ${
          scale === 1 ? "bg-washi-100" : ""
        }`}
      >
        A
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label="Increase text size"
        title={`Larger text (now: ${currentLabel})`}
        disabled={scale >= STEPS[STEPS.length - 1].value}
        className="grid h-6 w-6 place-items-center rounded-full text-base font-semibold transition hover:bg-washi-100 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        A<span className="-ml-0.5 text-[10px]">+</span>
      </button>
    </div>
  );
}
