import { render, screen } from "@testing-library/react";
import QuesCheckmarkType from "../QuesCheckmarkType";

describe("QuesCheckmarkType Component", () => {
  const mockQuestion = "Select your preferences";
  const mockCheckmarks = ["Option 1", "Option 2", "Option 3"];

  it("renders question text", () => {
    render(
      <QuesCheckmarkType Question={mockQuestion} Checkmark={mockCheckmarks} />
    );
    const questionElement = screen.getByText(mockQuestion);
    expect(questionElement).toBeInTheDocument();
  });

  it("renders all provided checkmarks", () => {
    render(
      <QuesCheckmarkType Question={mockQuestion} Checkmark={mockCheckmarks} />
    );

    mockCheckmarks.forEach((checkText) => {
      const checkmarkElement = screen.getByText(checkText);
      expect(checkmarkElement).toBeInTheDocument();
    });
  });
});
