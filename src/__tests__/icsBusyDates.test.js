import { describe, expect, it } from "vitest";
import { extractBusyDates } from "../../api/_lib/icsBusyDates.js";

const NOW = new Date("2026-10-11T16:00:00Z"); // Oct 11, 2026, noon in New York

const calendar = (...events) =>
  [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    ...events.map((e) => `BEGIN:VEVENT\n${e}\nEND:VEVENT`),
    "END:VCALENDAR",
  ].join("\r\n");

const busy = (...events) => extractBusyDates(calendar(...events), { now: NOW });

describe("extractBusyDates", () => {
  it("blocks the day of a timed event with a time zone", () => {
    const result = busy(
      "DTSTART;TZID=America/New_York:20261017T210000\nDTEND;TZID=America/New_York:20261018T010000\nSUMMARY:Club night",
    );
    expect(result.busyDates).toEqual(["2026-10-17", "2026-10-18"]);
  });

  it("does not spill into the next day when an event ends exactly at midnight", () => {
    const result = busy("DTSTART:20261017T190000\nDTEND:20261018T000000");
    expect(result.busyDates).toEqual(["2026-10-17"]);
  });

  it("treats all-day end dates as exclusive and handles multi-day events", () => {
    const result = busy(
      "DTSTART;VALUE=DATE:20261030\nDTEND;VALUE=DATE:20261102\nSUMMARY:Out of town",
    );
    expect(result.busyDates).toEqual(["2026-10-30", "2026-10-31", "2026-11-01"]);
  });

  it("converts UTC times into New York days", () => {
    // 02:00 UTC on Oct 18 is 10:00 PM on Oct 17 in New York (EDT).
    const result = busy("DTSTART:20261018T020000Z\nDTEND:20261018T040000Z");
    expect(result.busyDates).toEqual(["2026-10-17"]);
  });

  it("ignores cancelled and free events, and counts recurring ones without expanding them", () => {
    const result = busy(
      "DTSTART:20261020T180000\nDTEND:20261020T200000\nSTATUS:CANCELLED",
      "DTSTART:20261021T180000\nDTEND:20261021T200000\nTRANSP:TRANSPARENT",
      "DTSTART:20261022T180000\nDTEND:20261022T200000\nRRULE:FREQ=WEEKLY",
    );
    expect(result.busyDates).toEqual([]);
    expect(result.recurringIgnored).toBe(1);
  });

  it("drops past days, handles folded lines, and never returns event details", () => {
    const result = busy(
      "DTSTART;VALUE=DATE:20261001\nDTEND;VALUE=DATE:20261003",
      "DTSTART;VALUE=DATE:20261105\nDTEND;VALUE=DATE:20261106\nSUMMARY:Private\n  wedding at the Hyatt",
    );
    expect(result.busyDates).toEqual(["2026-11-05"]);
    expect(JSON.stringify(result)).not.toMatch(/wedding|Hyatt|Private/);
  });
});
