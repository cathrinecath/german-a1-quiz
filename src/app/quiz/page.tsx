"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuizSessionStore } from "@/store/quizSessionStore";
import { getDistractorPool } from "@/data/cards";
import { pickDistractors } from "@/lib/pickDistractors";
import { getAdvanceMode } from "@/lib/getAdvanceMode";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { InfoZone } from "@/components/quiz/InfoZone";
import { OptionGrid } from "@/components/quiz/OptionGrid";
import { NextButton } from "@/components/quiz/NextButton";
import { ExitConfirmDialog } from "@/components/quiz/ExitConfirmDialog";

export default function QuizPage() {
  const router = useRouter();
  const {
    topicName,
    queue,
    currentCardIndex,
    masteredCards,
    selectedAnswer,
    answerStates,
    sessionComplete,
    submitAnswer,
    advanceToNextCard,
    resetSession,
  } = useQuizSessionStore();

  const queued = queue[currentCardIndex];
  const card = queued?.card;

  useEffect(() => {
    if (sessionComplete) router.push("/result");
  }, [sessionComplete, router]);

  const advanceMode = getAdvanceMode(
    selectedAnswer ? answerStates[selectedAnswer] : undefined,
    Boolean(card?.tip),
  );

  useEffect(() => {
    if (advanceMode !== "auto") return;
    const t = setTimeout(advanceToNextCard, 700);
    return () => clearTimeout(t);
  }, [advanceMode, advanceToNextCard]);

  const options = useMemo(
    () => (card ? pickDistractors(card, getDistractorPool(card.topic)) : []),
    [card],
  );

  if (!card) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-text-muted">No active session.</p>
        <button
          onClick={() => router.push("/")}
          className="w-full bg-indigo-app text-white rounded-btn min-h-[44px] py-2 text-sm font-medium"
        >
          Pick a topic
        </button>
      </div>
    );
  }

  const handleExit = () => {
    resetSession();
    router.push("/");
  };

  const wasWrong = selectedAnswer
    ? answerStates[selectedAnswer] === "wrong"
    : false;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <ExitConfirmDialog onConfirm={handleExit} />
        <div className="flex-1">
          <ProgressBar
            topicName={topicName}
            masteredCount={masteredCards.length}
            totalCount={queue.length}
          />
        </div>
      </div>
      <QuestionCard
        key={card.id}
        type={card.type}
        englishWord={card.english}
        sentenceDe={card.sentenceDe}
        sentenceEn={card.sentenceEn}
      />
      <InfoZone
        explanation={wasWrong ? card.explanation : undefined}
        tip={selectedAnswer ? card.tip : undefined}
      />
      <OptionGrid
        options={options}
        selectedAnswer={selectedAnswer}
        correctAnswer={card.german}
        onSelect={(label) => submitAnswer(label, label === card.german)}
      />
      {advanceMode === "next-button" && <NextButton onNext={advanceToNextCard} />}
    </div>
  );
}
