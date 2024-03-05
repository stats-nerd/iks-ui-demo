/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  test("renders iksLogo", () => {
    const { getByAltText } = render(<Footer />);
    const logoElement = getByAltText("iks logo");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders copyright text", () => {
    const { getByText } = render(<Footer />);
    const copyrightElement = getByText(
      "© 2023 IKS Health. All Rights Reserved"
    );
    expect(copyrightElement).toBeInTheDocument();
  });
});
