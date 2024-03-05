import { useReducer, useContext, createContext } from "react";
import {
  sideStepperHeading,
  dl_info,
  insurance_info,
  creditCardMonthOptions,
  creditCardOptions,
  creditCardYearOptions,
  creditCard_info,
  genderOptions,
  insuranceProviderOptions,
  stateOptions,
} from "../constants";

// Create a context
const RegistrationContext = createContext();

// Initial state for your context
const initialState = {
  currentStepperSideHeading: sideStepperHeading,
  currentStepperPage: 1,
  frontDL_Picture: null,
  backDL_Picture: null,
  frontIns_Picture: null,
  backIns_Picture: null,
  frontCredit_Picture: null,
  dl_info,
  insurance_info,
  creditCard_info,
  genderOptions,
  stateOptions,
  insuranceProviderOptions,
  creditCardOptions,
  creditCardMonthOptions,
  creditCardYearOptions,
};

// Define your reducer function to update the state
const registrationReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SIDE_STEPPER_HEADING":
      return { ...state, currentStepperSideHeading: action.payload };
    case "UPDATE_STEPPER_PAGE":
      return { ...state, currentStepperPage: action.payload };
    case "UPDATE_FRONT_DL":
      return { ...state, frontDL_Picture: action.payload };
    case "UPDATE_BACK_DL":
      return { ...state, backDL_Picture: action.payload };
    case "UPDATE_FRONT_INS":
      return { ...state, frontIns_Picture: action.payload };
    case "UPDATE_BACK_INS":
      return { ...state, backIns_Picture: action.payload };
    case "UPDATE_FRONT_CREDIT":
      return { ...state, frontCredit_Picture: action.payload };
    case "UPDATE_DL_INFO":
      return { ...state, dl_info: action.payload };
    case "UPDATE_INS_INFO":
      return { ...state, insurance_info: action.payload };
    case "UPDATE_CREDIT_CARD_INFO":
      return { ...state, creditCard_info: action.payload };
    case "UPDATE_STATE_OPTIONS":
      return { ...state, genderOptions: action.payload };
    case "UPDATE_GENDER_OPTIONS":
      return { ...state, stateOptions: action.payload };
    case "UPDATE_INS_PROVIDER_OPTIONS":
      return { ...state, insuranceProviderOptions: action.payload };
    case "UPDATE_CREDIT_CARD_OPTIONS":
      return { ...state, creditCardOptions: action.payload };
    case "UPDATE_CREDIT_CARD_MONTH_OPTIONS":
      return { ...state, creditCardMonthOptions: action.payload };
    case "UPDATE_CREDIT_CARD_YEAR_OPTIONS":
      return { ...state, creditCardYearOptions: action.payload };
    default:
      return state;
  }
};

// Create a custom hook to access the context
export const useRegistrationContext = () => {
  return useContext(RegistrationContext);
};

// Create a context provider component
export const RegistrationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  return (
    <RegistrationContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
