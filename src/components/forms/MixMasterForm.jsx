import { useMemo, useState } from "react";
import { CONTACT_EMAIL } from "../../content/offers.js";
import CrystalCard from "../ui/CrystalCard.jsx";
import CrystalInput from "../ui/CrystalInput.jsx";
import CrystalTextarea from "../ui/CrystalTextarea.jsx";
import Field from "../ui/Field.jsx";
import GhostButton from "../ui/GhostButton.jsx";
import { copyTextToClipboard, submitFormWithFallback } from "./formUtils.js";

const TIERS = [
  { name: "Basic", price: "$79", detail: "1 revision • typical 2–4 days" },
  { name: "Pro", price: "$129", detail: "2 revisions • typical 1–2 days" },
  { name: "Deluxe", price: "$199", detail: "cleanup/tuning • typical 24–48 hours" },
];

const INITIAL_FIELDS = {
  name: "",
  email: "",
  tier: "Pro",
  uploadInstructions: "",
  desiredTurnaround: "",
  referenceLink: "",
  notes: "",
  filesReady: false,
};

function formatMixMasterBody(fields, selectedTier) {
  return [
    "Mix / Master intake",
    "",
    `Name: ${fields.name || "Not provided"}`,
    `Email: ${fields.email || "Not provided"}`,
    `Selected tier: ${fields.tier}${selectedTier ? ` (${selectedTier.price})` : ""}`,
    `Tier details: ${selectedTier?.detail || "Not provided"}`,
    `Desired turnaround: ${fields.desiredTurnaround || "Not provided"}`,
    `Reference link: ${fields.referenceLink || "Not provided"}`,
    `Files ready to upload: ${fields.filesReady ? "Yes" : "No"}`,
    "",
    "Upload link or instructions:",
    fields.uploadInstructions || "Not provided",
    "",
    "Message / notes:",
    fields.notes || "Not provided",
  ].join("\n");
}

function validateMixMaster(fields) {
  if (!fields.name.trim() || !fields.email.trim()) {
    return "Please add your name and email so I can reply.";
  }
  if (!fields.notes.trim() && !fields.filesReady) {
    return "Add notes or confirm files are ready so I can start fast.";
  }
  return "";
}

export default function MixMasterForm({ className = "", fileUploadUrl = "" }) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [successSummary, setSuccessSummary] = useState("");
  const subject = "Mix / Master Intake — Go Van Goes";

  const selectedTier = useMemo(
    () => TIERS.find((tier) => tier.name === fields.tier) || TIERS[1],
    [fields.tier],
  );
  const formattedBody = useMemo(
    () => formatMixMasterBody(fields, selectedTier),
    [fields, selectedTier],
  );
  const copyPayload = useMemo(() => `Subject: ${subject}\n\n${formattedBody}`, [formattedBody]);

  const updateField = (key) => (event) => {
    const value = event.target.value;
    setFields((previous) => ({ ...previous, [key]: value }));
    setValidationMessage("");
  };

  const updateFilesReady = (event) => {
    const value = event.target.checked;
    setFields((previous) => ({ ...previous, filesReady: value }));
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

  const copyUploadLink = async () => {
    if (!fileUploadUrl) return;
    try {
      await copyTextToClipboard(fileUploadUrl);
      setFeedbackMessage("Upload link copied.");
    } catch {
      setFeedbackMessage("Could not copy upload link on this browser.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validateMixMaster(fields);
    if (validation) {
      setValidationMessage(validation);
      setFeedbackMessage("");
      return;
    }

    setIsSubmitting(true);
    setValidationMessage("");
    setFeedbackMessage("");

    const result = await submitFormWithFallback({
      formType: "mixmaster",
      toEmail: CONTACT_EMAIL,
      subject,
      fields: {
        ...fields,
        tierPrice: selectedTier?.price || "",
        tierDetail: selectedTier?.detail || "",
      },
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

      <Field label="Tier" htmlFor="mix-tier">
        <div id="mix-tier" className="flex flex-wrap gap-2">
          {TIERS.map((tier) => {
            const isSelected = fields.tier === tier.name;
            const tierClassName = [
              "crystal-badge crystal-badge--chip transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/60",
              isSelected
                ? "border-crystal/55 bg-crystal/16 text-crystal"
                : "border-white/25 bg-ink/40 text-muted hover:border-crystal/45 hover:text-paperWhite",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={tier.name}
                type="button"
                className={tierClassName}
                onClick={() => setFields((previous) => ({ ...previous, tier: tier.name }))}
                aria-pressed={isSelected}
              >
                {tier.name}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted">
          Selected:{" "}
          <span className="text-strong">
            {selectedTier.name} ({selectedTier.price}) — {selectedTier.detail}
          </span>
        </p>
      </Field>

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

      <CrystalCard variant="outline" className="space-y-3 border-white/20 bg-ink/30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-strong">What to upload</p>
          {fileUploadUrl && (
            <GhostButton as="button" type="button" onClick={copyUploadLink}>
              Copy upload link
            </GhostButton>
          )}
        </div>
        {fileUploadUrl && (
          <a
            className="text-xs text-crystal underline transition hover:text-paperWhite"
            href={fileUploadUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open upload folder
          </a>
        )}
        <ul className="space-y-1 text-xs text-muted">
          <li>• Vocals (WAV/AIFF preferred)</li>
          <li>• Beat (WAV/MP3)</li>
          <li>• Notes + reference track (optional)</li>
        </ul>
      </CrystalCard>

      <Field label="Upload Link / Instructions" htmlFor="mix-upload">
        <CrystalTextarea
          id="mix-upload"
          name="uploadInstructions"
          value={fields.uploadInstructions}
          onChange={updateField("uploadInstructions")}
          placeholder="Share your Drive/Dropbox link and any file notes."
          className="min-h-24"
        />
      </Field>

      <Field label="Message / Notes" htmlFor="mix-notes">
        <CrystalTextarea
          id="mix-notes"
          name="notes"
          value={fields.notes}
          onChange={updateField("notes")}
          placeholder="Tell me vibe, references, and revision priorities."
          className="min-h-24"
        />
      </Field>

      <label className="inline-flex items-center gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={fields.filesReady}
          onChange={updateFilesReady}
          className="h-4 w-4 rounded border border-white/20 bg-ink/80 text-crystal focus:ring-2 focus:ring-crystal/60"
        />
        Files are ready and I can upload immediately.
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <GhostButton as="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Mix / Master Intake"}
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
