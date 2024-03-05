import React from "react";
import { render, screen } from "@testing-library/react";
import AnswerStatus from "../AnswerStatus";

describe("AnswerStatus Component", () => {
  test("renders total count correctly", () => {
    render(<AnswerStatus answered={2} total={8} color="blue" />);

    // Check if the "Answered" text is rendered correctly
    const answeredText = screen.getByText("Answered 2 of 8");
    expect(answeredText).toBeInTheDocument();
  });

  test("handles 0 total count", () => {
    render(<AnswerStatus answered={2} total={0} color="purple" />);

    // Check if the "Answered" text is rendered correctly
    const answeredText = screen.getByText("Answered 2 of 0");
    expect(answeredText).toBeInTheDocument();
  });

  test("handles negative answered count", () => {
    render(<AnswerStatus answered={-2} total={5} color="orange" />);

    // Check if the "Answered" text is rendered correctly
    const answeredText = screen.getByText("Answered -2 of 5");
    expect(answeredText).toBeInTheDocument();
  });

  test("handles decimal total count", () => {
    render(<AnswerStatus answered={3} total={5.5} color="green" />);

    // Check if the "Answered" text is rendered correctly
    const answeredText = screen.getByText("Answered 3 of 5.5");
    expect(answeredText).toBeInTheDocument();
  });
});
