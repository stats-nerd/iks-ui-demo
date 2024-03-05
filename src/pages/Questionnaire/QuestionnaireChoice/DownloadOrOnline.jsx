import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuestionnaireContext } from "../../../context/QuestionnaireContext";
import styles from "../../../styles";
import QuesFormHeading from "../../../components/QuestionnaireComps/QuesFormHeading/QuesFormHeading";
import DownloadBox from "../../../components/SdohComponents/DownloadBox";
import OnlineFormBox from "../../../components/SdohComponents/OnlineFormBox";
import ButtonSectionWhiteBg from "../../../components/Buttons/ButtonSectionWhiteBg";

const DownloadOrOnline = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quesContextDispatch } = useQuestionnaireContext();

  const handleDownloadClick = () => {
    navigate("/dashboard/questionnaire/download_and_upload");
    console.log("DownloadBox clicked");
  };

  const handleOnlineFormClick = () => {
    navigate("/dashboard/questionnaire/questions");

    console.log("OnlineFormBox clicked");
  };

  useEffect(() => {
    console.log(location);
    quesContextDispatch({
      type: "UPDATE_SDOH_QUESTIONNAIRE",
      payload:
        location.state || JSON.parse(localStorage.getItem("sdohQuestionnaire")),
    });
    if (localStorage.getItem("questionnaireType")) {
      quesContextDispatch({
        type: "UPDATE_QUESTIONNAIRE_TYPE",
        payload: localStorage.getItem("questionnaireType"),
      });
    }
  }, []);

  return (
    <div
      className={`${styles.minSectionHeight} ${styles.xSectionPadding} ${styles.ySectionPadding} flex flex-col items-center gap-5`}
    >
      <div className="font-robotoSlab w-[90%] md:w-[70%] flex flex-col gap-5">
        <QuesFormHeading heading="SDOH Questionnaire" />

        <div className="flex flex-col md:flex-row gap-4">
          <button onClick={handleDownloadClick}>
            <DownloadBox />
          </button>
          <button onClick={handleOnlineFormClick}>
            <OnlineFormBox />
          </button>
        </div>

        {/* Add responsive styling for smaller screens */}
        <div className={`md:flex-row-reverse md:justify-between`}>
          <ButtonSectionWhiteBg
            className="border-white underline  flex flex-col"
            buttonName="I will do this later"
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadOrOnline;
