import { describe, expect, it } from "vitest";
import { mainNavigation, primaryNavigation, routes } from "@/lib/routes";

describe("canonical route helpers", () => {
  it("uses singular country and city detail routes as canonical", () => {
    expect(routes.country("vietnam")).toBe("/country/vietnam");
    expect(routes.city("tokyo")).toBe("/city/tokyo");
  });

  it("keeps plural detail aliases pointed at canonical routes", () => {
    expect(routes.countryAlias("vietnam")).toBe("/country/vietnam");
    expect(routes.countryCity("vietnam", "hanoi")).toBe("/city/hanoi");
    expect(routes.cityAlias("tokyo")).toBe("/city/tokyo");
  });

  it("does not expose the atlas map as a primary navigation option", () => {
    const navItems = [...primaryNavigation, ...mainNavigation];

    expect(navItems.map((item) => item.label)).not.toContain("Map");
    expect(navItems.map((item) => item.href)).not.toContain(routes.atlas());
  });
});
