/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReviewQuestionnaire from "../ReviewQuestionnaire";
import { MemoryRouter } from "react-router-dom";
import { QuestionnaireContextProvider } from "../../../../context/QuestionnaireContext";
import { AppContextProvider } from "../../../../context/AppContext";

const mockQuestionnaireData = [
  {
    Dental: [
      {
        Question: "teeth",
        Radio_button: ["Pale Yellow", "White", "Black"],
        Checkbox: null,
        Dropdown: null,
        Answer: ["Black"],
      },
      {
        Question: "tongue",
        Radio_button: null,
        Checkbox: ["Pale Yellow", "White", "Black"],
        Dropdown: null,
        Answer: ["Pale Yellow", "White", "Black"],
      },
      {
        Question: "tooth decay",
        Radio_button: ["Yes", "No"],
        Checkbox: null,
        Dropdown: null,
        Answer: null,
      },
      {
        Question: "teeth",
        Radio_button: ["Pale Yellow", "White", "Black"],
        Checkbox: null,
        Dropdown: null,
        Answer: ["Black", "green"],
      },
    ],
  },
];

describe("ReviewQuestionnaire Component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <AppContextProvider>
          <QuestionnaireContextProvider>
            <ReviewQuestionnaire />
          </QuestionnaireContextProvider>
        </AppContextProvider>
      </MemoryRouter>
    );
  });

  // it("navigates to the correct route on Continue button click", () => {
  //   const { getByText } = render(
  //     <MemoryRouter>
  //       <AppContextProvider>
  //         <QuestionnaireContextProvider>
  //           <ReviewQuestionnaire />
  //         </QuestionnaireContextProvider>
  //       </AppContextProvider>
  //     </MemoryRouter>
  //   );

  //   fireEvent.click(getByText("Continue"));

  //   // Add assertions for navigation or route changes here
  // });
});
