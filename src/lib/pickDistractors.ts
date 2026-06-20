import type { QuizCard } from "@/types";
import { shuffleArray } from "./shuffleArray";

export function pickDistractors(card: QuizCard, allTopicCards: QuizCard[]): string[] {
  if (card.type === "gender") {
    return shuffleArray(["der", "die", "das"]);
  }

  const wrongOptions = Array.from(
    new Set(
      allTopicCards
        .filter((c) => c.german !== card.german)
        .map((c) => c.german),
    ),
  );
  const shuffledWrong = shuffleArray(wrongOptions).slice(0, 3);
  return shuffleArray([card.german, ...shuffledWrong]);
}
