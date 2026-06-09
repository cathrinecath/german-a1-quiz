import type { QuizCard } from "@/types";
import { germanCardinal, englishCardinal } from "@/lib/numberWords";
import { inclusiveRange } from "@/lib/inclusiveRange";
import { buildSampledSet } from "@/lib/buildSampledSet";

export function buildNumberCard(n: number): QuizCard {
  const german = germanCardinal(n);
  const english = englishCardinal(n);
  return {
    id: `numbers-${n}`,
    topic: "numbers",
    type: "word",
    english,
    german,
    explanation: `${german} = ${english}.`,
  };
}

export function numberDistractorPool(): QuizCard[] {
  return inclusiveRange(0, 100).map(buildNumberCard);
}

export const NUMBER_SESSION_SIZE = 30;

export function buildNumberSession(): QuizCard[] {
  const core = inclusiveRange(1, 10).map(buildNumberCard);
  const pool = inclusiveRange(11, 100).map(buildNumberCard);
  return buildSampledSet(core, pool, NUMBER_SESSION_SIZE - core.length);
}
