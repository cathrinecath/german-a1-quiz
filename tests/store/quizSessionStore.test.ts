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
});
