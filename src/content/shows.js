import { TOUR_URL } from "./links.js";

const hasTourLink = Boolean(TOUR_URL);

// Add real upcoming dates and ticket links here.
const upcomingShows = [];

export const shows = upcomingShows.map((show) => ({
  ...show,
  href: show.href || (hasTourLink ? TOUR_URL : ""),
}));

export const showsCta = hasTourLink ? { label: "See all dates", href: TOUR_URL } : null;
