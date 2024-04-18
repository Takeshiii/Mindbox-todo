import { RootState } from "../../store";
import { TodoCard } from "../../../types/types";

const selectTodoListModule = (state: RootState) => state.todoList;

export const selectTodoListCards = (state: RootState): TodoCard[] =>
  selectTodoListModule(state).todos;
