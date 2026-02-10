import { describe, it, expect } from "vitest";
import { render, screen, within } from "../test-utils";
import Home from "./Home.jsx";

describe("Home", () => {
  it("renders THE MIX TEMPLE phase one section", () => {
    render(<Home />);

    const mixTempleSection = screen.getByLabelText("THE MIX TEMPLE gear tour");
    expect(screen.getByRole("heading", { name: "THE MIX TEMPLE" })).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("Client-ready mix")).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("Notes welcome")).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("24–48h response")).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("THE MIX TEMPLE - Screen + Brain")).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("Logic Pro Workflow")).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("Capture Chain")).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("Translation")).toBeInTheDocument();
    expect(within(mixTempleSection).getByRole("link", { name: "Mix & Master" })).toHaveAttribute(
      "href",
      "#mixmaster",
    );
    expect(within(mixTempleSection).getByRole("link", { name: "Book Me" })).toHaveAttribute(
      "href",
      "#bookings",
    );
    expect(
      screen.getByText("Built in The Mix Temple — Mac Studio • Logic Pro • Precision chain"),
    ).toBeInTheDocument();
  });
});
