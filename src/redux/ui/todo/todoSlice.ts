import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoCard, TodoList } from "../../../types/types";
import { nanoid } from "nanoid";

const savedTodos = JSON.parse(sessionStorage.getItem("todos") || "[]");

const saveTodosToSessionStorage = (state: TodoList) => {
  sessionStorage.setItem("todos", JSON.stringify(state.todos));
};

const initialState: TodoList = {
  todos: savedTodos.length
    ? savedTodos
    : [
        {
          name: "Test task",
          status: false,
          id: nanoid(),
        },
        {
          name: "Great code",
          status: true,
          id: nanoid(),
        },
        {
          name: "Tests coverage",
          status: false,
          id: nanoid(),
        },
      ],
};

const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: TodoCard = {
        name: action.payload,
        status: false,
        id: nanoid(),
      };
      state.todos = state.todos.concat(newTodo);
      saveTodosToSessionStorage(state);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = !todo.status;
        saveTodosToSessionStorage(state);
      }
    },
    removeDoneTodos: (state) => {
      state.todos = state.todos.filter((todo) => !todo.status);
      saveTodosToSessionStorage(state);
    },
  },
});

export const { addTodo, toggleTodo, removeDoneTodos } = todoListSlice.actions;
export default todoListSlice.reducer;
