import { TOUR_URL } from "./links.js";

const hasTourLink = Boolean(TOUR_URL);

// Replace with real dates and ticket links.
export const shows = [
  {
    date: "2026-03-14",
    city: "Orlando, FL",
    venue: "Will's Pub",
    status: "Tickets",
  },
  {
    date: "2026-04-02",
    city: "Atlanta, GA",
    venue: "The Masquerade",
    status: "Tickets",
  },
  {
    date: "2026-04-19",
    city: "Philadelphia, PA",
    venue: "The Foundry",
    status: "VIP",
  },
].map((show) => ({
  ...show,
  href: hasTourLink ? TOUR_URL : "",
}));

export const showsCta = hasTourLink ? { label: "See all dates", href: TOUR_URL } : null;
