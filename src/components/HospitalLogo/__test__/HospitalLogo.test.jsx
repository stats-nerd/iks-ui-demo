import React from "react";
import { render } from "@testing-library/react";
import HospitalLogo from "../HospitalLogo";
import { useAppContext } from "../../../context/AppContext";

// here Mocking the useAppContext hook
jest.mock("../../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

describe("HospitalLogo component", () => {
  it("renders correctly with default props", () => {
    useAppContext.mockReturnValue({
      appContextState: { currentHospitalLogo: null },
    });

    const { asFragment } = render(<HospitalLogo />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with provided alt and className props", () => {
    useAppContext.mockReturnValue({
      appContextState: { currentHospitalLogo: "mockLogo" },
    });

    const { asFragment } = render(
      <HospitalLogo alt="testAlt" className="testClass" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with the hospital logo from appContextState", () => {
    useAppContext.mockReturnValue({
      appContextState: { currentHospitalLogo: "mockLogo" },
    });

    const { asFragment } = render(<HospitalLogo alt="testAlt" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with default alt text if alt prop is not provided", () => {
    useAppContext.mockReturnValue({
      appContextState: { currentHospitalLogo: "mockLogo" },
    });

    const { asFragment } = render(<HospitalLogo />);
    expect(asFragment()).toMatchSnapshot();
  });
});
