import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const QuesDropdownType = ({
  Question,
  Dropdown,
  Answer,
  updateQuestionnaireWithAnswer,
}) => {
  const [dropdownValue, setDropdownValue] = useState(Answer ? Answer[0] : "");

  const handleChange = (event) => {
    setDropdownValue(event.target.value);
    updateQuestionnaireWithAnswer(Question, event.target.value, "dropdown");
  };
  return (
    <>
      <span className="text-PrimaryDarkGreenText text-xl leading-6">
        {Question}
      </span>
      <FormControl color="success" sx={{ width: 300 }}>
        <InputLabel>Select</InputLabel>
        <Select
          value={dropdownValue}
          label="Select"
          onChange={handleChange}
          className="bg-[#F8FFF1]"
        >
          {Dropdown.map((dropdownText, i) => (
            <MenuItem value={dropdownText} key={i}>
              {dropdownText}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default QuesDropdownType;
