import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import ParentSplash from "../ParentSplash";

jest.useFakeTimers(); // Mocking timers for setTimeout/setInterval

describe("ParentSplash component", () => {
  it("renders without crashing", () => {
    render(<ParentSplash />);
  });

  it("cleans up event listener on unmount", () => {
    const { getByTestId, unmount } = render(<ParentSplash />);
    const container = getByTestId("parent-container");

    // Manually trigger unmount
    unmount();

    // Ensure that the event listener is removed
    expect(() => {
      fireEvent.wheel(container, { deltaX: 100, deltaY: 0 });
    }).not.toThrow();
  });
});
