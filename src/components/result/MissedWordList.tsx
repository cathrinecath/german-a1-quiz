interface MissedWordListProps {
  words: string[];
}

export function MissedWordList({ words }: MissedWordListProps) {
  if (words.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="bg-wrong-bg text-red-900 text-xs font-medium px-3 py-1.5 rounded-pill border border-red-700/30"
        >
          {w}
        </span>
      ))}
    </div>
  );
}
