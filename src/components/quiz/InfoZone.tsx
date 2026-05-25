interface InfoZoneProps {
  explanation?: string;
  tip?: string;
}

export function InfoZone({ explanation, tip }: InfoZoneProps) {
  return (
    <div data-stub="InfoZone" className="bg-bg-surface rounded-card p-3 min-h-[64px]">
      {explanation && <p className="text-sm">{explanation}</p>}
      {tip && <p className="text-xs italic text-text-muted">{tip}</p>}
    </div>
  );
}
