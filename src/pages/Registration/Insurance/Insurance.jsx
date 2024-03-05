import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationContext } from "../../../context/RegistrationContext";
import styles from "../../../styles";
import RegistrationFormHeading from "../../../components/RegistrationComps/RegistrationFormHeading/RegistrationFormHeading";
import Double_CaptureComp from "../../../components/RegistrationComps/CaptureComps/Double_CaptureComp";
import Double_UploadComp from "../../../components/RegistrationComps/UploadComps/Double_UploadComp";
import OcrLoader from "../../../components/RegistrationComps/OcrLoader/OcrLoader";
import ButtonSectionGreenBg from "../../../components/Buttons/ButtonSectionGreenBg";
import BelowSection from "../../../components/RegistrationComps/BelowSection/BelowSection";
import ButtonSectionWhiteBg from "../../../components/Buttons/ButtonSectionWhiteBg";

const Insurance = () => {
  const { state, dispatch } = useRegistrationContext();

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  // Variable to store timeout IDs
  let navigateTimeout;

  const { frontIns_Picture, backIns_Picture } = state;

  const updateBackInsPic = (backIns) => {
    dispatch({ type: "UPDATE_BACK_INS", payload: backIns });
  };

  const updateFrontInsPic = (frontIns) => {
    dispatch({ type: "UPDATE_FRONT_INS", payload: frontIns });
  };

  const handleContinueBtnClick = () => {
    // Clear any existing timeouts
    clearTimeout(navigateTimeout);

    // Set loader to true initially
    setLoader(true);

    // Delay the execution of the remaining step
    navigateTimeout = setTimeout(() => {
      navigate("/dashboard/registration/insurance_review", {
        state: { manualLink: false },
      });

      setLoader(false);
    }, 2500);
  };

  const handleManuallyBtnClick = () => {
    navigate("/dashboard/registration/insurance_review", {
      state: { manualLink: true },
    });
  };

  useEffect(() => {
    dispatch({
      type: "UPDATE_SIDE_STEPPER_HEADING",
      payload: "Kindly upload images of your insurance policy card",
    });
    dispatch({ type: "UPDATE_STEPPER_PAGE", payload: 2 });
  }, []);

  return (
    <div
      className={`${styles.xSectionPadding} w-full flex flex-col items-center gap-4 py-6`}
    >
      <RegistrationFormHeading heading={"Insurance Information"} />
      <Double_CaptureComp
        updateFrontPic={updateFrontInsPic}
        updateBackPic={updateBackInsPic}
      />
      <Double_UploadComp
        updateFrontPic={updateFrontInsPic}
        updateBackPic={updateBackInsPic}
      />
      {loader ? (
        <OcrLoader />
      ) : (
        <>
          {frontIns_Picture && backIns_Picture && (
            <ButtonSectionGreenBg
              buttonName={"continue"}
              onClick={handleContinueBtnClick}
            />
          )}
        </>
      )}
      <ButtonSectionWhiteBg
        className="border-white"
        buttonName="Back"
        onClick={() => {
          navigate(-1);
        }}
      />
      {!loader && (
        <BelowSection manuallyBtnClickFunc={handleManuallyBtnClick} />
      )}
    </div>
  );
};

export default Insurance;
