import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import { AppContextProvider } from "../../../context/AppContext";
import ProtectedComponents from "../ProtectedComponents";

describe("ProtectedComponents component", () => {
  it("redirects to home when user is not authenticated", () => {
    const { queryByText } = render(
      <Router>
        <AppContextProvider value={{ state: { currentAuthUser: null } }}>
          <ProtectedComponents>
            <div>Child Component</div>
          </ProtectedComponents>
        </AppContextProvider>
      </Router>
    );

    const childComponent = queryByText("Child Component");
    expect(childComponent).toBeNull();
  });

  it("logs a message when user is not authenticated", () => {
    const consoleSpy = jest.spyOn(console, "log");
    consoleSpy.mockImplementation(() => {});

    render(
      <Router>
        <AppContextProvider value={{ state: { currentAuthUser: null } }}>
          <ProtectedComponents>
            <div>Child Component</div>
          </ProtectedComponents>
        </AppContextProvider>
      </Router>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "FROM AUTH PROTECTION: current user not logged in",
      null
    );

    consoleSpy.mockRestore();
  });
});
