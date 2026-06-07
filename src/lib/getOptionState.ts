import type { AnswerState } from "@/types";

export function getOptionState(
  option: string,
  selectedAnswer: string | null,
  correctAnswer: string,
): AnswerState {
  if (!selectedAnswer) return "unanswered";
  if (option === correctAnswer) return "correct";
  if (option === selectedAnswer) return "wrong";
  return "dimmed";
}
