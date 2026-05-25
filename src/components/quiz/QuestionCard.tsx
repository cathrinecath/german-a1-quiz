interface QuestionCardProps {
  englishWord: string;
  sentenceDe?: string;
  sentenceEn?: string;
}

export function QuestionCard({ englishWord, sentenceDe, sentenceEn }: QuestionCardProps) {
  return (
    <div data-stub="QuestionCard" className="bg-indigo-light rounded-card p-4">
      {sentenceDe && <p className="text-sm">{sentenceDe}</p>}
      {sentenceEn && <p className="text-xs text-text-muted">{sentenceEn}</p>}
      <p className="font-serif text-3xl text-text-primary">{englishWord}</p>
    </div>
  );
}
