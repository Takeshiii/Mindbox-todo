import { describe, it, expect } from "vitest";
import todoSlice from "./todoSlice";
import { TodoList } from "../../../types/types";

describe("todoSlice", () => {
  it("should return the initial state", () => {
    const initialState: TodoList = {
      todos: [
        {
          name: "Test task",
          status: false,
          id: expect.any(String),
        },
        {
          name: "Great code",
          status: true,
          id: expect.any(String),
        },
        {
          name: "Tests coverage",
          status: false,
          id: expect.any(String),
        },
      ],
    };
    const state = todoSlice(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  it("should handle a todo being added to an empty list", () => {
    const initialState: TodoList = { todos: [] };
    const state = todoSlice(initialState, {
      type: "todoList/addTodo",
      payload: "New todo",
    });
    expect(state.todos).toEqual([
      {
        name: "New todo",
        status: false,
        id: expect.any(String),
      },
    ]);
  });

  it("should handle a todo being added to an existing list", () => {
    const initialState: TodoList = {
      todos: [
        {
          name: "Test task",
          status: false,
          id: "1",
        },
        {
          name: "Great code",
          status: true,
          id: "2",
        },
      ],
    };
    const state = todoSlice(initialState, {
      type: "todoList/addTodo",
      payload: "New todo",
    });
    expect(state.todos).toEqual([
      {
        name: "Test task",
        status: false,
        id: "1",
      },
      {
        name: "Great code",
        status: true,
        id: "2",
      },
      {
        name: "New todo",
        status: false,
        id: expect.any(String),
      },
    ]);
  });

  it("should handle a toggle todo", () => {
    const initialState: TodoList = {
      todos: [
        {
          name: "Test task",
          status: false,
          id: "1",
        },
        {
          name: "Great code",
          status: true,
          id: "2",
        },
      ],
    };
    const state = todoSlice(initialState, {
      type: "todoList/toggleTodo",
      payload: "1",
    });
    expect(state.todos).toEqual([
      {
        name: "Test task",
        status: true,
        id: "1",
      },
      {
        name: "Great code",
        status: true,
        id: "2",
      },
    ]);
  });

  it("should handle a remove completed todos", () => {
    const initialState: TodoList = {
      todos: [
        {
          name: "Test task",
          status: false,
          id: "1",
        },
        {
          name: "Great code",
          status: true,
          id: "2",
        },
        {
          name: "Tests coverage",
          status: false,
          id: "3",
        },
      ],
    };
    const state = todoSlice(initialState, {
      type: "todoList/removeDoneTodos",
    });
    expect(state.todos).toEqual([
      {
        name: "Test task",
        status: false,
        id: "1",
      },
      {
        name: "Tests coverage",
        status: false,
        id: "3",
      },
    ]);
  });
});
