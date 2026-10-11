import { useEffect } from "react";
import BookingForm from "../components/forms/BookingForm.jsx";
import { CONTACT_EMAIL } from "../content/offers.js";
import setSEO from "../utils/seo.js";

export default function Bookings() {
  useEffect(() => {
    setSEO({
      title: "Bookings — GoVanGoes",
      description: "Shows, brand events, press, and collaborations.",
      url: "https://www.govangoes.com/bookings",
      image: "/icon-192.png",
      imageAlt: "GoVanGoes icon",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-16">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Book GoVanGoes</h1>
        <p className="mt-3 text-paperWhite/80">
          Shows, weddings, parties, hosting, brand events, and collaborations.
        </p>
      </header>

      <BookingForm />

      <p className="text-center text-sm text-muted">
        Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </main>
  );
}
