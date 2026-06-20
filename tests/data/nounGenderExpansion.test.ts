import { describe, it, expect } from "vitest";
import { getCardsByTopic } from "@/data/cards";
import { pickDistractors } from "@/lib/pickDistractors";

describe("plurals topic", () => {
  const plurals = getCardsByTopic("plurals");

  it("has 15 word-type cards", () => {
    expect(plurals).toHaveLength(15);
    plurals.forEach((c) => expect(c.type).toBe("word"));
  });

  it("every plural answer takes the article die", () => {
    plurals.forEach((c) => expect(c.german.startsWith("die ")).toBe(true));
  });

  it("has unique ids and answers", () => {
    expect(new Set(plurals.map((c) => c.id)).size).toBe(15);
    expect(new Set(plurals.map((c) => c.german)).size).toBe(15);
  });

  it("covers distinct plural patterns", () => {
    const answers = plurals.map((c) => c.german);
    expect(answers).toContain("die Hunde");
    expect(answers).toContain("die Katzen");
    expect(answers).toContain("die Fenster");
  });

  it("builds 4 distinct options including the correct plural", () => {
    const card = plurals.find((c) => c.id === "plurals-hund")!;
    const options = pickDistractors(card, plurals);
    expect(options).toHaveLength(4);
    expect(new Set(options).size).toBe(4);
    expect(options).toContain("die Hunde");
  });
});

describe("genderPatterns topic", () => {
  const patterns = getCardsByTopic("genderPatterns");

  it("has 10 gender-type cards using der/die/das", () => {
    expect(patterns).toHaveLength(10);
    patterns.forEach((c) => {
      expect(c.type).toBe("gender");
      expect(["der", "die", "das"]).toContain(c.german);
    });
  });

  it("has unique ids", () => {
    expect(new Set(patterns.map((c) => c.id)).size).toBe(10);
  });
});
