import { useQuestionnaireContext } from "../../../context/QuestionnaireContext";

const QuesFormHeading = ({ heading }) => {
  const { quesContextState } = useQuestionnaireContext();
  const { questionnaireType } = quesContextState;

  return (
    <>
      <span className="text-PrimaryDarkGreenText text-center text-[18px] font-medium w-fit">
        {questionnaireType || localStorage.getItem("questionnaireType")}{" "}
        Questionnaire
      </span>
      <div className="bg-PrimaryGreenLight w-[40px] h-[5px] -mt-4" />
    </>
  );
};

export default QuesFormHeading;
