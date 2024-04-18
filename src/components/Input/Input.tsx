import { FC } from "react";
import TextField from "@mui/material/TextField";
import { InputProps } from "../../types/types";

export const Input: FC<InputProps> = ({ value, onChange }) => {
  return (
    <TextField
      id="outlined-basic"
      label="What are we doing?"
      variant="outlined"
      value={value}
      onChange={onChange}
    />
  );
};
