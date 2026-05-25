import type { QueuedCard, CardState } from "@/types";

export function requeueCard(
  queue: QueuedCard[],
  index: number,
  isCorrect: boolean
): QueuedCard[] {
  return queue.map((q, i) => {
    if (i === index) {
      let cardState: CardState;
      let requeueAfter: number;

      if (!isCorrect) {
        cardState = "wrong";
        requeueAfter = 3 + Math.floor(Math.random() * 2); // 3 or 4
      } else if (q.cardState === "unseen" || q.cardState === "wrong") {
        cardState = "weak";
        requeueAfter = 7 + Math.floor(Math.random() * 2); // 7 or 8
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
