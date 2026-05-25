import type { AnswerState } from "@/types";
import { OptionButton } from "./OptionButton";

interface OptionGridProps {
  options: string[];
  answerStates: Record<string, AnswerState>;
  onSelect: (label: string) => void;
}

export function OptionGrid({ options, answerStates, onSelect }: OptionGridProps) {
  const longest = options.reduce((max, opt) => Math.max(max, opt.length), 0);
  const isSingleColumn = longest > 15;

  return (
    <div
      data-stub="OptionGrid"
      className={isSingleColumn ? "flex flex-col gap-2" : "grid grid-cols-2 gap-2"}
    >
      {options.map((opt) => (
        <OptionButton
          key={opt}
          label={opt}
          answerState={answerStates[opt] ?? "unanswered"}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
