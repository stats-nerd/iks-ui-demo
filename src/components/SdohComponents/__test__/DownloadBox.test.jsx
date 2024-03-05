import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DownloadBox from "../DownloadBox";

describe("DownloadBox Component", () => {
  test("renders DownloadBox component correctly with default values", () => {
    render(<DownloadBox />);

    const downloadText = screen.getByText("Download the Form");
    expect(downloadText).toBeInTheDocument();

    // Check if the "Fill the Form" text is rendered correctly
    const fillText = screen.getByText("Fill the Form");
    expect(fillText).toBeInTheDocument();

    // Check if the "Upload Photo" text is rendered correctly
    const uploadText = screen.getByText("Upload Photo");
    expect(uploadText).toBeInTheDocument();

    // Check if the DownloadIcon is rendered
    const downloadIcon = screen.getByAltText("Download Icon");
    expect(downloadIcon).toBeInTheDocument();
  });

  test("handles click event with default pdfPath", () => {
    render(<DownloadBox />);

    window.open = jest.fn();

    fireEvent.click(screen.getByAltText("Download Icon"));

    expect(window.open).not.toHaveBeenCalled();
  });

  test("handles click event with provided pdfPath", () => {
    const pdfPath = "/path/to/dummy.pdf";
    render(<DownloadBox pdfPath={pdfPath} />);

    window.open = jest.fn();

    fireEvent.click(screen.getByAltText("Download Icon"));

    expect(window.open).toHaveBeenCalledWith(pdfPath, "_blank");
  });

  test("handles click event with custom text", () => {
    render(
      <DownloadBox
        downloadText="Download Now"
        fillText="Complete the Form"
        uploadText="Upload Image"
        pdfPath="/path/to/dummy.pdf"
      />
    );

    window.open = jest.fn();

    fireEvent.click(screen.getByAltText("Download Icon"));

    expect(window.open).toHaveBeenCalledWith("/path/to/dummy.pdf", "_blank");
  });

  test("handles click event with missing pdfPath", () => {
    render(<DownloadBox />);

    window.open = jest.fn();

    fireEvent.click(screen.getByAltText("Download Icon"));

    expect(window.open).not.toHaveBeenCalled();
  });

  test("handles click event with null pdfPath", () => {
    render(<DownloadBox pdfPath={null} />);

    window.open = jest.fn();

    fireEvent.click(screen.getByAltText("Download Icon"));

    expect(window.open).not.toHaveBeenCalled();
  });

  test("handles click event with empty pdfPath", () => {
    render(<DownloadBox pdfPath="" />);

    window.open = jest.fn();

    fireEvent.click(screen.getByAltText("Download Icon"));

    expect(window.open).not.toHaveBeenCalled();
  });
});
