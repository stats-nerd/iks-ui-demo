import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { RegistrationContextProvider } from "../../../../context/RegistrationContext";
import DrivingLicense from "../DrivingLicense";

jest.mock(
  "../../../../components/RegistrationComps/CaptureComps/Double_CaptureComp",
  () => ({
    __esModule: true,
    default: ({ updateFrontPic, updateBackPic }) => (
      <div>
        Front Capture Component
        <button onClick={() => updateFrontPic("frontImageMock")}>
          Capture Front
        </button>
        Back Capture Component
        <button onClick={() => updateBackPic("backImageMock")}>
          Capture Back
        </button>
      </div>
    ),
  })
);

jest.mock(
  "../../../../components/RegistrationComps/UploadComps/Double_UploadComp",
  () => ({
    __esModule: true,
    default: ({ updateFrontPic, updateBackPic }) => (
      <div>
        Front Upload Component
        <button onClick={() => updateFrontPic("frontImageMock")}>
          Upload Front
        </button>
        Back Upload Component
        <button onClick={() => updateBackPic("backImageMock")}>
          Upload Back
        </button>
      </div>
    ),
  })
);

jest.mock(
  "../../../../components/RegistrationComps/OcrLoader/OcrLoader",
  () => ({
    __esModule: true,
    default: () => <div>OcrLoader Component</div>,
  })
);

jest.mock("../../../../components/Buttons/ButtonSectionGreenBg", () => ({
  __esModule: true,
  default: ({ buttonName, onClick }) => (
    <button onClick={onClick}>{buttonName}</button>
  ),
}));

jest.mock("../../../../components/Buttons/ButtonSectionWhiteBg", () => ({
  __esModule: true,
  default: ({ buttonName, onClick }) => (
    <button onClick={onClick}>{buttonName}</button>
  ),
}));

jest.mock(
  "../../../../components/RegistrationComps/BelowSection/BelowSection",
  () => ({
    __esModule: true,
    default: ({ manuallyBtnClickFunc }) => (
      <div>
        BelowSection Component
        <button onClick={manuallyBtnClickFunc}>Manually Button</button>
      </div>
    ),
  })
);

describe("DrivingLicense component", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <RegistrationContextProvider>
          <DrivingLicense />
        </RegistrationContextProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("Identification Information")).toBeInTheDocument();
  });

  it("handles continue button click correctly", async () => {
    render(
      <BrowserRouter>
        <RegistrationContextProvider>
          <DrivingLicense />
        </RegistrationContextProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Capture Front"));
    fireEvent.click(screen.getByText("Capture Back"));

    fireEvent.click(screen.getByText("continue"));
    await waitFor(() => {
      // Add expectations for the behavior after the continue button click
    });
  });
});
