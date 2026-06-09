import { describe, it, expect } from "vitest";
import { buildOrdinalCard, ordinalDistractorPool, buildOrdinalSession } from "@/data/ordinals";

describe("buildOrdinalCard", () => {
  it("builds a word card from an ordinal", () => {
    expect(buildOrdinalCard(3)).toEqual({
      id: "ordinals-3",
      topic: "ordinals",
      type: "word",
      english: "third",
      german: "dritte",
      explanation: "dritte = third.",
    });
  });
});

describe("ordinalDistractorPool", () => {
  it("covers 1..100", () => {
    expect(ordinalDistractorPool()).toHaveLength(100);
  });
});

describe("buildOrdinalSession", () => {
  it("has 30 cards", () => {
    expect(buildOrdinalSession()).toHaveLength(30);
  });
  it("always includes 1st..10th", () => {
    const ids = buildOrdinalSession().map((c) => c.id);
    for (let n = 1; n <= 10; n++) expect(ids).toContain(`ordinals-${n}`);
  });
  it("has no duplicate ids", () => {
    const ids = buildOrdinalSession().map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
