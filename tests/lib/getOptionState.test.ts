import { describe, it, expect } from "vitest";
import { getOptionState } from "@/lib/getOptionState";

describe("getOptionState — what colour to paint each option button", () => {
  it("returns 'unanswered' for every option before the user has picked one", () => {
    expect(getOptionState("sie", null, "sie")).toBe("unanswered");
    expect(getOptionState("ihr", null, "sie")).toBe("unanswered");
  });

  it("returns 'correct' for the correct option once the user has answered", () => {
    expect(getOptionState("sie", "ihr", "sie")).toBe("correct");
    expect(getOptionState("sie", "sie", "sie")).toBe("correct");
  });

  it("returns 'wrong' for the selected option when it isn't the correct one", () => {
    expect(getOptionState("ihr", "ihr", "sie")).toBe("wrong");
  });

  it("returns 'dimmed' for unselected, non-correct options after the user has answered", () => {
    expect(getOptionState("wir", "ihr", "sie")).toBe("dimmed");
    expect(getOptionState("er", "ihr", "sie")).toBe("dimmed");
  });
});
