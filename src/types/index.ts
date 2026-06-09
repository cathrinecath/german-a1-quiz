export type CardType = "word" | "gender" | "question";
export type CardState = "unseen" | "wrong" | "weak" | "mastered";
export type AnswerState = "unanswered" | "correct" | "wrong" | "dimmed";

export interface QuizCard {
  id: string;
  topic: string;
  type: CardType;
  english: string;
  german: string;
  sentenceDe?: string;
  sentenceEn?: string;
  explanation: string;
  tip?: string;
}

export interface QueuedCard {
  card: QuizCard;
  cardState: CardState;
  requeueAfter: number;
}

export interface SessionResult {
  topicName: string;
  masteredCards: QuizCard[];
  missedCards: QuizCard[];
  totalCards: number;
}
