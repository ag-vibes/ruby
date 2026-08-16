import { describe, expect, it } from "vitest";
import { addDays, emptyData, formatDecimal, parseDecimal, positionInMonthGrid, trendDirection } from "./domain";

describe("ruby domain", () => {
  it("contains the approved initial indicators", () => expect(emptyData().indicators.map((x) => x.name)).toEqual(["гемоглобин", "ферритин", "железо", "витамин D", "фолиевая кислота"]));
  it("accepts comma decimals", () => expect(parseDecimal("39,4")).toBe(39.4));
  it("shows comma decimals", () => expect(formatDecimal(8.6)).toBe("8,6"));
  it("calculates a planned end date", () => expect(addDays("2026-01-01", 90)).toBe("2026-04-01"));
  it("keeps small changes neutral and highlights meaningful changes", () => {
    expect(trendDirection(136, 135)).toBe("steady");
    expect(trendDirection(25, 26.3)).toBe("steady");
    expect(trendDirection(0.85, 0.76)).toBe("steady");
    expect(trendDirection(48, 15)).toBe("down");
    expect(trendDirection(100, 116)).toBe("up");
  });
  it("places course boundaries by the exact day inside month cells", () => {
    const start = new Date(2025, 0, 1);
    expect(positionInMonthGrid("2025-04-01", start, 12)).toBe(25);
    expect(positionInMonthGrid("2025-08-01", start, 12)).toBeCloseTo(58.3333, 3);
    expect(positionInMonthGrid("2025-04-16", start, 12)).toBeCloseTo(29.1667, 3);
  });
});
