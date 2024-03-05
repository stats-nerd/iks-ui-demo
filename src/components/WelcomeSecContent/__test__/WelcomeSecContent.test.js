import React from "react";
import { render } from "@testing-library/react";
import { AppContextProvider } from "../../../context/AppContext";
import WelcomeSecContent from "../WelcomeSecContent";

describe("WelcomeSecContent component", () => {
  it("renders without crashing", () => {
    render(
      <AppContextProvider>
        <WelcomeSecContent
          welcomeText="Test Welcome"
          description="Test Description"
        />
      </AppContextProvider>
    );
  });

  it("renders welcome text correctly", () => {
    const { getByText } = render(
      <AppContextProvider>
        <WelcomeSecContent
          welcomeText="Test Welcome"
          description="Test Description"
        />
      </AppContextProvider>
    );
    const welcomeTextElement = getByText("Test Welcome");
    expect(welcomeTextElement).toBeInTheDocument();
  });

  it("is hidden on small screens and visible on medium screens", () => {
    const { container } = render(
      <AppContextProvider>
        <WelcomeSecContent welcomeText="Welcome Message" />
      </AppContextProvider>
    );
    const hiddenParagraphs = container.querySelectorAll(".hidden");
    expect(hiddenParagraphs.length).toBe(2); // Both paragraphs should be hidden on small screens
  });

  it("renders with a different welcome text", () => {
    const { getByText } = render(
      <AppContextProvider>
        <WelcomeSecContent welcomeText="Another Welcome Message" />
      </AppContextProvider>
    );
    expect(getByText("Another Welcome Message")).toBeInTheDocument();
  });
});
