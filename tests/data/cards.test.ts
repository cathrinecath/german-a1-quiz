import { describe, it, expect } from "vitest";
import { cards, TOPIC_LABELS, getCardsByTopic, getAllTopics } from "@/data/cards";

const EXPECTED_COUNTS: Record<string, number> = {
  pronouns: 8,
  sein: 6,
  haben: 6,
  greetings: 8,
  numbers: 12,
  questionWords: 8,
  nounGender: 10,
  commonVerbs: 10,
};

describe("cards data", () => {
  it("contains exactly 68 cards in total", () => {
    expect(cards).toHaveLength(68);
  });

  it("contains the spec'd count per topic", () => {
    for (const topic of Object.keys(EXPECTED_COUNTS)) {
      expect(getCardsByTopic(topic)).toHaveLength(EXPECTED_COUNTS[topic]);
    }
  });

  it("getAllTopics returns the 8 topic keys", () => {
    const topics = getAllTopics();
    expect(topics).toHaveLength(8);
    for (const key of Object.keys(EXPECTED_COUNTS)) {
      expect(topics).toContain(key);
    }
  });

  it("every card has required fields and a valid topic", () => {
    const validTopics = Object.keys(TOPIC_LABELS);
    for (const card of cards) {
      expect(card.id).toBeTruthy();
      expect(card.english).toBeTruthy();
      expect(card.german).toBeTruthy();
      expect(card.explanation).toBeTruthy();
      expect(validTopics).toContain(card.topic);
      expect(["word", "gender"]).toContain(card.type);
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

  it("numbers topic cards omit sentences (self-contained per PRD)", () => {
    for (const card of getCardsByTopic("numbers")) {
      expect(card.sentenceDe).toBeUndefined();
      expect(card.sentenceEn).toBeUndefined();
    }
  });
});
