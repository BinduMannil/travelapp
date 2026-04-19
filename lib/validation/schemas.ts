import { z } from "zod";

export const contributionSchema = z.object({
  targetTable: z.enum(["attractions", "restaurants", "cities", "neighborhoods"]),
  targetId: z.string().uuid(),
  body: z.string().min(20).max(2000),
  turnstileToken: z.string().min(1),
});
export type ContributionInput = z.infer<typeof contributionSchema>;

export const tripInputSchema = z.object({
  cityId: z.string().uuid(),
  title: z.string().min(1).max(120),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  tripTypeSlugs: z.array(z.string().min(1)).max(10).default([]),
  activities: z.array(z.string().min(1)).max(30).default([]),
  travelersAdults: z.number().int().min(1).max(20).default(1),
  travelersChildren: z.number().int().min(0).max(20).default(0),
});
export type TripInput = z.infer<typeof tripInputSchema>;

export const filterParamsSchema = z.object({
  types: z.array(z.string()).default([]),
  significance: z.array(z.string()).default([]),
  access: z.array(z.enum(["wheelchair", "stroller", "hearing_loop"])).default([]),
  dietary: z.array(
    z.enum(["vegan", "vegetarian", "halal", "kosher", "gluten_free"]),
  ).default([]),
  kidFriendly: z.boolean().optional(),
  lgbtq: z.boolean().optional(),
  photoAllowed: z.boolean().optional(),
  budget: z.enum(["$", "$$", "$$$", "$$$$"]).optional(),
  minRating: z.number().min(0).max(5).optional(),
});
export type FilterParams = z.infer<typeof filterParamsSchema>;
