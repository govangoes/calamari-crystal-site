import React from 'react';

/**
 * Contact page
 *
 * Contains quick links to social platforms and a simple call‑to‑action for
 * fans to join the mailing list. Replace the placeholder form with a
 * functional integration (e.g. Mailchimp) as needed.
 */
export default function Contact() {
  return (
    <main className="pt-20 pb-32 px-6 max-w-4xl mx-auto space-y-12">
      <section className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-crystalCyan mb-4">
          Connect &amp; Join
        </h2>
        <p className="text-opalGlow md:text-lg max-w-2xl mx-auto">
          Follow GoVanGoes across the web and join the crew for hidden tracks,
          treasure hunt clues and merch drops.
        </p>
      </section>
      <section className="flex flex-col items-center space-y-4">
        <ul className="space-y-2 text-center">
          <li>
            <a
              href="https://tiktok.com/@govangoes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crystalCyan hover:underline"
            >
              TikTok → tiktok.com/@govangoes
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/govangoes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crystalCyan hover:underline"
            >
              Instagram → instagram.com/govangoes
            </a>
          </li>
          <li>
            <a
              href="https://youtube.com/@govangoes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crystalCyan hover:underline"
            >
              YouTube → youtube.com/@govangoes
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/govangoes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crystalCyan hover:underline"
            >
              Twitter/X → twitter.com/govangoes
            </a>
          </li>
          <li>
            <a
              href="https://bere.al/govangoes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crystalCyan hover:underline"
            >
              BeReal → bere.al/govangoes
            </a>
          </li>
        </ul>
        <div className="w-full max-w-md mt-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center space-y-4"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-lg bg-richBlack/50 border border-opalGlow/20 text-paperWhite placeholder-opalGlow/50 focus:outline-none focus:ring-2 focus:ring-crystalCyan"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-crystalCyan text-richBlack font-semibold hover:bg-crystalCyan/80 transition"
            >
              Join the Crew
            </button>
          </form>
          <p className="mt-3 text-sm text-opalGlow/60 text-center">
            We respect your inbox. Expect occasional updates with treasure hunt
            clues and exclusive content.
          </p>
        </div>
      </section>
    </main>
  );
}