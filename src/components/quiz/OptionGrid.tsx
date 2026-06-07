import { getOptionState } from "@/lib/getOptionState";
import { OptionButton } from "./OptionButton";

interface OptionGridProps {
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string;
  onSelect: (label: string) => void;
}

export function OptionGrid({
  options,
  selectedAnswer,
  correctAnswer,
  onSelect,
}: OptionGridProps) {
  const longest = options.reduce((max, opt) => Math.max(max, opt.length), 0);
  const isSingleColumn = longest > 15;
  const locked = selectedAnswer !== null;

  return (
    <div className={isSingleColumn ? "flex flex-col gap-2" : "grid grid-cols-2 gap-2"}>
      {options.map((opt, i) => (
        <OptionButton
          key={`${opt}-${i}`}
          label={opt}
          answerState={getOptionState(opt, selectedAnswer, correctAnswer)}
          disabled={locked}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
