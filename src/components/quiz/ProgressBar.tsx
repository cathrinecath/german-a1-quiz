interface ProgressBarProps {
  topicName: string;
  masteredCount: number;
  totalCount: number;
}

export function ProgressBar({
  topicName,
  masteredCount,
  totalCount,
}: ProgressBarProps) {
  const pct =
    totalCount === 0 ? 0 : Math.round((masteredCount / totalCount) * 100);
  return (
    <div className="space-y-1">
      <p className="text-xs text-text-muted">
        {topicName} · {masteredCount}/{totalCount} mastered
      </p>
      <div className="h-1.5 w-full bg-bg-card rounded-pill overflow-hidden">
        <div
          className="h-full bg-indigo-app transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
