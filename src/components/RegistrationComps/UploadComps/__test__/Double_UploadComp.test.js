import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Double_UploadComp from "../Double_UploadComp";

describe("Double_UploadComp component", () => {
  it("renders without crashing", () => {
    render(<Double_UploadComp />);
  });

  it("renders Front Picture ImageUploadBox correctly", () => {
    const { getByText } = render(<Double_UploadComp />);
    const frontPictureBox = getByText("Front Picture");
    expect(frontPictureBox).toBeInTheDocument();
  });

  it("renders Back Picture ImageUploadBox correctly", () => {
    const { getByText } = render(<Double_UploadComp />);
    const backPictureBox = getByText("Back Picture");
    expect(backPictureBox).toBeInTheDocument();
  });
});
