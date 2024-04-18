import { FC } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { selectTodoListCards } from "../../redux/ui/todo/setectors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RemoveButton } from "../Buttons/RemoveButton";
import { TodoCard } from "../../types/types";

export const StatusBar: FC = () => {
  const todos: TodoCard[] = useAppSelector(selectTodoListCards);
  const remainingTodosCount = todos.filter((todo) => !todo.status).length;

  return (
    <Box display="flex" gap={2} alignItems="center">
      {remainingTodosCount ? (
        <Typography>
          {remainingTodosCount} {remainingTodosCount === 1 ? "task" : "tasks"}{" "}
          remaining
        </Typography>
      ) : (
        <Typography>All done!</Typography>
      )}
      <RemoveButton />
    </Box>
  );
};
