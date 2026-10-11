import { useEffect } from "react";
import setSEO from "../utils/seo.js";

const UPDATED = "October 11, 2026";

export default function Privacy() {
  useEffect(() => {
    setSEO({
      title: "Privacy Policy — GoVanGoes Creative",
      description:
        "What GoVanGoes Creative collects through this website, why, and who handles it.",
      url: "https://www.govangoes.com/privacy",
      image: "/og-share.png",
      imageAlt: "GoVanGoes logo: a gold G, V and G in a circle",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-16 text-paperWhite/90">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-paperWhite">Privacy Policy</h1>
        <p className="text-sm text-muted">Last updated {UPDATED}</p>
      </header>

      <p className="leading-relaxed">
        GoVanGoes Creative is a one-person business run by Evan Figueroa (GoVanGoes) in Oviedo,
        Florida. This page explains what this website collects and what happens to it. Questions or
        requests:{" "}
        <a className="underline" href="mailto:govangoes@gmail.com">
          govangoes@gmail.com
        </a>
        .
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">What you send me</h2>
        <p className="leading-relaxed">
          If you use the booking, mix and master, or contact forms, I receive what you type into
          them: your name, email, the details of your request, and any link or note you add. I use
          it to reply to you, give a quote, and do the work you asked for. The forms are delivered
          to me by a form service (Formspree), and if a form can&rsquo;t send, the page opens your
          own email app with the message filled in instead.
        </p>
        <p className="leading-relaxed">
          Audio files you send for mixing and mastering are used only for that job. I don&rsquo;t
          release, sell, or share them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">What the site collects on its own</h2>
        <p className="leading-relaxed">
          The site includes Plausible Analytics, a privacy-focused tool that counts visits and shows
          which pages and links bring people here. Plausible says it doesn&rsquo;t use cookies or
          collect personal data. I don&rsquo;t use advertising trackers.
        </p>
        <p className="leading-relaxed">
          The booking page shows which dates are taken by reading my calendar. It only shows whether
          a day is booked, never who or what the booking is.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">Other companies involved</h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            <strong>Vercel</strong> hosts the site and sees standard server logs, such as IP
            addresses, when you load a page.
          </li>
          <li>
            <strong>Formspree</strong> delivers form submissions to me.
          </li>
          <li>
            <strong>Stripe</strong> handles card payments when I send you a payment link. I
            don&rsquo;t see or store your card number.
          </li>
          <li>
            <strong>YouTube and Spotify</strong> may set their own cookies if you play an embedded
            video or track. Their policies apply to that.
          </li>
          <li>
            <strong>Links to other sites</strong> (press features, music services, social profiles)
            are governed by those sites&rsquo; policies.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">How long I keep things</h2>
        <p className="leading-relaxed">
          I keep emails and files for as long as I need them to do the work, answer follow-up
          questions, and keep basic business records. You can ask me to delete what you sent and
          I&rsquo;ll do it, except for records I&rsquo;m required to keep, such as invoices.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">Your choices</h2>
        <p className="leading-relaxed">
          Email me to see, correct, or delete what I have about you, or to stop hearing from me.
          This site is for adults and businesses and isn&rsquo;t aimed at children under 13.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-paperWhite">Changes</h2>
        <p className="leading-relaxed">If this changes, the date at the top changes with it.</p>
      </section>
    </main>
  );
}
