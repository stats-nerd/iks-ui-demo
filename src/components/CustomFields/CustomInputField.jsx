import { TextField } from "@mui/material";

const CustomInputField = ({
  label,
  placeholder,
  value,
  onChange,
  variant = "outlined",
  type = "text",
  color = "success",
  maxWidth=300,
  ...props
}) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant={variant}
      type={type}
      color={color}
      className="bg-[#F8FFF1]"
      fullWidth
      sx={{ maxWidth: maxWidth }}
      {...props}
    />
  );
};

export default CustomInputField;
