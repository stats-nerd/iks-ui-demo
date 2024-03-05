import { Checkbox } from "@mui/material";

const QuesCheckmarkType = ({
  Question,
  Checkmark,
  Answer,
  updateQuestionnaireWithAnswer,
}) => {
  const handleCheckMarkChange = (event) => {
    console.log(event.target.checked, event.target.value);
    updateQuestionnaireWithAnswer(
      Question,
      { checked: event.target.checked, value: event.target.value },
      "checkmark"
    );
  };
  return (
    <>
      <span className="text-PrimaryDarkGreenText text-xl leading-6">
        {Question}
      </span>
      <div className="flex flex-col gap-4">
        {Checkmark.map((checkText, i) => (
          <div className="flex items-center justify-center w-fit gap-1" key={i}>
            <Checkbox
              // checked={Answer ? Answer.includes(checkText) : false}
              defaultChecked={Answer ? Answer.includes(checkText) : false}
              onChange={handleCheckMarkChange}
              color="success"
              value={checkText}
              size="medium"
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
            <span className="font-robotoSlab text-PrimaryGrayText">
              {checkText}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuesCheckmarkType;
