import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CardComponent } from "./Card";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { toggleTodo } from "../../redux/ui/todo/todoSlice";

vi.mock("../../redux/hooks/hooks", () => ({
  useAppDispatch: vi.fn(),
}));

describe("CardComponent", () => {
  it("renders the todo with the correct name and status", () => {
    const mockTodo = { name: "Todo 1", status: false, id: "1" };
    render(<CardComponent {...mockTodo} />);
    const todoName = screen.getByText("Todo 1");
    const todoCheckbox = screen.getByRole("checkbox");
    expect(todoName).toBeInTheDocument();
    expect(todoCheckbox).not.toBeChecked();
  });

  it("calls the toggleTodo action when the checkbox is clicked", async () => {
    const user = userEvent.setup();
    const mockTodo = { name: "Todo 1", status: false, id: "1" };
    const mockDispatch = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    render(<CardComponent {...mockTodo} />);
    const todoCheckbox = screen.getByRole("checkbox");
    await user.click(todoCheckbox);
    expect(mockDispatch).toHaveBeenCalledWith(toggleTodo("1"));
  });

  it("renders the todo name with a line-through when the todo is completed", () => {
    const mockTodo = { name: "Todo 1", status: true, id: "1" };
    render(<CardComponent {...mockTodo} />);
    const todoName = screen.getByText("Todo 1");
    expect(todoName).toHaveStyle("text-decoration: line-through");
  });

  it("renders the todo name without a line-through when the todo is not completed", () => {
    const mockTodo = { name: "Todo 1", status: false, id: "1" };
    render(<CardComponent {...mockTodo} />);
    const todoName = screen.getByText("Todo 1");
    expect(todoName).toHaveStyle("text-decoration: none");
  });
});
