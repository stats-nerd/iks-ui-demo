import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UploadImage from "../UploadImage";

describe("UploadImage Component", () => {
  test("renders UploadImage component with default state", () => {
    render(<UploadImage onUpload={() => {}} />);

    // Check if the "Upload the" text is rendered correctly
    const uploadText = screen.getByText("Upload the");
    expect(uploadText).toBeInTheDocument();

    // Check if the "Form Image" text is rendered correctly
    const formImageText = screen.getByText("Form Image");
    expect(formImageText).toBeInTheDocument();

    // Check if the UploadIcon is rendered
    const uploadIcon = screen.getByAltText("UploadIcon");
    expect(uploadIcon).toBeInTheDocument();
  });
});
