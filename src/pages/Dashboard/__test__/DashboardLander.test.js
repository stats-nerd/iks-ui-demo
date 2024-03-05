import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import DashboardLander from "../DashboardLander";

describe("DashboardLander component", () => {
  it("renders the redirecting message", async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/dashboard/redirect"]}>
        <DashboardLander />
      </MemoryRouter>
    );

    // Ensure that the "Redirecting..." message is rendered
    const redirectingMessage = getByText("Redirecting...");
    expect(redirectingMessage).toBeInTheDocument();
  });
});
