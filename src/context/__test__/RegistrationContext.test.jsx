import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  RegistrationContextProvider,
  useRegistrationContext,
} from "../RegistrationContext";

// Mock component to test useContext hook
const MockComponent = () => {
  const { state, dispatch } = useRegistrationContext();

  const updateStepperPage = () => {
    dispatch({ type: "UPDATE_STEPPER_PAGE", payload: 2 });
  };

  return (
    <>
      <div data-testid="stepperPage">{state.currentStepperPage}</div>
      <button onClick={updateStepperPage}>Update Stepper Page</button>
    </>
  );
};

describe("RegistrationContextProvider", () => {
  it("renders children components", () => {
    render(
      <RegistrationContextProvider>
        <div>Child Component</div>
      </RegistrationContextProvider>
    );

    const childComponent = screen.getByText("Child Component");
    expect(childComponent).toBeInTheDocument();
  });

  it("provides state and dispatch via context", () => {
    let testContextValue;

    const TestComponent = () => {
      testContextValue = useRegistrationContext();
      return null;
    };

    render(
      <RegistrationContextProvider>
        <TestComponent />
      </RegistrationContextProvider>
    );

    expect(testContextValue).toHaveProperty("state");
    expect(testContextValue).toHaveProperty("dispatch");
  });
});

describe("useRegistrationContext", () => {
  it("returns state and dispatch", () => {
    let testContextValue;

    const TestComponent = () => {
      testContextValue = useRegistrationContext();
      return null;
    };

    render(
      <RegistrationContextProvider>
        <TestComponent />
      </RegistrationContextProvider>
    );

    expect(testContextValue).toHaveProperty("state");
    expect(testContextValue).toHaveProperty("dispatch");
  });
});

describe("MockComponent", () => {
  it("updates stepper page correctly", () => {
    render(
      <RegistrationContextProvider>
        <MockComponent />
      </RegistrationContextProvider>
    );

    const stepperPage = screen.getByTestId("stepperPage");
    expect(stepperPage).toHaveTextContent("1");

    const updateButton = screen.getByText("Update Stepper Page");
    fireEvent.click(updateButton);

    expect(stepperPage).toHaveTextContent("2");
  });
});
