import { Montserrat, Noto_Serif_JP } from "next/font/google";

// Montserrat — clean geometric sans for body copy and UI.
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Noto Serif JP — editorial serif that sits on Latin and Japanese characters
// equally well, so our kanji accents and English display type share a family.
export const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "700", "900"],
});
