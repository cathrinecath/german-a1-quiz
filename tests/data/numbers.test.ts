import { describe, it, expect } from "vitest";
import { buildNumberCard, numberDistractorPool, buildNumberSession } from "@/data/numbers";

describe("buildNumberCard", () => {
  it("builds a word card from a number", () => {
    expect(buildNumberCard(7)).toEqual({
      id: "numbers-7",
      topic: "numbers",
      type: "word",
      english: "seven",
      german: "sieben",
      explanation: "sieben = seven.",
    });
  });
  it("has no sentence", () => {
    expect(buildNumberCard(7).sentenceDe).toBeUndefined();
    expect(buildNumberCard(7).sentenceEn).toBeUndefined();
  });
});

describe("numberDistractorPool", () => {
  it("covers 0..100", () => {
    expect(numberDistractorPool()).toHaveLength(101);
  });
});

describe("buildNumberSession", () => {
  it("has 30 cards", () => {
    expect(buildNumberSession()).toHaveLength(30);
  });
  it("always includes 1..10", () => {
    const ids = buildNumberSession().map((c) => c.id);
    for (let n = 1; n <= 10; n++) expect(ids).toContain(`numbers-${n}`);
  });
  it("has no duplicate ids", () => {
    const ids = buildNumberSession().map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("draws extras only from 11..100", () => {
    buildNumberSession().forEach((c) => {
      const n = Number(c.id.replace("numbers-", ""));
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(100);
    });
  });
});
