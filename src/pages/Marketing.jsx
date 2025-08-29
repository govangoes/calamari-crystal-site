import React from 'react';

/**
 * Marketing Strategy page
 *
 * This page summarises the comprehensive promotion plan for Calamari Crystal.
 * It highlights narrative integration, social campaigns, exclusive incentives
 * and content roll‑out. The information is presented in digestible sections
 * rather than a single long essay.
 */
export default function Marketing() {
  return (
    <main className="pt-20 pb-32 px-6 max-w-6xl mx-auto space-y-16">
      <section className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-crystalCyan mb-4">
          Marketing &amp; Roll‑Out
        </h2>
        <p className="text-opalGlow md:text-lg max-w-3xl mx-auto">
          Our campaign focuses on story‑driven engagement rather than big‑budget
          advertising. Every post, video and merch drop fits into the Calamari
          Crystal saga, inviting fans to play along and unravel the mystery.
        </p>
      </section>
      <section className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-paperWhite mb-2">
            Narrative Integration
          </h3>
          <p className="text-opalGlow/80">
            The revenge/treasure story infuses every channel — visuals, captions,
            videos and live events. Using consistent motifs (squid, crystal,
            crowns, maps) across platforms makes the album instantly
            recognisable and builds an immersive world fans want to explore.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-paperWhite mb-2">Social Media Quests</h3>
          <p className="text-opalGlow/80">
            Before release we’ll run a digital treasure hunt on Instagram and
            TikTok. Cryptic clues, codes and lyric fragments will lead fans to
            secret snippets and early merch discounts. Participation unlocks
            exclusive content and encourages organic sharing via the
            #CalamariCrystalQuest hashtag.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-paperWhite mb-2">Exclusive Incentives</h3>
          <p className="text-opalGlow/80">
            Incentivise pre‑saves and email signups with unreleased tracks,
            discount codes and limited merch. For example, pre‑save the album to
            receive a bonus song or enter a raffle for a crystal necklace.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-paperWhite mb-2">Content Roll‑Out</h3>
          <p className="text-opalGlow/80">
            Leading up to launch, we’ll release an animated teaser trailer,
            lyric visualisers for key tracks, behind‑the‑scenes vlogs and
            tongue‑in‑cheek “Captain’s Log” shorts. After release, additional
            videos and live Q&amp;As will keep the momentum going.
          </p>
        </div>
      </section>
    </main>
  );
}