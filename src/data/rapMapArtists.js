export const rapMapArtists = [
  {
    id: "mfdoom",
    name: "MF DOOM",
    alias: "Metal Face",
    origin: "London -> NYC",
    era: "1999-2010s",
    role: "Villain Architect",
    summary:
      "Masked icon whose multi-layered rhyme schemes, aliases, and comic-book mythology shaped the underground renaissance.",
    highlights: ["Dense internal rhymes", "Alter egos & lore", "Off-kilter cadence"],
    bars: [
      "No gimmicks, no masks -- just raw craft.",
      "Villainy with a velvet tongue and crooked smile.",
    ],
    metrics: [
      { label: "Unique words (beta)", value: "6.2k" },
      { label: "Lexical density", value: "0.71" },
      { label: "Influence index", value: "92" },
    ],
    x: 22,
    y: 58,
  },
  {
    id: "nas",
    name: "Nas",
    alias: "Nasty",
    origin: "Queens, NYC",
    era: "1994-present",
    role: "Street Laureate",
    summary:
      "Storytelling architect with vivid cityscapes, tight cadence control, and a deep catalog of narrative detail.",
    highlights: ["Narrative detail", "Street reportage", "Legacy catalog"],
    bars: [
      "City lights cut through the haze, pen on parade.",
      "Stories stitched in neon, truth in every page.",
    ],
    metrics: [
      { label: "Unique words (beta)", value: "6.8k" },
      { label: "Lexical density", value: "0.69" },
      { label: "Influence index", value: "88" },
    ],
    x: 38,
    y: 34,
  },
  {
    id: "outkast",
    name: "OutKast",
    alias: "ATLiens",
    origin: "Atlanta, GA",
    era: "1994-2010s",
    role: "Futurist Duo",
    summary:
      "Genre-hopping storytellers blending Southern funk, sci-fi motifs, and wildword cadences.",
    highlights: ["Southern surrealism", "Experimental hooks", "Double-vision flows"],
    bars: [
      "Basslines in orbit, two voices in flight.",
      "Southern constellations, rhyme into the night.",
    ],
    metrics: [
      { label: "Unique words (beta)", value: "6.5k" },
      { label: "Lexical density", value: "0.67" },
      { label: "Influence index", value: "85" },
    ],
    x: 58,
    y: 24,
  },
  {
    id: "lauryn",
    name: "Lauryn Hill",
    alias: "L-Boogie",
    origin: "South Orange, NJ",
    era: "1996-present",
    role: "Soul Scribe",
    summary:
      "Singer-rapper with razor-sharp delivery, spiritual depth, and timeless cultural impact.",
    highlights: ["Soulful cadence", "Moral clarity", "Hybrid vocal flow"],
    bars: [
      "Harmony in the syllables, truth on the tongue.",
      "Grace in the cadence, the sermon gets sung.",
    ],
    metrics: [
      { label: "Unique words (beta)", value: "5.4k" },
      { label: "Lexical density", value: "0.73" },
      { label: "Influence index", value: "90" },
    ],
    x: 64,
    y: 64,
  },
  {
    id: "kendrick",
    name: "Kendrick Lamar",
    alias: "K-Dot",
    origin: "Compton, CA",
    era: "2010-present",
    role: "Modern Oracle",
    summary:
      "Concept-driven lyricist weaving personal narrative, social critique, and razor-sharp rhyme pockets.",
    highlights: ["Concept albums", "Character voices", "Social commentary"],
    bars: [
      "Mirror talk, city lights, verses in the vault.",
      "Truth in the cadence, every beat a pulse.",
    ],
    metrics: [
      { label: "Unique words (beta)", value: "7.1k" },
      { label: "Lexical density", value: "0.74" },
      { label: "Influence index", value: "94" },
    ],
    x: 78,
    y: 44,
  },
];

export const rapMapEdges = [
  { from: "mfdoom", to: "kendrick", strength: "influence" },
  { from: "nas", to: "kendrick", strength: "narrative" },
  { from: "outkast", to: "kendrick", strength: "experimentation" },
  { from: "lauryn", to: "kendrick", strength: "soulcraft" },
  { from: "nas", to: "mfdoom", strength: "lyricism" },
];

export const getArtistById = (id) => rapMapArtists.find((artist) => artist.id === id);
