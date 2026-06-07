import type { AnswerState } from "@/types";

interface OptionButtonProps {
  label: string;
  answerState: AnswerState;
  disabled?: boolean;
  onSelect: (label: string) => void;
}

const STATE_CLASSES: Record<AnswerState, string> = {
  unanswered:
    "bg-bg-card border-border-subtle text-text-body hover:bg-bg-surface",
  correct:
    "bg-correct-bg border-green-700/40 text-green-900 font-semibold",
  wrong:
    "bg-wrong-bg border-red-700/40 text-red-900 font-semibold",
  dimmed:
    "bg-bg-card border-border-subtle text-text-muted opacity-60",
};

export function OptionButton({
  label,
  answerState,
  disabled,
  onSelect,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      data-state={answerState}
      disabled={disabled}
      onClick={() => onSelect(label)}
      className={`rounded-opt border min-h-[44px] px-3 py-2 text-sm transition-colors ${STATE_CLASSES[answerState]}`}
    >
      {label}
    </button>
  );
}
