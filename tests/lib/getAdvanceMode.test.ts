import { describe, it, expect } from "vitest";
import { getAdvanceMode } from "@/lib/getAdvanceMode";

describe("getAdvanceMode — implements PRD §4 advance-logic table", () => {
  it("returns 'none' before the user has answered", () => {
    expect(getAdvanceMode(undefined, false)).toBe("none");
    expect(getAdvanceMode("unanswered", false)).toBe("none");
  });

  it("wrong + no tip → next-button (user reads explanation, taps next)", () => {
    expect(getAdvanceMode("wrong", false)).toBe("next-button");
  });

  it("wrong + tip → next-button (user reads explanation + tip, taps next)", () => {
    expect(getAdvanceMode("wrong", true)).toBe("next-button");
  });

  it("correct + tip → next-button (user reads tip, taps next)", () => {
    expect(getAdvanceMode("correct", true)).toBe("next-button");
  });

  it("correct + no tip → auto (auto-advance, no button)", () => {
    expect(getAdvanceMode("correct", false)).toBe("auto");
  });
});
