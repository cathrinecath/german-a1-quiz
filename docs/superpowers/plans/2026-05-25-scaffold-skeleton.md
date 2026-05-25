# German A1 Quiz App — Skeleton Scaffold Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js 14 project skeleton for the German A1 Quiz app: full directory structure, types, design tokens, Zustand store, TDD-tested lib functions, and component stubs. No card data, no real component visuals. The skeleton type-checks, builds, runs, and passes all tests.

**Architecture:** Next.js 14 App Router with TypeScript + Tailwind. Three routes (`/`, `/quiz`, `/result`). Single Zustand store for session state. Pure-function lib for queue and spaced-repetition logic (TDD-tested with Vitest). Empty data layer (`cards: []` plus topic helpers). Components are typed stubs that render minimal markup so pages compile.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui, Zustand, Vitest + React Testing Library, Google Fonts (DM Sans + Fraunces).

---

## Notes for the implementer

- **Follow the Technical Design Doc exactly.** Folder structure is feature-based (`quiz/`, `topic/`, `result/`), not atomic design. The spec is authoritative.
- **Component stubs render minimal markup** — a `<div>` with the component name plus its typed props. Real visuals come after skeleton verification.
- **`cards.ts` ships with `cards: []`.** `TOPIC_LABELS`, `getCardsByTopic`, `getAllTopics` are wired up with correct types.
- **TDD applies to lib + store only.** Component stubs and pages get no tests in the skeleton phase.
- **Commit after every task** with a descriptive message. The plan calls out the commit step explicitly.
- **Working directory** is `/home/cath/Desktop/projects/german-a1-quiz` for every command unless stated otherwise.
- **All `npx`/`npm` commands** assume Node 20+ and npm 10+. Verify with `node -v && npm -v` if anything fails.

## Final file structure

```
~/Desktop/projects/german-a1-quiz/
├── docs/superpowers/plans/2026-05-25-scaffold-skeleton.md   ← this plan
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← root, fonts, mobile wrapper, global styles
│   │   ├── page.tsx                ← Screen 1: Topic picker (stub)
│   │   ├── quiz/page.tsx           ← Screen 2: Quiz question (stub)
│   │   └── result/page.tsx         ← Screen 3: Session result (stub)
│   ├── components/
│   │   ├── quiz/
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── InfoZone.tsx
│   │   │   ├── OptionGrid.tsx
│   │   │   ├── OptionButton.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── NextButton.tsx
│   │   ├── topic/
│   │   │   └── TopicCard.tsx
│   │   ├── result/
│   │   │   ├── ScoreDisplay.tsx
│   │   │   ├── BreakdownCard.tsx
│   │   │   └── MissedWordList.tsx
│   │   └── ui/                     ← shadcn/ui (Button + AlertDialog)
│   ├── store/
│   │   └── quizSessionStore.ts
│   ├── data/
│   │   └── cards.ts                ← empty array + topic helpers
│   ├── types/
│   │   └── index.ts
│   ├── lib/
│   │   ├── buildQueue.ts
│   │   ├── requeueCard.ts
│   │   ├── pickDistractors.ts
│   │   ├── shuffleArray.ts
│   │   └── utils.ts                ← shadcn cn() helper
│   └── styles/
│       └── globals.css             ← Tailwind base + CSS custom properties
├── tests/
│   ├── setup.ts
│   ├── lib/
│   │   ├── shuffleArray.test.ts
│   │   ├── buildQueue.test.ts
│   │   ├── requeueCard.test.ts
│   │   └── pickDistractors.test.ts
│   └── store/
│       └── quizSessionStore.test.ts
├── tailwind.config.ts
├── vitest.config.ts
├── tsconfig.json
├── components.json                 ← shadcn config
└── package.json
```

---

## Task 1: Initialize Next.js 14 project

**Files:**
- Create: entire Next.js scaffold inside `/home/cath/Desktop/projects/german-a1-quiz/`

- [ ] **Step 1: Verify directory state**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && ls -la
```
Expected: only `docs/` folder present.

- [ ] **Step 2: Run create-next-app inside the existing directory**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx --yes create-next-app@14 . \
    --typescript \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --use-npm \
    --import-alias "@/*"
```
Expected: scaffolds Next.js 14, leaves the existing `docs/` folder untouched, initializes git, runs `npm install`.

- [ ] **Step 3: Verify the install**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  cat package.json | grep '"next"' && \
  ls src/app
```
Expected: `"next": "14.x.x"` in dependencies. `src/app/` contains `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`.

- [ ] **Step 4: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "chore: scaffold Next.js 14 project"
```

---

## Task 2: Install state, testing, and font dependencies

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install runtime dependencies**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npm install zustand
```

- [ ] **Step 2: Install dev dependencies for testing**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npm install -D vitest @vitejs/plugin-react jsdom \
    @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Verify**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  cat package.json | grep -E '"zustand"|"vitest"|"@testing-library/react"'
```
Expected: all three present.

- [ ] **Step 4: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "chore: add zustand and vitest test deps"
```

---

## Task 3: Initialize shadcn/ui and install Button + AlertDialog

**Files:**
- Create: `components.json`
- Create: `src/lib/utils.ts` (shadcn cn helper)
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/alert-dialog.tsx`
- Modify: `src/app/globals.css` (shadcn appends CSS variables)
- Modify: `tailwind.config.ts` (shadcn extends config)

- [ ] **Step 1: Run shadcn init with defaults**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx --yes shadcn@latest init -d
```
Expected: creates `components.json`, `src/lib/utils.ts`, updates `tailwind.config.ts`, appends shadcn HSL variables to `src/app/globals.css`. Picks `New York` style, `Zinc` base color, CSS variables enabled.

- [ ] **Step 2: Add Button and AlertDialog**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx --yes shadcn@latest add button alert-dialog
```
Expected: creates `src/components/ui/button.tsx` and `src/components/ui/alert-dialog.tsx`.

- [ ] **Step 3: Verify**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  ls src/components/ui src/lib && cat components.json
```
Expected: `button.tsx`, `alert-dialog.tsx` in `src/components/ui`. `utils.ts` in `src/lib`. `components.json` exists.

- [ ] **Step 4: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "chore: init shadcn/ui with Button and AlertDialog"
```

---

## Task 4: Configure Vitest

**Files:**
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Modify: `package.json` (add test scripts)

- [ ] **Step 1: Create `vitest.config.ts`**

Create `/home/cath/Desktop/projects/german-a1-quiz/vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 2: Create `tests/setup.ts`**

Create `/home/cath/Desktop/projects/german-a1-quiz/tests/setup.ts`:
```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 3: Add test scripts to package.json**

In `package.json`, add to the `"scripts"` block:
```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 4: Verify Vitest can start (no tests yet, should report 0 files)**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run
```
Expected: exits cleanly. Output mentions "No test files found" or similar — that is OK at this stage.

- [ ] **Step 5: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "chore: configure Vitest with jsdom and RTL setup"
```

---

## Task 5: Move globals.css to `src/styles/` and add design tokens

**Files:**
- Move: `src/app/globals.css` → `src/styles/globals.css`
- Modify: `src/styles/globals.css` (add semantic color tokens)
- Modify: `src/app/layout.tsx` (update import path)

- [ ] **Step 1: Create styles directory and move globals.css**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  mkdir -p src/styles && \
  git mv src/app/globals.css src/styles/globals.css
```

- [ ] **Step 2: Update the import in layout.tsx**

Open `/home/cath/Desktop/projects/german-a1-quiz/src/app/layout.tsx` and replace the line:
```tsx
import "./globals.css";
```
with:
```tsx
import "@/styles/globals.css";
```

- [ ] **Step 3: Append semantic design tokens to globals.css**

Open `/home/cath/Desktop/projects/german-a1-quiz/src/styles/globals.css`. Below the existing shadcn `@layer base` block (which contains `--background`, `--foreground`, etc.), append:

```css
@layer base {
  :root {
    /* App semantic palette (from Technical Design Doc) */
    --color-bg-app: #F5F0E8;
    --color-bg-card: #EDE9E0;
    --color-bg-surface: #FFF8F0;
    --color-border-subtle: #D4CEBF;
    --color-text-primary: #2D2A3E;
    --color-text-body: #5A5248;
    --color-text-muted: #8A7F72;
    --color-indigo: #5B55C2;
    --color-indigo-light: #EAE6FD;
    --color-correct-bg: #E2F5EC;
    --color-wrong-bg: #FDE8E8;
  }

  html, body {
    overflow-x: hidden;
  }
}
```

- [ ] **Step 4: Verify the dev server still boots**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx next build
```
Expected: build succeeds. No "globals.css not found" errors.

- [ ] **Step 5: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(styles): move globals to src/styles and add semantic design tokens"
```

---

## Task 6: Extend Tailwind config with semantic tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace the `theme.extend` block**

Open `/home/cath/Desktop/projects/german-a1-quiz/tailwind.config.ts`. Locate the `theme: { extend: { ... } }` block (which shadcn populated with HSL color tokens, container, keyframes, etc.). **Keep** the shadcn additions and **add** the following inside `extend`:

```ts
colors: {
  // ...keep existing shadcn HSL color entries here...
  'bg-app':         'var(--color-bg-app)',
  'bg-card':        'var(--color-bg-card)',
  'bg-surface':     'var(--color-bg-surface)',
  'border-subtle':  'var(--color-border-subtle)',
  'text-primary':   'var(--color-text-primary)',
  'text-body':      'var(--color-text-body)',
  'text-muted':     'var(--color-text-muted)',
  'indigo-app':     'var(--color-indigo)',
  'indigo-light':   'var(--color-indigo-light)',
  'correct-bg':     'var(--color-correct-bg)',
  'wrong-bg':       'var(--color-wrong-bg)',
},
fontFamily: {
  sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
  serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
},
borderRadius: {
  // keep shadcn's lg/md/sm entries...
  'app':  '24px',
  'card': '16px',
  'btn':  '12px',
  'opt':  '10px',
  'pill': '999px',
},
```

> Note: `indigo-app` avoids collision with Tailwind's default `indigo-500` palette.

- [ ] **Step 2: Sanity-check by running build**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx next build
```
Expected: succeeds. No Tailwind warnings about unknown utilities.

- [ ] **Step 3: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(styles): extend Tailwind theme with semantic tokens"
```

---

## Task 7: Wire up fonts and mobile-layout wrapper in root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `/home/cath/Desktop/projects/german-a1-quiz/src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "@/styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "German A1 Quiz",
  description: "Learn basic German vocabulary through a focused quiz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="bg-bg-app text-text-body font-sans min-h-screen flex justify-center">
        <main className="w-full max-w-[390px] px-5 py-6 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx next build
```
Expected: succeeds. Fonts download during build.

- [ ] **Step 3: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(layout): wire up DM Sans + Fraunces and mobile wrapper"
```

---

## Task 8: Define TypeScript types

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Create the types file**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/types/index.ts`:
```ts
export type CardType = "word" | "gender";
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
```

- [ ] **Step 2: Type-check**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(types): add card, state, and session result types"
```

---

## Task 9: Create empty cards.ts with topic helpers

**Files:**
- Create: `src/data/cards.ts`

- [ ] **Step 1: Create the file**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/data/cards.ts`:
```ts
import type { QuizCard } from "@/types";

export const TOPIC_LABELS: Record<string, string> = {
  pronouns:      "Pronouns",
  sein:          "Sein — to be",
  haben:         "Haben — to have",
  greetings:     "Greetings",
  numbers:       "Numbers",
  questionWords: "Question words",
  nounGender:    "Noun gender",
  commonVerbs:   "Common verbs",
};

export const cards: QuizCard[] = [];

export function getCardsByTopic(topic: string): QuizCard[] {
  return cards.filter((card) => card.topic === topic);
}

export function getAllTopics(): string[] {
  return Object.keys(TOPIC_LABELS);
}
```

- [ ] **Step 2: Type-check**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(data): add empty cards array and topic helpers"
```

---

## Task 10: TDD `shuffleArray` (Fisher–Yates)

**Files:**
- Create: `tests/lib/shuffleArray.test.ts`
- Create: `src/lib/shuffleArray.ts`

- [ ] **Step 1: Write the failing test**

Create `/home/cath/Desktop/projects/german-a1-quiz/tests/lib/shuffleArray.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { shuffleArray } from "@/lib/shuffleArray";

describe("shuffleArray", () => {
  it("returns an array of the same length", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result).toHaveLength(input.length);
  });

  it("contains the same elements as the input", () => {
    const input = ["a", "b", "c", "d"];
    const result = shuffleArray(input);
    expect(result.sort()).toEqual([...input].sort());
  });

  it("does not mutate the input array", () => {
    const input = [1, 2, 3];
    const snapshot = [...input];
    shuffleArray(input);
    expect(input).toEqual(snapshot);
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run tests/lib/shuffleArray.test.ts
```
Expected: fails — module `@/lib/shuffleArray` not found.

- [ ] **Step 3: Implement**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/lib/shuffleArray.ts`:
```ts
export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
```

- [ ] **Step 4: Run the test, expect pass**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run tests/lib/shuffleArray.test.ts
```
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(lib): add shuffleArray with Fisher-Yates"
```

---

## Task 11: TDD `buildQueue`

**Files:**
- Create: `tests/lib/buildQueue.test.ts`
- Create: `src/lib/buildQueue.ts`

- [ ] **Step 1: Write the failing test**

Create `/home/cath/Desktop/projects/german-a1-quiz/tests/lib/buildQueue.test.ts`:
```ts
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
```

- [ ] **Step 2: Run, expect fail**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run tests/lib/buildQueue.test.ts
```
Expected: fails — module not found.

- [ ] **Step 3: Implement**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/lib/buildQueue.ts`:
```ts
import type { QuizCard, QueuedCard } from "@/types";
import { shuffleArray } from "./shuffleArray";

export function buildQueue(cards: QuizCard[]): QueuedCard[] {
  return shuffleArray(cards).map((card) => ({
    card,
    cardState: "unseen",
    requeueAfter: 0,
  }));
}
```

- [ ] **Step 4: Run, expect pass**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run tests/lib/buildQueue.test.ts
```
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(lib): add buildQueue"
```

---

## Task 12: TDD `requeueCard`

**Files:**
- Create: `tests/lib/requeueCard.test.ts`
- Create: `src/lib/requeueCard.ts`

- [ ] **Step 1: Write the failing test**

Create `/home/cath/Desktop/projects/german-a1-quiz/tests/lib/requeueCard.test.ts`:
```ts
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
```

- [ ] **Step 2: Run, expect fail**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run tests/lib/requeueCard.test.ts
```
Expected: fails — module not found.

- [ ] **Step 3: Implement**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/lib/requeueCard.ts`:
```ts
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
```

- [ ] **Step 4: Run, expect pass**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run tests/lib/requeueCard.test.ts
```
Expected: 7 tests pass.

- [ ] **Step 5: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(lib): add requeueCard with spaced-repetition intervals"
```

---

## Task 13: TDD `pickDistractors`

**Files:**
- Create: `tests/lib/pickDistractors.test.ts`
- Create: `src/lib/pickDistractors.ts`

- [ ] **Step 1: Write the failing test**

Create `/home/cath/Desktop/projects/german-a1-quiz/tests/lib/pickDistractors.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { pickDistractors } from "@/lib/pickDistractors";
import type { QuizCard } from "@/types";

const wordCards: QuizCard[] = [
  { id: "p-ich", topic: "pronouns", type: "word", english: "I",   german: "ich", explanation: "" },
  { id: "p-du",  topic: "pronouns", type: "word", english: "you", german: "du",  explanation: "" },
  { id: "p-er",  topic: "pronouns", type: "word", english: "he",  german: "er",  explanation: "" },
  { id: "p-sie", topic: "pronouns", type: "word", english: "she", german: "sie", explanation: "" },
  { id: "p-wir", topic: "pronouns", type: "word", english: "we",  german: "wir", explanation: "" },
];

describe("pickDistractors — word cards", () => {
  it("returns exactly 4 options", () => {
    const result = pickDistractors(wordCards[0], wordCards);
    expect(result).toHaveLength(4);
  });

  it("always includes the correct answer", () => {
    const result = pickDistractors(wordCards[0], wordCards);
    expect(result).toContain("ich");
  });

  it("does not include the correct answer twice (uniqueness)", () => {
    const result = pickDistractors(wordCards[0], wordCards);
    const ichCount = result.filter((r) => r === "ich").length;
    expect(ichCount).toBe(1);
  });

  it("only uses german values from the same topic", () => {
    const result = pickDistractors(wordCards[0], wordCards);
    const validGermans = wordCards.map((c) => c.german);
    result.forEach((option) => {
      expect(validGermans).toContain(option);
    });
  });
});

describe("pickDistractors — gender cards", () => {
  const genderCard: QuizCard = {
    id: "g-hund", topic: "nounGender", type: "gender",
    english: "dog", german: "der", explanation: "",
  };

  it("returns exactly 4 options for a gender card", () => {
    const result = pickDistractors(genderCard, []);
    expect(result).toHaveLength(4);
  });

  it("includes der, die, das and a repeated article", () => {
    const result = pickDistractors(genderCard, []);
    expect(result).toContain("der");
    expect(result).toContain("die");
    expect(result).toContain("das");
    // 4 options across 3 unique articles means one repeats
    const unique = new Set(result);
    expect(unique.size).toBe(3);
  });

  it("only uses valid german articles", () => {
    const result = pickDistractors(genderCard, []);
    result.forEach((option) => {
      expect(["der", "die", "das"]).toContain(option);
    });
  });
});
```

- [ ] **Step 2: Run, expect fail**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run tests/lib/pickDistractors.test.ts
```
Expected: fails — module not found.

- [ ] **Step 3: Implement**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/lib/pickDistractors.ts`:
```ts
import type { QuizCard } from "@/types";
import { shuffleArray } from "./shuffleArray";

export function pickDistractors(card: QuizCard, allTopicCards: QuizCard[]): string[] {
  if (card.type === "gender") {
    const articles = ["der", "die", "das"];
    const wrongArticles = articles.filter((a) => a !== card.german);
    // 4th option repeats the first wrong article (simplest "most-confused" heuristic).
    return shuffleArray([card.german, ...wrongArticles, wrongArticles[0]]);
  }

  const wrongOptions = allTopicCards
    .filter((c) => c.id !== card.id)
    .map((c) => c.german);
  const shuffledWrong = shuffleArray(wrongOptions).slice(0, 3);
  return shuffleArray([card.german, ...shuffledWrong]);
}
```

- [ ] **Step 4: Run, expect pass**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run tests/lib/pickDistractors.test.ts
```
Expected: 7 tests pass.

- [ ] **Step 5: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(lib): add pickDistractors for word and gender cards"
```

---

## Task 14: Create Zustand quiz session store

**Files:**
- Create: `src/store/quizSessionStore.ts`

- [ ] **Step 1: Create the store**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/store/quizSessionStore.ts`:
```ts
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
```

- [ ] **Step 2: Type-check**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(store): add quizSessionStore with start/submit/advance/reset"
```

---

## Task 15: Test the Zustand store

**Files:**
- Create: `tests/store/quizSessionStore.test.ts`

- [ ] **Step 1: Write the test file**

Create `/home/cath/Desktop/projects/german-a1-quiz/tests/store/quizSessionStore.test.ts`:
```ts
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
    useQuizSessionStore.getState().submitAnswer("x", true);
    const state = useQuizSessionStore.getState();
    expect(state.selectedAnswer).toBe("x");
    expect(state.answerStates["x"]).toBe("correct");
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
    useQuizSessionStore.getState().submitAnswer("x", true);
    const before = useQuizSessionStore.getState().currentCardIndex;
    useQuizSessionStore.getState().advanceToNextCard();
    const after = useQuizSessionStore.getState().currentCardIndex;
    expect(after).not.toBe(before);
    expect(useQuizSessionStore.getState().sessionComplete).toBe(false);
  });

  it("resetSession clears all state", () => {
    useQuizSessionStore.getState().startSession("Pronouns", mockCards);
    useQuizSessionStore.getState().submitAnswer("x", true);
    useQuizSessionStore.getState().resetSession();
    const state = useQuizSessionStore.getState();
    expect(state.topicName).toBe("");
    expect(state.queue).toHaveLength(0);
    expect(state.masteredCards).toHaveLength(0);
    expect(state.missedCards).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run tests, expect pass**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run tests/store/quizSessionStore.test.ts
```
Expected: 6 tests pass.

- [ ] **Step 3: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "test(store): cover startSession, submitAnswer, advance, reset"
```

---

## Task 16: Create quiz component stubs

**Files:**
- Create: `src/components/quiz/QuestionCard.tsx`
- Create: `src/components/quiz/InfoZone.tsx`
- Create: `src/components/quiz/OptionGrid.tsx`
- Create: `src/components/quiz/OptionButton.tsx`
- Create: `src/components/quiz/ProgressBar.tsx`
- Create: `src/components/quiz/NextButton.tsx`

> Each stub renders a `data-stub` div with the component name and key props rendered inside. Real visuals are added later.

- [ ] **Step 1: QuestionCard**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/components/quiz/QuestionCard.tsx`:
```tsx
interface QuestionCardProps {
  englishWord: string;
  sentenceDe?: string;
  sentenceEn?: string;
}

export function QuestionCard({ englishWord, sentenceDe, sentenceEn }: QuestionCardProps) {
  return (
    <div data-stub="QuestionCard" className="bg-indigo-light rounded-card p-4">
      {sentenceDe && <p className="text-sm">{sentenceDe}</p>}
      {sentenceEn && <p className="text-xs text-text-muted">{sentenceEn}</p>}
      <p className="font-serif text-3xl text-text-primary">{englishWord}</p>
    </div>
  );
}
```

- [ ] **Step 2: InfoZone**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/components/quiz/InfoZone.tsx`:
```tsx
interface InfoZoneProps {
  explanation?: string;
  tip?: string;
}

export function InfoZone({ explanation, tip }: InfoZoneProps) {
  return (
    <div data-stub="InfoZone" className="bg-bg-surface rounded-card p-3 min-h-[64px]">
      {explanation && <p className="text-sm">{explanation}</p>}
      {tip && <p className="text-xs italic text-text-muted">{tip}</p>}
    </div>
  );
}
```

- [ ] **Step 3: OptionButton**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/components/quiz/OptionButton.tsx`:
```tsx
import type { AnswerState } from "@/types";

interface OptionButtonProps {
  label: string;
  answerState: AnswerState;
  onSelect: (label: string) => void;
}

export function OptionButton({ label, answerState, onSelect }: OptionButtonProps) {
  return (
    <button
      data-stub="OptionButton"
      data-state={answerState}
      onClick={() => onSelect(label)}
      className="bg-bg-card rounded-opt min-h-[44px] px-3 py-2 text-sm"
    >
      {label}
    </button>
  );
}
```

- [ ] **Step 4: OptionGrid**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/components/quiz/OptionGrid.tsx`:
```tsx
import type { AnswerState } from "@/types";
import { OptionButton } from "./OptionButton";

interface OptionGridProps {
  options: string[];
  answerStates: Record<string, AnswerState>;
  onSelect: (label: string) => void;
}

export function OptionGrid({ options, answerStates, onSelect }: OptionGridProps) {
  const longest = options.reduce((max, opt) => Math.max(max, opt.length), 0);
  const isSingleColumn = longest > 15;

  return (
    <div
      data-stub="OptionGrid"
      className={isSingleColumn ? "flex flex-col gap-2" : "grid grid-cols-2 gap-2"}
    >
      {options.map((opt) => (
        <OptionButton
          key={opt}
          label={opt}
          answerState={answerStates[opt] ?? "unanswered"}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 5: ProgressBar**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/components/quiz/ProgressBar.tsx`:
```tsx
interface ProgressBarProps {
  topicName: string;
  masteredCount: number;
  totalCount: number;
}

export function ProgressBar({ topicName, masteredCount, totalCount }: ProgressBarProps) {
  const pct = totalCount === 0 ? 0 : Math.round((masteredCount / totalCount) * 100);
  return (
    <div data-stub="ProgressBar" className="space-y-1">
      <p className="text-xs text-text-muted">
        {topicName} · {masteredCount}/{totalCount} mastered
      </p>
      <div className="h-1 w-full bg-bg-card rounded-pill overflow-hidden">
        <div className="h-full bg-indigo-app" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
```

- [ ] **Step 6: NextButton**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/components/quiz/NextButton.tsx`:
```tsx
interface NextButtonProps {
  onNext: () => void;
}

export function NextButton({ onNext }: NextButtonProps) {
  return (
    <button
      data-stub="NextButton"
      onClick={onNext}
      className="w-full bg-indigo-app text-white rounded-btn min-h-[44px] py-2 text-sm font-medium"
    >
      Next
    </button>
  );
}
```

- [ ] **Step 7: Type-check**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(components): add quiz component stubs"
```

---

## Task 17: Create topic and result component stubs

**Files:**
- Create: `src/components/topic/TopicCard.tsx`
- Create: `src/components/result/ScoreDisplay.tsx`
- Create: `src/components/result/BreakdownCard.tsx`
- Create: `src/components/result/MissedWordList.tsx`

- [ ] **Step 1: TopicCard**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/components/topic/TopicCard.tsx`:
```tsx
interface TopicCardProps {
  topicName: string;
  masteredCount: number;
  totalCount: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function TopicCard({
  topicName,
  masteredCount,
  totalCount,
  isSelected,
  onSelect,
}: TopicCardProps) {
  const completed = totalCount > 0 && masteredCount === totalCount;
  const borderClass = completed
    ? "border-green-600"
    : isSelected
      ? "border-indigo-app"
      : "border-border-subtle";

  return (
    <button
      data-stub="TopicCard"
      data-selected={isSelected}
      data-completed={completed}
      onClick={onSelect}
      className={`w-full bg-bg-card rounded-card p-3 border ${borderClass} flex justify-between items-center min-h-[44px]`}
    >
      <span className="font-medium text-sm">{topicName}</span>
      <span className="text-xs text-text-muted">
        {masteredCount}/{totalCount}
        {completed && " ✓"}
      </span>
    </button>
  );
}
```

- [ ] **Step 2: ScoreDisplay**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/components/result/ScoreDisplay.tsx`:
```tsx
interface ScoreDisplayProps {
  masteredCount: number;
  totalCount: number;
}

export function ScoreDisplay({ masteredCount, totalCount }: ScoreDisplayProps) {
  return (
    <div data-stub="ScoreDisplay" className="text-center">
      <p className="text-text-muted text-sm">Session complete</p>
      <p className="font-serif text-5xl text-text-primary">
        {masteredCount} / {totalCount}
      </p>
    </div>
  );
}
```

- [ ] **Step 3: BreakdownCard**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/components/result/BreakdownCard.tsx`:
```tsx
interface BreakdownCardProps {
  masteredCount: number;
  weakCount: number;
}

export function BreakdownCard({ masteredCount, weakCount }: BreakdownCardProps) {
  return (
    <div data-stub="BreakdownCard" className="bg-bg-card rounded-card p-3 space-y-1">
      <div className="flex justify-between text-sm">
        <span>Mastered</span>
        <span className="font-medium">{masteredCount}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Still weak</span>
        <span className="font-medium">{weakCount}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: MissedWordList**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/components/result/MissedWordList.tsx`:
```tsx
interface MissedWordListProps {
  words: string[];
}

export function MissedWordList({ words }: MissedWordListProps) {
  if (words.length === 0) return null;
  return (
    <div data-stub="MissedWordList" className="flex flex-wrap gap-1">
      {words.map((w) => (
        <span
          key={w}
          className="bg-wrong-bg text-text-body text-xs px-2 py-1 rounded-pill"
        >
          {w}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Type-check**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(components): add topic and result component stubs"
```

---

## Task 18: Create the three page stubs

**Files:**
- Modify: `src/app/page.tsx` (replace create-next-app default with topic picker stub)
- Create: `src/app/quiz/page.tsx`
- Create: `src/app/result/page.tsx`

- [ ] **Step 1: Topic picker page**

Overwrite `/home/cath/Desktop/projects/german-a1-quiz/src/app/page.tsx`:
```tsx
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
```

- [ ] **Step 2: Quiz page**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/app/quiz/page.tsx`:
```tsx
"use client";

import { useQuizSessionStore } from "@/store/quizSessionStore";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { InfoZone } from "@/components/quiz/InfoZone";
import { OptionGrid } from "@/components/quiz/OptionGrid";
import { NextButton } from "@/components/quiz/NextButton";

export default function QuizPage() {
  const {
    topicName,
    queue,
    currentCardIndex,
    masteredCards,
    selectedAnswer,
    answerStates,
    submitAnswer,
    advanceToNextCard,
  } = useQuizSessionStore();

  const queued = queue[currentCardIndex];
  if (!queued) {
    return <p data-stub="QuizPage-empty">No active card. Pick a topic first.</p>;
  }

  const { card } = queued;

  return (
    <div className="space-y-4">
      <ProgressBar
        topicName={topicName}
        masteredCount={masteredCards.length}
        totalCount={queue.length}
      />
      <QuestionCard
        englishWord={card.english}
        sentenceDe={card.sentenceDe}
        sentenceEn={card.sentenceEn}
      />
      <InfoZone
        explanation={selectedAnswer ? card.explanation : undefined}
        tip={selectedAnswer ? card.tip : undefined}
      />
      <OptionGrid
        options={[card.german]} /* stub: real distractors wired up later */
        answerStates={answerStates}
        onSelect={(label) => submitAnswer(label, label === card.german)}
      />
      {selectedAnswer && <NextButton onNext={advanceToNextCard} />}
    </div>
  );
}
```

- [ ] **Step 3: Result page**

Create `/home/cath/Desktop/projects/german-a1-quiz/src/app/result/page.tsx`:
```tsx
"use client";

import { useRouter } from "next/navigation";
import { useQuizSessionStore } from "@/store/quizSessionStore";
import { ScoreDisplay } from "@/components/result/ScoreDisplay";
import { BreakdownCard } from "@/components/result/BreakdownCard";
import { MissedWordList } from "@/components/result/MissedWordList";

export default function ResultPage() {
  const router = useRouter();
  const { topicName, queue, masteredCards, missedCards, resetSession } =
    useQuizSessionStore();

  const total = queue.length;
  const weakCount = total - masteredCards.length;
  const missedWords = missedCards.map((c) => c.german);

  const goHome = () => {
    resetSession();
    router.push("/");
  };

  return (
    <div className="space-y-4">
      <ScoreDisplay masteredCount={masteredCards.length} totalCount={total} />
      <p className="text-center text-text-muted text-sm">{topicName}</p>
      <BreakdownCard masteredCount={masteredCards.length} weakCount={weakCount} />
      <MissedWordList words={missedWords} />
      <button
        onClick={goHome}
        className="w-full bg-indigo-app text-white rounded-btn min-h-[44px] py-2 text-sm font-medium"
      >
        Pick new topic
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Type-check**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "feat(pages): wire topic picker, quiz, and result pages"
```

---

## Task 19: Final verification — typecheck, lint, tests, build, dev server

- [ ] **Step 1: Full type-check**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 2: Lint**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npm run lint
```
Expected: no errors (warnings are acceptable for stubs).

- [ ] **Step 3: All tests**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npx vitest run
```
Expected: all suites pass. Should be roughly 23 tests across 5 files.

- [ ] **Step 4: Production build**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npm run build
```
Expected: build succeeds. Three routes listed (`/`, `/quiz`, `/result`).

- [ ] **Step 5: Dev server smoke test**

Run:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  npm run dev
```
In a browser, open `http://localhost:3000` at 390px width (DevTools mobile mode).
Verify visually:
1. Topic picker renders 8 topics, each `0/0` (no cards yet).
2. Tapping a topic highlights it.
3. Tapping **Start session** navigates to `/quiz` and shows the "No active card" stub message (because cards are empty).
4. Manually navigating to `/result` renders the result stub.
5. Cream background fills viewport, content is centered at 390px width on desktop.

Stop the dev server with Ctrl+C when done.

- [ ] **Step 6: Final commit (only if any cleanup occurred)**

If you fixed any issue surfaced above:
```bash
cd /home/cath/Desktop/projects/german-a1-quiz && \
  git add -A && \
  git commit -m "chore: skeleton verification fixes"
```

---

## Done

The skeleton is now ready. Next steps (out of scope for this plan):
- Populate `src/data/cards.ts` with all ~68 cards across the 8 topics.
- Replace component stubs with real visuals matching the wireframes.
- Wire `pickDistractors` into the quiz page so all 4 options render.
- Add the exit-confirm AlertDialog on the quiz screen.
- Add the "Retry missed only" / "Try full topic again" buttons on the result screen.
