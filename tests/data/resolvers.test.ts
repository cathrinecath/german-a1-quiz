import { describe, it, expect } from "vitest";
import { getSessionCards, getDistractorPool, getSessionSize } from "@/data/cards";

describe("getSessionCards", () => {
  it("generates a 30-card numbers session", () => {
    expect(getSessionCards("numbers")).toHaveLength(30);
  });
  it("generates a 30-card ordinals session", () => {
    expect(getSessionCards("ordinals")).toHaveLength(30);
  });
  it("returns all static cards for a static topic", () => {
    expect(getSessionCards("greetings")).toHaveLength(18);
  });
});

describe("getDistractorPool", () => {
  it("returns the full 0..100 pool for numbers", () => {
    expect(getDistractorPool("numbers")).toHaveLength(101);
  });
  it("returns the full 1..100 pool for ordinals", () => {
    expect(getDistractorPool("ordinals")).toHaveLength(100);
  });
  it("returns same-topic static cards otherwise", () => {
    expect(getDistractorPool("formingQuestions")).toHaveLength(8);
  });
});

describe("getSessionSize", () => {
  it("is 30 for sampled topics", () => {
    expect(getSessionSize("numbers")).toBe(30);
    expect(getSessionSize("ordinals")).toBe(30);
  });
  it("is the static count otherwise", () => {
    expect(getSessionSize("greetings")).toBe(18);
    expect(getSessionSize("nounGender")).toBe(30);
    expect(getSessionSize("formingQuestions")).toBe(8);
  });
});
