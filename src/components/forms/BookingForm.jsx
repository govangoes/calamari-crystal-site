import { useEffect, useMemo, useRef, useState } from "react";
import { CONTACT_EMAIL } from "../../content/offers.js";
import CrystalCard from "../ui/CrystalCard.jsx";
import CrystalInput from "../ui/CrystalInput.jsx";
import CrystalTextarea from "../ui/CrystalTextarea.jsx";
import Field from "../ui/Field.jsx";
import GhostButton from "../ui/GhostButton.jsx";
import CalendarPicker from "./booking/CalendarPicker.jsx";
import { DurationSlider, TimeList } from "./booking/TimeAndLength.jsx";
import {
  BUDGET_RANGES,
  DEFAULT_DURATION,
  SERVICES,
  formatClock,
  formatDuration,
  formatEndTime,
  formatLongDate,
} from "./booking/bookingOptions.js";
import { copyTextToClipboard, submitFormWithFallback } from "./formUtils.js";

const STEPS = ["Service", "When", "Where", "You"];
const LAST_STEP = STEPS.length - 1;
const SUCCESS_MESSAGE = "Request sent. I’ll reply by email within 24–48 hours.";
const MAILTO_FALLBACK_MESSAGE =
  "Your email app is opening with the details. Send that email to finish the request.";
const SUBJECT = "Booking Request — Go Van Goes";

const CHIP_BASE =
  "rounded-xl border px-3 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-crystal";
const CHIP_ON = "border-crystal bg-crystal/20 text-strong shadow-crystal";
const CHIP_OFF = "border-white/15 bg-white/5 text-muted hover:border-crystal/50 hover:text-strong";

const INITIAL_FIELDS = {
  serviceId: "",
  date: "",
  startMinutes: null,
  duration: DEFAULT_DURATION,
  city: "",
  budgetRange: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  gotcha: "", // honeypot: real people never see or fill this
};

function tomorrow() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

function describe(fields) {
  const service = SERVICES.find((item) => item.id === fields.serviceId);
  const hasTime = fields.startMinutes !== null;
  return {
    service: service ? service.label : "",
    date: fields.date ? formatLongDate(fields.date) : "",
    time: hasTime
      ? `${formatClock(fields.startMinutes)} – ${formatEndTime(fields.startMinutes, fields.duration)}`
      : "",
    length: hasTime ? formatDuration(fields.duration) : "",
  };
}

function formatBookingBody(fields) {
  const info = describe(fields);
  return [
    "Booking request",
    "",
    `Service: ${info.service || "Not provided"}`,
    `Date: ${info.date || "Not provided"}`,
    `Time: ${info.time || "Not provided"}`,
    `Length: ${info.length || "Not provided"}`,
    `Location: ${fields.city || "Not provided"}`,
    `Budget: ${fields.budgetRange || "Not provided"}`,
    "",
    `Name: ${fields.name || "Not provided"}`,
    `Email: ${fields.email || "Not provided"}`,
    `Phone: ${fields.phone || "Not provided"}`,
    "",
    "Notes:",
    fields.message || "None",
  ].join("\n");
}

function canContinue(step, fields) {
  if (step === 0) return Boolean(fields.serviceId);
  if (step === 1) return Boolean(fields.date) && fields.startMinutes !== null;
  if (step === 2) return Boolean(fields.city.trim());
  return Boolean(fields.name.trim() && fields.email.trim());
}

function StepProgress({ step }) {
  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Booking steps">
      {STEPS.map((label, index) => (
        <li key={label} aria-current={index === step ? "step" : undefined} className="space-y-1.5">
          <span
            className={`block h-1 rounded-full ${index <= step ? "bg-crystal" : "bg-white/15"}`}
          />
          <span
            className={`block text-[11px] uppercase tracking-wider ${
              index === step ? "text-strong" : "text-muted"
            }`}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function SummaryRows({ info, fields }) {
  const rows = [
    ["Service", info.service],
    ["Date", info.date],
    ["Time", info.time],
    ["Length", info.length],
    ["Where", fields.city.trim()],
    ["Budget", fields.budgetRange],
  ].filter(([, value]) => value);

  if (!rows.length) {
    return <p className="text-sm text-muted">Your choices show up here as you go.</p>;
  }

  return (
    <dl className="space-y-2 text-sm">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="text-[11px] uppercase tracking-wider text-muted">{label}</dt>
          <dd className="text-strong">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function BookingForm({ className = "" }) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [result, setResult] = useState(null);
  const headingRef = useRef(null);
  const hasMounted = useRef(false);
  const minDate = useMemo(tomorrow, []);

  const info = describe(fields);
  const formattedBody = useMemo(() => formatBookingBody(fields), [fields]);
  const copyPayload = `Subject: ${SUBJECT}\n\n${formattedBody}`;

  // Move focus to the step heading when the step changes so keyboard and screen reader users follow along.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const setField = (key, value) => {
    setFields((previous) => ({ ...previous, [key]: value }));
    setValidationMessage("");
  };
  const onText = (key) => (event) => setField(key, event.target.value);

  const goNext = () => {
    if (!canContinue(step, fields)) return;
    setStep((current) => Math.min(current + 1, LAST_STEP));
  };

  const copySummary = async () => {
    try {
      await copyTextToClipboard(copyPayload);
      setFeedbackMessage("Summary copied.");
    } catch {
      setFeedbackMessage("Copy failed on this browser. You can still send by email.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Pressing Enter on an earlier step moves forward instead of sending.
    if (step < LAST_STEP) {
      goNext();
      return;
    }

    if (!canContinue(step, fields)) {
      setValidationMessage("Please add your name and email so I can follow up.");
      return;
    }

    // Bots fill the hidden field. Pretend it worked and send nothing.
    if (fields.gotcha) {
      setResult({ via: "endpoint" });
      return;
    }

    setIsSubmitting(true);
    setValidationMessage("");
    setFeedbackMessage("");

    const submission = await submitFormWithFallback({
      formType: "booking",
      toEmail: CONTACT_EMAIL,
      subject: SUBJECT,
      fields: {
        name: fields.name.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim(),
        eventType: info.service,
        eventDate: fields.date,
        eventDateLong: info.date,
        startTime: formatClock(fields.startMinutes),
        endTime: formatEndTime(fields.startMinutes, fields.duration),
        setLength: info.length,
        durationMinutes: fields.duration,
        city: fields.city.trim(),
        budgetRange: fields.budgetRange,
        message: fields.message.trim(),
      },
      formattedBody,
    });

    setResult(submission);
    setIsSubmitting(false);
  };

  const startOver = () => {
    setFields(INITIAL_FIELDS);
    setStep(0);
    setResult(null);
    setFeedbackMessage("");
    setValidationMessage("");
  };

  const rootClassName = className ? `p-5 sm:p-6 ${className}` : "p-5 sm:p-6";

  if (result) {
    const sent = result.via === "endpoint";
    return (
      <CrystalCard variant="glass" className={`${rootClassName} space-y-4`}>
        <h3 ref={headingRef} className="text-xl font-bold text-strong">
          {sent ? "You’re on the list." : "One more step."}
        </h3>
        <p className="text-sm text-strong" role="status">
          {sent ? SUCCESS_MESSAGE : MAILTO_FALLBACK_MESSAGE}
        </p>
        <CrystalCard variant="outline" className="p-4">
          <SummaryRows info={info} fields={fields} />
        </CrystalCard>
        <p className="text-xs text-muted">
          This is a request, not a confirmed booking. I’ll check the date and send you a quote.
        </p>
        <div className="flex flex-wrap gap-3">
          <GhostButton onClick={copySummary}>Copy summary</GhostButton>
          <GhostButton onClick={startOver}>Start another request</GhostButton>
        </div>
        {feedbackMessage && <p className="text-xs text-paperWhite/85">{feedbackMessage}</p>}
      </CrystalCard>
    );
  }

  return (
    <CrystalCard as="form" variant="glass" className={rootClassName} onSubmit={handleSubmit}>
      <div className="space-y-6">
        <StepProgress step={step} />

        <div className="grid gap-6 md:grid-cols-[1fr_15rem]">
          <div className="space-y-5">
            {step === 0 && (
              <>
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-lg font-bold text-strong outline-none"
                >
                  What are we booking?
                </h3>
                <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Service">
                  {SERVICES.map((service) => {
                    const selected = fields.serviceId === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setField("serviceId", service.id)}
                        className={`${CHIP_BASE} ${selected ? CHIP_ON : CHIP_OFF}`}
                      >
                        <span className="block font-semibold text-strong">{service.label}</span>
                        <span className="block text-xs">{service.detail}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-lg font-bold text-strong outline-none"
                >
                  When is it?
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <CalendarPicker
                    value={fields.date}
                    minDate={minDate}
                    onChange={(date) => setField("date", date)}
                  />
                  <TimeList
                    disabled={!fields.date}
                    value={fields.startMinutes}
                    onChange={(minutes) => setField("startMinutes", minutes)}
                  />
                </div>
                <DurationSlider
                  id="booking-duration"
                  value={fields.duration}
                  startMinutes={fields.startMinutes}
                  onChange={(minutes) => setField("duration", minutes)}
                />
              </>
            )}

            {step === 2 && (
              <>
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-lg font-bold text-strong outline-none"
                >
                  Where is it?
                </h3>
                <Field label="City / venue" htmlFor="booking-city" required>
                  <CrystalInput
                    id="booking-city"
                    name="city"
                    value={fields.city}
                    onChange={onText("city")}
                    placeholder="Orlando, FL — or the venue name"
                    autoComplete="off"
                  />
                </Field>
                <div className="space-y-2">
                  <p className="crystal-field-label">Budget (optional)</p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Budget">
                    {BUDGET_RANGES.map((range) => {
                      const selected = fields.budgetRange === range;
                      return (
                        <button
                          key={range}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setField("budgetRange", selected ? "" : range)}
                          className={`${CHIP_BASE} ${selected ? CHIP_ON : CHIP_OFF}`}
                        >
                          {range}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-lg font-bold text-strong outline-none"
                >
                  Who’s booking?
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name" htmlFor="booking-name" required>
                    <CrystalInput
                      id="booking-name"
                      name="name"
                      value={fields.name}
                      onChange={onText("name")}
                      required
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email" htmlFor="booking-email" required>
                    <CrystalInput
                      id="booking-email"
                      name="email"
                      type="email"
                      value={fields.email}
                      onChange={onText("email")}
                      required
                      autoComplete="email"
                    />
                  </Field>
                </div>
                <Field label="Phone (optional)" htmlFor="booking-phone">
                  <CrystalInput
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    value={fields.phone}
                    onChange={onText("phone")}
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Anything else? (optional)" htmlFor="booking-message">
                  <CrystalTextarea
                    id="booking-message"
                    name="message"
                    value={fields.message}
                    onChange={onText("message")}
                    placeholder="Crowd size, vibe, songs to play or avoid, setup details…"
                  />
                </Field>
                {/* Honeypot for spam bots. Hidden from people and assistive tech. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="booking-website">Leave this empty</label>
                  <input
                    id="booking-website"
                    name="_gotcha"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={fields.gotcha}
                    onChange={onText("gotcha")}
                  />
                </div>
                <p className="text-xs text-muted">
                  No account, no payment. I only use your details to reply about this request.
                </p>
              </>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {step > 0 && (
                <GhostButton onClick={() => setStep((current) => current - 1)}>Back</GhostButton>
              )}
              {step < LAST_STEP ? (
                <GhostButton onClick={goNext} disabled={!canContinue(step, fields)}>
                  Continue
                </GhostButton>
              ) : (
                <GhostButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Booking Request"}
                </GhostButton>
              )}
            </div>

            {validationMessage && (
              <p className="text-xs text-muted" role="alert">
                {validationMessage}
              </p>
            )}
          </div>

          <aside
            aria-label="Your request"
            className="space-y-3 md:border-l md:border-white/10 md:pl-5"
          >
            <p className="text-[11px] uppercase tracking-wider text-muted">Your request</p>
            <SummaryRows info={info} fields={fields} />
          </aside>
        </div>
      </div>
    </CrystalCard>
  );
}
