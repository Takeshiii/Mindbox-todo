import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddButton } from "./AddButton";

describe("AddButton", () => {
  it("renders the Add button", () => {
    render(<AddButton onClick={() => {}} />);
    const button = screen.getByText("Add");
    expect(button).toBeInTheDocument();
  });

  it("calls the onClick prop when the button is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<AddButton onClick={onClick} />);
    const button = screen.getByText("Add");
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
