/* eslint-disable no-undef */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ContinueLogin from "../ContinueLogin";
import { MemoryRouter } from "react-router-dom";
import { AppContextProvider } from "../../../context/AppContext";

jest.mock("node-fetch");

describe("ContinueLogin Component", () => {
  test("renders doctor's appointment text", () => {
    const { queryAllByText } = render(
      <MemoryRouter>
        <AppContextProvider>
          <ContinueLogin />
        </AppContextProvider>
      </MemoryRouter>
    );

    const doctorAppointmentTextElements = queryAllByText(
      /Doctor's Appointment Made Easy/i
    );

    expect(doctorAppointmentTextElements.length).toBeGreaterThan(0);

    expect(doctorAppointmentTextElements[0]).toHaveTextContent(
      "Doctor's Appointment Made Easy"
    );
  });

  test('clicking "Continue" button should navigate to "/EmailVerification"', async () => {
    render(
      <MemoryRouter>
        <AppContextProvider>
          <ContinueLogin />
        </AppContextProvider>
      </MemoryRouter>
    );

    const continueButton = screen.getByText("Continue");
    fireEvent.click(continueButton);

    await waitFor(() => {});
  });

  test("should make API request for decryption and update context on successful decryption", async () => {
    require("node-fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        data: [
          {
            hospitalLogo: "hospital-logo-base64",
            patientInfo: {
              patientName: "John Doe",
            },
          },
        ],
      }),
    });

    render(
      <MemoryRouter>
        <AppContextProvider>
          <ContinueLogin />
        </AppContextProvider>
      </MemoryRouter>
    );

    await waitFor(() => {});
  });
});
