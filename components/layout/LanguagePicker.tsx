"use client";

import { useEffect, useState } from "react";

type Lang = { code: string; label: string; native: string };

// Top languages travellers to Japan are likely to want, with English as the
// source. Order = "most likely to be picked first".
const LANGUAGES: Lang[] = [
  { code: "en", label: "English", native: "English" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "zh-CN", label: "Chinese (Simplified)", native: "简体中文" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ru", label: "Russian", native: "Русский" },
];

const STORAGE_KEY = "journee.lang";

export function LanguagePicker() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("en");
  const [warnLocal, setWarnLocal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setCurrent(saved);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];

  function pick(lang: Lang) {
    setOpen(false);
    setCurrent(lang.code);
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, lang.code);

    // English = no translation, just stay
    if (lang.code === "en") return;

    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (isLocal) {
      setWarnLocal(true);
      setTimeout(() => setWarnLocal(false), 4000);
      return;
    }

    // Production: route through Google Translate so we get an instant
    // translation today; replace with proper next-intl when content is
    // ready to localise natively.
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://translate.google.com/translate?sl=en&tl=${lang.code}&u=${url}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-sumi-100 bg-white/70 px-2.5 py-1 text-xs font-medium text-sumi-800 transition hover:border-enji-400 hover:text-enji-700"
      >
        <span aria-hidden>🌐</span>
        <span className="font-display tracking-wide">
          {currentLang.code.toUpperCase()}
        </span>
        <span className="text-sumi-700">▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-washi-200 bg-white shadow-xl"
        >
          <div className="border-b border-washi-200 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-sumi-700">
            Translate the site
          </div>
          <ul className="max-h-72 overflow-y-auto py-1">
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => pick(l)}
                  className={`flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-xs transition hover:bg-washi-100 ${
                    l.code === current ? "bg-washi-100 font-semibold" : ""
                  }`}
                >
                  <span className="text-sumi-900">{l.native}</span>
                  <span className="text-[10px] uppercase tracking-wider text-sumi-700">
                    {l.code}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-washi-200 bg-washi-50 px-3 py-2 text-[10px] leading-snug text-sumi-700">
            Day-1 translation via Google Translate. Native localisation rolls
            out in our next release.
          </div>
        </div>
      )}

      {warnLocal && (
        <div className="absolute right-0 mt-2 w-64 rounded-md border border-amber-300 bg-amber-50 p-2 text-[11px] text-amber-900 shadow-lg">
          Translation only works on the live site. Try it once we&rsquo;re
          deployed at journee-app.com.
        </div>
      )}
    </div>
  );
}
