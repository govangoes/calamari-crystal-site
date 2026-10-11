// Booked days for the booking calendar, read from a private Google Calendar feed.
// Set BOOKING_CALENDAR_ICS_URL (server-side only, never a VITE_ variable) in Vercel.
// The feed link works like a password, so it is never returned or logged. Only dates leave here.

import { extractBusyDates } from "./_lib/icsBusyDates.js";

export const config = { runtime: "nodejs" };

const FETCH_TIMEOUT_MS = 5000;
const MAX_FEED_CHARS = 5_000_000;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const feed = process.env.BOOKING_CALENDAR_ICS_URL;
  let feedUrl = null;
  try {
    feedUrl = feed ? new URL(feed) : null;
  } catch {
    feedUrl = null;
  }

  // Not set up yet: the booking page just doesn't grey anything out.
  if (!feedUrl || feedUrl.protocol !== "https:") {
    res.setHeader("Cache-Control", "public, s-maxage=60");
    res.status(200).json({ configured: false, busyDates: [] });
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(feedUrl, { signal: controller.signal });
    if (!response.ok) throw new Error("feed_unavailable");
    const text = await response.text();
    if (text.length > MAX_FEED_CHARS) throw new Error("feed_too_large");

    const { busyDates, ...counts } = extractBusyDates(text);
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ configured: true, busyDates, ...counts });
  } catch {
    // No details on purpose. The page treats any failure as "no availability info".
    res.setHeader("Cache-Control", "no-store");
    res.status(502).json({ error: "calendar_unavailable" });
  } finally {
    clearTimeout(timer);
  }
}
