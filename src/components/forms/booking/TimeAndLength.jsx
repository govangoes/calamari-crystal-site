import {
  DURATION_STEP,
  DURATION_TICKS,
  MAX_DURATION,
  MIN_DURATION,
  TIME_GROUPS,
  formatDuration,
  formatEndTime,
} from "./bookingOptions.js";

const CHIP_BASE =
  "rounded-full border px-3 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-crystal";
const CHIP_ON = "border-crystal bg-crystal/25 font-semibold text-strong shadow-crystal";
const CHIP_OFF = "border-white/15 bg-white/5 text-muted hover:border-crystal/50 hover:text-strong";

/** Start time list, grouped Morning / Afternoon / Evening. `value` is minutes after midnight. */
export function TimeList({ value, onChange, disabled }) {
  if (disabled) {
    return <p className="text-sm text-muted">Pick a date first, then choose a start time.</p>;
  }

  return (
    <div className="space-y-4" role="group" aria-label="Choose a start time">
      {TIME_GROUPS.map((group) => (
        <div key={group.id} className="space-y-2">
          <p className="text-[11px] uppercase tracking-wider text-muted">{group.label}</p>
          <div className="flex flex-wrap gap-2">
            {group.slots.map((slot) => (
              <button
                key={slot.value}
                type="button"
                aria-pressed={value === slot.value}
                onClick={() => onChange(slot.value)}
                className={`${CHIP_BASE} ${value === slot.value ? CHIP_ON : CHIP_OFF}`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Event length slider in 30 minute steps, with the resulting end time underneath. */
export function DurationSlider({ id, value, onChange, startMinutes }) {
  const label = formatDuration(value);
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="crystal-field-label">
          How long?
        </label>
        <output htmlFor={id} className="text-lg font-semibold text-strong">
          {label}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={MIN_DURATION}
        max={MAX_DURATION}
        step={DURATION_STEP}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={label}
        className="w-full accent-[var(--cc-crystalCyan)]"
      />
      <div className="flex justify-between text-[11px] text-muted" aria-hidden="true">
        {DURATION_TICKS.map((tick) => (
          <span key={tick}>
            {tick < 60 ? `${tick}m` : `${tick / 60}h${tick === MAX_DURATION ? "+" : ""}`}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted">
        {startMinutes === null
          ? "Choose a start time to see when it wraps up."
          : `Wraps up around ${formatEndTime(startMinutes, value)}. Longer than 6 hours? Say so in the notes.`}
      </p>
    </div>
  );
}
