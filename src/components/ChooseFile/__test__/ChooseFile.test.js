import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChooseFile from "../ChooseFile";

describe("ChooseFile component", () => {
  it("renders without crashing", () => {
    render(<ChooseFile handleImageChange={jest.fn()} />);
    const chooseFileLabel = screen.getByText("Choose");
    expect(chooseFileLabel).toBeInTheDocument();
  });

  it("displays the provided file name", () => {
    render(
      <ChooseFile handleImageChange={jest.fn()} selectedFileName="test.jpg" />
    );
    const displayedFileName = screen.getByText("test.jpg");
    expect(displayedFileName).toBeInTheDocument();
  });

  it("displays a default file name if none is provided", () => {
    render(<ChooseFile handleImageChange={jest.fn()} />);
    const defaultFileName = screen.getByText("File Name");
    expect(defaultFileName).toBeInTheDocument();
  });
});
