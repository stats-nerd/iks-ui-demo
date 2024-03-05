import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CameraComponent from "../CameraComponent";

describe("CameraComponent", () => {
  it("renders without crashing", () => {
    render(
      <CameraComponent
        onCapture={jest.fn()}
        onClose={jest.fn()}
        onSwitchCamera={jest.fn()}
      />
    );
    const closeButton = screen.getByText("X");
    expect(closeButton).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <CameraComponent
        onCapture={jest.fn()}
        onClose={onCloseMock}
        onSwitchCamera={jest.fn()}
      />
    );
    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("renders the camera component with the correct initial state", () => {
    // Add specific assertions for the initial state of your component
    // For example, check the presence of specific elements or their initial state
  });

  it("logs location info and shows error message if state is missing", () => {
    jest.spyOn(console, "log"); // Mock console.log

    render(<CameraComponent location={{ state: { from: "test" } }} />);
    expect(console.log).toHaveBeenCalledWith("Location:", "test");

    render(<CameraComponent location={{}} />);
    expect(console.log).toHaveBeenCalledWith(
      "Location is null or state.from is null"
    );
  });
});
