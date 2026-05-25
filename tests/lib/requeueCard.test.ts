import { describe, it, expect } from "vitest";
import { requeueCard } from "@/lib/requeueCard";
import type { QueuedCard } from "@/types";

const makeQueue = (): QueuedCard[] => [
  { card: { id: "a", topic: "t", type: "word", english: "a", german: "x", explanation: "" }, cardState: "unseen", requeueAfter: 0 },
  { card: { id: "b", topic: "t", type: "word", english: "b", german: "y", explanation: "" }, cardState: "unseen", requeueAfter: 5 },
  { card: { id: "c", topic: "t", type: "word", english: "c", german: "z", explanation: "" }, cardState: "weak",   requeueAfter: 3 },
  { card: { id: "d", topic: "t", type: "word", english: "d", german: "w", explanation: "" }, cardState: "mastered", requeueAfter: Infinity },
];

describe("requeueCard", () => {
  it("marks a wrong answer as 'wrong' with requeueAfter 3 or 4", () => {
    const result = requeueCard(makeQueue(), 0, false);
    expect(result[0].cardState).toBe("wrong");
    expect([3, 4]).toContain(result[0].requeueAfter);
  });

  it("promotes an unseen card answered correctly to 'weak' with requeueAfter 7 or 8", () => {
    const result = requeueCard(makeQueue(), 0, true);
    expect(result[0].cardState).toBe("weak");
    expect([7, 8]).toContain(result[0].requeueAfter);
  });

  it("promotes a weak card answered correctly to 'mastered' with requeueAfter Infinity", () => {
    const result = requeueCard(makeQueue(), 2, true);
    expect(result[2].cardState).toBe("mastered");
    expect(result[2].requeueAfter).toBe(Infinity);
  });

  it("re-marks a wrong-state card as 'wrong' when answered wrong again", () => {
    const queue = makeQueue();
    queue[0].cardState = "wrong";
    queue[0].requeueAfter = 4;
    const result = requeueCard(queue, 0, false);
    expect(result[0].cardState).toBe("wrong");
    expect([3, 4]).toContain(result[0].requeueAfter);
  });

  it("decrements requeueAfter on other active cards but not below 0", () => {
    const result = requeueCard(makeQueue(), 0, false);
    expect(result[1].requeueAfter).toBe(4);  // was 5
    expect(result[2].requeueAfter).toBe(2);  // was 3
  });

  it("leaves mastered cards untouched", () => {
    const result = requeueCard(makeQueue(), 0, true);
    expect(result[3].requeueAfter).toBe(Infinity);
    expect(result[3].cardState).toBe("mastered");
  });

  it("does not decrement a card already at requeueAfter 0", () => {
    const queue = makeQueue();
    queue[1].requeueAfter = 0;
    const result = requeueCard(queue, 0, false);
    expect(result[1].requeueAfter).toBe(0);
  });
});
