import { Montserrat } from "next/font/google";

// Montserrat is the single JOURNEE type family across navigation, heroes,
// cards, dashboards, maps, charts, sidebars, buttons, filters, and labels.
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});
