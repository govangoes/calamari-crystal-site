import { describe, it, expect } from "vitest";
import { render, screen, within } from "../test-utils";
import Home from "./Home.jsx";

describe("Home", () => {
  it("renders THE MIX TEMPLE phase one section", () => {
    render(<Home />);

    const asSeenInSection = screen.getByLabelText("As Seen In");
    expect(within(asSeenInSection).getByText(/as seen in/i)).toBeInTheDocument();
    expect(within(asSeenInSection).getByRole("link", { name: "Rap Fiesta" })).toHaveAttribute(
      "href",
      "https://rapfiesta.com/go-van-goes-unknown-hacker-anthem/",
    );
    expect(within(asSeenInSection).getByRole("link", { name: "Orlando Voyager" })).toHaveAttribute(
      "href",
      "https://orlandovoyager.com/interview/meet-go-van-goes-of-orlando/",
    );
    expect(
      within(asSeenInSection).getByRole("link", { name: "GoVanGoes Press Kit" }),
    ).toHaveAttribute("href", "https://www.govangoes.com/press");
    expect(
      within(asSeenInSection).getByText("Press + features • Updated regularly"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Mixing, mastering, and booking — clean process, clear communication,"),
    ).toBeInTheDocument();
    expect(screen.getByText("serious results.")).toBeInTheDocument();

    const mixTempleSection = screen.getByLabelText("THE MIX TEMPLE gear tour");
    expect(screen.getByRole("heading", { name: "THE MIX TEMPLE" })).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("Client-ready mix")).toBeInTheDocument();
    expect(within(mixTempleSection).getAllByText("Notes welcome")).toHaveLength(1);
    expect(within(mixTempleSection).getByText("24–48h response")).toBeInTheDocument();
    expect(within(mixTempleSection).getAllByText("Decision Speed")).toHaveLength(2);
    expect(within(mixTempleSection).getByText("Clean Capture Chain")).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("Translation Confidence")).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("Delivery-Ready Workflow")).toBeInTheDocument();
    expect(within(mixTempleSection).getByText("Step 1 of 4")).toBeInTheDocument();
    expect(
      within(mixTempleSection).getAllByText("You get faster, more confident mix calls."),
    ).toHaveLength(2);
    expect(
      within(mixTempleSection).getByText(
        /Scroll the steps to reveal each stage of the chain\. The gear is proof, but the outcome is the point\./,
      ),
    ).toBeInTheDocument();
    expect(within(mixTempleSection).getByRole("link", { name: "Mix & Master" })).toHaveAttribute(
      "href",
      "#mixmaster",
    );
    expect(within(mixTempleSection).getByRole("link", { name: "Book Me" })).toHaveAttribute(
      "href",
      "#bookings",
    );

    expect(screen.getByRole("heading", { name: "Audio proof" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Audio proofs are being curated. Want one of your songs featured? Book a session.",
      ),
    ).toBeInTheDocument();
  });
});
