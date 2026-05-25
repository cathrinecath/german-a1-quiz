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
    ? "border-green-600"
    : isSelected
      ? "border-indigo-app"
      : "border-border-subtle";

  return (
    <button
      data-stub="TopicCard"
      data-selected={isSelected}
      data-completed={completed}
      onClick={onSelect}
      className={`w-full bg-bg-card rounded-card p-3 border ${borderClass} flex justify-between items-center min-h-[44px]`}
    >
      <span className="font-medium text-sm">{topicName}</span>
      <span className="text-xs text-text-muted">
        {masteredCount}/{totalCount}
        {completed && " ✓"}
      </span>
    </button>
  );
}
