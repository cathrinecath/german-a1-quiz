"use client";

import { useQuizSessionStore } from "@/store/quizSessionStore";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { InfoZone } from "@/components/quiz/InfoZone";
import { OptionGrid } from "@/components/quiz/OptionGrid";
import { NextButton } from "@/components/quiz/NextButton";

export default function QuizPage() {
  const {
    topicName,
    queue,
    currentCardIndex,
    masteredCards,
    selectedAnswer,
    answerStates,
    submitAnswer,
    advanceToNextCard,
  } = useQuizSessionStore();

  const queued = queue[currentCardIndex];
  if (!queued) {
    return <p data-stub="QuizPage-empty">No active card. Pick a topic first.</p>;
  }

  const { card } = queued;

  return (
    <div className="space-y-4">
      <ProgressBar
        topicName={topicName}
        masteredCount={masteredCards.length}
        totalCount={queue.length}
      />
      <QuestionCard
        englishWord={card.english}
        sentenceDe={card.sentenceDe}
        sentenceEn={card.sentenceEn}
      />
      <InfoZone
        explanation={selectedAnswer ? card.explanation : undefined}
        tip={selectedAnswer ? card.tip : undefined}
      />
      <OptionGrid
        options={[card.german]} /* stub: real distractors wired up later */
        answerStates={answerStates}
        onSelect={(label) => submitAnswer(label, label === card.german)}
      />
      {selectedAnswer && <NextButton onNext={advanceToNextCard} />}
    </div>
  );
}
