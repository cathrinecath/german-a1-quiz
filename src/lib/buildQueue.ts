import type { QuizCard, QueuedCard } from "@/types";
import { shuffleArray } from "./shuffleArray";

export function buildQueue(cards: QuizCard[]): QueuedCard[] {
  return shuffleArray(cards).map((card) => ({
    card,
    cardState: "unseen",
    requeueAfter: 0,
  }));
}
