import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationContext } from "../../../context/RegistrationContext";
import styles from "../../../styles";
import RegistrationFormHeading from "../../../components/RegistrationComps/RegistrationFormHeading/RegistrationFormHeading";
import OcrLoader from "../../../components/RegistrationComps/OcrLoader/OcrLoader";
import ButtonSectionGreenBg from "../../../components/Buttons/ButtonSectionGreenBg";
import BelowSection from "../../../components/RegistrationComps/BelowSection/BelowSection";
import Single_UploadComp from "../../../components/RegistrationComps/UploadComps/Single_UploadComp";
import Single_CaptureComp from "../../../components/RegistrationComps/CaptureComps/Single_CaptureComp";
import ButtonSectionWhiteBg from "../../../components/Buttons/ButtonSectionWhiteBg";

const CreditCard = () => {
  const { state, dispatch } = useRegistrationContext();

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  // Variable to store timeout IDs
  let navigateTimeout;

  const { frontCredit_Picture } = state;

  const updateFrontCreditPic = (frontPic) => {
    dispatch({ type: "UPDATE_FRONT_CREDIT", payload: frontPic });
  };

  const handleContinueBtnClick = () => {
    // Clear any existing timeouts
    clearTimeout(navigateTimeout);

    // Set loader to true initially
    setLoader(true);

    // Delay the execution of the remaining step
    navigateTimeout = setTimeout(() => {
      navigate("/dashboard/registration/credit_review", {
        state: { manualLink: false },
      });

      setLoader(false);
    }, 2500);
  };

  const handleManuallyBtnClick = () => {
    navigate("/dashboard/registration/credit_review", {
      state: { manualLink: true },
    });
  };

  useEffect(() => {
    dispatch({
      type: "UPDATE_SIDE_STEPPER_HEADING",
      payload:
        "For a prompt completion of your Healthcare details, please upload images of your Credit Card for easy payment processing. So you don't have to type in your profile information!",
    });
    dispatch({ type: "UPDATE_STEPPER_PAGE", payload: 3 });
  }, []);

  return (
    <div
      className={`${styles.xSectionPadding} w-full flex flex-col items-center gap-4 py-6`}
    >
      <RegistrationFormHeading heading={"Credit Card"} />
      <Single_CaptureComp updateFrontPic={updateFrontCreditPic} />
      <Single_UploadComp updateFrontPic={updateFrontCreditPic} />
      {loader ? (
        <OcrLoader />
      ) : (
        <>
          {frontCredit_Picture && (
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

export default CreditCard;
