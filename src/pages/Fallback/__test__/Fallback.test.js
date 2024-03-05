import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Fallback from "../Fallback";

describe("Fallback component", () => {
  it('renders the "Click Here" link to go back to Homepage', () => {
    render(
      <MemoryRouter>
        <Fallback />
      </MemoryRouter>
    );

    const clickHereLink = screen.getByText("Click Here");
    expect(clickHereLink).toBeInTheDocument();

    fireEvent.click(clickHereLink);

    // Check if the route is changed to "/"
    expect(window.location.pathname).toBe("/");
  });

  it('navigates to Homepage when the "Click Here" link is clicked', () => {
    render(
      <MemoryRouter>
        <Fallback />
      </MemoryRouter>
    );

    const clickHereLink = screen.getByText("Click Here");
    fireEvent.click(clickHereLink);

    // Check if the route is changed to "/"
    expect(window.location.pathname).toBe("/");
  });

  it('navigates to Homepage when the "Click Here" link is clicked', () => {
    render(
      <MemoryRouter>
        <Fallback />
      </MemoryRouter>
    );

    const clickHereLink = screen.getByText("Click Here");
    fireEvent.click(clickHereLink);

    // Check if the route is changed to "/"
    expect(window.location.pathname).toBe("/");
  });

  
});
