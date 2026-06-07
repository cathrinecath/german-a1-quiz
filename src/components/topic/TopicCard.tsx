interface TopicCardProps {
  topicName: string;
  masteredCount: number;
  totalCount: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function TopicCard({
  topicName,
  masteredCount,
  totalCount,
  isSelected,
  onSelect,
}: TopicCardProps) {
  const completed = totalCount > 0 && masteredCount === totalCount;
  const borderClass = completed
    ? "border-green-700/50 bg-correct-bg"
    : isSelected
      ? "border-indigo-app bg-indigo-light"
      : "border-border-subtle bg-bg-card";

  return (
    <button
      type="button"
      data-selected={isSelected}
      data-completed={completed}
      onClick={onSelect}
      className={`w-full rounded-card px-4 py-3 border flex justify-between items-center min-h-[44px] transition-colors ${borderClass}`}
    >
      <span className="text-sm font-medium text-text-primary">{topicName}</span>
      <span className="text-xs text-text-muted">
        {masteredCount}/{totalCount}
        {completed && " ✓"}
      </span>
    </button>
  );
}
