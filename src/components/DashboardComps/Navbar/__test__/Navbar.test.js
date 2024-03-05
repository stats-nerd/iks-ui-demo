import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "../Navbar";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../../context/AppContext", () => ({
  __esModule: true,
  useAppContext: () => ({
    appContextState: {
    },
  }),
}));

describe("Navbar Component", () => {
  test("renders logo image", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logoElement = screen.getByAltText("navbar logo");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders Registration button in sidebar", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const registrationButton = screen.getByText("Registration");
    expect(registrationButton).toBeInTheDocument();
  });

  test("renders Logout button in sidebar", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();
  });

  test("clicking hamburger menu opens the sidebar", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const hamburgerMenuButton = screen.getByTestId("hamburger-menu-button");
    fireEvent.click(hamburgerMenuButton);

    const registrationButton = screen.getByText("Registration");
    expect(registrationButton).toBeInTheDocument();
  });

  test("clicking Logout button triggers handleLogout function", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  test("navigating to the home route after handleLogout timeout", async () => {
    jest.useFakeTimers();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  test("navigating to the home route after handleLogout function completes", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
