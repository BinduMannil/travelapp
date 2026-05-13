import {
  getAllCityDestinationSlugs,
  getCityDestinationPageData,
  type CityDestinationPageData,
} from "@/lib/city/city-destination-data";
import { routes } from "@/lib/routes";

export type CityItineraryDay = {
  city: CityDestinationPageData;
  dayIndex: number;
  daySlug: string;
  dayLabel: string;
  title: string;
  overview: string;
  image: string;
  stops: string[];
  flow: Array<{ time: string; title: string; note: string }>;
  foodSuggestions: string[];
  localNotes: string[];
  mapHref: string;
  relatedDays: Array<{ label: string; title: string; href: string }>;
};

const timeSlots = ["09:00", "11:00", "13:00", "16:00", "19:00"];

function itineraryDaySlug(index: number) {
  return `day-${index + 1}`;
}

function flowNote(city: CityDestinationPageData, stop: string, index: number) {
  const notes = [
    `Start with ${stop} while the day is still easy to shape.`,
    `Keep the pace flexible around ${stop}; this is where ${city.city} starts to show texture.`,
    `Use this block for food, shade, coffee, or a slower cultural pause.`,
    `Let the route loosen near ${stop} before evening plans.`,
    `End with a low-friction transfer back toward your stay.`,
  ];
  return notes[index] ?? `Use ${stop} as a flexible anchor.`;
}

function foodSuggestions(city: CityDestinationPageData, stops: string[]) {
  const foodMoods = city.moods
    .map((mood) => mood.title)
    .filter((title) => /food|coffee|cafe|market|breakfast|dinner|snack|seafood|tea/i.test(title));

  return [
    ...foodMoods,
    ...stops.filter((stop) => /market|food|coffee|cafe|lunch|dinner|breakfast/i.test(stop)),
    `${city.city} neighborhood lunch stop`,
  ].slice(0, 4);
}

function localNotes(city: CityDestinationPageData, stops: string[]) {
  return [
    `Use ${city.city}'s Atlas layer before leaving so transport and nearby stops are already in context.`,
    "Keep one unscheduled pause between anchor stops; the best city routes need breathing room.",
    `If weather or traffic shifts, hold ${stops[stops.length - 1] ?? city.city} as the flexible block.`,
  ];
}

export function getCityItineraryDay(citySlug: string, daySlug: string) {
  const city = getCityDestinationPageData(citySlug);
  if (!city) return null;

  const dayIndex = city.itinerary.findIndex(
    (_day, index) => itineraryDaySlug(index) === daySlug,
  );
  const day = city.itinerary[dayIndex];
  if (!day) return null;

  const flow = day.stops.map((stop, index) => ({
    time: timeSlots[index] ?? `${9 + index * 2}:00`,
    title: stop,
    note: flowNote(city, stop, index),
  }));

  return {
    city,
    dayIndex,
    daySlug,
    dayLabel: day.day,
    title: day.title,
    overview: `${day.title} is the ${day.day.toLowerCase()} arc for ${city.city}: a practical flow that connects arrival rhythm, food timing, culture, neighborhoods, and enough space to adjust around weather, traffic, and energy.`,
    image: day.image,
    stops: day.stops,
    flow,
    foodSuggestions: foodSuggestions(city, day.stops),
    localNotes: localNotes(city, day.stops),
    mapHref: routes.atlas(city.slug, daySlug),
    relatedDays: city.itinerary
      .map((item, index) => ({
        label: item.day,
        title: item.title,
        href: routes.cityItineraryDay(city.slug, itineraryDaySlug(index)),
      }))
      .filter((_item, index) => index !== dayIndex),
  } satisfies CityItineraryDay;
}

export function getAllCityItineraryDayParams() {
  return getAllCityDestinationSlugs().flatMap((citySlug) => {
    const city = getCityDestinationPageData(citySlug);
    if (!city) return [];

    return city.itinerary.map((_day, index) => ({
      slug: citySlug,
      template: itineraryDaySlug(index),
    }));
  });
}
