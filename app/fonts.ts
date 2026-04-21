import { Fraunces, Italianno, Montserrat, Noto_Serif_JP } from "next/font/google";

// Montserrat — clean geometric sans. The everyday workhorse for body,
// cards, UI, numbers.
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Fraunces — a modern, expressive display serif (the Maglite-style
// aesthetic: high-contrast strokes, swash tails on g/y/Q, generous
// ligatures). Multi-weight static loading so every weight is reliably
// available server-side without variable-axis surprises.
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// Italianno — elegant signature-style script for hand-drawn accent
// flourishes ("hello", "updated"). Opt-in via `font-script`.
export const italianno = Italianno({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: "400",
});

// Noto Serif JP — only kept so kanji characters (旅, 東京, 食) that
// neither Montserrat nor Playfair can render fall through to a
// well-crafted Japanese face instead of a system default.
export const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-jp-serif",
  display: "swap",
  weight: ["400", "700"],
});
