import type { QueuedCard, CardState } from "@/types";

// requeueAfter cannot exceed (queue.length - 1) — a card scheduled to wait
// longer than the queue itself can never come back inside one cycle, leaving
// the session permanently stuck at a state where no card has elapsed.
const maxRequeueAfter = (queueLength: number) => Math.max(0, queueLength - 1);

export function requeueCard(
  queue: QueuedCard[],
  index: number,
  isCorrect: boolean
): QueuedCard[] {
  const cap = maxRequeueAfter(queue.length);

  return queue.map((q, i) => {
    if (i === index) {
      let cardState: CardState;
      let requeueAfter: number;

      if (!isCorrect) {
        cardState = "wrong";
        requeueAfter = Math.min(cap, 3 + Math.floor(Math.random() * 2)); // 3 or 4, capped
      } else if (q.cardState === "unseen" || q.cardState === "wrong") {
        cardState = "weak";
        requeueAfter = Math.min(cap, 7 + Math.floor(Math.random() * 2)); // 7 or 8, capped
      } else {
        cardState = "mastered";
        requeueAfter = Infinity;
      }

      return { ...q, cardState, requeueAfter };
    }

    if (q.requeueAfter === Infinity) return q;
    return { ...q, requeueAfter: Math.max(0, q.requeueAfter - 1) };
  });
}
