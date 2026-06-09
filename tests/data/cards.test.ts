import { describe, it, expect } from "vitest";
import { cards, TOPIC_LABELS, getCardsByTopic, getAllTopics } from "@/data/cards";

const EXPECTED_COUNTS: Record<string, number> = {
  pronouns: 8,
  sein: 6,
  haben: 6,
  greetings: 18,
  questionWords: 8,
  formingQuestions: 8,
  nounGender: 30,
  commonVerbs: 10,
};

describe("cards data", () => {
  it("contains exactly 94 cards in total", () => {
    expect(cards).toHaveLength(94);
  });

  it("contains the spec'd count per topic", () => {
    for (const topic of Object.keys(EXPECTED_COUNTS)) {
      expect(getCardsByTopic(topic)).toHaveLength(EXPECTED_COUNTS[topic]);
    }
  });

  it("getAllTopics returns every TOPIC_LABELS key including generated topics", () => {
    const topics = getAllTopics();
    expect(topics).toHaveLength(Object.keys(TOPIC_LABELS).length);
    ["numbers", "ordinals", "formingQuestions"].forEach((k) => expect(topics).toContain(k));
  });

  it("every card has required fields and a valid card type", () => {
    const validTopics = Object.keys(TOPIC_LABELS);
    for (const card of cards) {
      expect(card.id).toBeTruthy();
      expect(card.german).toBeTruthy();
      expect(card.explanation).toBeTruthy();
      expect(validTopics).toContain(card.topic);
      expect(["word", "gender", "question"]).toContain(card.type);
    }
  });

  it("all card ids are unique", () => {
    const ids = cards.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gender-typed cards only appear in nounGender topic and use der/die/das", () => {
    for (const card of cards) {
      if (card.type === "gender") {
        expect(card.topic).toBe("nounGender");
        expect(["der", "die", "das"]).toContain(card.german);
      }
    }
  });

  it("every nounGender card is gender-typed", () => {
    for (const card of getCardsByTopic("nounGender")) {
      expect(card.type).toBe("gender");
    }
  });

});
