import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationContext } from "../../../context/RegistrationContext";
import styles from "../../../styles";
import RegistrationFormHeading from "../../../components/RegistrationComps/RegistrationFormHeading/RegistrationFormHeading";
import Double_CaptureComp from "../../../components/RegistrationComps/CaptureComps/Double_CaptureComp";
import Double_UploadComp from "../../../components/RegistrationComps/UploadComps/Double_UploadComp";
import ButtonSectionGreenBg from "../../../components/Buttons/ButtonSectionGreenBg";
import OcrLoader from "../../../components/RegistrationComps/OcrLoader/OcrLoader";
import BelowSection from "../../../components/RegistrationComps/BelowSection/BelowSection";
import ButtonSectionWhiteBg from "../../../components/Buttons/ButtonSectionWhiteBg";
import { API_BASE_URL } from "../../../../env.config";

const DrivingLicense = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const { state, dispatch } = useRegistrationContext();
  const { frontDL_Picture, backDL_Picture } = state;

  const updateBackDLPic = (backDl) => {
    dispatch({ type: "UPDATE_BACK_DL", payload: backDl });
  };

  const updateFrontDLPic = (frontDl) => {
    dispatch({ type: "UPDATE_FRONT_DL", payload: frontDl });
  };

  // const handleContinueBtnClick = () => {
  //   // Clear any existing timeouts
  //   clearTimeout(navigateTimeout);

  //   // Set loader to true initially
  //   setLoader(true);

  //   // Delay the execution of the remaining step
  //   navigateTimeout = setTimeout(() => {
  //     // Navigate to "DrivingLisenceManual" route
  //     navigate("/dashboard/registration/dl_review", {
  //       state: { manualLink: false },
  //     });

  //     setLoader(false);
  //   }, 2500);
  // };

  const handleContinueBtnClick = async () => {
    try {
      setLoader(true); // Show loader while processing

      let frontPic = frontDL_Picture;
      let backPic = backDL_Picture;

      // Process images with Document AI
      const formData = new FormData();
      if (typeof frontDL_Picture === "string") {
        const fResponse = await fetch(frontPic);
        frontPic = await fResponse.blob();

        const bResponse = await fetch(backPic);
        backPic = await bResponse.blob();
      }
      formData.append("frontImage", frontPic); // Assuming these are File objects
      formData.append("backImage", backPic);
      //http://localhost:3000/process-documents
      const response = await fetch(`${API_BASE_URL}/process-documents`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const result = await response.json();
      console.log("google ocr api result", result);
      console.log("google ocr api front result");
      result.frontResult.document.entities.forEach((entity) => {
        console.log(entity.type, entity.mentionText);
      });
      console.log("google ocr api back result");
      result.backResult.document.entities.forEach((entity) => {
        console.log(entity.type, entity.mentionText);
      });

      // dispatch({
      //   type: "UPDATE_DL_INFO",
      //   payload: {
      //     ...dl_info,
      //     firstName: result.frontResult.document.entities.filter(
      //       (ent) => ent.type === "Given Names"
      //     )[0].mentionText,
      //     lastName: result.frontResult.document.entities.filter(
      //       (ent) => ent.type === "Family Name"
      //     )[0].mentionText,
      //     address1: result.frontResult.document.entities
      //       .filter((ent) => ent.type === "Address")[0]
      //       .mentionText.split("/n")[0],
      //     address2: result.frontResult.document.entities
      //       .filter((ent) => ent.type === "Address")[0]
      //       .mentionText.split("/n")[1],
      //     licenseNumber: result.frontResult.document.entities.filter(
      //       (ent) => ent.type === "Document Id"
      //     )[0].mentionText,
      //     dob: result.frontResult.document.entities.filter(
      //       (ent) => ent.type === "Date Of Birth"
      //     )[0].mentionText,
      //   },
      // });

      // Navigate to the next route or handle the result
      navigate("/dashboard/registration/dl_review", {
        state: { manualLink: false, documentAIResult: result },
      });
    } catch (error) {
      console.error("Error processing images:", error);
      // Handle error state here
    } finally {
      setLoader(false); // Hide loader
    }
  };

  const handleManuallyBtnClick = () => {
    navigate("/dashboard/registration/dl_review", {
      state: { manualLink: true },
    });
  };

  useEffect(() => {
    dispatch({
      type: "UPDATE_SIDE_STEPPER_HEADING",
      payload:
        "For a prompt completion of your Healthcare details, please upload images of both the front and back of your Identification Information. So you don't have to type in your profile information!",
    });
    dispatch({ type: "UPDATE_STEPPER_PAGE", payload: 1 });
  }, []);

  return (
    <div
      className={`${styles.xSectionPadding} w-full flex flex-col items-center gap-2 md:gap-4 py-3 md:py-6`}
    >
      <RegistrationFormHeading heading={"Identification Information"} />
      <Double_CaptureComp
        updateFrontPic={updateFrontDLPic}
        updateBackPic={updateBackDLPic}
      />
      <Double_UploadComp
        updateFrontPic={updateFrontDLPic}
        updateBackPic={updateBackDLPic}
      />
      {loader ? (
        <OcrLoader />
      ) : (
        <>
          {frontDL_Picture && backDL_Picture && (
            <ButtonSectionGreenBg
              buttonName={"continue"}
              onClick={handleContinueBtnClick}
            />
          )}
        </>
      )}
      {!loader && (
        <>
          <ButtonSectionWhiteBg
            className="border-white"
            buttonName="Back"
            onClick={() => {
              navigate(-1);
            }}
          />
          <BelowSection manuallyBtnClickFunc={handleManuallyBtnClick} />
        </>
      )}
    </div>
  );
};

export default DrivingLicense;
