export const rhymeClusters = [
  {
    id: "mfdoom-borrowed-time",
    title: "MF DOOM - Rhyme Cluster",
    bpm: 94,
    footer: "Multi-syllabic rhyme mapping active • Rap Map v1",
    lines: [
      {
        id: "line-1",
        tokens: [
          { text: "Living off " },
          { text: "borrowed", rhyme: "a" },
          { text: " time, the clock " },
          { text: "ticks", rhyme: "a" },
          { text: " faster" },
        ],
      },
      {
        id: "line-2",
        tokens: [
          { text: "That'd be the " },
          { text: "hour", rhyme: "b" },
          { text: " they knock the slick " },
          { text: "blaster", rhyme: "b" },
        ],
      },
      {
        id: "line-3",
        tokens: [
          { text: "Dick Dastardly and " },
          { text: "Muttley", rhyme: "c" },
          { text: " with " },
          { text: "sick laughter", rhyme: "c" },
        ],
      },
    ],
  },
  {
    id: "kendrick-city-cadence",
    title: "Kendrick Lamar - Rhyme Cluster",
    bpm: 96,
    footer: "Cadence patterning active • Rap Map v1",
    lines: [
      {
        id: "line-1",
        tokens: [
          { text: "City on my " },
          { text: "shoulder", rhyme: "a" },
          { text: ", pressure turn to " },
          { text: "composure", rhyme: "a" },
        ],
      },
      {
        id: "line-2",
        tokens: [
          { text: "Scripture in the " },
          { text: "cadence", rhyme: "b" },
          { text: ", every echo got a " },
          { text: "layer", rhyme: "b" },
        ],
      },
      {
        id: "line-3",
        tokens: [
          { text: "Mirror to the " },
          { text: "block", rhyme: "c" },
          { text: ", let the drums " },
          { text: "talk", rhyme: "c" },
        ],
      },
    ],
  },
];

export const getRhymeClusterById = (id) => rhymeClusters.find((cluster) => cluster.id === id);
