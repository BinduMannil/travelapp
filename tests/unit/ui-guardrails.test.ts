import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { APP_CONTENT_FRAME_CLASS } from "@/components/layout/AppContentFrame";
import {
  DESTINATION_CARD_CLASS,
  DESTINATION_PAGE_FRAME_CLASS,
  DESTINATION_SAFE_GRID_CLASS,
} from "@/components/destinations/DestinationPageFrame";
import {
  MAP_CONTROL_BAR_CLASS,
  MAP_CONTROL_ITEM_CLASS,
  MAP_PREVIEW_CARD_CLASS,
  MAP_ROUTE_BADGE_CLASS,
} from "@/components/maps/MapOverlayFrame";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";

const readSource = (relativePath: string) =>
  readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("Journee UI guardrails", () => {
  it("locks AppContentFrame overflow protection", () => {
    expect(APP_CONTENT_FRAME_CLASS).toContain("overflow-x-hidden");
    expect(APP_CONTENT_FRAME_CLASS).toContain("min-w-0");
    expect(APP_CONTENT_FRAME_CLASS).toContain("max-w-full");
    expect(APP_CONTENT_FRAME_CLASS).toContain("box-border");
  });

  it("locks DestinationPageFrame spacing and width protection", () => {
    expect(DESTINATION_PAGE_FRAME_CLASS).toContain("max-w-[1440px]");
    expect(DESTINATION_PAGE_FRAME_CLASS).toContain("mx-auto");
    expect(DESTINATION_PAGE_FRAME_CLASS).toContain("px-4");
    expect(DESTINATION_PAGE_FRAME_CLASS).toContain("lg:px-10");
    expect(DESTINATION_PAGE_FRAME_CLASS).toContain("xl:px-14");
    expect(DESTINATION_SAFE_GRID_CLASS).toContain("min-w-0");
    expect(DESTINATION_CARD_CLASS).toContain("max-w-full");
  });

  it("locks map overlay spacing and non-cramped controls", () => {
    expect(MAP_PREVIEW_CARD_CLASS).toContain("lg:left-10");
    expect(MAP_PREVIEW_CARD_CLASS).toContain("lg:top-10");
    expect(MAP_PREVIEW_CARD_CLASS).toContain("max-w-[360px]");
    expect(MAP_ROUTE_BADGE_CLASS).toContain("lg:right-10");
    expect(MAP_CONTROL_BAR_CLASS).toContain("overflow-x-auto");
    expect(MAP_CONTROL_BAR_CLASS).toContain("max-w-[calc(100vw-80px)]");
    expect(MAP_CONTROL_ITEM_CLASS).toContain("min-w-[120px]");
    expect(MAP_CONTROL_ITEM_CLASS).toContain("py-[18px]");
    expect(MAP_CONTROL_ITEM_CLASS).toContain("px-6");
  });

  it("formats shared SearchSuggestions labels for display", () => {
    const html = renderToStaticMarkup(
      createElement(SearchSuggestions, {
        suggestions: [
          "safe cities for solo female travelers",
          "best places to visit in Japan",
          "ai travel planner",
        ],
      }),
    );

    expect(html).toContain("Safe Cities for Solo Female Travelers");
    expect(html).toContain("Best Places to Visit in Japan");
    expect(html).toContain("AI Travel Planner");
  });

  it("locks homepage cinematic hero timing and hidden rotation behavior", () => {
    const source = readSource("components/home/JourneeWebExperience.tsx");

    expect(source).toContain("}, 60000);");
    expect(source).toContain("motion-safe:animate-[journeeSceneText_3.2s_ease_both]");
    expect(source).toContain("transition: opacity 3200ms cubic-bezier(.19,1,.22,1);");
    expect(source).toContain('imageClassName="journee-hero-image"');
    expect(source).toContain('overlayTone="rich"');

    const activeSlideSetters = source.match(/setActiveSlide/g) ?? [];
    expect(activeSlideSetters).toHaveLength(2);
  });

  it("locks homepage atmosphere layers and reduced-motion support", () => {
    const source = readSource("components/home/JourneeWebExperience.tsx");

    expect(source).toContain("function HeroSceneColorLayers");
    expect(source).toContain("function HeroAtmosphereLayers");
    expect(source).toContain("<HeroSceneColorLayers atmosphere={activeAtmosphere} />");
    expect(source).toContain("<HeroAtmosphereLayers atmosphere={activeAtmosphere} />");
    expect(source).toContain("@media (prefers-reduced-motion: reduce)");

    for (const atmosphere of [
      "aurora",
      "sakura",
      "lantern",
      "dust",
      "rain",
      "ocean",
      "desert",
      "snow",
      "city",
      "garden",
    ]) {
      expect(source).toContain(`"${atmosphere}"`);
    }
  });

  it("locks the homepage hero visible slideshow UI ban", () => {
    const source = readSource("components/home/JourneeWebExperience.tsx");
    const bannedPatterns = [
      /aria-label=["']Next slide/i,
      /aria-label=["']Previous slide/i,
      /aria-label=["']Pause slideshow/i,
      /aria-label=["']Play slideshow/i,
      /slide counter/i,
      /progress indicator/i,
      /pagination dots/i,
    ];

    for (const pattern of bannedPatterns) {
      expect(source).not.toMatch(pattern);
    }
  });

  it("locks CinematicBackground cross-fade and image treatment", () => {
    const source = readSource("components/visual/CinematicBackground.tsx");

    expect(source).toContain("duration-[3200ms]");
    expect(source).toContain("motion-reduce:transition-none");
    expect(source).toContain("motion-safe:animate-[journeeCinematicDrift_36s_ease-in-out_infinite]");
    expect(source).toContain("object-cover");
    expect(source).toContain("opacity-0");
    expect(source).toContain("opacity-100");
  });
});
