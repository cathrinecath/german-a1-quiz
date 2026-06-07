interface InfoZoneProps {
  explanation?: string;
  tip?: string;
}

export function InfoZone({ explanation, tip }: InfoZoneProps) {
  const isEmpty = !explanation && !tip;
  return (
    <div className="bg-bg-surface rounded-card px-4 py-3 min-h-[64px] flex flex-col gap-1 justify-center border border-border-subtle">
      {explanation && (
        <p className="text-[13px] text-text-body">{explanation}</p>
      )}
      {tip && (
        <p className="text-xs italic text-text-muted">tip: {tip}</p>
      )}
      {isEmpty && (
        <p
          aria-hidden="true"
          className="text-xs italic text-text-muted/60"
        >
          explanation + tip after answering
        </p>
      )}
    </div>
  );
}
