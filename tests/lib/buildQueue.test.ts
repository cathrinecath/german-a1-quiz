import { describe, it, expect } from "vitest";
import { buildQueue } from "@/lib/buildQueue";
import type { QuizCard } from "@/types";

const mockCards: QuizCard[] = [
  { id: "a", topic: "t", type: "word", english: "a", german: "x", explanation: "" },
  { id: "b", topic: "t", type: "word", english: "b", german: "y", explanation: "" },
  { id: "c", topic: "t", type: "word", english: "c", german: "z", explanation: "" },
];

describe("buildQueue", () => {
  it("returns one QueuedCard per input card", () => {
    const queue = buildQueue(mockCards);
    expect(queue).toHaveLength(mockCards.length);
  });

  it("wraps every card with state 'unseen' and requeueAfter 0", () => {
    const queue = buildQueue(mockCards);
    queue.forEach((q) => {
      expect(q.cardState).toBe("unseen");
      expect(q.requeueAfter).toBe(0);
    });
  });

  it("preserves all original cards", () => {
    const queue = buildQueue(mockCards);
    const ids = queue.map((q) => q.card.id).sort();
    expect(ids).toEqual(["a", "b", "c"]);
  });
});
