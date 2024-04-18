import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabsComponent } from "./Tabs";

import { renderWithProviders } from "../../redux/test-utils";
import { TodoCard } from "../../types/types";

describe("TabsComponent", () => {
  it("renders the tabs component with the correct labels", () => {
    renderWithProviders(<TabsComponent />);
    const allTab = screen.getByText("All");
    const activeTab = screen.getByText("Active");
    const completedTab = screen.getByText("Completed");
    expect(allTab).toBeInTheDocument();
    expect(activeTab).toBeInTheDocument();
    expect(completedTab).toBeInTheDocument();
  });

  it("renders all todos by default", () => {
    const initialTodos: TodoCard[] = [
      { name: "Todo 1", status: false, id: "1" },
      { name: "Todo 2", status: true, id: "2" },
      { name: "Todo 3", status: false, id: "3" },
    ];
    renderWithProviders(<TabsComponent />, {
      preloadedState: {
        todoList: {
          todos: initialTodos,
        },
      },
    });
    const todo1 = screen.getByText("Todo 1");
    const todo2 = screen.getByText("Todo 2");
    const todo3 = screen.getByText("Todo 3");
    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
    expect(todo3).toBeInTheDocument();
  });

  it("renders only active todos when the active tab is selected", async () => {
    const user = userEvent.setup();
    const initialTodos: TodoCard[] = [
      { name: "Todo 1", status: false, id: "1" },
      { name: "Todo 2", status: true, id: "2" },
      { name: "Todo 3", status: false, id: "3" },
    ];
    renderWithProviders(<TabsComponent />, {
      preloadedState: {
        todoList: {
          todos: initialTodos,
        },
      },
    });
    const active = screen.getByText("Active");
    await user.click(active);
    const todo1 = screen.getByText("Todo 1");
    const todo2 = screen.queryByText("Todo 2");
    const todo3 = screen.getByText("Todo 3");
    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeNull();
    expect(todo3).toBeInTheDocument();
  });

  it("renders only completed todos when the completed tab is selected", async () => {
    const user = userEvent.setup();
    const initialTodos: TodoCard[] = [
      { name: "Todo 1", status: false, id: "1" },
      { name: "Todo 2", status: true, id: "2" },
      { name: "Todo 3", status: false, id: "3" },
    ];
    renderWithProviders(<TabsComponent />, {
      preloadedState: {
        todoList: {
          todos: initialTodos,
        },
      },
    });
    const completed = screen.getByText("Completed");
    await user.click(completed);
    const todo1 = screen.queryByText("Todo 1");
    const todo2 = screen.getByText("Todo 2");
    const todo3 = screen.queryByText("Todo 3");
    expect(todo1).toBeNull();
    expect(todo2).toBeInTheDocument();
    expect(todo3).toBeNull();
  });

  it("toggles todo status", async () => {
    const user = userEvent.setup();
    const initialTodos: TodoCard[] = [
      { name: "Todo 1", status: false, id: "1" },
      { name: "Todo 2", status: true, id: "2" },
      { name: "Todo 3", status: false, id: "3" },
    ];
    renderWithProviders(<TabsComponent />, {
      preloadedState: {
        todoList: {
          todos: initialTodos,
        },
      },
    });
    const todo1Checkbox = screen.getByRole("checkbox", { name: "Todo 1" });
    const todo2Checkbox = screen.getByRole("checkbox", { name: "Todo 2" });
    const todo3Checkbox = screen.getByRole("checkbox", { name: "Todo 3" });
    await user.click(todo1Checkbox);
    await user.click(todo2Checkbox);
    await user.click(todo3Checkbox);
    expect(todo1Checkbox).toBeChecked();
    expect(todo2Checkbox).not.toBeChecked();
    expect(todo3Checkbox).toBeChecked();
  });

  it("does not render any todos when there are no todos", () => {
    const initialTodos: TodoCard[] = [];
    renderWithProviders(<TabsComponent />, {
      preloadedState: {
        todoList: {
          todos: initialTodos,
        },
      },
    });
    const todo = screen.queryByText("Todo 1");
    expect(todo).not.toBeInTheDocument();
  });
});
