import { expect, test } from "@playwright/test";

const canonicalRoutes = [
  "/",
  "/country/vietnam",
  "/country/vietnam/itinerary",
  "/country/vietnam/cuisine",
  "/city/tokyo",
];

const canonicalRedirects = [
  { from: "/countries/vietnam", to: "/country/vietnam" },
  { from: "/countries/vietnam/hanoi", to: "/city/hanoi" },
  { from: "/cities/tokyo", to: "/city/tokyo" },
];

test.describe("canonical route smoke checks", () => {
  for (const route of canonicalRoutes) {
    test(`${route} returns an HTML page`, async ({ request }) => {
      const response = await request.get(route);
      expect(response.status(), route).toBeLessThan(400);
      expect(response.headers()["content-type"]).toContain("text/html");
    });
  }
});

test.describe("canonical route redirects", () => {
  for (const route of canonicalRedirects) {
    test(`${route.from} redirects to ${route.to}`, async ({ request }) => {
      const response = await request.get(route.from, { maxRedirects: 0 });
      expect([307, 308]).toContain(response.status());
      expect(response.headers().location).toBe(route.to);
    });
  }
});
