import { onAuthStateChanged } from "firebase/auth";
import { useReducer, useContext, createContext, useEffect } from "react";
import { auth } from "../../config";

// Create a context
const AppContext = createContext();

// Initial state for your context
const initialState = {
  patientInfo: null,
  currentHospitalLogo: null,
  currentAuthUser: null,
  loginDocName: null,
  showWindowPopup: false,
  windowPopupLoaderStatus: false,
};

// Define your reducer function to update the state
const appReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PATIENT_INFO":
      return { ...state, patientInfo: action.payload };
    case "UPDATE_HOSPITAL_LOGO":
      return { ...state, currentHospitalLogo: action.payload };
    case "UPDATE_CURRENT_USER":
      return { ...state, currentAuthUser: action.payload };
    case "UPDATE_LOGIN_DOC_NAME":
      return { ...state, loginDocName: action.payload };
    case "UPDATE_WINDOW_POPUP_STATUS":
      return { ...state, showWindowPopup: action.payload };
    case "UPDATE_WINDOW_POPUP_LOADER_STATUS":
      return { ...state, windowPopupLoaderStatus: action.payload };
    default:
      return state;
  }
};

// Create a custom hook to access the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create a context provider component
export const AppContextProvider = ({ children }) => {
  const [appContextState, appContextDispatch] = useReducer(
    appReducer,
    initialState
  );

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is logged in:", user);
        // Perform actions based on the logged-in user (if needed)

        appContextDispatch({ type: "UPDATE_CURRENT_USER", payload: user });
      } else {
        // No user is signed in
        console.log("No user is logged in");
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        appContextState,
        appContextDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
