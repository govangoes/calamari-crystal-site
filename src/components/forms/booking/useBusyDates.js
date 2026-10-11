import { useEffect, useState } from "react";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Days that are already booked, from /api/availability.
 * If the calendar isn't connected or the request fails, this returns an empty list
 * and nothing is greyed out. Requests are still reviewed by hand either way.
 */
export default function useBusyDates() {
  const [busyDates, setBusyDates] = useState([]);

  useEffect(() => {
    if (typeof globalThis.fetch !== "function") return undefined;
    const controller = new globalThis.AbortController();

    (async () => {
      try {
        const response = await globalThis.fetch("/api/availability", { signal: controller.signal });
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data.busyDates)) {
          setBusyDates(data.busyDates.filter((date) => ISO_DATE.test(date)));
        }
      } catch {
        // Fail open: no availability info is better than a broken form.
      }
    })();

    return () => controller.abort();
  }, []);

  return busyDates;
}
