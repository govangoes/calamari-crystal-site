import { afterEach, describe, expect, it, vi } from "vitest";
import handler from "../../api/availability.js";

function makeRes() {
  const res = { headers: {}, statusCode: 200, body: undefined };
  res.setHeader = (key, value) => {
    res.headers[key] = value;
  };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    return res;
  };
  return res;
}

const FEED = "https://calendar.google.com/calendar/ical/secret-token/basic.ics";

describe("/api/availability", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns an empty list when no calendar is connected", async () => {
    vi.stubEnv("BOOKING_CALENDAR_ICS_URL", "");
    const res = makeRes();
    await handler({ method: "GET" }, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ configured: false, busyDates: [] });
  });

  it("rejects non-GET requests", async () => {
    const res = makeRes();
    await handler({ method: "POST" }, res);
    expect(res.statusCode).toBe(405);
  });

  it("returns only dates from the feed and never echoes the feed link", async () => {
    vi.stubEnv("BOOKING_CALENDAR_ICS_URL", FEED);
    const year = new Date().getFullYear() + 1;
    const ics = `BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nDTSTART;VALUE=DATE:${year}0615\r\nDTEND;VALUE=DATE:${year}0616\r\nSUMMARY:Secret client\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: async () => ics }));
    const res = makeRes();
    await handler({ method: "GET" }, res);
    expect(res.statusCode).toBe(200);
    expect(res.body.busyDates).toEqual([`${year}-06-15`]);
    expect(JSON.stringify(res.body)).not.toMatch(/secret/i);
  });

  it("answers 502 without details when the calendar can't be reached", async () => {
    vi.stubEnv("BOOKING_CALENDAR_ICS_URL", FEED);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom: secret-token")));
    const res = makeRes();
    await handler({ method: "GET" }, res);
    expect(res.statusCode).toBe(502);
    expect(res.headers["Cache-Control"]).toBe("no-store");
    expect(JSON.stringify(res.body)).not.toMatch(/secret|boom/);
  });
});
