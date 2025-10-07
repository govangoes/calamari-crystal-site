import { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Contact() {
  useEffect(() => {
    setSEO({
      title: "Contact & Bookings — GoVanGoes",
      description:
        "Book GoVanGoes for shows, brand activations, and press. Submit your event details to receive our stage specs and EPK.",
      url: "https://govangoes.com/contact",
      image: "/og.jpg",
      imageAlt: "GoVanGoes live performance",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <section className="max-w-2xl mx-auto space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold">Contact / Bookings</h1>
        <p className="opacity-80 mt-2">Shows, brand events, press, collabs.</p>
        <p className="text-sm text-paperWhite/60">
          Share as much detail as possible—our team replies within two business days with availability, tech rider, and
          tailored concepts.
        </p>
      </header>
      <form
        className="space-y-4"
        action="https://formsubmit.co/hello@govangoes.com"
        method="POST"
        target="_blank"
      >
        <input type="hidden" name="_subject" value="New GoVanGoes Booking Inquiry" />
        <input type="hidden" name="_captcha" value="false" />
        <input
          className="w-full p-3 rounded bg-ink/50 border border-white/10"
          name="name"
          placeholder="Your name"
          required
          aria-label="Name"
        />
        <input
          className="w-full p-3 rounded bg-ink/50 border border-white/10"
          name="email"
          type="email"
          placeholder="Email"
          required
          aria-label="Email"
        />
        <input
          className="w-full p-3 rounded bg-ink/50 border border-white/10"
          name="company"
          placeholder="Company / Organization"
          aria-label="Company or organization"
        />
        <input
          className="w-full p-3 rounded bg-ink/50 border border-white/10"
          name="event_date"
          type="date"
          aria-label="Event date"
        />
        <textarea
          className="w-full p-3 rounded bg-ink/50 border border-white/10 h-36"
          name="message"
          placeholder="Tell us about the gig, activation, or collaboration goals"
          aria-label="Message"
          required
        />
        <label className="flex items-start gap-3 text-sm text-paperWhite/70">
          <input type="checkbox" name="epk" value="Yes" className="mt-1" />
          Send me the latest EPK & stage plot PDF
        </label>
        <button className="px-5 py-3 rounded bg-ultraviolet text-paperWhite hover:opacity-90">Send</button>
      </form>
      <div className="space-y-3 text-center text-sm text-paperWhite/70">
        <p>
          Prefer email? Reach us directly at <a className="underline" href="mailto:hello@govangoes.com">hello@govangoes.com</a>.
        </p>
        <p>
          Join the crew newsletter for early ticket drops and lore clues: <a className="underline" href="https://govangoes.com/news">govangoes.com/news</a>
        </p>
      </div>
    </section>
  );
}
