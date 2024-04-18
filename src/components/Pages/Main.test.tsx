import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MainPage } from "./Main";
import { renderWithProviders } from "../../redux/test-utils";
import { TodoCard } from "../../types/types";

describe("MainPage", () => {
  it("renders without errors", () => renderWithProviders(<MainPage />));

  it("displays the title", () => {
    renderWithProviders(<MainPage />);
    const title = screen.getByText("Todos");
    expect(title).toBeInTheDocument();
  });

  it("displays the Add button", () => {
    renderWithProviders(<MainPage />);
    const addButton = screen.getByText("Add");
    expect(addButton).toBeInTheDocument();
  });

  it("adds new task", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MainPage />);
    const input = screen.getByLabelText("What are we doing?");
    const addButton = screen.getByText("Add");
    await user.type(input, "Test");
    await user.click(addButton);
    const testTask = screen.getByText("Test");
    expect(testTask).toBeInTheDocument();
  });

  it("displays the input", () => {
    renderWithProviders(<MainPage />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("changes input value", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MainPage />);
    const input = screen.getByRole("textbox");
    await user.type(input, "Test");
  });

  it("prevents form submission when input is empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MainPage />);
    const addButton = screen.getByText("Add");
    await user.click(addButton);
    const testTask = screen.queryByText("Test");
    expect(testTask).not.toBeInTheDocument();
  });

  it("displays tabs", async () => {
    renderWithProviders(<MainPage />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);
  });

  it("switches tabs", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MainPage />);
    const tabs = screen.getAllByRole("tab");
    await user.click(tabs[0]);
  });

  it("displays the Clear completed button", () => {
    renderWithProviders(<MainPage />);
    const removeButton = screen.getByText("Clear completed");
    expect(removeButton).toBeInTheDocument();
  });

  it('removes completed tasks when "Clear completed" button is clicked', async () => {
    const user = userEvent.setup();
    const initialTodos: TodoCard[] = [
      { name: "Todo 1", status: false, id: "1" },
      { name: "Todo 2", status: true, id: "2" },
      { name: "Todo 3", status: false, id: "3" },
    ];
    renderWithProviders(<MainPage />, {
      preloadedState: {
        todoList: {
          todos: initialTodos,
        },
      },
    });
    const removeButton = screen.getByText("Clear completed");
    await user.click(removeButton);
    const remainingTasks = screen.getAllByRole("checkbox");
    expect(remainingTasks).toHaveLength(2);
  });
});
