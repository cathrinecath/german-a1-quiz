"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TOPIC_LABELS, getAllTopics, getSessionCards, getSessionSize } from "@/data/cards";
import { TopicCard } from "@/components/topic/TopicCard";
import { useQuizSessionStore } from "@/store/quizSessionStore";

export default function TopicPickerPage() {
  const router = useRouter();
  const startSession = useQuizSessionStore((s) => s.startSession);
  const [selected, setSelected] = useState<string | null>(null);

  const handleStart = () => {
    if (!selected) return;
    startSession(TOPIC_LABELS[selected], getSessionCards(selected));
    router.push("/quiz");
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-base font-medium text-text-primary text-center">
        Pick a topic
      </h1>

      <div className="flex flex-col gap-2">
        {getAllTopics().map((key) => {
          const total = getSessionSize(key);
          return (
            <TopicCard
              key={key}
              topicName={TOPIC_LABELS[key]}
              masteredCount={0}
              totalCount={total}
              isSelected={selected === key}
              onSelect={() => setSelected(key)}
            />
          );
        })}
      </div>

      <div className="space-y-1">
        <button
          type="button"
          onClick={handleStart}
          disabled={!selected}
          className="w-full bg-indigo-app text-white rounded-btn min-h-[44px] py-2 text-sm font-semibold disabled:opacity-50 hover:bg-indigo-app/90 transition-colors"
        >
          Start session
        </button>
        <p className="text-xs text-center text-text-muted italic">
          EN→DE · score resets on refresh
        </p>
      </div>
    </div>
  );
}
