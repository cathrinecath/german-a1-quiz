"use client";

import { useState } from "react";
import type { CardType } from "@/types";

interface QuestionCardProps {
  type: CardType;
  englishWord: string;
  sentenceDe?: string;
  sentenceEn?: string;
}

export function QuestionCard({ type, englishWord, sentenceDe, sentenceEn }: QuestionCardProps) {
  const [translationRevealed, setTranslationRevealed] = useState(false);
  const isFormingQuestion = type === "question";

  return (
    <div className="bg-indigo-light rounded-card px-4 py-5 text-center space-y-1">
      {sentenceDe && (
        <p
          className={
            isFormingQuestion
              ? "font-serif text-[22px] leading-snug text-text-primary"
              : "text-[13px] text-text-body"
          }
        >
          {sentenceDe}
        </p>
      )}

      {isFormingQuestion && (
        <p className="text-xs text-text-muted">Which question fits?</p>
      )}

      {!isFormingQuestion && englishWord && (
        <p className="font-serif text-[32px] leading-tight text-text-primary pt-1">
          {englishWord}
        </p>
      )}

      {sentenceEn && (
        <div className="min-h-[44px] flex items-center justify-center pt-1">
          {translationRevealed ? (
            <p className="text-xs text-text-muted">{sentenceEn}</p>
          ) : (
            <button
              type="button"
              onClick={() => setTranslationRevealed(true)}
              className="text-xs text-indigo-app underline px-3 py-2"
            >
              Show translation
            </button>
          )}
        </div>
      )}
    </div>
  );
}
