import { describe, it, expect } from "vitest";
import { render, screen } from "../test-utils";
import Services from "./Services.jsx";

describe("Services", () => {
  it("sells all three tiers, explains booking, and keeps the public mix & master prices", () => {
    render(<Services />);

    expect(
      screen.getByRole("heading", { level: 1, name: "One artist. Three ways to work together." }),
    ).toBeInTheDocument();

    // Three tiers with their calls to action.
    expect(screen.getByRole("link", { name: "Check a date" })).toHaveAttribute("href", "/bookings");
    for (const link of screen.getAllByRole("link", { name: "Start a mix" })) {
      expect(link).toHaveAttribute("href", "/#mixmaster");
    }
    expect(screen.getByRole("link", { name: "Ask about your room" })).toHaveAttribute(
      "href",
      "/contact",
    );

    // How booking works and the FAQ are present.
    expect(screen.getByRole("list", { name: "How booking works" })).toBeInTheDocument();
    expect(screen.getByText("Is the booking form a confirmed booking?")).toBeInTheDocument();

    // Prices that were already public did not change.
    expect(screen.getByText("$79")).toBeInTheDocument();
    expect(screen.getByText("$129")).toBeInTheDocument();
    expect(screen.getByText("$199")).toBeInTheDocument();

    // Business pages must always have a path to booking.
    expect(
      screen.getAllByRole("link", { name: /Book a Date|Request a Date/ }).length,
    ).toBeGreaterThan(0);
  });
});
