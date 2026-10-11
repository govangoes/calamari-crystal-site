// Shared options and pure helpers for the booking flow.
// Kept free of React so the date/time math is easy to unit test.

export const SERVICES = [
  {
    id: "live",
    label: "Live show / DJ set",
    detail: "Clubs, venues, festivals, and private parties",
  },
  {
    id: "wedding",
    label: "Wedding",
    detail: "Ceremony, cocktail hour, or reception",
  },
  {
    id: "private",
    label: "Birthday / private party",
    detail: "Birthdays, graduations, and celebrations",
  },
  {
    id: "hosting",
    label: "Hosting / MC",
    detail: "Emcee, open mic, showcase, or contest",
  },
  {
    id: "brand",
    label: "Brand / corporate event",
    detail: "Launches, activations, and company events",
  },
  {
    id: "meet",
    label: "Meet & greet / appearance",
    detail: "Signings, pop-ups, and community events",
  },
  {
    id: "other",
    label: "Something else",
    detail: "Tell me what you have in mind",
  },
];

export const BUDGET_RANGES = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$2,500",
  "$2,500+",
  "Not sure yet",
];

// Event length is picked on a slider in 30 minute steps, so nobody ends up with a 57 minute set.
export const MIN_DURATION = 30;
export const MAX_DURATION = 720;
export const DURATION_STEP = 30;
export const DEFAULT_DURATION = 120;
export const DURATION_TICKS = [30, 60, 120, 240, 360, 480, 600, 720];

const MINUTES_PER_DAY = 24 * 60;

export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  const parts = [];
  if (hours) parts.push(`${hours} hr${hours > 1 ? "s" : ""}`);
  if (remainder) parts.push(`${remainder} min`);
  const text = parts.join(" ");
  return minutes >= MAX_DURATION ? `${text}+` : text;
}

/** Turns minutes after midnight (e.g. 1170) into a clock label (e.g. "7:30 PM"). */
export function formatClock(totalMinutes) {
  const minutesIntoDay = ((totalMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const hour24 = Math.floor(minutesIntoDay / 60);
  const minute = minutesIntoDay % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function formatEndTime(startMinutes, durationMinutes) {
  const end = startMinutes + durationMinutes;
  return end >= MINUTES_PER_DAY ? `${formatClock(end)} (next day)` : formatClock(end);
}

// Start times every 30 minutes from 8:00 AM to 11:30 PM, grouped for the time list.
const FIRST_START = 8 * 60;
const LAST_START = 23 * 60 + 30;

export const TIME_GROUPS = [
  { id: "morning", label: "Morning", from: FIRST_START, to: 11 * 60 + 30 },
  { id: "afternoon", label: "Afternoon", from: 12 * 60, to: 16 * 60 + 30 },
  { id: "evening", label: "Evening", from: 17 * 60, to: LAST_START },
].map((group) => {
  const slots = [];
  for (let value = group.from; value <= group.to; value += 30) {
    slots.push({ value, label: formatClock(value) });
  }
  return { id: group.id, label: group.label, slots };
});

/** Local calendar date as YYYY-MM-DD (avoids the UTC shift that toISOString causes). */
export function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseIsoDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatLongDate(iso) {
  return parseIsoDate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMonthTitle(year, month) {
  return new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/** Day cells for a month grid, Sunday first. Leading blanks are `null`. */
export function buildMonthCells(year, month) {
  const leadingBlanks = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: leadingBlanks }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  return cells;
}
