import { FC } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { removeDoneTodos } from "../../redux/ui/todo/todoSlice";
import Button from "@mui/material/Button";

export const RemoveButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleRemoveDoneTodos = () => {
    dispatch(removeDoneTodos());
  };

  return (
    <Button variant="text" onClick={handleRemoveDoneTodos}>
      Clear completed
    </Button>
  );
};
