import { describe, it, expect } from "vitest";
import { requeueCard } from "@/lib/requeueCard";
import type { QueuedCard, QuizCard } from "@/types";

const makeCard = (id: string): QuizCard => ({
  id,
  topic: "t",
  type: "word",
  english: id,
  german: `de-${id}`,
  explanation: "",
});

// 10-card queue: large enough that the requeueAfter cap (queueLength - 1 = 9)
// doesn't clamp the designed intervals of 3-4 (wrong) or 7-8 (weak).
const makeQueue = (): QueuedCard[] => [
  { card: makeCard("a"), cardState: "unseen",   requeueAfter: 0 },
  { card: makeCard("b"), cardState: "unseen",   requeueAfter: 5 },
  { card: makeCard("c"), cardState: "weak",     requeueAfter: 3 },
  { card: makeCard("d"), cardState: "mastered", requeueAfter: Infinity },
  { card: makeCard("e"), cardState: "unseen",   requeueAfter: 0 },
  { card: makeCard("f"), cardState: "unseen",   requeueAfter: 0 },
  { card: makeCard("g"), cardState: "unseen",   requeueAfter: 0 },
  { card: makeCard("h"), cardState: "unseen",   requeueAfter: 0 },
  { card: makeCard("i"), cardState: "unseen",   requeueAfter: 0 },
  { card: makeCard("j"), cardState: "unseen",   requeueAfter: 0 },
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

  it("caps requeueAfter at queue.length - 1 so the card can always come back in one cycle", () => {
    // 8-card queue: weak interval (7 or 8) would otherwise exceed cycle length
    const eightCardQueue: QueuedCard[] = Array.from({ length: 8 }, (_, i) => ({
      card: makeCard(`card-${i}`),
      cardState: "unseen",
      requeueAfter: 0,
    }));
    const result = requeueCard(eightCardQueue, 0, true);
    expect(result[0].cardState).toBe("weak");
    // Cap = 8 - 1 = 7. So the value must be exactly 7 (since 7 or 8 both clamp to 7).
    expect(result[0].requeueAfter).toBe(7);
  });
});
