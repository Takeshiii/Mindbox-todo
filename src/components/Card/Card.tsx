import { FC } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { toggleTodo } from "../../redux/ui/todo/todoSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { TodoCard } from "../../types/types";

export const CardComponent: FC<TodoCard> = ({ name, status, id }) => {
  const dispatch = useAppDispatch();

  const handleToggleTodo = () => {
    dispatch(toggleTodo(id));
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={status} onChange={handleToggleTodo} />}
      label={
        <Typography
          sx={{
            textDecoration: status ? "line-through" : "none",
            maxWidth: "250px",
            overflowWrap: "break-word",
          }}>
          {name}
        </Typography>
      }
    />
  );
};
