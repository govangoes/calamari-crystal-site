import { useMemo, useState } from "react";
import { CONTACT_EMAIL } from "../../content/offers.js";
import GhostButton from "../ui/GhostButton.jsx";
import PsychedelicButton from "../ui/PsychedelicButton.jsx";
import CrystalCard from "../ui/CrystalCard.jsx";
import CrystalInput from "../ui/CrystalInput.jsx";
import CrystalTextarea from "../ui/CrystalTextarea.jsx";
import Field from "../ui/Field.jsx";
import { copyTextToClipboard, submitFormWithFallback } from "./formUtils.js";

const INITIAL_FIELDS = {
  name: "",
  email: "",
  phone: "",
  dateCity: "",
  setLength: "",
  budget: "",
  message: "",
};

function formatBookingBody(fields) {
  return [
    "Booking inquiry",
    "",
    `Name: ${fields.name || "Not provided"}`,
    `Email: ${fields.email || "Not provided"}`,
    `Phone: ${fields.phone || "Not provided"}`,
    `Date/City: ${fields.dateCity || "Not provided"}`,
    `Set length: ${fields.setLength || "Not provided"}`,
    `Budget: ${fields.budget || "Not provided"}`,
    "",
    "Message:",
    fields.message || "Not provided",
  ].join("\n");
}

export default function BookingForm({ className = "" }) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subject = "Booking Inquiry — Go Van Goes";

  const formattedBody = useMemo(() => formatBookingBody(fields), [fields]);
  const copyPayload = useMemo(() => `Subject: ${subject}\n\n${formattedBody}`, [formattedBody]);

  const updateField = (key) => (event) => {
    const value = event.target.value;
    setFields((previous) => ({ ...previous, [key]: value }));
  };

  const handleCopy = async () => {
    try {
      await copyTextToClipboard(copyPayload);
      setStatus("Details copied. Paste them anywhere.");
    } catch {
      setStatus("Copy failed on this browser. Use the Send button instead.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const result = await submitFormWithFallback({
      formType: "booking",
      toEmail: CONTACT_EMAIL,
      subject,
      fields,
      formattedBody,
    });

    if (result.via === "endpoint") {
      setStatus("Inquiry sent. We will follow up by email.");
      setFields(INITIAL_FIELDS);
    } else {
      setStatus("Opening your email app with your booking details.");
    }

    setIsSubmitting(false);
  };

  const rootClassName = className ? `space-y-4 p-5 sm:p-6 ${className}` : "space-y-4 p-5 sm:p-6";

  return (
    <CrystalCard as="form" variant="glass" className={rootClassName} onSubmit={handleSubmit}>
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
        <Field label="Date / City" htmlFor="booking-date-city" required>
          <CrystalInput
            id="booking-date-city"
            name="dateCity"
            value={fields.dateCity}
            onChange={updateField("dateCity")}
            placeholder="May 22, Orlando"
            required
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
        <Field label="Budget" htmlFor="booking-budget">
          <CrystalInput
            id="booking-budget"
            name="budget"
            value={fields.budget}
            onChange={updateField("budget")}
            placeholder="$500-$1,000"
          />
        </Field>
      </div>

      <Field label="Message" htmlFor="booking-message" required>
        <CrystalTextarea
          id="booking-message"
          name="message"
          value={fields.message}
          onChange={updateField("message")}
          placeholder="Tell us about the event, audience, and timeline."
          required
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <PsychedelicButton as="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Booking Inquiry"}
        </PsychedelicButton>
        <GhostButton as="button" type="button" onClick={handleCopy}>
          Copy Details
        </GhostButton>
      </div>

      <p className="text-xs text-muted">
        Sends to <span className="text-strong">{CONTACT_EMAIL}</span>.
      </p>
      {status && <p className="text-xs text-paperWhite/85">{status}</p>}
    </CrystalCard>
  );
}
