import React from "react";
import { render } from "@testing-library/react";
import Splash1 from "../Splash1";

describe("Splash1 component", () => {
  it("renders without errors", () => {
    render(<Splash1 />);
  });

  it("displays the track & manage text", () => {
    const { getByText } = render(<Splash1 />);
    const trackAndManageText = getByText("Track & manage your appointment");
    expect(trackAndManageText).toBeInTheDocument();
  });
});
