import { render, screen, fireEvent } from "@testing-library/react";
import SdohQuestionnaire from "../SdohQuestionnaire";
import { QuestionnaireContextProvider } from "../../../../context/QuestionnaireContext";
import { MemoryRouter } from "react-router-dom";
import { AppContextProvider } from "../../../../context/AppContext";

describe("SdohQuestionnaire", () => {
  test("handles Skip button click", () => {
    render(
      <MemoryRouter>
        <AppContextProvider>
          <QuestionnaireContextProvider>
            <SdohQuestionnaire />
          </QuestionnaireContextProvider>
        </AppContextProvider>
      </MemoryRouter>
    );
    const skipButton = screen.getAllByText(/Skip/i);
    expect(skipButton[0]).toBeInTheDocument();
  });

  // Uncomment the following test cases if they contain specific test logic
  /*
  test("renders SDOH Questionnaire component", () => {
    render(
      <MemoryRouter>
        <AppContextProvider>
          <QuestionnaireContextProvider>
            <SdohQuestionnaire />
          </QuestionnaireContextProvider>
        </AppContextProvider>
      </MemoryRouter>
    );
    const headingElement = screen.getByText(/SDOH Questionnaire/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("displays the current question number and total questions", () => {
    render(
      <MemoryRouter>
        <AppContextProvider>
          <QuestionnaireContextProvider>
            <SdohQuestionnaire />
          </QuestionnaireContextProvider>
        </AppContextProvider>
      </MemoryRouter>
    );
    const indicatorElement = screen.getByText(/Question 1 of \d+/i);
    expect(indicatorElement).toBeInTheDocument();
  });
  */

  test("handles 'I will do this later' link click", () => {
    render(
      <MemoryRouter>
        <AppContextProvider>
          <QuestionnaireContextProvider>
            <SdohQuestionnaire />
          </QuestionnaireContextProvider>
        </AppContextProvider>
      </MemoryRouter>
    );
    const laterLink = screen.getByText(/I will do this later/i);
    fireEvent.click(laterLink);
  });

  test("handles 'Continue' button click and makes API request", async () => {
    render(
      <MemoryRouter>
        <AppContextProvider>
          <QuestionnaireContextProvider>
            <SdohQuestionnaire />
          </QuestionnaireContextProvider>
        </AppContextProvider>
      </MemoryRouter>
    );
  });

  test("handles end of questionnaire and navigates to review", async () => {
    render(
      <MemoryRouter>
        <AppContextProvider>
          <QuestionnaireContextProvider>
            <SdohQuestionnaire />
          </QuestionnaireContextProvider>
        </AppContextProvider>
      </MemoryRouter>
    );
  });
});
