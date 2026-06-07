import type { QuizCard } from "@/types";
import { shuffleArray } from "./shuffleArray";

export function pickDistractors(card: QuizCard, allTopicCards: QuizCard[]): string[] {
  if (card.type === "gender") {
    const articles = ["der", "die", "das"];
    const wrongArticles = articles.filter((a) => a !== card.german);
    // 4th option repeats the first wrong article (simplest "most-confused" heuristic).
    return shuffleArray([card.german, ...wrongArticles, wrongArticles[0]]);
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
