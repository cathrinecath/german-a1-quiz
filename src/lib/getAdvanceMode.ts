import type { AnswerState } from "@/types";

export type AdvanceMode = "none" | "auto" | "next-button";

export function getAdvanceMode(
  answerState: AnswerState | undefined,
  hasTip: boolean,
): AdvanceMode {
  if (!answerState || answerState === "unanswered") return "none";
  if (answerState === "correct" && !hasTip) return "auto";
  return "next-button";
}
