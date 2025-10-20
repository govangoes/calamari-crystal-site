// src/content/epkPhotos.js

export const epkHero = {
  title: "Electronic Press Kit",
  tagline: "Wildly influential. Unapologetically different.",
  blurb:
    "GoVanGoes is a rapper, performer, and creative director building a fan-first movement under the Cloutlandish banner. On stage he’s controlled energy—sharp cadences, crowd work, and showmanship that turns a room into a choir. Off stage he’s a systems thinker, producing content and experiences that travel across platforms and events. Bookings include live sets, speaking/hosting, branded content, and private events.",
  contactEmail: "bookings@govangoes.com",
};

// helper so paths with spaces load in <img src="...">
const mk = (path, title, caption, extra = {}) => ({
  src: encodeURI(path),
  title,
  alt: title,
  caption,
  ...extra,
});

// FIRST 7 have tailored captions;
// the rest get solid press-safe placeholders. Edit anytime.
export const epkPhotos = [
  mk(
    "/epk/Image-1.jpg",
    "Networking with Orlando's Finest!",
    "Meeting MyVerse was one of those moments that reminded me why I fell in love with hip-hop in the first place. She carries herself with the same authenticity she puts in her bars — confident, grounded, and unapologetically real. Hearing her speak about her craft and seeing her energy up close was more than just inspiring; it was a reminder that lyricism, presence, and purpose still matter. For someone like me who's been building a path through wordplay, storytelling, and self-expression, connecting with her felt like crossing paths with a reflection of what's possible when you stay true to your art.",
  ),
  mk(
    "/epk/Image-1 2.jpg",
    "Orlando's Rich Hip-hop History and Longest Running Open Mic Night",
    "Building my network started right at the heart of Orlando's hip-hop scene — Austin's Coffee, home to the city's longest-running open mic night. That spot wasn't just a stage; it was a crossroads of generations, where battle rappers, poets, and producers came together to keep the culture alive. I learned early on that showing up consistently, supporting other artists, and sharing the mic built real relationships that no algorithm could match. Orlando's rich hip-hop history — from underground cyphers to legendary showcases — gave me the foundation to connect with veterans and newcomers alike, shaping both my sound and my purpose as an artist. Both RC Sniper [pictured center] and Arkay [pictured far left] are knit into the fabric of Florida's music scene.",
  ),
  mk(
    "/epk/Image-1 3.jpg",
    "Bodied with BearArmz",
    "Seeing Bodied in theaters was a defining moment for me — not just as a fan of battle rap, but as someone who lived and breathed the culture. Watching a film that captured the raw art, intellect, and contradictions of the scene hit differently when you're sitting beside BearArmz, Orlando's best battle league. The energy in that theater felt like a cipher in motion — bars being traded, pride on the line, truth wrapped in wordplay. That night reminded me that battle rap isn't just competition; it's identity, expression, and resilience. It reshaped how I saw my own voice in the culture — not just as a participant, but as part of a living legacy.",
  ),
  mk(
    "/epk/Image-1 4.jpg",
    "Performing in Philly",
    "Performing in Philadelphia was more than just another show — it was a homecoming. Being back in the city where my story began grounded me in a way that no other stage could. Every verse, every reaction from the crowd felt like a dialogue with my roots — with the streets, sounds, and spirit that shaped me. Philly has a rhythm and honesty all its own, and reconnecting with that energy reminded me why I started making music in the first place. It wasn't just about performing; it was about coming full circle, paying respect to the culture that raised me, and leaving my mark where it all began.",
  ),
  mk(
    "/epk/Image-1 5.jpg",
    "Battle with Wellz",
    "The Maskoraid Halloween Battle was one for the books — a night where creativity, confidence, and control all collided under the lights. Facing off against Wellz, I brought not just bars, but a full performance — energy, timing, and precision that captivated the crowd from start to finish. Every scheme landed, every punchline hit with purpose, and the momentum never left my side. What made it special wasn't just the victory, but how it showcased growth, strategy, and showmanship at the highest level. The battle wasn't just about winning — it was about cementing presence and proving that preparation and passion always prevail.",
    {
      captionLink: {
        href: "https://www.youtube.com/watch?v=jPFbWg7ZaxU&list=PLD6OGT-EJ7Nzw1Uab4rhAHXE1LRVwVZMG&index=3",
        label: "Watch the battle",
      },
    },
  ),
  mk(
    "/epk/Image-1 6.jpg",
    "Battle with Wellz pt. 2",
    "The Maskoraid Halloween Battle wasn't just a win — it was an evolution. That night, I didn't just perform; I transformed. Every bar, every setup, every punchline was delivered with surgical control and cinematic flair. That's when the comparison clicked — I became the Christian Bale of Ginger Ale: calm, collected, unpredictable, and committed to the role until the very end. It wasn't about ego; it was about embodying the art — balancing intensity with precision and showing that versatility and presence can turn a battle into a performance worth remembering.",
    {
      captionLink: {
        href: "https://www.youtube.com/watch?v=jPFbWg7ZaxU&list=PLD6OGT-EJ7Nzw1Uab4rhAHXE1LRVwVZMG&index=3",
        label: "Watch the battle",
      },
    },
  ),
  mk(
    "/epk/Image-1 7.jpg",
    "Battle with DJ  Lirix",
    "My first battle with DJ Lirix marked the moment I knew I belonged in the ring. The crowd came expecting a back-and-forth — but what they got was a masterclass in precision, delivery, and composure. Every punchline landed with purpose, every rebuttal hit its mark, and by the end of the night, the outcome spoke for itself. That battle became a turning point not just for me, but for him — because after that performance, DJ Lirix hung up his battle mic and took his talents to the turntables. It was more than a debut; it was a statement that sometimes, when passion meets preparation, history writes itself.",
    {
      captionLink: {
        href: "https://www.youtube.com/watch?v=-eVH5KxUy_M&list=PLD6OGT-EJ7Nzw1Uab4rhAHXE1LRVwVZMG&index=5",
        label: "Watch the battle",
      },
    },
  ),
  // extras with press-ready placeholders
  mk(
    "/epk/Image-1 8.jpg",
    "Another Hometown Performance",
    "Open mics are the heartbeat of hip-hop culture — the training ground, the proving ground, and the community hub all in one. They give artists a place to sharpen their craft, test new material, and build real connections that can't happen through screens. Spaces like these remind us that hip-hop was built on presence, participation, and passion. Supporting open mics also means supporting the small businesses that host them — the cafés, lounges, and local venues that keep the doors open for art to thrive. When we show up, buy a drink, tip the barista, and applaud the next emcee, we're not just keeping culture alive — we're investing in it.",
  ),
  mk(
    "/epk/Image-1 9.jpg",
    "Battle with DJ Lirix pt. 2",
    "My battle debut against DJ Lirix set the tone for everything that came after. The energy in the room was raw — a crowd ready to witness something new, something real. I stepped on that stage with hunger, focus, and a point to prove. Lirix came prepared, but I came with purpose — every bar sharpened, every delivery calculated. When the final round ended, the shift was undeniable. That performance didn't just earn respect — it changed trajectories. DJ Lirix retired from the battle scene soon after, transitioning to a new lane behind the decks. It was the kind of night that reminded everyone watching that hip-hop rewards the fearless.",
  ),
  mk(
    "/epk/Image-1 10.jpg",
    "Paying Homage to the Greats",
    "Meeting Hollow Da Don was a pivotal chapter in my battle rap journey — a moment that shifted how I viewed not just the art form, but myself within it. Hollow's balance of intellect, performance, and authenticity set a blueprint for what greatness in battle rap looks like. The conversations we had, the gems he dropped, and simply observing his mindset gave me a new perspective on preparation, control, and creative evolution. That encounter didn't just influence my pen — it reshaped my entire approach to artistry, performance, and purpose.",
  ),
  mk(
    "/epk/Image-1 11.jpg",
    "Putting in Work Behind the Scenes",
    "Before stepping into the ring for my first battle, I spent countless nights behind the camera — known around the scene as Camera Man Van. I was the one capturing every punchline, reaction, and moment that defined Orlando's underground movement. Working behind the lens gave me a front-row seat to the craft, letting me study delivery, crowd control, and structure from some of the best doing it. Those experiences shaped my perspective and discipline long before I ever grabbed the mic. By the time I finally stepped into the spotlight, I wasn't just another battler — I was someone who had studied the game frame by frame.",
  ),
  mk(
    "/epk/Image-1 12.jpg",
    "Dancin' On Air",
    "Being part of Dancin’ On Air was one of those early experiences that planted the seed of confidence in me. It showed me what it felt like to be in front of a camera, to perform with energy, and to connect with an audience through movement and presence. Seeing how much work went into every second on screen — from rehearsals to timing to teamwork — made me realize that success isn’t luck; it’s discipline. That opportunity opened my eyes to the professionalism and persistence it takes to turn creativity into a career, and it became a spark that’s driven me to keep pushing, performing, and perfecting my craft ever since.",
  ),
  mk(
    "/epk/Image-1 13.jpg",
    "Couldn't Do It Without the Team",
    "Artistry might be a personal journey, but I'd be lost without my team — especially my wife. Every idea, performance, and project has her fingerprints on it, whether it's creative direction, emotional grounding, or straight-up belief when I start doubting myself. She's the quiet force that keeps the machine running, the balance between chaos and clarity. In a world where everyone's chasing spotlight, she reminds me what really matters: the mission, the family, and the love that fuels it all. Here we are pictured with our first $100 we made from an event we hosted.",
  ),
  mk(
    "/epk/Image-1 14.jpg",
    "Performance Artistry",
    "Performance is everything in hip-hop — it's how you connect, command, and communicate energy without saying a word. Whether it's rocking a stage or engaging with people off it, performance defines presence. I live it every day — on stage, in the studio, or in conversation — because every moment is a chance to leave an impression. Hip-hop isn't just about what you say, it's about how you make people feel when you say it. I'm always performing — not pretending — but showing up with purpose, authenticity, and intent.",
  ),
  mk(
    "/epk/Image-1 15.jpg",
    "Out the Mud",
    "I came from nothing — no shortcuts, no handouts, just vision and grind. Everything I have today was built from scratch: the skills, the sound, the brand, the movement. There were no blueprints, only belief and consistency. That climb from the bottom taught me resilience, patience, and purpose — the kind of lessons you can't fake or skip. It's exactly why I'll succeed — because I've already proven I can build something out of nothing.",
  ),
];
