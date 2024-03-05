import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles";
import QuesFormHeading from "../../../components/QuestionnaireComps/QuesFormHeading/QuesFormHeading";
import RegistrationFormHeading from "../../../components/RegistrationComps/RegistrationFormHeading/RegistrationFormHeading";
import DownloadBox from "../../../components/SdohComponents/DownloadBox";
import UploadImage from "../../../components/SdohComponents/UploadImage";
import ButtonSectionGreenBg from "../../../components/Buttons/ButtonSectionGreenBg";
import ButtonSectionWhiteBg from "../../../components/Buttons/ButtonSectionWhiteBg";

const DownloadAndUpload = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);

  const handleContinueBtnClick = () => {};
  const handleFillOnline = () => {
    navigate("/dashboard/questionnaire/questions");
  };

  const handleDownloadClick = () => {
    console.log("DownloadBox clicked");
  };

  const handleUpload = (files, fileNames) => {
    setUploadedFiles(files);
    setUploadedFileNames(fileNames);
    console.log("Uploaded Files:", files);
  };

  const dynamicGap =
    uploadedFiles.length > 0 ? `${uploadedFiles.length * 3}rem` : "1rem";

  return (
    <div
      className={`${styles.minSectionHeight} ${styles.xSectionPadding} ${styles.ySectionPadding} flex flex-col items-center justify-center gap-5 pb-10`}
    >
      <div className="font-robotoSlab  flex flex-col gap-5">
        <QuesFormHeading heading="SDOH Questionnaire" />

        <RegistrationFormHeading
          heading="Please submit the completed form that you downloaded after filling it out."
          fontSize="18px"
        />

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button onClick={handleDownloadClick}>
            <DownloadBox pdfPath={""} />
          </button>

          <UploadImage onUpload={handleUpload} />
        </div>

        {/* Use responsive margin class */}
        <div className={`mb-${dynamicGap}`} />
        <div style={{ marginBottom: dynamicGap }} />
        {uploadedFiles.length > 0 && (
          <ButtonSectionGreenBg
            buttonName={"continue"}
            onClick={handleContinueBtnClick}
          />
        )}

        <ButtonSectionWhiteBg
          onClick={handleFillOnline}
          className="border-white text-left underline"
          buttonName="I will fill it online"
        />
        <ButtonSectionWhiteBg
          className="border-white text-left underline"
          buttonName="I will do this later"
        />
      </div>
    </div>
  );
};

export default DownloadAndUpload;
