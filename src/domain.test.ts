import { describe, expect, it } from "vitest";
import { addDays, emptyData, formatDecimal, parseDecimal } from "./domain";

describe("ruby domain", () => {
  it("contains the approved initial indicators", () => expect(emptyData().indicators.map((x) => x.name)).toEqual(["гемоглобин", "ферритин", "железо", "витамин D", "фолиевая кислота"]));
  it("accepts comma decimals", () => expect(parseDecimal("39,4")).toBe(39.4));
  it("shows comma decimals", () => expect(formatDecimal(8.6)).toBe("8,6"));
  it("calculates a planned end date", () => expect(addDays("2026-01-01", 90)).toBe("2026-04-01"));
});
