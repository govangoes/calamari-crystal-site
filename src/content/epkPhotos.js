// src/content/epkPhotos.js

export const epkHero = {
  title: "Electronic Press Kit",
  tagline: "Wildly influential. Unapologetically different.",
  blurb:
    "GoVanGoes is a rapper, performer, and creative director building a fan-first movement under the Cloutlandish banner. On stage he’s controlled energy—sharp cadences, crowd work, and showmanship that turns a room into a choir. Off stage he’s a systems thinker, producing content and experiences that travel across platforms and events. Bookings include live sets, speaking/hosting, branded content, and private events.",
  contactEmail: "bookings@govangoes.com",
};

// helper so paths with spaces load in <img src="...">
const mk = (path, title, caption) => ({
  src: encodeURI(path),
  title,
  alt: title,
  caption,
});

// FIRST 7 have tailored captions;
// the rest get solid press-safe placeholders. Edit anytime.
export const epkPhotos = [
  mk("/epk/Image-1.jpg", "Live Battle Stage",
     "Commanding the room; high-energy delivery and crowd control."),
  mk("/epk/Image-1 2.jpg", "Backstage – Loyalty",
     "Community first; relationships built on respect and consistency."),
  mk("/epk/Image-1 3.jpg", "On-Set Performance",
     "Shot on a studio stage with full production crew."),
  mk("/epk/Image-1 4.jpg", "Portrait – Dancin’ on Air",
     "Playful confidence; bright, clean portrait."),
  mk("/epk/Image-1 5.jpg", "After-Show Moment",
     "Fan connection and meet-and-greets that last past the stage."),
  mk("/epk/Image-1 6.jpg", "Wedding Dancefloor",
     "Event versatility: bringing showmanship to private bookings."),
  mk("/epk/Image-1 7.jpg", "Home Studio Session",
     "Writing, rehearsing, and recording—where ideas become records."),
  // extras with press-ready placeholders
  mk("/epk/Image-1 8.jpg", "Live Crowd", "Audience energy and engagement."),
  mk("/epk/Image-1 9.jpg", "Stage Profile", "Performance focus and presence."),
  mk("/epk/Image-1 10.jpg", "Behind the Scenes", "Crewed production workflow."),
  mk("/epk/Image-1 11.jpg", "Rehearsal", "Process and preparation."),
  mk("/epk/Image-1 12.jpg", "Meet & Greet", "Community and accessibility."),
  mk("/epk/Image-1 13.jpg", "Studio Detail", "Craft, tone, and texture."),
  mk("/epk/Image-1 14.jpg", "Venue Moment", "Atmosphere and lighting."),
  mk("/epk/Image-1 15.jpg", "Show Close", "Finale moment and crowd response."),
];
