import type { QuizCard } from "@/types";

export const TOPIC_LABELS: Record<string, string> = {
  pronouns:      "Pronouns",
  sein:          "Sein — to be",
  haben:         "Haben — to have",
  greetings:     "Greetings",
  numbers:       "Numbers",
  questionWords: "Question words",
  nounGender:    "Noun gender",
  commonVerbs:   "Common verbs",
};

export const cards: QuizCard[] = [];

export function getCardsByTopic(topic: string): QuizCard[] {
  return cards.filter((card) => card.topic === topic);
}

export function getAllTopics(): string[] {
  return Object.keys(TOPIC_LABELS);
}
