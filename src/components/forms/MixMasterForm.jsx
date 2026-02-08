import { useMemo, useState } from "react";
import { CONTACT_EMAIL } from "../../content/offers.js";
import GhostButton from "../ui/GhostButton.jsx";
import PsychedelicButton from "../ui/PsychedelicButton.jsx";
import { copyTextToClipboard, submitFormWithFallback } from "./formUtils.js";

const INITIAL_FIELDS = {
  name: "",
  email: "",
  uploadInstructions: "",
  desiredTurnaround: "",
  referenceLink: "",
  notes: "",
};

function formatMixMasterBody(fields) {
  return [
    "Mix / Master intake",
    "",
    `Name: ${fields.name || "Not provided"}`,
    `Email: ${fields.email || "Not provided"}`,
    `Desired turnaround: ${fields.desiredTurnaround || "Not provided"}`,
    `Reference link: ${fields.referenceLink || "Not provided"}`,
    "",
    "Upload link or instructions:",
    fields.uploadInstructions || "Not provided",
    "",
    "Notes:",
    fields.notes || "Not provided",
  ].join("\n");
}

const inputClassName =
  "w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2.5 text-sm text-paperWhite placeholder:text-paperWhite/45 outline-none transition focus:border-crystal/60 focus:ring-2 focus:ring-crystal/35";

export default function MixMasterForm({ className = "", fileUploadUrl = "" }) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subject = "Mix / Master Intake — Go Van Goes";

  const formattedBody = useMemo(() => formatMixMasterBody(fields), [fields]);
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
      formType: "mixmaster",
      toEmail: CONTACT_EMAIL,
      subject,
      fields,
      formattedBody,
    });

    if (result.via === "endpoint") {
      setStatus("Intake sent. We will follow up by email.");
      setFields(INITIAL_FIELDS);
    } else {
      setStatus("Opening your email app with your mix/master details.");
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
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Desired Turnaround</span>
          <input
            className={inputClassName}
            name="desiredTurnaround"
            value={fields.desiredTurnaround}
            onChange={updateField("desiredTurnaround")}
            placeholder="48 hours / 1 week"
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Reference Link</span>
          <input
            className={inputClassName}
            name="referenceLink"
            type="url"
            value={fields.referenceLink}
            onChange={updateField("referenceLink")}
            placeholder="https://..."
          />
        </label>
      </div>

      <label className="space-y-1">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          Upload Link / Instructions
        </span>
        <textarea
          className={`${inputClassName} min-h-24 resize-y`}
          name="uploadInstructions"
          value={fields.uploadInstructions}
          onChange={updateField("uploadInstructions")}
          placeholder="Share your Drive/Dropbox link and any file notes."
          required
        />
      </label>

      <label className="space-y-1">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Notes</span>
        <textarea
          className={`${inputClassName} min-h-24 resize-y`}
          name="notes"
          value={fields.notes}
          onChange={updateField("notes")}
          placeholder="Tell me vibe, references, and revision priorities."
          required
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <PsychedelicButton as="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Mix / Master Intake"}
        </PsychedelicButton>
        <GhostButton as="button" type="button" onClick={handleCopy}>
          Copy Details
        </GhostButton>
      </div>

      <div className="space-y-1 text-xs text-muted">
        <p>
          Sends to <span className="text-strong">{CONTACT_EMAIL}</span>.
        </p>
        {fileUploadUrl && (
          <p>
            Need a place to upload?{" "}
            <a
              className="text-crystal underline transition hover:text-paperWhite"
              href={fileUploadUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open upload folder
            </a>
            .
          </p>
        )}
      </div>
      {status && <p className="text-xs text-paperWhite/85">{status}</p>}
    </form>
  );
}
