import { describe, it, expect } from "vitest";
import { render, screen, within } from "../test-utils";
import Home from "./Home.jsx";

describe("Home", () => {
  it("renders the home page sections", () => {
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

    // The hero sells the services and points straight at booking.
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Sound good\. Look official\. Move different\./,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Request a date to book GoVanGoes/ })).toHaveAttribute(
      "href",
      "/bookings",
    );

    // All three service tiers show up near the top of the page.
    const servicesSection = document.getElementById("services");
    expect(
      within(servicesSection).getByRole("heading", { name: "Perform and host" }),
    ).toBeInTheDocument();
    expect(
      within(servicesSection).getByRole("heading", { name: "Mix, master, and polish" }),
    ).toBeInTheDocument();
    expect(
      within(servicesSection).getByRole("heading", { name: "Make your room translate" }),
    ).toBeInTheDocument();

    const studioSection = screen.getByLabelText("Studio tour");
    expect(screen.getByRole("heading", { name: "Inside the studio" })).toBeInTheDocument();
    expect(within(studioSection).getByRole("button", { name: "The mic" })).toBeInTheDocument();
    expect(within(studioSection).getByRole("button", { name: "The check" })).toBeInTheDocument();
    expect(
      within(studioSection).getByRole("link", { name: "Send a mix or master" }),
    ).toHaveAttribute("href", "#mixmaster");
    expect(within(studioSection).getByRole("link", { name: "Book a date" })).toHaveAttribute(
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
