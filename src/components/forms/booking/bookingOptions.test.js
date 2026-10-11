import { describe, expect, it } from "vitest";
import {
  TIME_GROUPS,
  buildMonthCells,
  formatClock,
  formatDuration,
  formatEndTime,
  formatLongDate,
  toIsoDate,
} from "./bookingOptions.js";

describe("duration and time formatting", () => {
  it("formats lengths in 30 minute divisions", () => {
    expect(formatDuration(30)).toBe("30 min");
    expect(formatDuration(60)).toBe("1 hr");
    expect(formatDuration(90)).toBe("1 hr 30 min");
    expect(formatDuration(240)).toBe("4 hrs");
    expect(formatDuration(360)).toBe("6 hrs+");
  });

  it("formats clock times including noon and midnight", () => {
    expect(formatClock(0)).toBe("12:00 AM");
    expect(formatClock(12 * 60)).toBe("12:00 PM");
    expect(formatClock(19 * 60 + 30)).toBe("7:30 PM");
  });

  it("flags end times that roll past midnight", () => {
    expect(formatEndTime(20 * 60, 120)).toBe("10:00 PM");
    expect(formatEndTime(23 * 60, 120)).toBe("1:00 AM (next day)");
  });

  it("offers start times every 30 minutes from 8:00 AM to 11:30 PM", () => {
    const labels = TIME_GROUPS.flatMap((group) => group.slots.map((slot) => slot.label));
    expect(labels[0]).toBe("8:00 AM");
    expect(labels.at(-1)).toBe("11:30 PM");
    expect(labels).toHaveLength(32);
  });
});

describe("calendar helpers", () => {
  it("keeps the local calendar day when building ISO dates", () => {
    expect(toIsoDate(new Date(2026, 10, 14, 23, 59))).toBe("2026-11-14");
  });

  it("formats a long date label", () => {
    expect(formatLongDate("2026-10-17")).toBe("Saturday, October 17, 2026");
  });

  it("pads the first week so days land under the right weekday", () => {
    // October 2026 starts on a Thursday and has 31 days.
    const cells = buildMonthCells(2026, 9);
    expect(cells.slice(0, 4)).toEqual([null, null, null, null]);
    expect(cells[4]).toBe(1);
    expect(cells.filter(Boolean)).toHaveLength(31);
  });
});
