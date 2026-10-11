import { useEffect } from "react";
import BookingForm from "../components/forms/BookingForm.jsx";
import { CONTACT_EMAIL } from "../content/offers.js";
import setSEO from "../utils/seo.js";

export default function Contact() {
  useEffect(() => {
    setSEO({
      title: "Contact — GoVanGoes Creative",
      description:
        "Shows, brand events, press, and collaborations. Request a date or send a message.",
      url: "https://www.govangoes.com/contact",
      image: "/icon-192.png",
      imageAlt: "GoVanGoes icon",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold">Contact / Bookings</h1>
        <p className="mt-2 text-muted">Shows, brand events, press, collabs.</p>
      </header>

      <BookingForm />

      <p className="text-center text-sm text-muted">
        Prefer direct email?{" "}
        <a
          className="text-crystal underline transition hover:text-paperWhite"
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </a>
      </p>
    </section>
  );
}
