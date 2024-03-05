import { render, screen, fireEvent } from "@testing-library/react";
import CustomDropdown from "../CustomDropdown";

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];



test("renders CustomDropdown component with a custom label", () => {
  render(
    <CustomDropdown
      label="Choose an Item"
      onChange={() => {}}
      value={1}
      options={options}
    />
  );

  // Check if the custom label is rendered
  expect(screen.getByLabelText("Choose an Item")).toBeInTheDocument();
});





test("renders CustomDropdown component without options", () => {
  render(
    <CustomDropdown
      label="Select Option"
      onChange={() => {}}
      value={1}
      options={[]}
    />
  );

  // Check if no options are rendered
  expect(screen.queryByRole("option")).toBeNull();
});




