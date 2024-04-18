import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders the input field with the correct label", () => {
    render(<Input value="" onChange={() => {}} />);
    const input = screen.getByLabelText("What are we doing?");
    expect(input).toBeInTheDocument();
  });

  it("displays value in input field", () => {
    render(<Input value="Test value" onChange={() => {}} />);
    const input = screen.getByLabelText("What are we doing?");
    expect(input).toHaveValue("Test value");
  });

  it("should call the onChange callback when value change", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input value="" onChange={onChange} />);
    const input = screen.getByLabelText("What are we doing?");
    await user.type(input, "Test");
    expect(onChange).toHaveBeenCalledTimes(4);
  });
});
