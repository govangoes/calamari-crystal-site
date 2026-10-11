import { useEffect, useMemo, useRef, useState } from "react";
import { CONTACT_EMAIL } from "../../content/offers.js";
import CrystalCard from "../ui/CrystalCard.jsx";
import CrystalInput from "../ui/CrystalInput.jsx";
import CrystalTextarea from "../ui/CrystalTextarea.jsx";
import Field from "../ui/Field.jsx";
import GhostButton from "../ui/GhostButton.jsx";
import { copyTextToClipboard, submitFormWithFallback } from "./formUtils.js";

// Prices here match the public Services page. Change them in both places.
const TIERS = [
  { name: "Basic", price: "$79", detail: "1 revision • typical 2–4 days" },
  { name: "Pro", price: "$129", detail: "2 revisions • typical 1–2 days", popular: true },
  {
    name: "Deluxe",
    price: "$199",
    detail: "Vocal cleanup/tuning • 3 revisions • typical 24–48 hours",
  },
];
const ADD_ONS = [
  { name: "Extra revision", price: "$15" },
  { name: "Stems export", price: "$25" },
  { name: "Rush (same day, if available)", price: "$50" },
];
const TURNAROUNDS = ["No rush", "Within a week", "2–3 days", "ASAP"];

const STEPS = ["Package", "Song", "Files", "You"];
const LAST_STEP = STEPS.length - 1;
const SUBJECT = "Mix / Master Intake — Go Van Goes";
const ENDPOINT_SUCCESS_MESSAGE = "Received. I’ll reply in 24–48 hours.";
const MAILTO_FALLBACK_MESSAGE =
  "Your email app is opening with the details. Send that email to finish the request.";

const CHIP_BASE =
  "rounded-xl border px-3 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-crystal";
const CHIP_ON = "border-crystal bg-crystal/20 text-strong shadow-crystal";
const CHIP_OFF = "border-white/15 bg-white/5 text-muted hover:border-crystal/50 hover:text-strong";

const INITIAL_FIELDS = {
  tier: "Pro",
  addOns: [],
  songTitle: "",
  desiredTurnaround: "",
  referenceLink: "",
  notes: "",
  uploadInstructions: "",
  filesReady: false,
  name: "",
  email: "",
  gotcha: "", // honeypot: real people never see or fill this
};

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function findTier(name) {
  return TIERS.find((tier) => tier.name === name) || TIERS[1];
}

function formatMixMasterBody(fields) {
  const tier = findTier(fields.tier);
  return [
    "Mix / Master intake",
    "",
    `Name: ${fields.name || "Not provided"}`,
    `Email: ${fields.email || "Not provided"}`,
    "",
    `Package: ${tier.name} (${tier.price}) — ${tier.detail}`,
    `Add-ons: ${fields.addOns.length ? fields.addOns.join(", ") : "None"}`,
    `Song / project: ${fields.songTitle || "Not provided"}`,
    `Desired turnaround: ${fields.desiredTurnaround || "Not provided"}`,
    `Reference link: ${fields.referenceLink || "Not provided"}`,
    `Files ready to upload: ${fields.filesReady ? "Yes" : "No"}`,
    "",
    "Upload link or instructions:",
    fields.uploadInstructions || "Not provided",
    "",
    "Notes:",
    fields.notes || "None",
  ].join("\n");
}

function canContinue(step, fields) {
  if (step === LAST_STEP) return Boolean(fields.name.trim() && fields.email.trim());
  return true;
}

function StepProgress({ step }) {
  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Mix and master steps">
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

function SummaryRows({ fields }) {
  const tier = findTier(fields.tier);
  const rows = [
    ["Package", `${tier.name} · ${tier.price}`],
    ["Add-ons", fields.addOns.join(", ")],
    ["Song", fields.songTitle.trim()],
    ["Turnaround", fields.desiredTurnaround],
    ["Files", fields.filesReady ? "Ready to upload" : ""],
  ].filter(([, value]) => value);

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

function StepHeading({ headingRef, children }) {
  return (
    <h3 ref={headingRef} tabIndex={-1} className="text-lg font-bold text-strong outline-none">
      {children}
    </h3>
  );
}

export default function MixMasterForm({ className = "", fileUploadUrl = "" }) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [result, setResult] = useState(null);
  const headingRef = useRef(null);
  const hasMounted = useRef(false);

  const tier = findTier(fields.tier);
  const formattedBody = useMemo(() => formatMixMasterBody(fields), [fields]);
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

  const toggleAddOn = (name) =>
    setFields((previous) => ({
      ...previous,
      addOns: previous.addOns.includes(name)
        ? previous.addOns.filter((item) => item !== name)
        : [...previous.addOns, name],
    }));

  const goNext = () => {
    if (!canContinue(step, fields)) return;
    setStep((current) => Math.min(current + 1, LAST_STEP));
  };

  const copyText = async (text, doneMessage, failMessage) => {
    try {
      await copyTextToClipboard(text);
      setFeedbackMessage(doneMessage);
    } catch {
      setFeedbackMessage(failMessage);
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
      setValidationMessage("Please add your name and email so I can reply.");
      return;
    }

    // Bots fill the hidden field. Pretend it worked and send nothing.
    if (fields.gotcha) {
      setResult({ via: "endpoint" });
      return;
    }

    const cleaned = {
      ...fields,
      name: fields.name.trim(),
      email: fields.email.trim(),
      songTitle: fields.songTitle.trim(),
      referenceLink: normalizeUrl(fields.referenceLink),
      uploadInstructions: fields.uploadInstructions.trim(),
      notes: fields.notes.trim(),
    };

    setIsSubmitting(true);
    setValidationMessage("");
    setFeedbackMessage("");

    const submission = await submitFormWithFallback({
      formType: "mixmaster",
      toEmail: CONTACT_EMAIL,
      subject: SUBJECT,
      fields: {
        name: cleaned.name,
        email: cleaned.email,
        tier: tier.name,
        tierPrice: tier.price,
        tierDetail: tier.detail,
        addOns: cleaned.addOns.join(", "),
        songTitle: cleaned.songTitle,
        desiredTurnaround: cleaned.desiredTurnaround,
        referenceLink: cleaned.referenceLink,
        filesReady: cleaned.filesReady ? "Yes" : "No",
        uploadInstructions: cleaned.uploadInstructions,
        notes: cleaned.notes,
      },
      formattedBody: formatMixMasterBody(cleaned),
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
          {sent ? "Intake received." : "One more step."}
        </h3>
        <p className="text-sm text-strong" role="status">
          {sent ? ENDPOINT_SUCCESS_MESSAGE : MAILTO_FALLBACK_MESSAGE}
        </p>
        <CrystalCard variant="outline" className="p-4">
          <SummaryRows fields={fields} />
        </CrystalCard>
        <p className="text-xs text-muted">
          I’ll review your files, confirm timing, and send next steps. Nothing is charged by sending
          this.
        </p>
        <div className="flex flex-wrap gap-3">
          <GhostButton
            onClick={() =>
              copyText(
                copyPayload,
                "Summary copied.",
                "Copy failed on this browser. You can still send by email.",
              )
            }
          >
            Copy summary
          </GhostButton>
          <GhostButton onClick={startOver}>Start another</GhostButton>
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
                <StepHeading headingRef={headingRef}>Pick a package</StepHeading>
                <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Package">
                  {TIERS.map((option) => {
                    const selected = fields.tier === option.name;
                    return (
                      <button
                        key={option.name}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setField("tier", option.name)}
                        className={`${CHIP_BASE} ${selected ? CHIP_ON : CHIP_OFF}`}
                      >
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="font-semibold text-strong">{option.name}</span>
                          <span className="text-monteGold">{option.price}</span>
                        </span>
                        <span className="mt-1 block text-xs">{option.detail}</span>
                        {option.popular && (
                          <span className="mt-2 block text-[11px] uppercase tracking-wider text-crystal">
                            Most popular
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="space-y-2">
                  <p className="crystal-field-label">Add-ons (optional)</p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Add-ons">
                    {ADD_ONS.map((addOn) => {
                      const selected = fields.addOns.includes(addOn.name);
                      return (
                        <button
                          key={addOn.name}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => toggleAddOn(addOn.name)}
                          className={`${CHIP_BASE} ${selected ? CHIP_ON : CHIP_OFF}`}
                        >
                          {addOn.name} · {addOn.price}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <StepHeading headingRef={headingRef}>Tell me about the song</StepHeading>
                <Field label="Song or project name (optional)" htmlFor="mix-song">
                  <CrystalInput
                    id="mix-song"
                    name="songTitle"
                    value={fields.songTitle}
                    onChange={onText("songTitle")}
                    autoComplete="off"
                  />
                </Field>
                <div className="space-y-2">
                  <p className="crystal-field-label">When do you need it?</p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Turnaround">
                    {TURNAROUNDS.map((option) => {
                      const selected = fields.desiredTurnaround === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setField("desiredTurnaround", selected ? "" : option)}
                          className={`${CHIP_BASE} ${selected ? CHIP_ON : CHIP_OFF}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted">
                    I confirm real timing after I review your files.
                  </p>
                </div>
                <Field label="Reference track link (optional)" htmlFor="mix-reference-link">
                  <CrystalInput
                    id="mix-reference-link"
                    name="referenceLink"
                    type="text"
                    value={fields.referenceLink}
                    onChange={onText("referenceLink")}
                    inputMode="url"
                    autoComplete="url"
                    placeholder="A song that has the sound you want"
                  />
                </Field>
                <Field label="Notes (optional)" htmlFor="mix-notes">
                  <CrystalTextarea
                    id="mix-notes"
                    name="notes"
                    value={fields.notes}
                    onChange={onText("notes")}
                    placeholder="Vibe, what to fix first, anything I should know."
                  />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <StepHeading headingRef={headingRef}>Get me your files</StepHeading>
                <CrystalCard variant="outline" className="space-y-2 border-white/20 p-4">
                  <p className="text-sm font-medium text-strong">What to send</p>
                  <ul className="space-y-1 text-xs text-muted">
                    <li>• Vocals (WAV/AIFF preferred)</li>
                    <li>• Beat (WAV/MP3)</li>
                    <li>• Notes + reference track (optional)</li>
                  </ul>
                  {fileUploadUrl && (
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        className="text-xs text-crystal underline transition hover:text-paperWhite"
                        href={fileUploadUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open upload folder
                      </a>
                      <GhostButton
                        onClick={() =>
                          copyText(
                            fileUploadUrl,
                            "Upload link copied.",
                            "Could not copy the upload link on this browser.",
                          )
                        }
                      >
                        Copy upload link
                      </GhostButton>
                    </div>
                  )}
                </CrystalCard>
                <Field label="Your link or file notes (optional)" htmlFor="mix-upload">
                  <CrystalTextarea
                    id="mix-upload"
                    name="uploadInstructions"
                    value={fields.uploadInstructions}
                    onChange={onText("uploadInstructions")}
                    placeholder="Share a Drive/Dropbox link, or tell me which files are coming."
                  />
                </Field>
                <label className="inline-flex items-center gap-2 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={fields.filesReady}
                    onChange={(event) => setField("filesReady", event.target.checked)}
                    className="h-4 w-4 rounded border border-white/20 bg-ink/80 text-crystal focus:ring-2 focus:ring-crystal/60"
                  />
                  Files are ready and I can upload right away.
                </label>
              </>
            )}

            {step === 3 && (
              <>
                <StepHeading headingRef={headingRef}>Where do I send it back?</StepHeading>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name" htmlFor="mix-name" required>
                    <CrystalInput
                      id="mix-name"
                      name="name"
                      value={fields.name}
                      onChange={onText("name")}
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
                      onChange={onText("email")}
                      required
                      autoComplete="email"
                    />
                  </Field>
                </div>
                {/* Honeypot for spam bots. Hidden from people and assistive tech. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="mix-website">Leave this empty</label>
                  <input
                    id="mix-website"
                    name="_gotcha"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={fields.gotcha}
                    onChange={onText("gotcha")}
                  />
                </div>
                <p className="text-xs text-muted">
                  No account, no payment. I only use your details to reply about this project.
                </p>
              </>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {step > 0 && (
                <GhostButton onClick={() => setStep((current) => current - 1)}>Back</GhostButton>
              )}
              {step < LAST_STEP ? (
                <GhostButton onClick={goNext}>Continue</GhostButton>
              ) : (
                <GhostButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Mix / Master Intake"}
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
            aria-label="Your project"
            className="space-y-3 md:border-l md:border-white/10 md:pl-5"
          >
            <p className="text-[11px] uppercase tracking-wider text-muted">Your project</p>
            <SummaryRows fields={fields} />
            <p className="text-xs text-muted">Sends to {CONTACT_EMAIL}.</p>
          </aside>
        </div>
      </div>
    </CrystalCard>
  );
}
