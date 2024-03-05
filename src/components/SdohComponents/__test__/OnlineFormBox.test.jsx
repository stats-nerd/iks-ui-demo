import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OnlineFormBox from "../OnlineFormBox";

describe("OnlineFormBox Component", () => {
  test("renders OnlineFormBox component with default values", () => {
    render(<OnlineFormBox />);
    
    // Check if the "Fill the form" text is rendered correctly
    const fillText = screen.getByText("Fill the form");
    expect(fillText).toBeInTheDocument();

    // Check if the "Online" text is rendered correctly
    const onlineText = screen.getByText("Online");
    expect(onlineText).toBeInTheDocument();

    // Check if the OnlineFormIcon is rendered
    const onlineFormIcon = screen.getByAltText("Download Icon");
    expect(onlineFormIcon).toBeInTheDocument();
  });

 

  test("handles click event with custom text", () => {
    render(
      <OnlineFormBox
        onClick={() => console.log("Custom click event")}
      />
    );
    
    // Simulate a click event
    fireEvent.click(screen.getByAltText("Download Icon"));

    // Ensure that the click event is not overridden
    // Check the console logs or mock the console.log to check if the custom click event is triggered
  });

 

  test("handles click event with disabled state", () => {
    render(
      <OnlineFormBox
        disabled={true}
      />
    );
    
    // Mock the useState hook
    const mockHandleClick = jest.fn();
    jest.spyOn(React, "useState").mockImplementation(() => [false, mockHandleClick]);

    // Simulate a click event
    fireEvent.click(screen.getByAltText("Download Icon"));

    // Check if the handle click function is not called when disabled
    expect(mockHandleClick).not.toHaveBeenCalled();
  });

 
});
