import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "../test-utils";
import StudioTour from "./StudioTour.jsx";

describe("StudioTour", () => {
  it("lists every stop on the signal path and starts at the mic", () => {
    render(<StudioTour />);
    const section = screen.getByLabelText("Studio tour");

    expect(within(section).getByRole("button", { name: "The mic" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(within(section).getAllByRole("listitem")).toHaveLength(5);
    expect(within(section).getAllByText(/Shure SM7B/).length).toBeGreaterThan(0);
  });

  it("moves the drawing to the chosen stop", () => {
    render(<StudioTour />);
    const section = screen.getByLabelText("Studio tour");

    fireEvent.click(within(section).getByRole("button", { name: "The check" }));

    expect(within(section).getByRole("button", { name: "The check" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(within(section).getByRole("button", { name: "The mic" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
