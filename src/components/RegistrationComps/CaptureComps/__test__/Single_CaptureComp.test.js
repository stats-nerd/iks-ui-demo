import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Single_CaptureComp from "../Single_CaptureComp";

describe("Single_CaptureComp component", () => {
  it("renders without crashing", () => {
    render(<Single_CaptureComp />);
  });

  it("renders Front Picture ImageCaptureBox correctly", () => {
    const { getByText } = render(<Single_CaptureComp />);
    const frontPictureBox = getByText("Front Picture");
    expect(frontPictureBox).toBeInTheDocument();
  });
});
