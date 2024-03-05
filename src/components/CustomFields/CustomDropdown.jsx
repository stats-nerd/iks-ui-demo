import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CustomDropdown = ({
  label,
  onChange,
  value,
  options,
  maxWidth = 300,
}) => {
  return (
    <FormControl fullWidth color="success" sx={{ maxWidth: maxWidth }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        onChange={onChange}
        value={value}
        className="bg-[#F8FFF1]"
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
