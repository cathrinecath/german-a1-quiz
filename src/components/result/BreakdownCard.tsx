interface BreakdownCardProps {
  masteredCount: number;
  weakCount: number;
}

export function BreakdownCard({
  masteredCount,
  weakCount,
}: BreakdownCardProps) {
  return (
    <div className="bg-bg-card rounded-card px-4 py-3 border border-border-subtle divide-y divide-border-subtle">
      <div className="flex justify-between items-center text-sm pb-2 text-text-body">
        <span>Mastered</span>
        <span className="font-semibold text-text-primary">{masteredCount}</span>
      </div>
      <div className="flex justify-between items-center text-sm pt-2 text-text-body">
        <span>Still weak</span>
        <span className="font-semibold text-text-primary">{weakCount}</span>
      </div>
    </div>
  );
}
