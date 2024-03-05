import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

const QuesRadioType = ({
  Question,
  Radio_button,
  Answer,
  updateQuestionnaireWithAnswer,
}) => {
  const [value, setValue] = useState(Answer ? Answer[0] : null);

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    updateQuestionnaireWithAnswer(Question, event.target.value, "radio");
  };
  return (
    <>
      <span className="text-PrimaryDarkGreenText text-xl leading-6">
        {Question}
      </span>
      <FormControl>
        <RadioGroup
          value={value}
          onChange={handleChange}
          row
          sx={{ gap: { xs: 2, md: 5 } }}
        >
          {Radio_button.map((btnText, i) => (
            <FormControlLabel
              key={i}
              value={btnText}
              control={<Radio color="success" />}
              label={btnText}
              sx={{
                ".MuiFormControlLabel-label": {
                  fontFamily: "Roboto Slab",
                  fontSize: 16,
                  fontWeight: "300",
                },
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default QuesRadioType;
