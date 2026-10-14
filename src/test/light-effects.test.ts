import { describe, expect, it } from "vitest";
import { chooseLeak, FLARE_CHANCE, shouldShowFlare } from "@/lib/light-effects";

describe("Light leak placement", () => {
  it("keeps flare frequency 15 percent below 0.585", () => {
    expect(FLARE_CHANCE).toBeCloseTo(0.497, 10);
    expect(shouldShowFlare(() => 0.496)).toBe(true);
    expect(shouldShowFlare(() => 0.497)).toBe(false);
  });
  it("uses left-side variants in the first half", () => {
    for (const value of [0, 0.4, 0.99]) expect([0, 2, 4]).toContain(chooseLeak(0.49, -1, () => value));
  });
  it("uses right-side variants in the bottom half", () => {
    for (const value of [0, 0.4, 0.99]) expect([1, 3, 5]).toContain(chooseLeak(0.5, -1, () => value));
  });
  it("does not repeat the previous shape", () => {
    for (const previous of [0, 2, 4]) expect(chooseLeak(0.2, previous, () => 0)).not.toBe(previous);
  });
});