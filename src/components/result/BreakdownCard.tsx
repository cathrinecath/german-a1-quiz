interface BreakdownCardProps {
  masteredCount: number;
  weakCount: number;
}

export function BreakdownCard({ masteredCount, weakCount }: BreakdownCardProps) {
  return (
    <div data-stub="BreakdownCard" className="bg-bg-card rounded-card p-3 space-y-1">
      <div className="flex justify-between text-sm">
        <span>Mastered</span>
        <span className="font-medium">{masteredCount}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Still weak</span>
        <span className="font-medium">{weakCount}</span>
      </div>
    </div>
  );
}
