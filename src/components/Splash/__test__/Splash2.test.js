import React from "react";
import { render } from "@testing-library/react";
import Splash2 from "../Splash2";

describe("Splash2 component", () => {
  it("renders without errors", () => {
    render(<Splash2 />);
  });

  it("displays the track & manage text", () => {
    const { getByText } = render(<Splash2 />);
    const trackAndManageText = getByText("Track & manage your appointment");
    expect(trackAndManageText).toBeInTheDocument();
  });
});
