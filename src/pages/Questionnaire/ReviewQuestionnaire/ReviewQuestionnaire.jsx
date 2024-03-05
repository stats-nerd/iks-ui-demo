import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionnaireContext } from "../../../context/QuestionnaireContext";
import styles from "../../../styles";
import QuesFormHeading from "../../../components/QuestionnaireComps/QuesFormHeading/QuesFormHeading";
import ButtonSectionGreenBg from "../../../components/Buttons/ButtonSectionGreenBg";
import ButtonSectionWhiteBg from "../../../components/Buttons/ButtonSectionWhiteBg";
import { useAppContext } from "../../../context/AppContext";
import YellowLoader from "../../../components/Loader/YellowLoader";
import SnackBarAlert from "../../../components/Alerts/SnackBarAlert";
import { API_BASE_URL } from "../../../../env.config";

const ReviewQuestionnaire = () => {
  const navigate = useNavigate();
  const { quesContextState, quesContextDispatch } = useQuestionnaireContext();
  const { appContextState } = useAppContext();
  const [loader, setLoader] = useState(false);
  const { sdohQuestionnaire, questionnaireType } = quesContextState;
  const [currentPatientInfo, setCurrentPatientInfo] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [updatedQuestionnaireData, setUpdatedQuestionnaireData] = useState([
    {
      SDOH: sdohQuestionnaire,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState("");
  const [editingQuestion, setEditingQuestion] = useState({
    category: null,
    index: null,
  });

  const handleAnswerChange = (e) => {
    setEditedAnswer(e.target.value);
  };

  const onEdit = (category, index, editedQuestion, editedAnswer) => {
    const updatedDataCopy = JSON.parse(
      JSON.stringify(updatedQuestionnaireData)
    );
    updatedDataCopy.find((data) => Object.keys(data)[0] === category)[category][
      index
    ]["Question"] = editedQuestion;
    updatedDataCopy.find((data) => Object.keys(data)[0] === category)[category][
      index
    ]["Answer"] = [editedAnswer];
    setUpdatedQuestionnaireData(updatedDataCopy);
  };

  const handleEditClick = (category, index, question) => {
    setIsEditing(true);
    setEditingQuestion({ category, index });
    setEditedAnswer(
      Array.isArray(question.Answer)
        ? question.Answer.join(", ")
        : question.Answer
    );
  };

  const handleSaveClick = (category, index, question) => {
    onEdit(category, index, question.Question, editedAnswer);
    setIsEditing(false);
    setEditingQuestion({ category: null, index: null });
  };

  const renderInput = (question) => {
    if (question.Radio_button) {
      return (
        <div>
          {question.Radio_button.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                value={option}
                checked={editedAnswer === option}
                onChange={(e) => handleAnswerChange(e)}
              />
              <span className="text-[16px] text-gray-500 ml-2">{option}</span>
            </label>
          ))}
        </div>
      );
    } else if (question.Checkmark) {
      return (
        <div>
          {question.Checkmark.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                value={option}
                checked={editedAnswer.includes(option)}
                onChange={(e) => handleCheckboxChange(e, option)}
              />
              <span className="text-2xl text-gray-500 ml-2">{option}</span>
            </label>
          ))}
        </div>
      );
    } else if (question.Dropdown) {
      return (
        <select
          value={editedAnswer}
          onChange={handleAnswerChange}
          className={`text-[16px] text-gray-500 px-2 w-full max-w-480 border-b-2 border-gray-300`}
        >
          {question.Dropdown.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          type="text"
          value={editedAnswer}
          onChange={handleAnswerChange}
          className={` text-gray-500 px-2 w-full max-w-480  border-gray-500`}
        />
      );
    }
  };

  const handleCheckboxChange = (e, option) => {
    const isChecked = e.target.checked;
    setEditedAnswer((prevAnswer) => {
      if (isChecked) {
        return Array.isArray(prevAnswer) ? [...prevAnswer, option] : [option];
      } else {
        return Array.isArray(prevAnswer)
          ? prevAnswer.filter((selectedOption) => selectedOption !== option)
          : [];
      }
    });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditingQuestion({ category: null, index: null });
    setEditedAnswer(
      Array.isArray(updatedQuestionnaireData[0]?.Sdoh[0]?.Answer)
        ? updatedQuestionnaireData[0].Sdoh[0].Answer.join(", ")
        : updatedQuestionnaireData[0]?.Sdoh[0]?.Answer
    );
  };

  function isAnswerValid(questionData) {
    return questionData.Answer !== null && questionData.Answer.length > 0;
  }

  function areAllAnswersValid(questionArray) {
    return questionArray.every((question) => isAnswerValid(question));
  }

  const handleContinueBtnClick = () => {
    setLoader(true);
    const questionnaireType = localStorage.getItem("questionnaireType");
    console.log(updatedQuestionnaireData);
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
    payload.csvData[questionnaireCategory] = updatedQuestionnaireData[0].SDOH;
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
        console.log(result.json[questionnaireCategory]);
        quesContextDispatch({
          type: "UPDATE_SDOH_QUESTIONNAIRE",
          payload: result.json[questionnaireCategory],
        });
        localStorage.setItem(
          "sdohQuestionnaire",
          JSON.stringify(result.json[questionnaireCategory])
        );
        setSnackbarOpen({
          open: true,
          message: "Answer saved successfully",
          type: "success",
        });
        if (
          localStorage.getItem("SDOH") &&
          localStorage.getItem("Medical History")
        ) {
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

          if (isSdohFilled && isMedicalHistoryFilled) {
            navigate("/dashboard/appdashboard", {
              state: {
                currentPatientInfo,
                isSdohFilled,
                isMedicalHistoryFilled,
              },
            });
            setLoader(false);
          } else {
            navigate("/dashboard/confirmAppointment", {
              state: {
                appointmentConfirmed: true,
              },
            });
            setLoader(false);
          }
        } else {
          navigate("/dashboard/confirmAppointment", {
            state: {
              appointmentConfirmed: true,
            },
          });
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log("question answer call error", error);
        setSnackbarOpen({
          open: true,
          message: "ERROR: Answer not saved",
          type: "error",
        });
        setLoader(false);
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

  const renderQuestionnaireSection = (category, questions, index) => (
    <div className="w-full" key={index}>
      <h2 className="text-PrimeDarkGreenLight text-xl font-bold text-[#7ab167]">
        {questionnaireType || localStorage.getItem("questionnaireType")}{" "}
      </h2>
      {questions.map((question, index) => (
        <div className="flex flex-col" key={index}>
          <div className="flex flex-col ">
            {isEditing &&
            editingQuestion.category === category &&
            editingQuestion.index === index ? (
              <>
                <div className={`w-full text-base`}>{question.Question}</div>
                {renderInput(question)}
                <div className="flex">
                  <button
                    onClick={() => handleSaveClick(category, index, question)}
                    className={`text-green-800 px-4 py-2 mr-2`}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className={`text-red-600 px-4 py-2`}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className={`flex items-center`}>
                <div
                  className={`px-2 mb-1 w-full  text-[20px] flex-grow text-green-700`}
                >
                  {question.Question}
                </div>
                <button
                  onClick={() => handleEditClick(category, index, question)}
                  className={`border border-green-600 text-green-600 rounded px-3 py-1 ml-2`}
                >
                  <span>Edit</span>
                </button>
              </div>
            )}
            {(!isEditing ||
              editingQuestion.category !== category ||
              editingQuestion.index !== index) && (
              <div
                className={`text-gray-100 px-2 w-full border-b-2 border-gray-100`}
              >
                <span className="text-gray-500">
                  {Array.isArray(question.Answer)
                    ? question.Answer.join(", ")
                    : question.Answer}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div
        className={`${styles.minSectionHeight} ${styles.xSectionPadding} ${styles.ySectionPadding} flex flex-col items-center gap-5`}
      >
        <div className="font-robotoSlab w-[90%] md:w-[70%] flex flex-col gap-5">
          <QuesFormHeading heading="SDOH Questionnaire" />
          <span className="text-3xl text-green-800">Review your Data</span>

          {updatedQuestionnaireData.map((categoryData, index) =>
            renderQuestionnaireSection(
              Object.keys(categoryData)[0],
              categoryData[Object.keys(categoryData)[0]],
              index
            )
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center ">
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
          <div className="pt-0">
            <ButtonSectionWhiteBg
              buttonName={"Back"}
              onClick={() => {
                navigate("/dashboard/questionnaire/questions");
              }}
            />
          </div>
          <br />
        </div>
      </div>
      <SnackBarAlert
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
};

export default ReviewQuestionnaire;
