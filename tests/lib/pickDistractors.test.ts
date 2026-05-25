import { describe, it, expect } from "vitest";
import { pickDistractors } from "@/lib/pickDistractors";
import type { QuizCard } from "@/types";

const wordCards: QuizCard[] = [
  { id: "p-ich", topic: "pronouns", type: "word", english: "I",   german: "ich", explanation: "" },
  { id: "p-du",  topic: "pronouns", type: "word", english: "you", german: "du",  explanation: "" },
  { id: "p-er",  topic: "pronouns", type: "word", english: "he",  german: "er",  explanation: "" },
  { id: "p-sie", topic: "pronouns", type: "word", english: "she", german: "sie", explanation: "" },
  { id: "p-wir", topic: "pronouns", type: "word", english: "we",  german: "wir", explanation: "" },
];

describe("pickDistractors — word cards", () => {
  it("returns exactly 4 options", () => {
    const result = pickDistractors(wordCards[0], wordCards);
    expect(result).toHaveLength(4);
  });

  it("always includes the correct answer", () => {
    const result = pickDistractors(wordCards[0], wordCards);
    expect(result).toContain("ich");
  });

  it("does not include the correct answer twice (uniqueness)", () => {
    const result = pickDistractors(wordCards[0], wordCards);
    const ichCount = result.filter((r) => r === "ich").length;
    expect(ichCount).toBe(1);
  });

  it("only uses german values from the same topic", () => {
    const result = pickDistractors(wordCards[0], wordCards);
    const validGermans = wordCards.map((c) => c.german);
    result.forEach((option) => {
      expect(validGermans).toContain(option);
    });
  });
});

describe("pickDistractors — gender cards", () => {
  const genderCard: QuizCard = {
    id: "g-hund", topic: "nounGender", type: "gender",
    english: "dog", german: "der", explanation: "",
  };

  it("returns exactly 4 options for a gender card", () => {
    const result = pickDistractors(genderCard, []);
    expect(result).toHaveLength(4);
  });

  it("includes der, die, das and a repeated article", () => {
    const result = pickDistractors(genderCard, []);
    expect(result).toContain("der");
    expect(result).toContain("die");
    expect(result).toContain("das");
    const unique = new Set(result);
    expect(unique.size).toBe(3);
  });

  it("only uses valid german articles", () => {
    const result = pickDistractors(genderCard, []);
    result.forEach((option) => {
      expect(["der", "die", "das"]).toContain(option);
    });
  });
});
