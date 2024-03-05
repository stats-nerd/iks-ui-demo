import React from "react";
import { render } from "@testing-library/react";
import Splash3 from "../Splash3";

describe("Splash3 component", () => {
  it("renders without errors", () => {
    render(<Splash3 />);
  });

  it("displays the track & manage text", () => {
    const { getByText } = render(<Splash3 />);
    const trackAndManageText = getByText("Track & manage your appointment");
    expect(trackAndManageText).toBeInTheDocument();
  });

  it("applies the correct image styling", () => {
    const { getByAltText } = render(<Splash3 />);
    const logoImage = getByAltText("Logo");
    expect(logoImage).toHaveClass("py-2");
  });
});
