import { describe, it, expect } from "vitest";
import { render, screen } from "../test-utils";
import Home from "./Home.jsx";

describe("Home", () => {
  it("renders THE MIX TEMPLE phase one section", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "THE MIX TEMPLE" })).toBeInTheDocument();
    expect(screen.getByText("THE MIX TEMPLE - Screen + Brain")).toBeInTheDocument();
    expect(screen.getByText("Logic Pro Workflow")).toBeInTheDocument();
    expect(screen.getByText("Capture Chain")).toBeInTheDocument();
    expect(screen.getByText("Translation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a mix" })).toBeInTheDocument();
  });
});
