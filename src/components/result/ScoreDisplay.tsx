interface ScoreDisplayProps {
  masteredCount: number;
  totalCount: number;
}

export function ScoreDisplay({ masteredCount, totalCount }: ScoreDisplayProps) {
  return (
    <div className="text-center space-y-1">
      <p className="text-text-muted text-sm">Session complete</p>
      <p className="font-serif text-5xl leading-none text-green-800 font-medium">
        {masteredCount} / {totalCount}
      </p>
    </div>
  );
}
