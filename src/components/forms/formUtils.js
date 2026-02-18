const clean = (value) => (value && value.trim() ? value.trim() : "");

export const FORM_ENDPOINT = clean(import.meta.env.VITE_FORM_ENDPOINT);

const PLACEHOLDER_VALUES = new Set([
  "replace_with_form_endpoint",
  "replace_with_endpoint",
  "your-endpoint",
  "your_endpoint",
]);

function isConfiguredValue(value) {
  const normalized = clean(value).toLowerCase();
  return Boolean(normalized) && !PLACEHOLDER_VALUES.has(normalized);
}

function buildMailtoUrl({ toEmail, subject, body }) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${toEmail}?subject=${encodedSubject}&body=${encodedBody}`;
}

function openMailClient(url) {
  window.location.href = url;
}

export async function copyTextToClipboard(text) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "readonly");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  document.body.removeChild(helper);
}

export async function submitFormWithFallback({
  formType,
  toEmail,
  subject,
  fields,
  formattedBody,
}) {
  const mailtoUrl = buildMailtoUrl({ toEmail, subject, body: formattedBody });

  if (isConfiguredValue(FORM_ENDPOINT)) {
    try {
      const response = await globalThis.fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          subject,
          toEmail,
          fields,
          formattedBody,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        return { via: "endpoint" };
      }
    } catch {
      // Fall through to mailto fallback.
    }
  }

  openMailClient(mailtoUrl);
  return { via: "mailto" };
}
