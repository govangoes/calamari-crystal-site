import { describe, it, expect } from "vitest";
import { render, screen } from "../test-utils";
import Home from "./Home.jsx";

describe("Home", () => {
  it("renders Listen, Merch, and Story headings", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Listen" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Merch" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Story" })).toBeInTheDocument();
  });
});
