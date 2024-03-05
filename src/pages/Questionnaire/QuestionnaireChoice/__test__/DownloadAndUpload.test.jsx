import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import DownloadAndUpload from "../DownloadAndUpload";
import { useQuestionnaireContext } from "../../../../context/QuestionnaireContext";
jest.mock("../../../../context/QuestionnaireContext");
const mockContextValue = {
  quesContextState: {
  },
};

useQuestionnaireContext.mockReturnValue(mockContextValue);
describe("DownloadAndUpload component", () => {
  test("clicking 'I will do this later' button does not trigger navigation", () => {
    render(
      <MemoryRouter>
        <DownloadAndUpload />
      </MemoryRouter>
    );
    const doThisLaterButton = screen.getByText("I will do this later");
    fireEvent.click(doThisLaterButton);
    expect(window.location.pathname).not.toBe(
      "/dashboard/questionnaire/questions"
    );
  });

  test("continue button is not rendered initially", () => {
    render(
      <MemoryRouter>
        <DownloadAndUpload />
      </MemoryRouter>
    );
    const continueButton = screen.queryByText("Continue");
    expect(continueButton).toBeNull();
  });
});
