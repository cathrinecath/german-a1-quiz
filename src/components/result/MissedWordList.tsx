interface MissedWordListProps {
  words: string[];
}

export function MissedWordList({ words }: MissedWordListProps) {
  if (words.length === 0) return null;
  return (
    <div data-stub="MissedWordList" className="flex flex-wrap gap-1">
      {words.map((w) => (
        <span
          key={w}
          className="bg-wrong-bg text-text-body text-xs px-2 py-1 rounded-pill"
        >
          {w}
        </span>
      ))}
    </div>
  );
}
