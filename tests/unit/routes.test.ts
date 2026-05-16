import { describe, expect, it } from "vitest";
import { routes } from "@/lib/routes";

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
});
