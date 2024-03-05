import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import AppointmentDashboard from "../AppointmentDashboard";

const mockLocation = {
  state: {
    currentPatientInfo: {
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      doctorRating: 4.5,
      patientCategory: "General",
      appointmentDateTime: "2024-03-01T10:00:00",
    },
    isSdohFilled: true,
    isMedicalHistoryFilled: false,
  },
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(() => mockLocation),
}));

describe("AppointmentDashboard Component", () => {
  test("renders appointment details and actions correctly", async () => {
    render(
      <Router>
        <AppointmentDashboard />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
      expect(
        screen.getByText(/you have 1 upcoming appointment/i)
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/dr\. smith/i)).toBeInTheDocument();
    expect(screen.getByText(/call us/i)).toBeInTheDocument();
    expect(screen.getByText(/start chat/i)).toBeInTheDocument();
    expect(screen.getByText(/faq/i)).toBeInTheDocument();
  });
});
