import { useEffect, useState } from "react";
import ButtonSectionGreenBg from "../../../components/Buttons/ButtonSectionGreenBg";
import ButtonSectionWhiteBg from "../../../components/Buttons/ButtonSectionWhiteBg";
import QuesFormHeading from "../../../components/QuestionnaireComps/QuesFormHeading/QuesFormHeading";
import QuesIndicator from "../../../components/QuestionnaireComps/QuesIndicator/QuesIndicator";
import QuesRadioType from "../../../components/QuestionnaireComps/QuesTypes/QuesRadioType";
import styles from "../../../styles";
import QuesCheckmarkType from "../../../components/QuestionnaireComps/QuesTypes/QuesCheckmarkType";
import QuesDropdownType from "../../../components/QuestionnaireComps/QuesTypes/QuesDropdownType";
import { useQuestionnaireContext } from "../../../context/QuestionnaireContext";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import YellowLoader from "../../../components/Loader/YellowLoader";
import { API_BASE_URL } from "../../../../env.config";

const SdohQuestionnaire = () => {
  const navigate = useNavigate();
  const { appContextState, quesContextDispatch } = useAppContext();
  const { quesContextState } = useQuestionnaireContext();
  const { sdohQuestionnaire } = quesContextState;
  const [loader, setLoader] = useState(false);
  const [currentPatientInfo, setCurrentPatientInfo] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(
    // sdohQuestionnaire ? sdohQuestionnaire[0] : []
    sdohQuestionnaire[0]
  );

  const updateQuestionnaireWithAnswer = (question, answer, quesType) => {
    console.log(question, answer, quesType);
    if (quesType === "radio" || quesType === "dropdown") {
      // let tempQuestions = allQuestions;
      const currentQuestion = sdohQuestionnaire.find(
        (quesObj) => quesObj.Question === question
      );
      const currentQuestionIndex = sdohQuestionnaire.findIndex(
        (quesObj) => quesObj.Question === question
      );
      currentQuestion.Answer = [answer];
      sdohQuestionnaire[currentQuestionIndex] = currentQuestion;
      console.log(sdohQuestionnaire);
      localStorage.setItem(
        "sdohQuestionnaire",
        JSON.stringify(sdohQuestionnaire)
      );
    } else if (quesType === "checkmark") {
      const currentQuestion = sdohQuestionnaire.find(
        (quesObj) => quesObj.Question === question
      );
      const currentQuestionIndex = sdohQuestionnaire.findIndex(
        (quesObj) => quesObj.Question === question
      );
      if (!currentQuestion.Answer) currentQuestion.Answer = [];
      if (answer.checked) {
        if (!currentQuestion.Answer.includes(answer.value))
          currentQuestion.Answer = [...currentQuestion.Answer, answer.value];
      } else {
        if (currentQuestion.Answer.includes(answer.value)) {
          // Find the index of the first occurrence
          const indexToRemove = currentQuestion.Answer.indexOf(answer.value);

          // Remove the element at the found index
          if (indexToRemove !== -1) {
            currentQuestion.Answer.splice(indexToRemove, 1);
          }
        }
      }
      sdohQuestionnaire[currentQuestionIndex] = currentQuestion;
      console.log(sdohQuestionnaire);
      localStorage.setItem(
        "sdohQuestionnaire",
        JSON.stringify(sdohQuestionnaire)
      );
    }
  };

  const moveToNextQuestion = () => {
    const currentIndex = sdohQuestionnaire.indexOf(currentQuestion);
    const nextIndex = currentIndex + 1;
    console.log("current question index", currentIndex);

    if (nextIndex < sdohQuestionnaire.length) {
      setCurrentQuestion(sdohQuestionnaire[nextIndex]);
    } else {
      // Handle end of questionnaire, you can perform any action here
      console.log("End of questionnaire reached.");
    }
  };

  const handleContinueBtnClick = () => {
    setLoader(true);
    const questionnaireType = localStorage.getItem("questionnaireType");
    const questionnaireCategory =
      questionnaireType === "SDOH"
        ? "General"
        : currentPatientInfo?.appointmentDetails[0]?.appointmentType;
    let payload = {
      patientId: currentPatientInfo?.patientId,
      appDateTime:
        currentPatientInfo?.appointmentDetails[0]?.appointmentDateTime,
      hospitalName: currentPatientInfo?.hospitalName,
      category: questionnaireCategory,
      type: localStorage.getItem("questionnaireType"),
      csvData: {},
    };
    payload.csvData[questionnaireCategory] = sdohQuestionnaire;
    console.log("updated questionnaire api payload", payload);

    localStorage.setItem(questionnaireType, JSON.stringify(payload.csvData));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(payload);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_BASE_URL}/questionnaire/updateQuestionnaire`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("question answer call", result);
        if (
          sdohQuestionnaire.indexOf(currentQuestion) + 1 ===
          sdohQuestionnaire.length
        ) {
          navigate("/dashboard/questionnaire/review");
        } else {
          moveToNextQuestion();
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log("question answer call error", error);
        setLoader(false);
      });
  };

  const handleSkipBtnClick = () => {
    moveToNextQuestion();
  };

  function isAnswerValid(questionData) {
    return questionData.Answer !== null && questionData.Answer.length > 0;
  }

  function areAllAnswersValid(questionArray) {
    return questionArray.every((question) => isAnswerValid(question));
  }

  const handleDoThisLaterBtnClick = () => {
    let isSdohFilled = false;
    let isMedicalHistoryFilled = false;
    if (localStorage.getItem("SDOH")) {
      const sdohQuestions = Object.values(
        JSON.parse(localStorage.getItem("SDOH"))
      )[0];
      console.log("current sdoh questions", sdohQuestions);
      isSdohFilled = areAllAnswersValid(sdohQuestions);
    }
    if (localStorage.getItem("Medical History")) {
      const medHistQuestions = Object.values(
        JSON.parse(localStorage.getItem("Medical History"))
      )[0];
      console.log("current med hist questions", medHistQuestions);
      isMedicalHistoryFilled = areAllAnswersValid(medHistQuestions);
    }
    navigate("/dashboard/appdashboard", {
      state: {
        currentPatientInfo,
        isSdohFilled,
        isMedicalHistoryFilled,
      },
    });
  };

  useEffect(() => {
    setCurrentPatientInfo(appContextState.patientInfo);
    if (!sdohQuestionnaire && localStorage.getItem("sdohQuestionnaire")) {
      quesContextDispatch({
        type: "UPDATE_SDOH_QUESTIONNAIRE",
        payload: JSON.parse(localStorage.getItem("sdohQuestionnaire")),
      });
    }
  }, []);

  return (
    <div
      className={`${styles.xSectionPadding} py-10 flex items-center justify-center`}
    >
      <div className="font-robotoSlab w-[90%] md:w-[70%] flex flex-col gap-5">
        <QuesFormHeading heading="SDOH Questionnaire" />
        <QuesIndicator
          currentQuesNumber={sdohQuestionnaire.indexOf(currentQuestion) + 1}
          totalQuesNumber={sdohQuestionnaire.length}
        />
        {currentQuestion?.Radio_button && (
          <QuesRadioType
            {...currentQuestion}
            updateQuestionnaireWithAnswer={updateQuestionnaireWithAnswer}
          />
        )}
        {currentQuestion?.Checkmark && (
          <QuesCheckmarkType
            {...currentQuestion}
            updateQuestionnaireWithAnswer={updateQuestionnaireWithAnswer}
          />
        )}
        {currentQuestion?.Dropdown && (
          <QuesDropdownType
            {...currentQuestion}
            updateQuestionnaireWithAnswer={updateQuestionnaireWithAnswer}
          />
        )}
        <div className="w-full flex flex-col md:flex-row gap-5 items-start md:items-center">
          {loader ? (
            <div className="w-[250px] flex items-center justify-center">
              <YellowLoader />
            </div>
          ) : (
            <ButtonSectionGreenBg
              buttonName="Continue"
              onClick={handleContinueBtnClick}
              className="w-[250px] text-lg"
            />
          )}

          <span
            className="md:hidden text-PrimaryGreen underline underline-offset-4 cursor-pointer mt-4"
            onClick={handleSkipBtnClick}
          >
            Skip
          </span>
          <ButtonSectionWhiteBg
            buttonName="Skip"
            onClick={handleSkipBtnClick}
            className="hidden md:block w-[250px]"
          />
        </div>
        <span
          className="text-PrimaryGreen underline underline-offset-4 cursor-pointer mt-4"
          onClick={handleDoThisLaterBtnClick}
        >
          I will do this later
        </span>
      </div>
    </div>
  );
};

export default SdohQuestionnaire;
