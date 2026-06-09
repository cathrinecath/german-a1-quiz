import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuestionCard } from "@/components/quiz/QuestionCard";

describe("QuestionCard — revealable translation", () => {
  it("hides the translation until revealed", () => {
    render(<QuestionCard type="word" englishWord="she" sentenceDe="___ kommt aus Berlin." sentenceEn="She comes from Berlin." />);
    expect(screen.queryByText("She comes from Berlin.")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show translation" })).toBeInTheDocument();
  });

  it("shows the translation after clicking the toggle", async () => {
    const user = userEvent.setup();
    render(<QuestionCard type="word" englishWord="she" sentenceDe="___ kommt aus Berlin." sentenceEn="She comes from Berlin." />);
    await user.click(screen.getByRole("button", { name: "Show translation" }));
    expect(screen.getByText("She comes from Berlin.")).toBeInTheDocument();
  });

  it("renders no toggle when there is no sentence translation", () => {
    render(<QuestionCard type="word" englishWord="seven" />);
    expect(screen.queryByRole("button", { name: "Show translation" })).not.toBeInTheDocument();
    expect(screen.getByText("seven")).toBeInTheDocument();
  });
});

describe("QuestionCard — question type", () => {
  it("renders the statement and prompt, not a big english word", () => {
    render(<QuestionCard type="question" englishWord="ignored" sentenceDe="Ich heisse Anna." sentenceEn="My name is Anna." />);
    expect(screen.getByText("Ich heisse Anna.")).toBeInTheDocument();
    expect(screen.getByText("Which question fits?")).toBeInTheDocument();
    expect(screen.queryByText("ignored")).not.toBeInTheDocument();
  });
});
