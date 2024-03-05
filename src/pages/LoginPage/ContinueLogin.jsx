import { useLocation, useNavigate } from "react-router-dom";
import { iksLogo, nurseImg } from "../../assets";
import ImageSection from "../../components/ImageComps/ImageSection";
import WelcomeSecContent from "../../components/WelcomeSecContent/WelcomeSecContent";
import ButtonSectionGreenBg from "../../components/Buttons/ButtonSectionGreenBg";
import HospitalLogo from "../../components/HospitalLogo/HospitalLogo";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import SnackBarAlert from "../../components/Alerts/SnackBarAlert";
import { API_BASE_URL } from "../../../env.config";

const ContinueLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appContextDispatch, appContextState } = useAppContext();

  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // const welcomeHeading = null;
  const welcomeHeading = "Doctor's Appointment Made Easy";

  const imageStyles = "w-[8rem] object-cover my-3";

  const welcomeSectionProps = {
    welcomeText: "Welcome",
    doctorName: "Don R. Daniels",
    description:
      "[PRODUCT_NAME] streamlines your doctor's appointment experience!",
  };
  const logoStyles = "object-cover mt-8";
  const nurseImageStyles = "max-w-40 max-h-40 object-cover my-3";

  const handleContinue = () => {
    navigate("/EmailVerification");
  };

  const saveDecryptedPatientInfoToLocal = (pData) => {
    console.log("pData before saving to local", pData);
    appContextDispatch({
      type: "UPDATE_HOSPITAL_LOGO",
      payload: pData.hospitalLogo,
    });
    delete pData.hospitalLogo; // removing hospital logo before saving
    appContextDispatch({
      type: "UPDATE_PATIENT_INFO",
      payload: pData,
    });
    return;
  };

  const checkIfUrlHasCorrectEncoding = (currentLocation) => {
    console.log("checkIfUrlHasCorrectEncoding", currentLocation);
    if (!currentLocation) return false;
    if (
      currentLocation.includes("?enc=") &&
      currentLocation.includes("iv=") &&
      currentLocation.includes("aTag")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const parseUrlEncoding = (encodedUrl) => {
    const encryptedText = encodedUrl.split("&")[0].replace("?enc=", "");
    const iv = encodedUrl.split("&")[1].replace("iv=", "");
    const authenticationTag = encodedUrl.split("&")[2].replace("aTag=", "");
    return { encryptedText, iv, authenticationTag };
  };

  const decodeUrl = () => {
    localStorage.removeItem("SDOH");
    localStorage.removeItem("Medical History");
    console.log("app useEffect says Hello", location);
    appContextDispatch({
      type: "UPDATE_WINDOW_POPUP_STATUS",
      payload: true,
    });
    appContextDispatch({
      type: "UPDATE_WINDOW_POPUP_LOADER_STATUS",
      payload: true,
    });
    if (!location.search.length) {
      appContextDispatch({
        type: "UPDATE_WINDOW_POPUP_STATUS",
        payload: false,
      });
      return;
    }
    if (!checkIfUrlHasCorrectEncoding(location.search)) {
      appContextDispatch({
        type: "UPDATE_WINDOW_POPUP_STATUS",
        payload: false,
      });
      return;
    }
    const { authenticationTag, encryptedText, iv } = parseUrlEncoding(
      location.search
    );

    console.log("encoded payload", encryptedText);
    console.log("cipher iv", iv);
    console.log("auth tag for decryption", authenticationTag);

    // call the api for decryption
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      encryptedText: encryptedText,
      iv: iv,
      authenticationTag: authenticationTag,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${API_BASE_URL}/decrypt`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("decryption result", result.data);
        saveDecryptedPatientInfoToLocal(result.data);
        if (result?.data?.patientEmail) {
          navigate("/EmailVerification", {
            state: { patientEmail: result?.data?.patientEmail },
          });
        } else if (result?.data?.patientPhoneNo) {
          navigate("/otpverification", {
            state: { patientPhoneNo: result?.data?.patientPhoneNo },
          });
        }
        appContextDispatch({
          type: "UPDATE_WINDOW_POPUP_STATUS",
          payload: false,
        });
      })
      .catch((error) => {
        console.log("error", error);
        appContextDispatch({
          type: "UPDATE_WINDOW_POPUP_LOADER_STATUS",
          payload: false,
        });
        appContextDispatch({
          type: "UPDATE_WINDOW_POPUP_STATUS",
          payload: true,
        });
        setSnackbarOpen({
          open: true,
          message: "ERROR: Decryption failed",
          type: "error",
        });
      });
  };

  useEffect(() => {
    decodeUrl();
  }, []);

  return (
    <>
      <div className="font-robotoSlab w-screen min-h-screen overflow-y-auto flex flex-col justify-center items-center">
        <div className="w-full flex">
          {/* Right half visible for all screen sizes*/}
          <div className="w-full flex flex-col items-center justify-center">
            {appContextState?.currentHospitalLogo && (
              <HospitalLogo className={imageStyles} />
            )}
            <WelcomeSecContent {...welcomeSectionProps} />
            <p className="text-center my-2">
              [TBD] streamlines your doctor&apos;s appointment experience
            </p>
            <ImageSection
              src={nurseImg}
              alt="HealthCare Provider placeholder"
              imageStyles={nurseImageStyles}
            />
            <p className="text-2xl md:text-3xl text-green-800 items-center justify-center text-center font-quicksand-sans-serif px-1">
              {welcomeHeading}
            </p>
            <ButtonSectionGreenBg
              buttonName="Continue"
              onClick={handleContinue}
              className="mt-5"
            />
            <ImageSection
              src={iksLogo}
              alt="HealthCare Provider placeholder"
              imageStyles={logoStyles}
            />
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

export default ContinueLogin;
