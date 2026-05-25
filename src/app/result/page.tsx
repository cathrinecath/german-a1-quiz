"use client";

import { useRouter } from "next/navigation";
import { useQuizSessionStore } from "@/store/quizSessionStore";
import { ScoreDisplay } from "@/components/result/ScoreDisplay";
import { BreakdownCard } from "@/components/result/BreakdownCard";
import { MissedWordList } from "@/components/result/MissedWordList";

export default function ResultPage() {
  const router = useRouter();
  const { topicName, queue, masteredCards, missedCards, resetSession } =
    useQuizSessionStore();

  const total = queue.length;
  const weakCount = total - masteredCards.length;
  const missedWords = missedCards.map((c) => c.german);

  const goHome = () => {
    resetSession();
    router.push("/");
  };

  return (
    <div className="space-y-4">
      <ScoreDisplay masteredCount={masteredCards.length} totalCount={total} />
      <p className="text-center text-text-muted text-sm">{topicName}</p>
      <BreakdownCard masteredCount={masteredCards.length} weakCount={weakCount} />
      <MissedWordList words={missedWords} />
      <button
        onClick={goHome}
        className="w-full bg-indigo-app text-white rounded-btn min-h-[44px] py-2 text-sm font-medium"
      >
        Pick new topic
      </button>
    </div>
  );
}
