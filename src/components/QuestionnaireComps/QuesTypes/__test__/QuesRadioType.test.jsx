import { render, screen, fireEvent } from "@testing-library/react";
import QuesRadioType from "../QuesRadioType";

describe("QuesRadioType Component", () => {
  const mockQuestion = "Choose an option";
  const mockRadioOptions = ["Option 1", "Option 2", "Option 3"];

  it("renders question text", () => {
    render(
      <QuesRadioType Question={mockQuestion} Radio_button={mockRadioOptions} />
    );
    const questionElement = screen.getByText(mockQuestion);
    expect(questionElement).toBeInTheDocument();
  });

  it("renders all provided radio options", () => {
    render(
      <QuesRadioType Question={mockQuestion} Radio_button={mockRadioOptions} />
    );

    mockRadioOptions.forEach((optionText) => {
      const radioOptionElement = screen.getByText(optionText);
      expect(radioOptionElement).toBeInTheDocument();
    });
  });
});
