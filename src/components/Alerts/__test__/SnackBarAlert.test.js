// SnackBarAlert.test.js
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import SnackBarAlert from "../SnackBarAlert";

describe("SnackBarAlert component", () => {
  it("renders with the correct props and handles close event", async () => {
    // Mock the function passed as a prop
    const setSnackbarOpenMock = jest.fn();

    // Render the SnackBarAlert component with initial props
    const { getByTestId, getByText } = render(
      <SnackBarAlert
        snackbarOpen={{ open: true, type: "success", message: "Test message" }}
        setSnackbarOpen={setSnackbarOpenMock}
      />
    );

    // Check if the SnackBarAlert component renders with the correct message
    expect(getByText("Test message")).toBeInTheDocument();

    // Trigger the close event on the Snackbar using the close button
    fireEvent.click(getByTestId("CloseIcon"));

    // Wait for the Snackbar to close
    await waitFor(() => {
      expect(setSnackbarOpenMock).toHaveBeenCalledWith({
        open: false,
        type: "success",
        message: "Test message",
      });
    });
  });
});
