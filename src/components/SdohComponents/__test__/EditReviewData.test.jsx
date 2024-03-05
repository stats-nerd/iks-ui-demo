import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditReviewData from "../EditReviewData";

const mockQuestion = {
  Question: "Sample Question",
  Answer: "Sample Answer",
};

describe("EditReviewData Component", () => {
  it("renders without crashing", () => {
    render(<EditReviewData question={mockQuestion} />);
  });

  it("displays question and answer when not editing", () => {
    const { getByText } = render(<EditReviewData question={mockQuestion} />);

    expect(getByText("Sample Question")).toBeInTheDocument();
    expect(getByText("Sample Answer")).toBeInTheDocument();
  });

  it("renders the component in non-editing mode correctly", () => {
    const { getByText } = render(<EditReviewData question={mockQuestion} />);
    expect(getByText("Sample Question")).toBeInTheDocument();
    expect(getByText("Sample Answer")).toBeInTheDocument();
  });

  it("enters editing mode on Edit button click", () => {
    const { getByText } = render(<EditReviewData question={mockQuestion} />);
    fireEvent.click(getByText("Edit"));

    expect(getByText("Sample Question")).toBeInTheDocument();
    expect(getByText("Sample Answer")).toBeInTheDocument();
    // You can add more assertions related to the editing mode
  });
});
