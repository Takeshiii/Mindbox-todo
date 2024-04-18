import { FC } from "react";
import Button from "@mui/material/Button";
import { ButtonProps } from "../../types/types";

export const AddButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      Add
    </Button>
  );
};
