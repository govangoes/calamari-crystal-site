// src/content/epkPhotos.js

export const epkHero = {
  title: "Electronic Press Kit",
  tagline: "Wildly influential. Unapologetically different.",
  blurb:
    "GoVanGoes is a rapper, performer, and creative director building a fan-first movement under the Cloutlandish banner. On stage he's controlled energy—sharp cadences, crowd work, and showmanship that turns a room into a choir. Off stage he's a systems thinker, producing content and experiences that travel across platforms and events. Bookings include live sets, speaking/hosting, branded content, and private events.",
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

// Only images that exist in public/epk/ (Image-1 4.webp, Image-1 12.webp, Image-1 13.webp)
export const epkPhotos = [
  mk(
    "/epk/Image-1 4.webp",
    "Performing in Philly",
    "Performing in Philadelphia was more than just another show — it was a homecoming. Being back in the city where my story began grounded me in a way that no other stage could. Every verse, every reaction from the crowd felt like a dialogue with my roots — with the streets, sounds, and spirit that shaped me. Philly has a rhythm and honesty all its own, and reconnecting with that energy reminded me why I started making music in the first place. It wasn't just about performing; it was about coming full circle, paying respect to the culture that raised me, and leaving my mark where it all began.",
  ),
  mk(
    "/epk/Image-1 12.webp",
    "Dancin' On Air",
    "Being part of Dancin' On Air was one of those early experiences that planted the seed of confidence in me. It showed me what it felt like to be in front of a camera, to perform with energy, and to connect with an audience through movement and presence. Seeing how much work went into every second on screen — from rehearsals to timing to teamwork — made me realize that success isn't luck; it's discipline. That opportunity opened my eyes to the professionalism and persistence it takes to turn creativity into a career, and it became a spark that's driven me to keep pushing, performing, and perfecting my craft ever since.",
  ),
  mk(
    "/epk/Image-1 13.webp",
    "Couldn't Do It Without the Team",
    "Artistry might be a personal journey, but I'd be lost without my team — especially my wife. Every idea, performance, and project has her fingerprints on it, whether it's creative direction, emotional grounding, or straight-up belief when I start doubting myself. She's the quiet force that keeps the machine running, the balance between chaos and clarity. In a world where everyone's chasing spotlight, she reminds me what really matters: the mission, the family, and the love that fuels it all. Here we are pictured with our first $100 we made from an event we hosted.",
  ),
];
