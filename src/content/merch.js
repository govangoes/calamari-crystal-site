import { SHOP_URL } from "./links.js";

const hasShop = Boolean(SHOP_URL);

export const merchItems = [
  {
    name: "Glowing Crystal Necklace",
    desc: "UV-reactive pendant—wear a shard of the legend.",
    price: "$35",
  },
  {
    name: "Treasure Map Lyric Poster",
    desc: "Aged parchment design with hidden ciphers & song loci.",
    price: "$20",
  },
  {
    name: "Deluxe Treasure Chest Bundle",
    desc: "Lyric map + necklace + signed note in a mini chest.",
    price: "$120 (limited)",
  },
].map((item) => ({
  ...item,
  href: hasShop ? SHOP_URL : "",
  status: hasShop ? "Buy" : "Coming soon",
}));

export const merchCta = hasShop ? { label: "Shop the Drop", href: SHOP_URL } : null;
