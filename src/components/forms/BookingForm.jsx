import { useMemo, useState } from "react";
import { CONTACT_EMAIL } from "../../content/offers.js";
import CrystalCard from "../ui/CrystalCard.jsx";
import CrystalInput from "../ui/CrystalInput.jsx";
import CrystalSelect from "../ui/CrystalSelect.jsx";
import CrystalTextarea from "../ui/CrystalTextarea.jsx";
import Field from "../ui/Field.jsx";
import GhostButton from "../ui/GhostButton.jsx";
import { copyTextToClipboard, submitFormWithFallback } from "./formUtils.js";

const EVENT_TYPES = ["Show", "Hosting", "Brand", "Other"];
const BUDGET_RANGES = ["Under $500", "$500-$1,000", "$1,000-$2,500", "$2,500+"];

const INITIAL_FIELDS = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  city: "",
  setLength: "",
  budgetRange: "",
  message: "",
};

function formatBookingBody(fields) {
  return [
    "Booking inquiry",
    "",
    `Name: ${fields.name || "Not provided"}`,
    `Email: ${fields.email || "Not provided"}`,
    `Phone: ${fields.phone || "Not provided"}`,
    `Event type: ${fields.eventType || "Not provided"}`,
    `Event date: ${fields.eventDate || "Not provided"}`,
    `City: ${fields.city || "Not provided"}`,
    `Set length: ${fields.setLength || "Not provided"}`,
    `Budget range: ${fields.budgetRange || "Not provided"}`,
    "",
    "Message:",
    fields.message || "Not provided",
  ].join("\n");
}

function validateBooking(fields) {
  if (!fields.name.trim() || !fields.email.trim()) {
    return "Please add your name and email so I can follow up.";
  }
  if (!fields.message.trim()) {
    return "Please add a short event brief so I can quote accurately.";
  }
  return "";
}

export default function BookingForm({ className = "" }) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [successSummary, setSuccessSummary] = useState("");
  const subject = "Booking Inquiry — Go Van Goes";

  const formattedBody = useMemo(() => formatBookingBody(fields), [fields]);
  const copyPayload = useMemo(() => `Subject: ${subject}\n\n${formattedBody}`, [formattedBody]);

  const updateField = (key) => (event) => {
    const value = event.target.value;
    setFields((previous) => ({ ...previous, [key]: value }));
    setValidationMessage("");
  };

  const copySummary = async (summary = copyPayload) => {
    try {
      await copyTextToClipboard(summary);
      setFeedbackMessage("Summary copied.");
    } catch {
      setFeedbackMessage("Copy failed on this browser. You can still send by email.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validateBooking(fields);
    if (validation) {
      setValidationMessage(validation);
      setFeedbackMessage("");
      return;
    }

    setIsSubmitting(true);
    setValidationMessage("");
    setFeedbackMessage("");

    const result = await submitFormWithFallback({
      formType: "booking",
      toEmail: CONTACT_EMAIL,
      subject,
      fields,
      formattedBody,
    });

    setSuccessSummary(copyPayload);
    if (result.via === "endpoint") {
      setFields(INITIAL_FIELDS);
    }
    setFeedbackMessage("Received. I’ll reply in 24–48 hours.");
    setIsSubmitting(false);
  };

  const rootClassName = className ? `space-y-4 p-5 sm:p-6 ${className}` : "space-y-4 p-5 sm:p-6";

  return (
    <CrystalCard as="form" variant="glass" className={rootClassName} onSubmit={handleSubmit}>
      {successSummary && (
        <CrystalCard variant="outline" className="space-y-3 border-crystal/35 bg-crystal/10 p-4">
          <p className="text-sm font-medium text-strong">Received. I’ll reply in 24–48 hours.</p>
          <GhostButton as="button" type="button" onClick={() => copySummary(successSummary)}>
            Copy summary
          </GhostButton>
        </CrystalCard>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Name" htmlFor="booking-name" required>
          <CrystalInput
            id="booking-name"
            name="name"
            value={fields.name}
            onChange={updateField("name")}
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
            onChange={updateField("email")}
            required
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Phone (optional)" htmlFor="booking-phone">
          <CrystalInput
            id="booking-phone"
            name="phone"
            value={fields.phone}
            onChange={updateField("phone")}
            autoComplete="tel"
          />
        </Field>
        <Field label="Event Type" htmlFor="booking-event-type" required>
          <CrystalSelect
            id="booking-event-type"
            name="eventType"
            value={fields.eventType}
            onChange={updateField("eventType")}
            required
          >
            <option value="">Select event type</option>
            {EVENT_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CrystalSelect>
        </Field>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Date (optional)" htmlFor="booking-event-date">
          <CrystalInput
            id="booking-event-date"
            name="eventDate"
            type="date"
            value={fields.eventDate}
            onChange={updateField("eventDate")}
          />
        </Field>
        <Field label="City / Venue" htmlFor="booking-city">
          <CrystalInput
            id="booking-city"
            name="city"
            value={fields.city}
            onChange={updateField("city")}
            placeholder="Orlando, FL"
          />
        </Field>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Set Length" htmlFor="booking-set-length">
          <CrystalInput
            id="booking-set-length"
            name="setLength"
            value={fields.setLength}
            onChange={updateField("setLength")}
            placeholder="30 mins"
          />
        </Field>
        <Field label="Budget Range (optional)" htmlFor="booking-budget-range">
          <CrystalSelect
            id="booking-budget-range"
            name="budgetRange"
            value={fields.budgetRange}
            onChange={updateField("budgetRange")}
          >
            <option value="">Select budget range</option>
            {BUDGET_RANGES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CrystalSelect>
        </Field>
      </div>

      <Field label="Message" htmlFor="booking-message" required>
        <CrystalTextarea
          id="booking-message"
          name="message"
          value={fields.message}
          onChange={updateField("message")}
          placeholder="Tell me about the event, audience, and timeline."
          required
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <GhostButton as="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Booking Inquiry"}
        </GhostButton>
        <GhostButton as="button" type="button" onClick={() => copySummary()}>
          Copy details
        </GhostButton>
      </div>

      <p className="text-xs text-muted">
        Sends to <span className="text-strong">{CONTACT_EMAIL}</span>.
      </p>
      {validationMessage && <p className="text-xs text-muted">{validationMessage}</p>}
      {feedbackMessage && <p className="text-xs text-paperWhite/85">{feedbackMessage}</p>}
    </CrystalCard>
  );
}
