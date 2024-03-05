import { useAppContext } from "./context/AppContext";
import { Route, Routes } from "react-router-dom";
import ContinueLogin from "./pages/LoginPage/ContinueLogin";
import EmailVerf from "./pages/LoginPage/EmailVerf";
import OTPVerf from "./pages/LoginPage/OTPVerf";
import Dashboard from "./pages/Dashboard/Dashboard";
import Registration from "./pages/Registration/Registration";
import RegistrationWelcomeLander from "./pages/Registration/RegistrationWelcomeLander/RegistrationWelcomeLander";
import DrivingLicense from "./pages/Registration/DrivingLicense/DrivingLicense";
import DrivingReview from "./pages/Registration/DrivingReview/DrivingReview";
import Insurance from "./pages/Registration/Insurance/Insurance";
import InsuranceReview from "./pages/Registration/InsuranceReview/InsuranceReview";
import CreditCard from "./pages/Registration/CreditCard/CreditCard";
import CreditCardReview from "./pages/Registration/CreditCardReview/CreditCardReview";
import UnprotectedComponents from "./components/Wrappers/UnprotectedComponents";
import EmailLinkCrossVerificationLoader from "./components/EmailLinkCrossVerificationLoader/EmailLinkCrossVerificationLoader";
import DashboardLander from "./pages/Dashboard/DashboardLander";
import Fallback from "./pages/Fallback/Fallback";
import DownloadOrOnline from "./pages/Questionnaire/QuestionnaireChoice/DownloadOrOnline";
import DownloadAndUpload from "./pages/Questionnaire/QuestionnaireChoice/DownloadAndUpload";
import Questionnaire from "./pages/Questionnaire/Questionnaire";
import SdohQuestionnaire from "./pages/Questionnaire/SdohQuestionnaire/SdohQuestionnaire";
import WindowPopup from "./components/WindowPopup/WindowPopup";
import ConfirmAppointment from "./pages/ConfirmAppointment/ConfirmAppointment";
import ReviewQuestionnaire from "./pages/Questionnaire/ReviewQuestionnaire/ReviewQuestionnaire";
import AppointmentDashboard from "./pages/AppointmentDashboard/AppointmentDashboard";

const App = () => {
  const { appContextState } = useAppContext();
  const { showWindowPopup, windowPopupLoaderStatus } = appContextState;

  return (
    <>
      {showWindowPopup && <WindowPopup showLoader={windowPopupLoaderStatus} />}
      <Routes>
        <Route
          index
          exact
          element={
            <UnprotectedComponents>
              <ContinueLogin />
            </UnprotectedComponents>
          }
        />
        <Route
          path="/EmailVerification"
          exact
          element={
            <UnprotectedComponents>
              <EmailVerf />
            </UnprotectedComponents>
          }
        />
        <Route
          path="/otpverification"
          exact
          element={
            <UnprotectedComponents>
              <OTPVerf />
            </UnprotectedComponents>
          }
        />
        <Route
          path="/email_link_cross_verification"
          exact
          element={<EmailLinkCrossVerificationLoader />}
        />
        <Route
          path="/dashboard"
          exact
          element={
            // <ProtectedComponents>
            <Dashboard />
            // </ProtectedComponents>
          }
        >
          <Route index exact element={<DashboardLander />} />
          <Route path="registration" exact element={<Registration />}>
            <Route index exact element={<RegistrationWelcomeLander />} />
            <Route path="dl" exact element={<DrivingLicense />} />
            <Route path="dl_review" exact element={<DrivingReview />} />
            <Route path="insurance" exact element={<Insurance />} />
            <Route
              path="insurance_review"
              exact
              element={<InsuranceReview />}
            />
            <Route path="credit" exact element={<CreditCard />} />
            <Route path="credit_review" exact element={<CreditCardReview />} />
          </Route>
          <Route
            path="confirmAppointment"
            exact
            element={<ConfirmAppointment />}
          />
          <Route path="questionnaire" exact element={<Questionnaire />}>
            <Route
              path="download_or_online"
              exact
              element={<DownloadOrOnline />}
            />
            <Route
              path="download_and_upload"
              exact
              element={<DownloadAndUpload />}
            />
            <Route path="questions" exact element={<SdohQuestionnaire />} />
            <Route path="review" exact element={<ReviewQuestionnaire />} />
          </Route>
          <Route path="appdashboard" exact element={<AppointmentDashboard />} />
        </Route>
        <Route path="*" element={<Fallback />} />
      </Routes>
    </>
  );
};

export default App;
