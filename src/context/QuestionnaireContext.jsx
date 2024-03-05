import { useReducer, useContext, createContext } from "react";

// Create a context
const QuestionnaireContext = createContext();

// Initial state for your context
const initialState = {
  sdohQuestionnaire: [],
  questionnaireType: null,
};

// Define your reducer function to update the state
const questionnaireReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SDOH_QUESTIONNAIRE":
      return { ...state, sdohQuestionnaire: action.payload };
    case "UPDATE_QUESTIONNAIRE_TYPE":
      return { ...state, questionnaireType: action.payload };
    default:
      return state;
  }
};

// Create a custom hook to access the context
export const useQuestionnaireContext = () => {
  return useContext(QuestionnaireContext);
};

// Create a context provider component
export const QuestionnaireContextProvider = ({ children }) => {
  const [quesContextState, quesContextDispatch] = useReducer(
    questionnaireReducer,
    initialState
  );
  // need to check this context
  return (
    <QuestionnaireContext.Provider
      value={{
        quesContextState,
        quesContextDispatch,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};
