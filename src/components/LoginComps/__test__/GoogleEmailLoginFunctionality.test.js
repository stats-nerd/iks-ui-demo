import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleEmailLoginFunctionality from "../GoogleEmailLoginFunctionality";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  signInWithPopup: jest.fn(),
}));

describe("GoogleEmailLoginFunctionality component", () => {
  let setSnackbarOpenMock;
  let navigateMock;

  beforeEach(() => {
    setSnackbarOpenMock = jest.fn();
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
  });

  it("renders without errors", () => {
    render(
      <GoogleEmailLoginFunctionality setSnackbarOpen={setSnackbarOpenMock} />
    );
  });

  it("calls setSnackbarOpen function on Google login error", async () => {
    // Mock signInWithPopup to simulate an error
    signInWithPopup.mockRejectedValueOnce(new Error("Google login error"));

    render(
      <GoogleEmailLoginFunctionality setSnackbarOpen={setSnackbarOpenMock} />
    );

    // Simulate a click on the Google login button
    await act(async () => {
      fireEvent.click(document.querySelector(".w-10"));
    });

    // Wait for the async signInWithPopup to complete
    await waitFor(() => {});

    expect(setSnackbarOpenMock).toHaveBeenCalledWith({
      open: true,
      message: "Error occurred while signing in from Google account",
      type: "error",
    });
  });
});
