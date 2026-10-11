import { useState } from "react";
import { buildMonthCells, formatLongDate, formatMonthTitle, toIsoDate } from "./bookingOptions.js";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS_AHEAD = 18;

const NAV_BUTTON =
  "grid h-9 w-9 place-items-center rounded-full border border-white/15 text-strong transition hover:border-crystal/60 disabled:cursor-not-allowed disabled:opacity-30";

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Month calendar for picking an event date.
 * `value` and `onChange` use YYYY-MM-DD strings. Days before `minDate` are disabled.
 */
export default function CalendarPicker({ value, onChange, minDate }) {
  const earliest = startOfDay(minDate);
  const latest = new Date(earliest.getFullYear(), earliest.getMonth() + MONTHS_AHEAD, 0);
  const [view, setView] = useState(() => {
    const anchor = value ? new Date(`${value}T00:00:00`) : earliest;
    return { year: anchor.getFullYear(), month: anchor.getMonth() };
  });

  const atFirstMonth = view.year === earliest.getFullYear() && view.month === earliest.getMonth();
  const atLastMonth = view.year === latest.getFullYear() && view.month === latest.getMonth();

  const shiftMonth = (delta) => {
    setView((previous) => {
      const next = new Date(previous.year, previous.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  };

  const cells = buildMonthCells(view.year, view.month);

  return (
    <div className="space-y-3" role="group" aria-label="Choose a date">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className={NAV_BUTTON}
          onClick={() => shiftMonth(-1)}
          disabled={atFirstMonth}
          aria-label="Previous month"
        >
          ‹
        </button>
        <p className="text-sm font-semibold text-strong" aria-live="polite">
          {formatMonthTitle(view.year, view.month)}
        </p>
        <button
          type="button"
          className={NAV_BUTTON}
          onClick={() => shiftMonth(1)}
          disabled={atLastMonth}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-muted">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (day === null) return <span key={`blank-${index}`} aria-hidden="true" />;
          const date = new Date(view.year, view.month, day);
          const iso = toIsoDate(date);
          const disabled = date < earliest;
          const selected = iso === value;
          const stateClass = selected
            ? "border-crystal bg-crystal/25 font-semibold text-strong shadow-crystal"
            : "border-transparent text-strong hover:border-crystal/50 hover:bg-white/5";
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              aria-label={formatLongDate(iso)}
              onClick={() => onChange(iso)}
              className={`aspect-square rounded-full border text-sm transition disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-transparent disabled:hover:bg-transparent ${stateClass}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
