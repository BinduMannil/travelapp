"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useConsent } from "@/lib/consent/context";

export function ConsentBanner() {
  const {
    consent,
    decided,
    acceptAll,
    rejectAll,
    setConsent,
    preferencesOpen,
    openPreferences,
    closePreferences,
  } = useConsent();

  const [draft, setDraft] = useState({
    analytics: consent.analytics,
    affiliate: consent.affiliate,
    personalization: consent.personalization,
  });
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preferencesOpen) return;

    setDraft({
      analytics: consent.analytics,
      affiliate: consent.affiliate,
      personalization: consent.personalization,
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closePreferences();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closePreferences, consent.affiliate, consent.analytics, consent.personalization, preferencesOpen]);

  // Nothing to show if the user already decided and the preferences modal isn't open
  if (decided && !preferencesOpen) return null;

  if (preferencesOpen) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-heading"
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#020506]/72 p-4 backdrop-blur-xl"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) closePreferences();
        }}
      >
        <div
          ref={dialogRef}
          className="max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/16 bg-[linear-gradient(145deg,rgba(18,19,17,0.98),rgba(39,31,22,0.96))] p-5 text-white shadow-2xl shadow-black/50 sm:p-6"
        >
          <h2
            id="consent-heading"
            className="font-sans text-xl font-semibold text-white"
          >
            Cookie preferences
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/66">
            We use cookies and similar tech for four purposes. You can accept
            all, reject all except the essentials, or pick per-category.
          </p>

          <ul className="mt-5 space-y-3">
            <Row
              title="Necessary cookies"
              body="Required for the site to work — session, security, preferences persistence. Always on."
              checked
              disabled
            />
            <Row
              title="Analytics"
              body="Anonymous aggregated stats (pages visited, clicks). Used to improve the product. EU-hosted."
              checked={draft.analytics}
              onChange={(v) => setDraft({ ...draft, analytics: v })}
            />
            <Row
              title="Affiliate cookies"
              body="Allows our outbound links (to Booking, Klook, etc.) to tag a partner referrer. No behavioural profiling; the tag is stripped if off."
              checked={draft.affiliate}
              onChange={(v) => setDraft({ ...draft, affiliate: v })}
            />
            <Row
              title="Personalization cookies"
              body="Remember your on-site travel preferences such as currency, temperature unit, distance unit, and saved interface choices."
              checked={draft.personalization}
              onChange={(v) => setDraft({ ...draft, personalization: v })}
            />
          </ul>

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={rejectAll}
              className="rounded-full border border-white/22 px-4 py-2 text-sm font-semibold text-white/82 transition hover:border-white/45 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f]"
            >
              Reject All
            </button>
            <button
              type="button"
              onClick={() => {
                setConsent({ status: "custom", ...draft });
              }}
              className="rounded-full border border-white/22 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-kintsugi-300 hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f]"
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-kintsugi-300 px-4 py-2 text-sm font-bold text-sumi-950 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f]"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-5xl rounded-[1.15rem] border border-white/18 bg-[linear-gradient(135deg,rgba(20,18,15,0.96),rgba(44,31,25,0.94))] p-3 text-white shadow-editorial-deep backdrop-blur-xl sm:bottom-4 sm:flex sm:items-center sm:gap-4 sm:p-4"
    >
      <div className="min-w-0 flex-1 text-xs leading-5 text-white/76 sm:text-[13px]">
        <strong className="font-semibold text-white">
          Cookies & affiliate disclosure.
        </strong>{" "}
        We remember preferences and tag outbound partner links. Nothing is
        personal or cross-site.{" "}
        <Link
          href="/privacy-policy"
          className="font-medium text-kintsugi-200 underline decoration-kintsugi-400/55 underline-offset-4 hover:text-white"
        >
          Privacy policy
        </Link>{" "}
        <span className="text-white/35">·</span>{" "}
        <Link
          href="/affiliate-disclosure"
          className="font-medium text-kintsugi-200 underline decoration-kintsugi-400/55 underline-offset-4 hover:text-white"
        >
          Affiliate disclosure
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-0 sm:flex sm:shrink-0 sm:items-center">
        <button
          type="button"
          onClick={rejectAll}
          className="inline-flex min-h-9 items-center justify-center rounded-full border border-white/22 px-4 text-xs font-semibold text-white/82 transition hover:border-white/45 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f]"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={openPreferences}
          className="inline-flex min-h-9 items-center justify-center rounded-full border border-white/22 bg-white/10 px-4 text-xs font-semibold text-white transition hover:border-kintsugi-300 hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f]"
        >
          Customise
        </button>
        <button
          type="button"
          onClick={acceptAll}
          className="inline-flex min-h-9 items-center justify-center rounded-full bg-kintsugi-300 px-4 text-xs font-bold text-sumi-950 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f]"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

function Row({
  title,
  body,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-white/12 bg-white/[0.045] p-4">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[#d8aa4f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aa4f] disabled:opacity-60"
        aria-label={title}
      />
      <div>
        <div className="font-semibold text-white">{title}</div>
        <p className="mt-0.5 text-xs leading-5 text-white/62">{body}</p>
      </div>
    </li>
  );
}
