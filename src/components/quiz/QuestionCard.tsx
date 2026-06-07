interface QuestionCardProps {
  englishWord: string;
  sentenceDe?: string;
  sentenceEn?: string;
}

export function QuestionCard({
  englishWord,
  sentenceDe,
  sentenceEn,
}: QuestionCardProps) {
  return (
    <div className="bg-indigo-light rounded-card px-4 py-5 text-center space-y-1">
      {sentenceDe && (
        <p className="text-[13px] text-text-body">{sentenceDe}</p>
      )}
      {sentenceEn && (
        <p className="text-xs text-text-muted">{sentenceEn}</p>
      )}
      <p className="font-serif text-[32px] leading-tight text-text-primary pt-1">
        {englishWord}
      </p>
    </div>
  );
}
