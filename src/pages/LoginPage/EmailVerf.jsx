import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { iksLogo, loginGirlGroupImg } from "../../assets";
import { FaPhone } from "react-icons/fa6";
import WelcomeSecContent from "../../components/WelcomeSecContent/WelcomeSecContent";
import ImageSection from "../../components/ImageComps/ImageSection";
import EmailLinkLoginFunctionality from "../../components/LoginComps/EmailLinkLoginFunctionality";
import GoogleEmailLoginFunctionality from "../../components/LoginComps/GoogleEmailLoginFunctionality";
import SnackBarAlert from "../../components/Alerts/SnackBarAlert";
import HospitalLogo from "../../components/HospitalLogo/HospitalLogo";
import { useAppContext } from "../../context/AppContext";

const EmailVerf = () => {
  const location = useLocation();
  const { appContextState } = useAppContext();

  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const logoStyles = "max-w-30 max-h-20 object-cover pb-2";
  const welcomeSectionProps = {
    welcomeText: "Welcome",
    doctorName: "Don R. Daniels",
    // description: "IKS Health streamlines your doctor's appointment experience!",
  };

  return (
    <>
      <div className="font-robotoSlab min-h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center">
        <div className="flex w-screen min-h-screen overflow-x-hidden">
          {/* Left half with background color #92C281 only visible for medium and above screens*/}
          {/* <div className="hidden md:flex w-1/2 bg-green-100 justify-center items-center">
            <div className="flex flex-col items-center">
              <ParentSplash />
            </div>
          </div> */}

          {/* Right half visible for all screens*/}
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-md flex flex-col justify-center items-center p-8 gap-4 md:gap-2">
              <img
                src={loginGirlGroupImg}
                alt="login"
                className="block md:hidden w-[12rem] object-cover "
              />
              {appContextState?.currentHospitalLogo && (
                <HospitalLogo
                  alt="navbar logo"
                  className="w-[10rem] object-cover"
                />
              )}

              <WelcomeSecContent {...welcomeSectionProps} />
              <span className="w-full text-center text-prGreenDark font-robotoSlab text-2xl font-medium">
                Patient Login
              </span>
              <span className="w-[90%] text-center  font-robotoSlab font-light text-gray-700 text-sm">
                Please enter your registered email and click &apos;Send
                Verification Link&apos; to receive your one-time login link.
              </span>
              <div className="w-full flex items-center justify-center gap-5">
                <GoogleEmailLoginFunctionality
                  setSnackbarOpen={setSnackbarOpen}
                />
                <button
                  type="submit"
                  className="flex bg-green-400 text-white py-2 px-2 hover:bg-green-600 active:bg-green-600 transition cursor-pointer items-center justify-center gap-2 disabled:bg-green-300 disabled:cursor-not-allowed rounded-full"
                  onClick={() => {
                    navigate("/otpverification");
                  }}
                >
                  <FaPhone color="white" />
                </button>
              </div>
              <span className="font-robotoSlab text-xs font-light text-gray-500">
                or
              </span>
              <EmailLinkLoginFunctionality
                patientEmail={
                  location?.state ? location.state?.patientEmail : ""
                } // pass the patient email for auto population
                setSnackbarOpen={setSnackbarOpen}
              />
              <ImageSection
                src={iksLogo}
                alt="HealthCare Provider placeholder"
                imageStyles={logoStyles}
              />
            </div>
          </div>
        </div>
      </div>
      <SnackBarAlert
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
};

export default EmailVerf;
