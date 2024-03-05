import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmailLinkLoginFunctionality from "../EmailLinkLoginFunctionality";

describe("EmailLinkLoginFunctionality Component", () => {
  it("renders email input field", () => {
    render(<EmailLinkLoginFunctionality setSnackbarOpen={() => {}} />);
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("checks whether input field is controlled", async () => {
    const user = userEvent.setup();
    render(<EmailLinkLoginFunctionality setSnackbarOpen={() => {}} />);
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "test@example.com");
    expect(emailInput).toHaveValue("test@example.com");
  });

  it("displays loader while sending email link", async () => {
    render(<EmailLinkLoginFunctionality setSnackbarOpen={() => {}} />);
    const emailInput = screen.getByLabelText(/email/i);
    const sendButton = screen.getByText("Send Verification Link");

    await userEvent.type(emailInput, "test@example.com");
    userEvent.click(sendButton);

    await waitFor(() => {
      const loader = screen.getByText("Sending...");
      expect(loader).toBeInTheDocument();
    });
  });
  it("displays 'Send Verification Link' button when no email is entered", () => {
    render(<EmailLinkLoginFunctionality setSnackbarOpen={() => {}} />);
    const sendButton = screen.getByText("Send Verification Link");
    expect(sendButton).toBeInTheDocument();
  });
  it("displays loader while sending email link", async () => {
    render(<EmailLinkLoginFunctionality setSnackbarOpen={() => {}} />);
    const emailInput = screen.getByLabelText(/email/i);
    const sendButton = screen.getByText("Send Verification Link");

    await userEvent.type(emailInput, "test@example.com");
    userEvent.click(sendButton);

    await waitFor(() => {
      const loader = screen.getByText("Sending...");
      expect(loader).toBeInTheDocument();
    });
  });
});
