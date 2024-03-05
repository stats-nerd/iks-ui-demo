import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomInputField from "../CustomInputField";

describe("CustomInputField component", () => {
  it("renders without crashing", () => {
    render(<CustomInputField label="Test Input" />);
    const inputLabel = screen.getByLabelText("Test Input");
    expect(inputLabel).toBeInTheDocument();
  });

  it("displays the provided placeholder", () => {
    render(<CustomInputField label="Test Input" placeholder="Enter value" />);
    const input = screen.getByPlaceholderText("Enter value");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange handler when the input value changes", () => {
    const handleChange = jest.fn();
    render(<CustomInputField label="Test Input" onChange={handleChange} />);

    const input = screen.getByLabelText("Test Input");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "new value" }),
      })
    );
  });

  it("sets the initial value correctly", () => {
    render(<CustomInputField label="Test Input" value="initial value" />);
    const input = screen.getByLabelText("Test Input");
    expect(input).toHaveValue("initial value");
  });

  it("applies the specified input type", () => {
    render(<CustomInputField label="Test Input" type="password" />);
    const input = screen.getByLabelText("Test Input");
    expect(input).toHaveAttribute("type", "password");
  });
});
