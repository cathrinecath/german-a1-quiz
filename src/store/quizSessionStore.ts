import { create } from "zustand";
import type { QuizCard, QueuedCard, AnswerState } from "@/types";
import { buildQueue } from "@/lib/buildQueue";
import { requeueCard } from "@/lib/requeueCard";

interface QuizSessionState {
  topicName: string;
  queue: QueuedCard[];
  currentCardIndex: number;
  masteredCards: QuizCard[];
  missedCards: QuizCard[];
  selectedAnswer: string | null;
  answerStates: Record<string, AnswerState>;
  sessionComplete: boolean;

  startSession: (topicName: string, cards: QuizCard[]) => void;
  submitAnswer: (label: string, isCorrect: boolean) => void;
  advanceToNextCard: () => void;
  resetSession: () => void;
}

const initialState = {
  topicName: "",
  queue: [],
  currentCardIndex: 0,
  masteredCards: [],
  missedCards: [],
  selectedAnswer: null,
  answerStates: {},
  sessionComplete: false,
};

export const useQuizSessionStore = create<QuizSessionState>((set, get) => ({
  ...initialState,

  startSession: (topicName, cards) => {
    set({
      ...initialState,
      topicName,
      queue: buildQueue(cards),
    });
  },

  submitAnswer: (label, isCorrect) => {
    const { queue, currentCardIndex, masteredCards, missedCards } = get();
    const current = queue[currentCardIndex];
    if (!current) return;

    const updatedQueue = requeueCard(queue, currentCardIndex, isCorrect);
    const updatedCard = updatedQueue[currentCardIndex];

    const newMastered =
      updatedCard.cardState === "mastered"
        ? [...masteredCards, current.card]
        : masteredCards;

    const newMissed =
      !isCorrect && !missedCards.find((c) => c.id === current.card.id)
        ? [...missedCards, current.card]
        : missedCards;

    set({
      queue: updatedQueue,
      masteredCards: newMastered,
      missedCards: newMissed,
      selectedAnswer: label,
      answerStates: { [label]: isCorrect ? "correct" : "wrong" },
    });
  },

  advanceToNextCard: () => {
    const { queue, currentCardIndex } = get();
    const total = queue.length;
    for (let offset = 1; offset <= total; offset++) {
      const i = (currentCardIndex + offset) % total;
      if (queue[i].cardState !== "mastered" && queue[i].requeueAfter === 0) {
        set({ currentCardIndex: i, selectedAnswer: null, answerStates: {} });
        return;
      }
    }
    set({ sessionComplete: true });
  },

  resetSession: () => set({ ...initialState }),
}));
