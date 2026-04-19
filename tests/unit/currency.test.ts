import { describe, expect, it } from "vitest";
import {
  convertMinor,
  decimalsFor,
  formatPrice,
  toMajor,
  toMinor,
} from "@/lib/currency/convert";

describe("currency", () => {
  it("treats JPY and KRW as zero-decimal", () => {
    expect(decimalsFor("JPY")).toBe(0);
    expect(decimalsFor("KRW")).toBe(0);
    expect(decimalsFor("USD")).toBe(2);
  });

  it("round-trips minor <-> major across decimal conventions", () => {
    expect(toMajor(450, "JPY")).toBe(450);
    expect(toMinor(450, "JPY")).toBe(450);
    expect(toMajor(1999, "USD")).toBe(19.99);
    expect(toMinor(19.99, "USD")).toBe(1999);
  });

  it("converts JPY to USD using a direct rate", () => {
    const rates = [{ base: "JPY", quote: "USD", rate: 0.0067 }];
    const usd = convertMinor(10000, "JPY", "USD", rates);
    expect(usd).toBe(Math.round(10000 * 0.0067 * 100));
  });

  it("falls back to an inverse rate when the direct pair is missing", () => {
    const rates = [{ base: "USD", quote: "JPY", rate: 149 }];
    const jpy = convertMinor(100, "USD", "JPY", rates);
    expect(jpy).toBe(149);
  });

  it("returns null when no rate is available", () => {
    const result = convertMinor(100, "USD", "THB", []);
    expect(result).toBeNull();
  });

  it("returns the same amount when from == to", () => {
    expect(convertMinor(500, "JPY", "JPY", [])).toBe(500);
  });

  it("formats prices with the right number of decimals", () => {
    expect(formatPrice(45000, "JPY", "en-US")).toContain("45,000");
    expect(formatPrice(1999, "USD", "en-US")).toBe("$19.99");
  });
});
