// Turns an iCalendar (.ics) feed into a list of booked calendar days.
// Only dates leave this module: event titles, notes, and locations are never read or returned.
//
// Simple on purpose. Known limits:
// - A day is "booked" if any busy event touches it (no partial-day slots).
// - Recurring events (RRULE) are not expanded. They are counted so the caller can warn.
// - Events marked "free" (TRANSPARENT) and cancelled events don't block a day.

const TIME_ZONE = "America/New_York";
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_EVENT_SPAN_DAYS = 31;

function unfold(text) {
  return text.replace(/\r?\n[ \t]/g, "");
}

function parseLine(line) {
  const colon = line.indexOf(":");
  if (colon < 0) return null;
  const [name, ...rawParams] = line.slice(0, colon).split(";");
  const params = {};
  for (const param of rawParams) {
    const [key, value] = param.split("=");
    params[key.toUpperCase()] = value;
  }
  return { name: name.toUpperCase(), params, value: line.slice(colon + 1).trim() };
}

function addDays(iso, days) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day) + days * DAY_MS).toISOString().slice(0, 10);
}

function daysBetween(startIso, endIso) {
  const toMs = (iso) => {
    const [year, month, day] = iso.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
  };
  return Math.round((toMs(endIso) - toMs(startIso)) / DAY_MS);
}

/** Calendar date and minutes-after-midnight for an instant, in the business time zone. */
function zonedParts(ms) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(ms));
  const get = (type) => parts.find((part) => part.type === type).value;
  return {
    iso: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/**
 * Reads DTSTART / DTEND values.
 *  - 20261017          all-day date
 *  - 20261017T190000   local time (floating, or with a TZID such as the calendar's own zone)
 *  - 20261017T230000Z  UTC, converted to the business time zone
 */
function parseDateValue(value) {
  const match = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/.exec(value);
  if (!match) return null;
  const [, year, month, day, hour, minute, second, utc] = match;
  if (hour === undefined) {
    return { iso: `${year}-${month}-${day}`, minutes: 0, allDay: true };
  }
  if (utc) {
    const ms = Date.UTC(year, month - 1, day, hour, minute, second ?? 0);
    return { ...zonedParts(ms), allDay: false };
  }
  return {
    iso: `${year}-${month}-${day}`,
    minutes: Number(hour) * 60 + Number(minute),
    allDay: false,
  };
}

function eventDays(start, end) {
  let last = start.iso;
  if (end) {
    last = end.iso;
    // DTEND is exclusive for all-day events, and an event ending exactly at midnight
    // doesn't touch the next day.
    if (end.allDay || (end.minutes === 0 && end.iso > start.iso)) last = addDays(end.iso, -1);
  }
  if (last < start.iso) last = start.iso;
  const span = Math.min(daysBetween(start.iso, last), MAX_EVENT_SPAN_DAYS);
  return Array.from({ length: span + 1 }, (_, offset) => addDays(start.iso, offset));
}

export function extractBusyDates(icsText, { now = new Date(), horizonDays = 550 } = {}) {
  const today = zonedParts(now.getTime()).iso;
  const lastDay = addDays(today, horizonDays);
  const busy = new Set();
  let recurringIgnored = 0;
  let event = null;

  for (const rawLine of unfold(icsText).split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line === "BEGIN:VEVENT") {
      event = { props: {} };
    } else if (line === "END:VEVENT" && event) {
      const { props } = event;
      event = null;

      if (props.STATUS?.value.toUpperCase() === "CANCELLED") continue;
      if (props.TRANSP?.value.toUpperCase() === "TRANSPARENT") continue;
      if (props.RRULE) {
        recurringIgnored += 1;
        continue;
      }
      const start = props.DTSTART && parseDateValue(props.DTSTART.value);
      if (!start) continue;
      const end = props.DTEND ? parseDateValue(props.DTEND.value) : null;

      for (const iso of eventDays(start, end)) {
        if (iso >= today && iso <= lastDay) busy.add(iso);
      }
    } else if (event) {
      const parsed = parseLine(line);
      if (parsed && ["DTSTART", "DTEND", "STATUS", "TRANSP", "RRULE"].includes(parsed.name)) {
        event.props[parsed.name] = parsed;
      }
    }
  }

  return { busyDates: [...busy].sort(), recurringIgnored };
}
