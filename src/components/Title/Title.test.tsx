import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Title } from "./Title";

describe("Title", () => {
  it("renders the Todos title", () => {
    render(<Title />);
    const title = screen.getByText("Todos");
    expect(title).toBeInTheDocument();
  });
});
