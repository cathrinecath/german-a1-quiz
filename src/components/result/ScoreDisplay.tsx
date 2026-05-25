interface ScoreDisplayProps {
  masteredCount: number;
  totalCount: number;
}

export function ScoreDisplay({ masteredCount, totalCount }: ScoreDisplayProps) {
  return (
    <div data-stub="ScoreDisplay" className="text-center">
      <p className="text-text-muted text-sm">Session complete</p>
      <p className="font-serif text-5xl text-text-primary">
        {masteredCount} / {totalCount}
      </p>
    </div>
  );
}
