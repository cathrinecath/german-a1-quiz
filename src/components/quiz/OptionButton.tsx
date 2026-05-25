import type { AnswerState } from "@/types";

interface OptionButtonProps {
  label: string;
  answerState: AnswerState;
  onSelect: (label: string) => void;
}

export function OptionButton({ label, answerState, onSelect }: OptionButtonProps) {
  return (
    <button
      data-stub="OptionButton"
      data-state={answerState}
      onClick={() => onSelect(label)}
      className="bg-bg-card rounded-opt min-h-[44px] px-3 py-2 text-sm"
    >
      {label}
    </button>
  );
}
