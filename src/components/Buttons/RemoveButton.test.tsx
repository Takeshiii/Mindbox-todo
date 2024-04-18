import { describe, expect, it, vi } from "vitest";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RemoveButton } from "./RemoveButton";
import { removeDoneTodos } from "../../redux/ui/todo/todoSlice";

vi.mock("../../redux/hooks/hooks", () => ({
  useAppDispatch: vi.fn(),
}));

describe("RemoveButton", () => {
  it("renders the Remove button", () => {
    render(<RemoveButton />);
    const button = screen.getByText("Clear completed");
    expect(button).toBeInTheDocument();
  });

  it("dispatches the removeDoneTodos action when the button is clicked", async () => {
    const user = userEvent.setup();
    const mockDispatch = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    render(<RemoveButton />);
    const button = screen.getByText("Clear completed");
    await user.click(button);
    expect(mockDispatch).toHaveBeenCalledWith(removeDoneTodos());
  });
});
