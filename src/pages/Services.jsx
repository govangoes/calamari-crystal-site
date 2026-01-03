import { Link } from "react-router-dom";

export default function Services() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Artist Development for Independent Artists
        </h1>
        <p className="mt-4 text-lg text-ink/80 dark:text-paperWhite/80 max-w-3xl mx-auto">
          Real studio-quality sound. Real strategy. Real growth. If you’re serious
          about your music, you need more than a mix — you need a sound, a
          direction, and a team that gets it.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link className="btn btn-primary" to="/contact">
            Book a Free Call
          </Link>
          <Link className="btn btn-secondary" to="/music">
            Hear the Proof
          </Link>
        </div>
      </header>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Mixing & Mastering",
            desc:
              "Clarity, punch, and loudness that competes on Spotify, Apple Music, YouTube, and the club.",
            best: "Singles • EPs • Albums",
          },
          {
            title: "Vocal Production & Tuning",
            desc:
              "Clean vocals, tight timing, and that industry polish — without killing your style.",
            best: "Hooks • Verses • Harmonies",
          },
          {
            title: "Custom Beats / Production",
            desc:
              "No cookie-cutter beats. We build production around your cadence, vibe, and story.",
            best: "Hip-Hop • R&B • Alternative",
          },
          {
            title: "Songwriting / Ghostwriting",
            desc:
              "Stronger hooks, cleaner verses, better structure — co-write or full ghostwriting under NDA.",
            best: "Artists who want a pen upgrade",
          },
          {
            title: "Studio Setup + Acoustic Panels",
            desc:
              "High-ticket differentiator. We treat your room so your recordings stop sounding cheap.",
            best: "Home studios • Serious creators",
          },
          {
            title: "Packages",
            desc:
              "Artist Development • Home Studio • Release Ready — full solutions, not random services.",
            best: "Best value option",
          },
        ].map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30 p-6 backdrop-blur"
          >
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="mt-3 text-ink/80 dark:text-paperWhite/80">{s.desc}</p>
            <p className="mt-4 text-sm font-semibold opacity-80">
              ✅ Best for: {s.best}
            </p>
            <div className="mt-5">
              <Link className="btn btn-tertiary" to="/contact">
                Learn More / Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-extrabold">Ready to Level Up?</h2>
        <p className="mt-3 text-ink/80 dark:text-paperWhite/80 max-w-2xl mx-auto">
          Book a free call and let’s build the fastest plan to get you to
          industry-ready sound.
        </p>
        <div className="mt-6">
          <Link className="btn btn-primary" to="/contact">
            Book a Free Call
          </Link>
        </div>
      </div>
    </section>
  );
}
