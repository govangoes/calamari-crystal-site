// One source of truth for what GoVanGoes Creative offers.
// Used by the Home page and the Services page so they never disagree.
//
// Honesty rules for this file:
// - No invented clients, reviews, counts, or prices. Only claims Evan has made himself.
// - Tier 1 and Tier 3 have no public prices yet. Those are quoted per request.
// - Mix & master prices live on the Services page (they were already public).

export const BRAND = {
  artist: "GoVanGoes",
  company: "GoVanGoes Creative",
  location: "Oviedo, FL",
  tagline: "Sound good. Look official. Move different.",
};

export const SERVICE_TIERS = [
  {
    id: "live",
    icon: "Mic",
    eyebrow: "Live & Events",
    title: "Perform and host",
    summary:
      "Live performance, hosting, and appearances for the nights people remember: showcases, clubs, private events, and brand events.",
    includes: [
      "Live performance sets",
      "Performances at birthdays, graduations, and private events",
      "Hosting and MC for showcases, open mics, and brand events",
      "Meet-and-greets and appearances",
    ],
    bestFor: "Showcases • Clubs and bars • Private events • Community and brand events",
    howItWorks:
      "Pick a service, date, and time in the booking form. I check the date, then reply with a clear quote and next steps.",
    cta: { label: "Check a date", to: "/bookings" },
  },
  {
    id: "audio",
    icon: "Sliders",
    eyebrow: "Audio Post-Production",
    title: "Mix, master, and polish",
    summary:
      "Remote mixing, mastering, and vocal production with a guided process, clear revisions, and notes welcome.",
    includes: [
      "Mix + master in three packages",
      "Vocal cleanup and light tuning",
      "Custom production built around your cadence and references",
      "Creator and podcast audio cleanup, quoted per project",
    ],
    bestFor: "Singles • EPs • Albums • Creators who need clean audio",
    howItWorks:
      "Send your files, I review them and confirm timing, then you get your mix with revisions for notes and tweaks. Delivery is remote.",
    cta: { label: "Start a mix", to: "/#mixmaster" },
  },
  {
    id: "studio",
    icon: "Speaker",
    eyebrow: "Studio & Acoustics",
    title: "Make your room translate",
    summary:
      "Practical guidance for home studios and creator spaces so what you record sounds right outside the room, too.",
    includes: [
      "Room assessment and treatment guidance",
      "Home studio setup advice",
      "Honest recommendations that fit your space and budget",
    ],
    bestFor: "Home studios • Serious creators",
    howItWorks:
      "Limited availability. Tell me about your room and goals, and I'll let you know if it's a fit and what a consult would look like.",
    cta: { label: "Ask about your room", to: "/contact" },
  },
];

export const BOOKING_STEPS = [
  {
    title: "Send a request",
    detail: "Pick the service, date, and time. Dates that are already taken are crossed out.",
  },
  {
    title: "I review it",
    detail: "I check the date and reply by email, usually within 24–48 hours.",
  },
  {
    title: "Get a clear quote",
    detail: "You get pricing and next steps in writing before anything is locked in.",
  },
  {
    title: "Show up or send files",
    detail: "Live events happen on the day. Audio projects are delivered remotely.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Is the booking form a confirmed booking?",
    answer:
      "No. It's a request. I review every one by hand, check the date, and reply with a quote and next steps.",
  },
  {
    question: "How fast will I hear back?",
    answer: "Usually within 24–48 hours, by email.",
  },
  {
    question: "The date I want is crossed out. What now?",
    answer:
      "That day is already taken. Pick another date, or email me if your plans are flexible and we'll see what's possible.",
  },
  {
    question: "My event is longer than 12 hours or spans more than one day.",
    answer:
      "Choose the longest option in the form and say so in the notes. I'll build the quote around it.",
  },
  {
    question: "Do you DJ weddings or run full DJ packages?",
    answer:
      "Not yet. For now I perform, host, and make appearances. DJ and wedding packages are planned, so email me if you have something specific in mind.",
  },
  {
    question: "Do you mix and master remotely?",
    answer:
      "Yes. Send your files, I review them and confirm timing, and delivery is remote. Revisions are for notes and tweaks, not a full re-mix from scratch.",
  },
  {
    question: "What does it cost?",
    answer:
      "Mix and master packages are listed on this page. Live events and room consults are priced per request because date, length, and location change the quote.",
  },
];
