import { useEffect } from "react";
import { Link } from "react-router-dom";
import setSEO from "../utils/seo.js";

const UPDATED = "October 11, 2026";

export default function Terms() {
  useEffect(() => {
    setSEO({
      title: "Terms of Service — GoVanGoes Creative",
      description:
        "How requests, quotes, mix and master packages, and live bookings work with GoVanGoes Creative.",
      url: "https://www.govangoes.com/terms",
      image: "/og-share.png",
      imageAlt: "GoVanGoes logo: a gold G, V and G in a circle",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-16 text-paperWhite/90">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-paperWhite">Terms of Service</h1>
        <p className="text-sm text-muted">Last updated {UPDATED}</p>
      </header>

      <p className="leading-relaxed">
        These terms cover work with GoVanGoes Creative, a one-person business run by Evan Figueroa
        (GoVanGoes) in Oviedo, Florida. By sending a request or paying for a service you agree to
        them. Questions:{" "}
        <a className="underline" href="mailto:govangoes@gmail.com">
          govangoes@gmail.com
        </a>
        .
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">Requests and quotes</h2>
        <p className="leading-relaxed">
          Submitting a form is a request, not a confirmed booking. I review every request by hand
          and reply with a quote and next steps, usually within 24 to 48 hours. A date or job is
          confirmed only when I confirm it in writing. Live events, hosting, and studio guidance are
          quoted per request because date, length, and location change the price. Details for each
          job, including payment timing, cancellations, and refunds, are confirmed in writing when I
          approve your request.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">Mixing and mastering packages</h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            The packages and prices listed on the{" "}
            <Link className="underline" to="/services">
              services page
            </Link>{" "}
            apply per song. Add-ons are priced as listed there.
          </li>
          <li>
            Turnaround times are estimates that depend on file quality and my current queue. I
            confirm timing after I review your files.
          </li>
          <li>
            Revisions are for notes and tweaks, not a full re-mix from scratch. The number of
            revisions depends on the package.
          </li>
          <li>
            You need to send files that are yours to use, or that you have permission to use. You
            keep the rights to your music. I don&rsquo;t take ownership of anything you send me.
          </li>
          <li>
            I don&rsquo;t share or release your files, and I may mention that I worked with you only
            if you agree.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">Live performance and hosting</h2>
        <p className="leading-relaxed">
          Event details, set length, technical needs, travel, and payment are agreed in writing
          before the date is held. Please tell me about venue rules, content limits, and anything
          that affects the show.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">Studio and acoustics guidance</h2>
        <p className="leading-relaxed">
          Studio and acoustics guidance is advice based on my experience with my own studio and
          recording work. It isn&rsquo;t architectural, engineering, or construction design, and it
          doesn&rsquo;t replace licensed professionals or building codes where those apply.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">Payments</h2>
        <p className="leading-relaxed">
          When payment is due, I send a payment link. Cards are processed by Stripe, and I
          don&rsquo;t see your card number.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">Using this site</h2>
        <p className="leading-relaxed">
          The site, its design, text, and music are owned by GoVanGoes unless noted. Please
          don&rsquo;t copy or reuse them without permission. The site is provided as is. I do my
          best to keep it accurate, but prices, availability, and details can change.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">Limits and governing law</h2>
        <p className="leading-relaxed">
          To the extent the law allows, my liability for any job is limited to the amount you paid
          for it. These terms are governed by Florida law. See the{" "}
          <Link className="underline" to="/privacy">
            privacy policy
          </Link>{" "}
          for how your information is handled.
        </p>
      </section>
    </main>
  );
}
