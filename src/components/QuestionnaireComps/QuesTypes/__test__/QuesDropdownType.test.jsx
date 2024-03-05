import { render, screen, fireEvent } from "@testing-library/react";
import QuesDropdownType from "../QuesDropdownType";

describe("QuesDropdownType Component", () => {
  const mockQuestion = "Select your option";
  const mockDropdownOptions = ["Option 1", "Option 2", "Option 3"];

  it("renders question text", () => {
    render(
      <QuesDropdownType
        Question={mockQuestion}
        Dropdown={mockDropdownOptions}
      />
    );
    const questionElement = screen.getByText(mockQuestion);
    expect(questionElement).toBeInTheDocument();
  });
});
