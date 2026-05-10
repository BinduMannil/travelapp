export type DestinationIdentity = {
  slug: string;
  label: string;
  mood: string;
  typographyMood: string;
  texture: string;
  motion: {
    system: "sakura-neon" | "aurora-snow" | "lantern-fog" | "desert-haze" | "jungle-mist";
    intensity: "quiet" | "medium";
  };
  colors: {
    ink: string;
    ground: string;
    panel: string;
    ivory: string;
    accent: string;
    accentSoft: string;
    secondary: string;
    tertiary: string;
  };
  chartPalette: string[];
  accents: {
    glyph: string;
    line: string;
  };
};

const DESTINATION_IDENTITIES: Record<string, DestinationIdentity> = {
  global: {
    slug: "global",
    label: "World atlas / cinematic neutral",
    mood: "Open horizons, layered climates, cities, coastlines and cultural depth.",
    typographyMood:
      "Large editorial statements balanced with quiet utility, built for comparing very different places.",
    texture:
      "linear-gradient(120deg, rgba(255,255,255,.06) 0 1px, transparent 1px 18px), radial-gradient(circle at 14% 10%, rgba(95,150,165,.22), transparent 34%), radial-gradient(circle at 86% 20%, rgba(210,165,82,.18), transparent 32%), radial-gradient(circle at 55% 92%, rgba(118,74,52,.18), transparent 34%)",
    motion: {
      system: "jungle-mist",
      intensity: "quiet",
    },
    colors: {
      ink: "#090b0b",
      ground: "#101313",
      panel: "rgba(9, 12, 12, 0.62)",
      ivory: "#f4efe5",
      accent: "#d1aa63",
      accentSoft: "#ead6a4",
      secondary: "#5f96a5",
      tertiary: "#315b51",
    },
    chartPalette: ["#d1aa63", "#5f96a5", "#315b51", "#f4efe5", "#9b6b4a", "#7c8f7c"],
    accents: {
      glyph: "◌",
      line: "World register",
    },
  },
  tokyo: {
    slug: "tokyo",
    label: "Lacquer noir / neon ivory",
    mood: "Ceremonial calm, electric afterglow, precise urban rhythm.",
    typographyMood:
      "Compact editorial display type, generous vertical pause, and small-letter spacing inspired by Japanese print rhythm.",
    texture:
      "linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 12px), radial-gradient(circle at 18% 12%, rgba(230,185,85,.18), transparent 34%), radial-gradient(circle at 88% 22%, rgba(236,47,98,.16), transparent 30%)",
    motion: {
      system: "sakura-neon",
      intensity: "quiet",
    },
    colors: {
      ink: "#090807",
      ground: "#11100e",
      panel: "rgba(7, 7, 8, 0.58)",
      ivory: "#f5efe4",
      accent: "#d8ad4f",
      accentSoft: "#f1d99c",
      secondary: "#e53666",
      tertiary: "#2ac7c9",
    },
    chartPalette: ["#d8ad4f", "#e53666", "#2ac7c9", "#f5efe4", "#8d1c30", "#62707a"],
    accents: {
      glyph: "東",
      line: "Tokyo signal",
    },
  },
  japan: {
    slug: "japan",
    label: "Sumi ink / washi / kintsugi",
    mood: "Restraint, seasonality, craft, quiet ritual.",
    typographyMood:
      "Elegant serif scale, narrow uppercase captions, and measured spacing that keeps the page calm.",
    texture:
      "linear-gradient(90deg, rgba(255,255,255,.06) 0 1px, transparent 1px 18px), radial-gradient(circle at 20% 0%, rgba(214,50,73,.16), transparent 32%), radial-gradient(circle at 80% 20%, rgba(216,173,79,.18), transparent 34%)",
    motion: {
      system: "sakura-neon",
      intensity: "quiet",
    },
    colors: {
      ink: "#0d0b0a",
      ground: "#151210",
      panel: "rgba(12, 10, 9, 0.62)",
      ivory: "#f6efe3",
      accent: "#d3a144",
      accentSoft: "#ead097",
      secondary: "#b6243a",
      tertiary: "#315f72",
    },
    chartPalette: ["#d3a144", "#b6243a", "#315f72", "#f6efe3", "#8b6d45", "#5f6c55"],
    accents: {
      glyph: "日",
      line: "Country cadence",
    },
  },
  norway: {
    slug: "norway",
    label: "Glacier / pine / northern air",
    mood: "Wide horizons, mineral light, quiet precision.",
    typographyMood: "Open spacing, crisp titles, and cool understated captions.",
    texture:
      "linear-gradient(135deg, rgba(255,255,255,.08) 0 1px, transparent 1px 16px), radial-gradient(circle at 15% 10%, rgba(145,202,215,.2), transparent 30%)",
    motion: {
      system: "aurora-snow",
      intensity: "quiet",
    },
    colors: {
      ink: "#071113",
      ground: "#0d1b1d",
      panel: "rgba(9, 24, 27, 0.6)",
      ivory: "#eff7f4",
      accent: "#9ad3df",
      accentSoft: "#c9e8ed",
      secondary: "#1f5b50",
      tertiary: "#d8c48c",
    },
    chartPalette: ["#9ad3df", "#1f5b50", "#eff7f4", "#d8c48c", "#547784", "#b9d3c8"],
    accents: {
      glyph: "N",
      line: "Northern register",
    },
  },
  marrakech: {
    slug: "marrakech",
    label: "Terracotta / brass / dusk rose",
    mood: "Warm stone, brass detail, courtyards, shade and spice.",
    typographyMood: "Serif warmth with script-like pacing, kept readable and refined.",
    texture:
      "linear-gradient(135deg, rgba(255,236,198,.08) 0 1px, transparent 1px 13px), radial-gradient(circle at 20% 20%, rgba(196,93,53,.24), transparent 34%)",
    motion: {
      system: "desert-haze",
      intensity: "quiet",
    },
    colors: {
      ink: "#170d09",
      ground: "#24130d",
      panel: "rgba(36, 19, 13, 0.62)",
      ivory: "#f7ead7",
      accent: "#c89b4e",
      accentSoft: "#efd39d",
      secondary: "#b65a36",
      tertiary: "#315b51",
    },
    chartPalette: ["#c89b4e", "#b65a36", "#315b51", "#f7ead7", "#8e382b", "#d9a06e"],
    accents: {
      glyph: "م",
      line: "Medina glow",
    },
  },
};

export function getDestinationIdentity(slug: string, fallback = "japan") {
  return DESTINATION_IDENTITIES[slug] ?? DESTINATION_IDENTITIES[fallback];
}
