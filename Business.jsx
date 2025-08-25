import React from 'react';

/**
 * Business Plan page
 *
 * This component summarises the key points of the GoVanGoes / Cloutlandish
 * business plan. It is meant to be informative without overwhelming the
 * reader. For more detail, you can link to an external PDF or blog post.
 */
export default function Business() {
  return (
    <main className="pt-20 pb-32 px-6 max-w-6xl mx-auto space-y-16">
      <section className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-crystalCyan mb-4">
          Business &amp; Vision
        </h2>
        <p className="text-opalGlow md:text-lg max-w-3xl mx-auto">
          GoVanGoes operates under Cloutlandish LLC. The mission is to
          entertain, inspire and empower through innovative hip‑hop
          storytelling, immersive performances and multimedia artistry.
        </p>
      </section>
      <section className="space-y-12">
        <div>
          <h3 className="text-2xl font-bold text-paperWhite mb-2">Brand Core</h3>
          <ul className="list-disc pl-5 text-opalGlow/80 space-y-2">
            <li><strong>Tone:</strong> Bold, energetic, passionate, creative</li>
            <li><strong>Mission:</strong> Transform raw talent into generational impact</li>
            <li><strong>Message:</strong> Be yourself. Outrun algorithms. Underdogs rise.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-paperWhite mb-2">Audience</h3>
          <ul className="list-disc pl-5 text-opalGlow/80 space-y-2">
            <li>Primary: confident, stylish women aged 16–34</li>
            <li>Secondary: hip‑hop fans and creative millennials aged 18–45</li>
            <li>Fans are mobile‑first, story‑driven and community oriented</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-paperWhite mb-2">Revenue Streams</h3>
          <ul className="list-disc pl-5 text-opalGlow/80 space-y-2">
            <li>Live performances &amp; private bookings</li>
            <li>Merchandise (streetwear, collectibles, bundles)</li>
            <li>Digital content monetisation (YouTube, Patreon, memberships)</li>
            <li>Digital products (sample packs, beat leases, lyric books)</li>
            <li>Licensing &amp; collaborations</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-paperWhite mb-2">Website Strategy</h3>
          <p className="text-opalGlow/80">
            The official site will serve as a hub for music, merch, tour dates
            and fan engagement. Built with Squarespace (for general content)
            and React (for interactive projects like this one), it will be
            mobile‑first, high contrast and merch‑ready.
          </p>
        </div>
      </section>
    </main>
  );
}