"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TOPIC_LABELS, getAllTopics, getCardsByTopic } from "@/data/cards";
import { TopicCard } from "@/components/topic/TopicCard";
import { useQuizSessionStore } from "@/store/quizSessionStore";

export default function TopicPickerPage() {
  const router = useRouter();
  const startSession = useQuizSessionStore((s) => s.startSession);
  const [selected, setSelected] = useState<string | null>(null);

  const handleStart = () => {
    if (!selected) return;
    const cards = getCardsByTopic(selected);
    startSession(TOPIC_LABELS[selected], cards);
    router.push("/quiz");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-base font-medium text-text-primary">Pick a topic</h1>

      <div className="flex flex-col gap-2">
        {getAllTopics().map((key) => {
          const total = getCardsByTopic(key).length;
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

      <button
        onClick={handleStart}
        disabled={!selected}
        className="w-full bg-indigo-app text-white rounded-btn min-h-[44px] py-2 text-sm font-medium disabled:opacity-50"
      >
        Start session
      </button>
      <p className="text-xs text-center text-text-muted">
        EN→DE · score resets on refresh
      </p>
    </div>
  );
}
