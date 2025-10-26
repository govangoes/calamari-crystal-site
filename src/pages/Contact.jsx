const formEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

export default function Contact() {
  return (
    <main id="main" tabIndex="-1" className="mx-auto max-w-2xl px-4 py-16 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold">Contact / Bookings</h1>
        <p className="opacity-80">Shows, brand events, press, collabs.</p>
        <p className="text-sm opacity-70">
          Prefer direct email? Reach us at{' '}
          <a className="underline" href="mailto:bookings@govangoes.com">
            bookings@govangoes.com
          </a>
          .
        </p>
      </header>
      <form
        className="space-y-5"
        action={formEndpoint || undefined}
        method="POST"
        onSubmit={(event) => {
          if (formEndpoint) return;
          event.preventDefault();
          const formData = new window.FormData(event.currentTarget);
          const subject = `Booking inquiry from ${formData.get("name") || "GoVanGoes fan"}`;
          const details = [
            `Email: ${formData.get("email") || "(not provided)"}`,
            formData.get("subject") ? `Subject: ${formData.get("subject")}` : null,
            "",
            formData.get("message") || "",
          ]
            .filter(Boolean)
            .join("\n");
          const mailto = `mailto:bookings@govangoes.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;
          window.location.href = mailto;
        }}
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            className="w-full rounded-md border border-white/10 bg-ink/50 px-3 py-3"
            name="name"
            type="text"
            autoComplete="name"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            className="w-full rounded-md border border-white/10 bg-ink/50 px-3 py-3"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="contact-subject">
            Subject
          </label>
          <input
            id="contact-subject"
            className="w-full rounded-md border border-white/10 bg-ink/50 px-3 py-3"
            name="subject"
            type="text"
            autoComplete="organization-title"
            placeholder="Tour stop, brand event, press, etc."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            className="w-full rounded-md border border-white/10 bg-ink/50 px-3 py-3"
            name="message"
            rows="6"
            placeholder="Tell us about the gig or collaboration"
            required
          />
        </div>
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input id="contact-company" name="company" tabIndex="-1" autoComplete="off" />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-ultraviolet px-6 py-3 text-center font-semibold text-paperWhite transition hover:opacity-90"
        >
          Send message
        </button>
        {!formEndpoint && (
          <p className="text-xs text-ink/60 dark:text-paperWhite/60">
            Tip: Until the CRM is connected post-launch, the button opens your email client with the
            details pre-filled.
          </p>
        )}
      </form>
    </main>
  );
}
