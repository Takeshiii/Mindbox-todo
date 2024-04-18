import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { StatusBar } from "./StatusBar";
import { renderWithProviders } from "../../redux/test-utils";
import { TodoCard } from "../../types/types";

describe("StatusBar", () => {
  it("renders the RemoveButton component", () => {
    renderWithProviders(<StatusBar />);
    const removeButton = screen.getByText("Clear completed");
    expect(removeButton).toBeInTheDocument();
  });

  it("renders the correct number of remaining tasks", () => {
    const initialTodos: TodoCard[] = [
      { name: "Todo 1", status: false, id: "1" },
      { name: "Todo 2", status: true, id: "2" },
      { name: "Todo 3", status: false, id: "3" },
    ];
    renderWithProviders(<StatusBar />, {
      preloadedState: {
        todoList: {
          todos: initialTodos,
        },
      },
    });
    const remainingTasks = screen.getByText("2 tasks remaining");
    expect(remainingTasks).toBeInTheDocument();
  });

  it("renders 'All done!' when there are no remaining tasks", () => {
    const initialTodos: TodoCard[] = [
      { name: "Todo 1", status: true, id: "1" },
      { name: "Todo 2", status: true, id: "2" },
      { name: "Todo 3", status: true, id: "3" },
    ];
    renderWithProviders(<StatusBar />, {
      preloadedState: {
        todoList: {
          todos: initialTodos,
        },
      },
    });
    const allDone = screen.getByText("All done!");
    expect(allDone).toBeInTheDocument();
  });

  it("renders the correct text for one remaining task", () => {
    const initialTodos: TodoCard[] = [
      { name: "Todo 1", status: true, id: "1" },
      { name: "Todo 2", status: true, id: "2" },
      { name: "Todo 3", status: false, id: "3" },
    ];
    renderWithProviders(<StatusBar />, {
      preloadedState: {
        todoList: {
          todos: initialTodos,
        },
      },
    });
    const remainingTask = screen.getByText("1 task remaining");
    expect(remainingTask).toBeInTheDocument();
  });
});
