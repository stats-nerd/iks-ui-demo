import React from "react";
import { render } from "@testing-library/react";
import TextFieldPairWrapper from "../TextFieldPairWrapper";

describe("TextFieldPairWrapper component", () => {
  it("renders without crashing", () => {
    render(<TextFieldPairWrapper />);
  });

  it("renders children components correctly", () => {
    const { getByText } = render(
      <TextFieldPairWrapper>
        <div>Child 1</div>
        <div>Child 2</div>
      </TextFieldPairWrapper>
    );

    const child1 = getByText("Child 1");
    const child2 = getByText("Child 2");

    expect(child1).toBeInTheDocument();
    expect(child2).toBeInTheDocument();
  });
});
