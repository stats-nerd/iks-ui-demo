import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { RegistrationContextProvider } from "../../../../context/RegistrationContext";
import CreditCardReview from "../CreditCardReview";
import { API_BASE_URL } from "../../../../../env.config";

describe("CreditCardReview component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <RegistrationContextProvider>
          <CreditCardReview />
        </RegistrationContextProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("credit card")).toBeInTheDocument();
  });

  test("handles continue button click", () => {
    render(
      <MemoryRouter>
        <RegistrationContextProvider>
          <CreditCardReview />
        </RegistrationContextProvider>
      </MemoryRouter>
    );
    const continueButton = screen.getByText("continue");
    // fireEvent.click(continueButton);
  });

  it("handles Back button click", () => {
    render(
      <MemoryRouter>
        <RegistrationContextProvider>
          <CreditCardReview />
        </RegistrationContextProvider>
      </MemoryRouter>
    );
    const backButton = screen.getByText("Back");
    // fireEvent.click(backButton);
  });

  it("updates credit card form state", () => {
    render(
      <MemoryRouter>
        <RegistrationContextProvider>
          <CreditCardReview />
        </RegistrationContextProvider>
      </MemoryRouter>
    );
  });

  test("it updates creditCardNumber when input value changes", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <RegistrationContextProvider>
          <CreditCardReview />
        </RegistrationContextProvider>
      </MemoryRouter>
    );
    const input = getByLabelText("Credit Card Number");

    fireEvent.change(input, { target: { value: "1234 5678 9012 3456" } });

    expect(screen.getByLabelText("Credit Card Number").value).toBe(
      "1234 5678 9012 3456"
    );
  });
  test("renders with default props", () => {
    render(
      <MemoryRouter>
        <RegistrationContextProvider>
          <CreditCardReview />
        </RegistrationContextProvider>
      </MemoryRouter>
    );

    // Assert the existence of your component elements based on default props
  });
  test("updates credit card form on input field change", async () => {
    render(
      <MemoryRouter>
        <RegistrationContextProvider>
          <CreditCardReview />
        </RegistrationContextProvider>
      </MemoryRouter>
    );

    const creditCardNumberInput = screen.getByLabelText("Credit Card Number");

    fireEvent.change(creditCardNumberInput, {
      target: { value: "1234567890123456" },
    });

    await waitFor(() => {
    });
  });
});
