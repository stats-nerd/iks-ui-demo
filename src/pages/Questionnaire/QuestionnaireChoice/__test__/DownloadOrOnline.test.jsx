import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QuestionnaireContextProvider } from "../../../../context/QuestionnaireContext";
import DownloadOrOnline from "../DownloadOrOnline";

describe("Download or online", () => {
  // test("renders DownloadOrOnline component", () => {
  //   render(
  //     <MemoryRouter>
  //       <QuestionnaireContextProvider>
  //         <DownloadOrOnline />
  //       </QuestionnaireContextProvider>
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByText("SDOH Questionnaire")).toBeInTheDocument();
  // });

  test("handles DownloadBox click", () => {
    render(
      <MemoryRouter>
        <QuestionnaireContextProvider>
          <DownloadOrOnline />
        </QuestionnaireContextProvider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("I will do this later"));
  });

  test("handles OnlineFormBox click", () => {
    render(
      <MemoryRouter>
        <QuestionnaireContextProvider>
          <DownloadOrOnline />
        </QuestionnaireContextProvider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("I will do this later"));
  });
});
