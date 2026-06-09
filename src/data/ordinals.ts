import type { QuizCard } from "@/types";
import { germanOrdinal, englishOrdinal } from "@/lib/numberWords";
import { inclusiveRange } from "@/lib/inclusiveRange";
import { buildSampledSet } from "@/lib/buildSampledSet";

export function buildOrdinalCard(n: number): QuizCard {
  const german = germanOrdinal(n);
  const english = englishOrdinal(n);
  return {
    id: `ordinals-${n}`,
    topic: "ordinals",
    type: "word",
    english,
    german,
    explanation: `${german} = ${english}.`,
  };
}

export function ordinalDistractorPool(): QuizCard[] {
  return inclusiveRange(1, 100).map(buildOrdinalCard);
}

export const ORDINAL_SESSION_SIZE = 30;

export function buildOrdinalSession(): QuizCard[] {
  const core = inclusiveRange(1, 10).map(buildOrdinalCard);
  const pool = inclusiveRange(11, 100).map(buildOrdinalCard);
  return buildSampledSet(core, pool, ORDINAL_SESSION_SIZE - core.length);
}
