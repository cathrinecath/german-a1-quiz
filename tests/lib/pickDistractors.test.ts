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

describe("pickDistractors — duplicate german values in topic", () => {
  // Mirrors real data: sein topic has both 'wir sind' and 'Sie sind' with german='sind'.
  const seinCards: QuizCard[] = [
    { id: "s-ich", topic: "sein", type: "word", english: "I",   german: "bin",  explanation: "" },
    { id: "s-du",  topic: "sein", type: "word", english: "you", german: "bist", explanation: "" },
    { id: "s-er",  topic: "sein", type: "word", english: "he",  german: "ist",  explanation: "" },
    { id: "s-wir", topic: "sein", type: "word", english: "we",  german: "sind", explanation: "" },
    { id: "s-ihr", topic: "sein", type: "word", english: "y'all", german: "seid", explanation: "" },
    { id: "s-sie-formal", topic: "sein", type: "word", english: "you (formal)", german: "sind", explanation: "" },
  ];

  it("returns no duplicate option labels", () => {
    const result = pickDistractors(seinCards[3], seinCards); // current = wir/sind
    expect(new Set(result).size).toBe(result.length);
  });

  it("does not include the correct answer as a wrong distractor when a sibling card shares the same german", () => {
    const result = pickDistractors(seinCards[3], seinCards); // current = wir/sind
    const sindCount = result.filter((o) => o === "sind").length;
    expect(sindCount).toBe(1);
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

describe("pickDistractors — forming-questions (question type)", () => {
  const questionCards: QuizCard[] = [
    { id: "fq-1", topic: "formingQuestions", type: "question", english: "", german: "Wie heisst du?", explanation: "" },
    { id: "fq-2", topic: "formingQuestions", type: "question", english: "", german: "Wo wohnst du?", explanation: "" },
    { id: "fq-3", topic: "formingQuestions", type: "question", english: "", german: "Wer ist das?", explanation: "" },
    { id: "fq-4", topic: "formingQuestions", type: "question", english: "", german: "Wie alt bist du?", explanation: "" },
    { id: "fq-5", topic: "formingQuestions", type: "question", english: "", german: "Warum lernst du Deutsch?", explanation: "" },
  ];

  it("returns 4 distinct options including the correct question", () => {
    const result = pickDistractors(questionCards[0], questionCards);
    expect(result).toHaveLength(4);
    expect(new Set(result).size).toBe(4);
    expect(result).toContain("Wie heisst du?");
  });
});
