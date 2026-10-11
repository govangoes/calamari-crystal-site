// Studio tour copy. Steps follow the real signal path in the studio, mic to monitors.
// Keep gear names accurate: this is what clients read before they hire.
export const STUDIO_TOUR_HEADER = {
  title: "Inside the studio",
  subtitle:
    "This is where your vocals get recorded and your mix gets made. Follow the signal from the mic to the monitors.",
};

export const STUDIO_TOUR_STEPS = [
  {
    id: "mic",
    title: "The mic",
    gear: "Shure SM7B in a collapsible vocal booth",
    detail:
      "A dynamic mic that hears the voice in front of it and not much else. The booth wraps behind it to cut down room sound.",
    outcome: "Vocals come in dry and close, so there's less room sound to fix later.",
  },
  {
    id: "boost",
    title: "The boost",
    gear: "Cloudlifter",
    detail:
      "The SM7B is a quiet mic. The Cloudlifter adds clean gain before the interface so nothing has to be cranked later.",
    outcome: "Quiet verses and loud hooks both land with headroom and less hiss.",
  },
  {
    id: "interface",
    title: "The interface",
    gear: "Antelope Audio Zen Go Synergy Core, Mogami Gold XLR cables",
    detail: "This is where the mic signal turns into digital audio, over balanced cables.",
    outcome: "A clean recording to build the mix on.",
  },
  {
    id: "session",
    title: "The session",
    gear: "Mac Studio (M4 Max) running Logic Pro, Samsung Odyssey G95SC ultrawide",
    detail:
      "Arrangement, vocals, references and meters sit on one wide screen. Big sessions don't slow the machine down.",
    outcome: "Edits and revisions move fast.",
  },
  {
    id: "check",
    title: "The check",
    gear: "Adam Audio T7 monitors, DT770 Studio and Samson Z55 headphones",
    detail: "Every mix gets checked on speakers and on two pairs of headphones before it goes out.",
    outcome: "Fewer surprises when you play it somewhere else.",
  },
];
