import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { FaPhone } from "react-icons/fa6";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../config";
import { MuiOtpInput } from "mui-one-time-password-input";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { iksLogo, loginGirlGroupImg } from "../../assets";
import ImageSection from "../../components/ImageComps/ImageSection";
import SnackBarAlert from "../../components/Alerts/SnackBarAlert";
import HospitalLogo from "../../components/HospitalLogo/HospitalLogo";
import { useAppContext } from "../../context/AppContext";

const PhoneInputForm = ({ getOtp, number, setNumber, loader }) => (
  <form onSubmit={getOtp} className="w-full">
    <PhoneInput
      placeholder="Enter Phone Number"
      withCountryCallingCode
      smartCaret
      defaultCountry="US"
      flags={flags}
      value={number}
      onChange={setNumber}
    />
    <div className="my-2 ml-5" id="recaptcha-container"></div>
    <button
      type="submit"
      className="w-full bg-green-500 text-white rounded py-2 px-2 hover:bg-green-600 active:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2 disabled:bg-green-300 disabled:cursor-not-allowed"
      disabled={loader}
    >
      {loader ? (
        <>
          <CircularProgress color="inherit" size={15} />
          Sending OTP...
        </>
      ) : (
        <>
          <FaPhone color="white" />
          Send OTP
        </>
      )}
    </button>
  </form>
);

const OTPVerf = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { appContextState } = useAppContext();

  const [showOtpForm, setShowOtpForm] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState(
    location?.state ? location?.state?.patientPhoneNo : ""
  );
  const [result, setResult] = useState("");

  const handleChange = (newValue) => {
    if (/^\d+$/.test(newValue)) setOtp(newValue);
  };

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {}
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    if (number === "" || number === undefined) {
      setSnackbarOpen({
        open: true,
        message: "Please enter a valid phone number!",
        type: "warning",
      });
      return;
    }
    try {
      setLoader(true);
      const response = await setUpRecaptha(number);
      console.log("phone auth firebase resp", response);
      setResult(response);
      setLoader(false);
      setShowOtpForm(true);
    } catch (err) {
      setSnackbarOpen({
        open: true,
        message: err.message,
        type: "warning",
      });
      setLoader(false);
    }
  };

  const signIn = async () => {
    setLoader(true);
    try {
      await result.confirm(otp);
      console.log(result);
      setLoader(false);

      navigate("/dashboard/registration");
    } catch (err) {
      setSnackbarOpen({
        open: true,
        message: err.message,
        type: "warning",
      });
      setLoader(false);
    }
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      signIn();
    }
  };

  const resetEntireForm = () => {
    setShowOtpForm(false);
    setLoader(false);
    setOtp("");
    setNumber("");
    setResult("");
  };

  // useEffect(() => {
  //   if (auth.currentUser) {
  //     navigate("/home");
  //   }
  // }, []);

  useEffect(() => {
    if (otp.length === 6) {
      signIn();
    }
  }, [otp]);

  const logoStyles = "max-w-30 max-h-20 object-cover pb-2";

  return (
    <>
      <div className="font-robotoSlab min-h-screen overflow-y-auto flex flex-col justify-center items-center">
        <div className="flex w-screen">
          {/* Left half with background color #92C281 only visible for medium and above screens*/}
          {/* <div className="hidden md:flex w-1/2 h-full bg-green-100 justify-center items-center">
            <div className="flex flex-col items-center">
              <ParentSplash />
            </div>
          </div> */}

          {/* Right half visible for all screens*/}
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-md flex flex-col justify-center items-center p-10 gap-2 md:gap-5">
              <img
                src={loginGirlGroupImg}
                alt="login"
                className="block md:hidden w-[80%] object-cover"
              />
              {appContextState?.currentHospitalLogo && (
                <HospitalLogo className={"w-[8rem] object-cover"} />
              )}
              <p className="hidden md:block text-2xl  text-green-800">
                {appContextState?.patientInfo?.patientName}
              </p>
              <span className="w-full text-center text-prGreenDark font-robotoSlab text-lg md:text-2xl font-medium">
                Patient Login
              </span>
              {!showOtpForm && (
                <span className="w-[90%] text-center  font-robotoSlab font-light text-gray-700 text-sm">
                  Please enter your registered phone number and click &apos;Send
                  OTP&apos; to receive your one-time login 6-digit password.
                </span>
              )}
              {showOtpForm ? (
                <>
                  <span className="w-[95%] text-center text-xs font-robotoSlab font-light text-gray-700">
                    A message has been sent to your mobile number with a 6 digit
                    code. <br />
                    Please enter the code below.
                  </span>
                  <MuiOtpInput
                    length={6}
                    borderColor={"green"}
                    TextFieldsProps={{ placeholder: "*" }}
                    value={otp}
                    onChange={handleChange}
                    gap={1}
                  />
                  <button
                    className="w-full bg-green-400 text-white rounded py-2 text-center px-2 hover:bg-green-500 active:bg-green-500 transition cursor-pointer disabled:cursor-not-allowed disabled:bg-green-300"
                    onClick={handleSubmit}
                    disabled={loader}
                  >
                    {loader && (
                      <CircularProgress
                        size={15}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                    )}
                    {loader ? "Signing In..." : "Sign In"}
                  </button>
                  <span className="my-2 font-robotoSlab text-xs font-light text-gray-500">
                    Didn&apos;t get the message?{"  "}
                    <span
                      className="cursor-pointer font-robotoSlab text-sm font-normal text-green-600"
                      onClick={resetEntireForm}
                    >
                      Resend
                    </span>
                  </span>
                </>
              ) : (
                <PhoneInputForm
                  getOtp={getOtp}
                  number={number}
                  setNumber={setNumber}
                  loader={loader}
                />
              )}
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

export default OTPVerf;
