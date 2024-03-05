import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { RegistrationContextProvider } from "../../../../context/RegistrationContext";
import CreditCard from "../CreditCard";

// Mock setTimeout to control the timing of the loader
jest.useFakeTimers();

describe("CreditCard component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <RegistrationContextProvider>
          <CreditCard />
        </RegistrationContextProvider>
      </MemoryRouter>
    );
    const creditCardHeading = screen.getByText("Credit Card");
    expect(creditCardHeading).toBeInTheDocument();
  });

  it("renders 'Credit Card' heading when loader state is false", () => {
    render(
      <MemoryRouter>
        <RegistrationContextProvider>
          <CreditCard />
        </RegistrationContextProvider>
      </MemoryRouter>
    );

    // Check if 'Credit Card' heading is rendered
    expect(screen.getByText("Credit Card")).toBeInTheDocument();
  });

  it("does not render 'Continue' button if frontCredit_Picture is not present", () => {
    render(
      <MemoryRouter>
        <RegistrationContextProvider>
          <CreditCard />
        </RegistrationContextProvider>
      </MemoryRouter>
    );

    // Check if 'Continue' button is not rendered initially
    expect(screen.queryByText("Continue")).not.toBeInTheDocument();
  });
});
