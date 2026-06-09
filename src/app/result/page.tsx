"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizSessionStore } from "@/store/quizSessionStore";
import { getSessionCards } from "@/data/cards";
import { ScoreDisplay } from "@/components/result/ScoreDisplay";
import { BreakdownCard } from "@/components/result/BreakdownCard";
import { MissedWordList } from "@/components/result/MissedWordList";

export default function ResultPage() {
  const router = useRouter();
  const { topicName, queue, missedCards, startSession, resetSession } =
    useQuizSessionStore();

  const total = queue.length;
  // Per spec: score = cards answered correctly on first attempt (no wrongs).
  // All cards reach the state-machine 'mastered' state before the session
  // ends, so masteredCards.length is always total — useless as a score.
  const masteredCount = total - missedCards.length;
  const weakCount = missedCards.length;
  const isPerfect = total > 0 && weakCount === 0;
  const topicKey = queue[0]?.card.topic;

  useEffect(() => {
    if (total === 0) router.push("/");
  }, [total, router]);

  const goHome = () => {
    resetSession();
    router.push("/");
  };

  const retryMissed = () => {
    if (missedCards.length === 0) return;
    startSession(topicName, missedCards);
    router.push("/quiz");
  };

  const retryAll = () => {
    if (!topicKey) return;
    startSession(topicName, getSessionCards(topicKey));
    router.push("/quiz");
  };

  if (total === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <ScoreDisplay masteredCount={masteredCount} totalCount={total} />
      <p className="text-center text-text-muted text-xs">
        {topicName}
        {isPerfect ? " — all mastered!" : " — mastered this session"}
      </p>
      <BreakdownCard masteredCount={masteredCount} weakCount={weakCount} />
      {isPerfect ? (
        <div className="bg-correct-bg rounded-card p-3 text-center text-sm text-text-body font-medium">
          All done! Great work.
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <p className="text-xs text-text-muted">You missed:</p>
            <MissedWordList words={missedCards.map((c) => c.german)} />
          </div>
          <button
            type="button"
            onClick={retryMissed}
            className="w-full min-h-[44px] rounded-btn border border-wrong-bg bg-wrong-bg text-red-700 px-3 py-2 text-sm font-medium"
          >
            Retry missed only
          </button>
        </>
      )}
      <button
        type="button"
        onClick={retryAll}
        className="w-full min-h-[44px] rounded-btn border border-border-subtle bg-bg-card px-3 py-2 text-sm font-medium text-text-body"
      >
        Try full topic again
      </button>
      <button
        type="button"
        onClick={goHome}
        className="w-full min-h-[44px] rounded-btn bg-indigo-app text-white px-3 py-2 text-sm font-semibold hover:bg-indigo-app/90 transition-colors"
      >
        Pick new topic
      </button>
    </div>
  );
}
