import { describe, expect, it } from "vitest";
import { formatDateInput, fromRuDate } from "./App";

describe("date input", () => {
  it("formats manual input as dd.mm.yyyy", () => expect(formatDateInput("16082026")).toBe("16.08.2026"));
  it("converts a valid Russian date to ISO", () => expect(fromRuDate("16.08.2026")).toBe("2026-08-16"));
  it("rejects an impossible date", () => expect(fromRuDate("31.02.2026")).toBe(""));
});
