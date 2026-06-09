import type { QuizCard } from "@/types";
import { shuffleArray } from "./shuffleArray";

export function buildSampledSet(
  coreCards: QuizCard[],
  poolCards: QuizCard[],
  drawCount: number,
): QuizCard[] {
  const draw = shuffleArray(poolCards).slice(0, drawCount);
  return [...coreCards, ...draw];
}
