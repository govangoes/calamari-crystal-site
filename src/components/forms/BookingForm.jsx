import { useMemo, useState } from "react";
import { CONTACT_EMAIL } from "../../content/offers.js";
import GhostButton from "../ui/GhostButton.jsx";
import PsychedelicButton from "../ui/PsychedelicButton.jsx";
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

const inputClassName =
  "w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2.5 text-sm text-paperWhite placeholder:text-paperWhite/45 outline-none transition focus:border-crystal/60 focus:ring-2 focus:ring-crystal/35";

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

  return (
    <form
      className={
        className
          ? `space-y-4 rounded-2xl border border-white/10 bg-ink/45 p-5 ${className}`
          : "space-y-4 rounded-2xl border border-white/10 bg-ink/45 p-5"
      }
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Name</span>
          <input
            className={inputClassName}
            name="name"
            value={fields.name}
            onChange={updateField("name")}
            required
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Email</span>
          <input
            className={inputClassName}
            name="email"
            type="email"
            value={fields.email}
            onChange={updateField("email")}
            required
          />
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Phone (optional)</span>
          <input
            className={inputClassName}
            name="phone"
            value={fields.phone}
            onChange={updateField("phone")}
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Date / City</span>
          <input
            className={inputClassName}
            name="dateCity"
            value={fields.dateCity}
            onChange={updateField("dateCity")}
            placeholder="May 22, Orlando"
            required
          />
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Set Length</span>
          <input
            className={inputClassName}
            name="setLength"
            value={fields.setLength}
            onChange={updateField("setLength")}
            placeholder="30 mins"
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Budget</span>
          <input
            className={inputClassName}
            name="budget"
            value={fields.budget}
            onChange={updateField("budget")}
            placeholder="$500-$1,000"
          />
        </label>
      </div>

      <label className="space-y-1">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Message</span>
        <textarea
          className={`${inputClassName} min-h-28 resize-y`}
          name="message"
          value={fields.message}
          onChange={updateField("message")}
          placeholder="Tell us about the event, audience, and timeline."
          required
        />
      </label>

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
    </form>
  );
}
