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

  const rootClassName = className ? `space-y-4 p-5 sm:p-6 ${className}` : "space-y-4 p-5 sm:p-6";

  return (
    <CrystalCard as="form" variant="glass" className={rootClassName} onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Name" htmlFor="mix-name" required>
          <CrystalInput
            id="mix-name"
            name="name"
            value={fields.name}
            onChange={updateField("name")}
            required
            autoComplete="name"
          />
        </Field>
        <Field label="Email" htmlFor="mix-email" required>
          <CrystalInput
            id="mix-email"
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
        <Field label="Desired Turnaround" htmlFor="mix-turnaround">
          <CrystalInput
            id="mix-turnaround"
            name="desiredTurnaround"
            value={fields.desiredTurnaround}
            onChange={updateField("desiredTurnaround")}
            placeholder="48 hours / 1 week"
          />
        </Field>
        <Field label="Reference Link" htmlFor="mix-reference-link">
          <CrystalInput
            id="mix-reference-link"
            name="referenceLink"
            type="url"
            value={fields.referenceLink}
            onChange={updateField("referenceLink")}
            placeholder="https://..."
          />
        </Field>
      </div>

      <Field label="Upload Link / Instructions" htmlFor="mix-upload" required>
        <CrystalTextarea
          id="mix-upload"
          name="uploadInstructions"
          value={fields.uploadInstructions}
          onChange={updateField("uploadInstructions")}
          placeholder="Share your Drive/Dropbox link and any file notes."
          required
          className="min-h-24"
        />
      </Field>

      <Field label="Notes" htmlFor="mix-notes" required>
        <CrystalTextarea
          id="mix-notes"
          name="notes"
          value={fields.notes}
          onChange={updateField("notes")}
          placeholder="Tell me vibe, references, and revision priorities."
          required
          className="min-h-24"
        />
      </Field>

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
    </CrystalCard>
  );
}
