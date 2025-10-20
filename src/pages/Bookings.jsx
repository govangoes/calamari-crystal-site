import { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Bookings() {
  useEffect(() => {
    setSEO({
      title: "Bookings — GoVanGoes",
      description: "Shows, brand events, press, and collaborations.",
      url: "https://govangoes.com/bookings",
      image: "/og.jpg",
      imageAlt: "GoVanGoes crest",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">Bookings</h1>
      <p className="mt-3 text-paperWhite/80">For shows, brand events, press, and collaborations.</p>
      <p className="mt-6">Email: hello@govangoes.com</p>
    </main>
  );
}
