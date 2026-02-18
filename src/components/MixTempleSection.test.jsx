import { describe, expect, it } from "vitest";
import { render, screen, within } from "../test-utils";
import MixTempleSection from "./MixTempleSection.jsx";

describe("MixTempleSection", () => {
  it("renders outcome-first steps and active stage caption", () => {
    render(<MixTempleSection />);

    const section = screen.getByLabelText("THE MIX TEMPLE gear tour");
    expect(within(section).getByText("Step 1 of 4")).toBeInTheDocument();
    expect(within(section).getAllByText("Decision Speed")).toHaveLength(2);
    expect(within(section).getAllByText("You get faster, more confident mix calls.")).toHaveLength(
      2,
    );
    expect(within(section).getAllByText(/Proof:/)).toHaveLength(4);
  });
});
