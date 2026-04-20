import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Japan-inspired palette.
        // Pick these tokens when you want country-rooted colour; keep
        // `brand` / Tailwind neutrals for chrome that should stay legible
        // across future countries too.
        sumi: {
          50: "#f6f5f2",
          100: "#e7e5e0",
          200: "#c7c2ba",
          700: "#3c3a36",
          900: "#1c1917",
        },
        washi: {
          50: "#fdfcf7",
          100: "#f6f3ec",
          200: "#ebe5d3",
          300: "#d9d0b6",
        },
        enji: {
          // Crimson — torii gates, Japanese flag, lacquerware
          50: "#fdf2f3",
          100: "#fbe2e5",
          500: "#b90c23",
          600: "#9a0b1d",
          700: "#7c0a18",
          900: "#460610",
        },
        aizome: {
          // Indigo dye
          50: "#eef2f7",
          100: "#d9e1ec",
          400: "#4b6789",
          500: "#2e4f73",
          600: "#1f3a5f",
          700: "#16293f",
          900: "#0a1525",
        },
        sakura: {
          50: "#fff5f7",
          100: "#fde7ed",
          200: "#f9cbd6",
          300: "#f3acb8",
          400: "#e88c9d",
        },
        matcha: {
          100: "#e1ebcf",
          400: "#9fba74",
          500: "#8faa64",
          600: "#6e8a49",
          700: "#4f6b30",
        },
        kintsugi: {
          // Gold leaf used in kintsugi joinery
          300: "#f1ce7f",
          400: "#eaba59",
          500: "#d5a400",
          600: "#a17d00",
        },
        // Keep the original brand scale as an alias so existing styles
        // don't break; tuned toward Japan aizome + sakura for now.
        brand: {
          50: "#eef2f7",
          100: "#d9e1ec",
          500: "#2e4f73",
          600: "#1f3a5f",
          700: "#16293f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      backgroundImage: {
        // Seigaiha — overlapping-wave motif. Classic traditional pattern.
        seigaiha:
          "radial-gradient(circle at 50% 100%, rgba(255,255,255,.18) 0, rgba(255,255,255,.18) 26%, transparent 27%), radial-gradient(circle at 0% 100%, rgba(255,255,255,.18) 0, rgba(255,255,255,.18) 26%, transparent 27%), radial-gradient(circle at 100% 100%, rgba(255,255,255,.18) 0, rgba(255,255,255,.18) 26%, transparent 27%)",
      },
      backgroundSize: {
        seigaiha: "48px 24px",
      },
    },
  },
  plugins: [],
} satisfies Config;
