import type { ExperienceDetailPageData } from "@/components/experience/ExperienceDetailBookingPage";
import {
  getAllCityDestinationSlugs,
  getCityDestinationPageData,
  type CityDestinationPageData,
} from "@/lib/city/city-destination-data";
import {
  getUniqueDestinationImage,
  inferImageCategoryFromText,
  resetUsedImagesForPage,
} from "@/lib/imageRotation";
import { routes, slugifyRouteSegment } from "@/lib/routes";

type HiddenGem = CityDestinationPageData["hiddenGems"][number];

export type HiddenGemExperience = {
  city: CityDestinationPageData;
  gem: HiddenGem;
  gemSlug: string;
  data: ExperienceDetailPageData;
};

const localTipTemplates = [
  "Go slowly, ask before photographing people, and keep this stop paired with one nearby cafe or walk rather than a packed checklist.",
  "Arrive with a flexible window. The best version of this place is usually found between planned moments.",
  "Use a trusted ride pickup point after dark, and save the exact area in your offline map before you leave.",
];

function bestTimeForGem(title: string) {
  const value = title.toLowerCase();
  if (value.includes("cocktail") || value.includes("bar")) return "After 8:00 PM";
  if (value.includes("coffee") || value.includes("market")) return "Early morning";
  if (value.includes("walk") || value.includes("canal")) return "Golden hour";
  if (value.includes("store") || value.includes("design")) return "Late morning";
  return "Late afternoon";
}

function experienceKind(title: string) {
  const value = title.toLowerCase();
  if (value.includes("cocktail") || value.includes("bar")) return "Hidden nightlife";
  if (value.includes("coffee")) return "Local cafe route";
  if (value.includes("market")) return "Market culture";
  if (value.includes("walk") || value.includes("canal")) return "Neighborhood walk";
  if (value.includes("store") || value.includes("design")) return "Design discovery";
  return "Local experience";
}

function countrySlugFromName(country: string) {
  return country.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildRelated(city: CityDestinationPageData, currentSlug: string) {
  return city.hiddenGems
    .map((gem) => ({
      title: gem.title,
      href: routes.cityHiddenGem(city.slug, slugifyRouteSegment(gem.title)),
      image: gem.image,
      meta: gem.place,
    }))
    .filter((item) => !item.href.endsWith(`/${currentSlug}`))
    .slice(0, 3);
}

function buildHiddenGemExperience(
  city: CityDestinationPageData,
  gem: HiddenGem,
): HiddenGemExperience {
  const gemSlug = slugifyRouteSegment(gem.title);
  const kind = experienceKind(gem.title);
  const bestTime = bestTimeForGem(gem.title);
  const nearbyPlaces = [
    gem.place,
    ...city.atlas.points.map((point) => point.name),
    ...city.hiddenGems.map((item) => item.place),
  ]
    .filter(Boolean)
    .filter((place, index, places) => places.indexOf(place) === index)
    .slice(0, 5);
  const localTips = [
    gem.copy,
    ...localTipTemplates,
  ].slice(0, 4);
  const usedImages = resetUsedImagesForPage();
  const countrySlug = countrySlugFromName(city.country);
  const heroImage = getUniqueDestinationImage({
    destinationSlug: city.slug,
    countrySlug,
    category: inferImageCategoryFromText(`${kind} ${gem.title} ${gem.place}`),
    preferredImage: gem.image,
    usedImages,
  });
  const galleryThumbnails = [
    { id: "city", src: city.images.hero, label: `${city.city} context` },
    { id: "why", src: city.why.image, label: `${city.city} atmosphere` },
    { id: "nearby", src: city.hiddenGems[1]?.image ?? gem.image, label: "Nearby gem" },
  ].map((image) => ({
    ...image,
    src: getUniqueDestinationImage({
      destinationSlug: city.slug,
      countrySlug,
      category: inferImageCategoryFromText(`${kind} ${image.label}`),
      preferredImage: image.src,
      usedImages,
    }),
  }));
  const relatedExperiences = buildRelated(city, gemSlug).map((item) => ({
    ...item,
    image: getUniqueDestinationImage({
      destinationSlug: city.slug,
      countrySlug,
      category: inferImageCategoryFromText(`${item.title} ${item.meta}`),
      preferredImage: item.image,
      usedImages,
    }),
  }));

  return {
    city,
    gem,
    gemSlug,
    data: {
      breadcrumbs: [
        { label: "Home", href: routes.home },
        { label: city.city, href: routes.city(city.slug) },
        { label: "Hidden Gems", href: routes.citySection(city.slug, "hidden-gems") },
        { label: gem.title },
      ],
      backHref: routes.city(city.slug),
      mapHref: routes.atlas(city.slug, gemSlug),
      relatedExperiences,
      experience: {
        id: `hidden_gem_${city.slug}_${gemSlug}`,
        slug: gemSlug,
        title: gem.title,
        city: city.city,
        country: city.country,
        rating: 4.8,
        reviewCount: 96,
        badge: "Hidden Gem Experience",
        description: `${gem.copy} A ${city.city} hidden gem in ${gem.place}, built for travelers who want a more local route.`,
        overview: `${gem.title} is a ${kind.toLowerCase()} in ${city.city}. Use it as a focused stop with time to wander nearby, notice the neighborhood rhythm, and connect it back into JOURNEE's Atlas map for food, culture, stays, transport, and adjacent discoveries.`,
        price: {
          currency: "USD",
          amount: 0,
          unit: "self-guided",
        },
        gallery: {
          hero: heroImage,
          thumbnails: galleryThumbnails,
          remainingPhotos: city.hiddenGems.length,
        },
        infoStrip: [
          { label: "Best Time", value: bestTime, helper: "Best time to go", icon: "clock" },
          { label: "Style", value: kind, helper: "Experience type", icon: "sparkles" },
          { label: "Route", value: gem.place, helper: "Neighborhood", icon: "mapPin" },
          { label: "Pace", value: "Self-guided", helper: "Flexible visit", icon: "navigation" },
        ],
        featureHighlights: [
          {
            title: "Why it matters",
            copy: `${gem.title} gives ${city.city} more texture than the obvious first-stop circuit.`,
            icon: "badgeCheck",
          },
          {
            title: "Local rhythm",
            copy: `The strongest version is around ${bestTime.toLowerCase()}, with room to linger nearby.`,
            icon: "clock",
          },
          {
            title: "Atlas connected",
            copy: "Open the map with this city and hidden gem already in context.",
            icon: "mapPin",
          },
          {
            title: "Nearby layers",
            copy: nearbyPlaces.slice(1, 3).join(" and ") || "Food, culture and transit sit close by.",
            icon: "navigation",
          },
        ],
        included: [
          "Short overview",
          `Neighborhood: ${gem.place}`,
          `Best time: ${bestTime}`,
          "Why it matters",
          ...localTips.map((tip) => `Local tip: ${tip}`),
          `Nearby places: ${nearbyPlaces.join(", ")}`,
        ],
        meetingPoint: {
          id: `meeting_${city.slug}_${gemSlug}`,
          title: gem.place,
          instructions: `Start around ${gem.place}, then use the Atlas link to connect this stop with nearby food, culture, stays, experiences, and transport.`,
          mapPreview: city.images.hero,
          coordinates: { lat: 0, lng: 0 },
        },
        cancellationPolicy: {
          id: `policy_self_guided_${gemSlug}`,
          shortRules: [
            "Self-guided hidden gems can be saved, reshuffled, or skipped without booking friction.",
            "Check opening hours, weather, transport and local safety notes before going.",
          ],
          fullPolicyHref: routes.city(city.slug),
        },
        highlights: [
          gem.place,
          bestTime,
          "Local tips",
          ...nearbyPlaces.slice(1, 3),
        ],
      },
      availability: {
        selectedDate: "Anytime",
        dates: ["Anytime"],
        timeSlots: [
          { id: "morning", label: "Morning", availableSeats: 10 },
          { id: "afternoon", label: "Afternoon", availableSeats: 10 },
          { id: "evening", label: "Evening", availableSeats: 10 },
        ],
        guestLimit: {
          min: 1,
          max: 8,
          defaultGuests: 1,
        },
      },
      reviews: {
        overall: 4.8,
        count: 96,
        metrics: [
          { label: "Local Feel", value: 4.9 },
          { label: "Route Ease", value: 4.7 },
          { label: "Atmosphere", value: 4.8 },
          { label: "Worth the Detour", value: 4.8 },
        ],
        featured: {
          author: "JOURNEE Field Note",
          verified: true,
          avatar: city.images.avatar,
          rating: 5,
          age: "Updated recently",
          body: `${gem.title} works best as a deliberate pause in ${city.city}, not a rushed checklist stop.`,
        },
      },
      guide: {
        id: `guide_${city.slug}_local_layer`,
        language: "Local context",
        verification: "JOURNEE curated",
      },
      booking: {
        defaultStatus: "draft",
        confirmationType: "instant",
        paymentSecurity: "secure",
      },
    },
  };
}

export function getHiddenGemExperience(citySlug: string, gemSlug: string) {
  const city = getCityDestinationPageData(citySlug);
  const gem = city?.hiddenGems.find(
    (item) => slugifyRouteSegment(item.title) === gemSlug,
  );

  if (!city || !gem) return null;
  return buildHiddenGemExperience(city, gem);
}

export function getAllHiddenGemExperienceParams() {
  return getAllCityDestinationSlugs().flatMap((citySlug) => {
    const city = getCityDestinationPageData(citySlug);
    if (!city) return [];

    return city.hiddenGems.map((gem) => ({
      slug: citySlug,
      gem: slugifyRouteSegment(gem.title),
    }));
  });
}
