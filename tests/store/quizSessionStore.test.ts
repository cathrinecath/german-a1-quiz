import { describe, it, expect, beforeEach } from "vitest";
import { useQuizSessionStore } from "@/store/quizSessionStore";
import type { QuizCard } from "@/types";

const mockCards: QuizCard[] = [
  { id: "a", topic: "t", type: "word", english: "a", german: "x", explanation: "" },
  { id: "b", topic: "t", type: "word", english: "b", german: "y", explanation: "" },
  { id: "c", topic: "t", type: "word", english: "c", german: "z", explanation: "" },
];

describe("quizSessionStore", () => {
  beforeEach(() => {
    useQuizSessionStore.getState().resetSession();
  });

  it("starts in initial state", () => {
    const state = useQuizSessionStore.getState();
    expect(state.topicName).toBe("");
    expect(state.queue).toHaveLength(0);
    expect(state.sessionComplete).toBe(false);
  });

  it("startSession populates the queue and topic", () => {
    useQuizSessionStore.getState().startSession("Pronouns", mockCards);
    const state = useQuizSessionStore.getState();
    expect(state.topicName).toBe("Pronouns");
    expect(state.queue).toHaveLength(3);
    expect(state.currentCardIndex).toBe(0);
    expect(state.sessionComplete).toBe(false);
  });

  it("submitAnswer records the selected answer and updates state", () => {
    useQuizSessionStore.getState().startSession("Pronouns", mockCards);
    const card0 = useQuizSessionStore.getState().queue[0].card;
    useQuizSessionStore.getState().submitAnswer(card0.german, true);
    const state = useQuizSessionStore.getState();
    expect(state.selectedAnswer).toBe(card0.german);
    expect(state.answerStates[card0.german]).toBe("correct");
    // After 1 correct on an unseen card, state should be weak (not mastered yet)
    expect(state.queue[0].cardState).toBe("weak");
  });

  it("submitAnswer adds wrong answers to missedCards (once)", () => {
    useQuizSessionStore.getState().startSession("Pronouns", mockCards);
    useQuizSessionStore.getState().submitAnswer("wrong-label", false);
    useQuizSessionStore.getState().submitAnswer("wrong-label", false);
    const state = useQuizSessionStore.getState();
    expect(state.missedCards).toHaveLength(1);
  });

  it("advanceToNextCard picks the next card with requeueAfter 0", () => {
    useQuizSessionStore.getState().startSession("Pronouns", mockCards);
    const card0 = useQuizSessionStore.getState().queue[0].card;
    useQuizSessionStore.getState().submitAnswer(card0.german, true);
    const before = useQuizSessionStore.getState().currentCardIndex;
    useQuizSessionStore.getState().advanceToNextCard();
    const after = useQuizSessionStore.getState().currentCardIndex;
    expect(after).not.toBe(before);
    expect(useQuizSessionStore.getState().sessionComplete).toBe(false);
  });

  it("resetSession clears all state", () => {
    useQuizSessionStore.getState().startSession("Pronouns", mockCards);
    const card0 = useQuizSessionStore.getState().queue[0].card;
    useQuizSessionStore.getState().submitAnswer(card0.german, true);
    useQuizSessionStore.getState().resetSession();
    const state = useQuizSessionStore.getState();
    expect(state.topicName).toBe("");
    expect(state.queue).toHaveLength(0);
    expect(state.masteredCards).toHaveLength(0);
    expect(state.missedCards).toHaveLength(0);
  });

  it("can fully master an 8-card session — every card reaches 'mastered' before sessionComplete", () => {
    // Regression for: requeueAfter values (7 or 8) used to exceed the
    // 8-card cycle length, leaving every card permanently weak and causing
    // sessionComplete to fire with 0 mastered. requeueAfter is now capped
    // at queue.length - 1 so cards always have time to come back.
    const eightCards = Array.from({ length: 8 }, (_, i) => ({
      id: `c${i}`,
      topic: "greetings",
      type: "word" as const,
      english: `english-${i}`,
      german: `german-${i}`,
      explanation: "",
    }));

    const store = useQuizSessionStore;
    store.getState().startSession("Greetings", eightCards);

    // Answer every presented card correctly until the session ends. Cap at
    // 100 turns so a hypothetical infinite loop fails the test loudly.
    let turns = 0;
    while (!store.getState().sessionComplete && turns < 100) {
      const { queue, currentCardIndex } = store.getState();
      const current = queue[currentCardIndex].card;
      store.getState().submitAnswer(current.german, true);
      store.getState().advanceToNextCard();
      turns++;
    }

    const state = store.getState();
    expect(state.sessionComplete).toBe(true);
    expect(state.masteredCards).toHaveLength(8);
    expect(state.queue.every((q) => q.cardState === "mastered")).toBe(true);
  });
});
