import { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Contact() {
  useEffect(() => {
    setSEO({
      title: "Contact — GoVanGoes",
      description: "Get in touch for bookings and collaborations.",
      image: "https://govangoes.com/images/og.jpg",
      url: "https://govangoes.com/contact",
    });
  }, []);
  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold">Contact / Bookings</h1>
        <p className="opacity-80 mt-2">Shows, brand events, press, collabs.</p>
      </header>
      <form className="space-y-4" action="https://formspree.io/f/your-id-here" method="POST">
        <input className="w-full p-3 rounded border border-border bg-surface text-text" name="name" placeholder="Your name" required />
        <input className="w-full p-3 rounded border border-border bg-surface text-text" name="email" type="email" placeholder="Email" required />
        <input className="w-full p-3 rounded border border-border bg-surface text-text" name="subject" placeholder="Subject" />
        <textarea className="w-full p-3 rounded border border-border bg-surface text-text h-32" name="message" placeholder="Tell us about the gig/collab" />
        <button className="btn-primary">Send</button>
      </form>
      <p className="opacity-60 text-sm text-center">Or email: hello@govangoes.com</p>
    </section>
  );
}
