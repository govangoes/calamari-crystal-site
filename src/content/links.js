import { SPOTIFY_ID, SPOTIFY_TYPE, YT_VIDEO_ID } from "./media.js";

const clean = (value) => (value && value.trim() ? value.trim() : "");

export const SPOTIFY_URL = `https://open.spotify.com/${SPOTIFY_TYPE}/${SPOTIFY_ID}`;
export const YOUTUBE_URL = clean(import.meta.env.VITE_YT_CHANNEL_URL) || `https://www.youtube.com/watch?v=${YT_VIDEO_ID}`;
export const APPLE_MUSIC_URL = "https://music.apple.com/us/artist/go-van-goes/1462114556";
export const BANDCAMP_URL = clean(import.meta.env.VITE_BANDCAMP_URL);

export const MIX_MASTER_FORM_URL = "https://tally.so/r/zxYala";
export const FILE_UPLOAD_URL =
  "https://drive.google.com/drive/folders/1ZSxhU4_faGw33ARMDqDPIbo0aXhDxG5R?usp=sharing";

export const SHOP_URL = clean(import.meta.env.VITE_SHOP_URL);
export const TOUR_URL = clean(import.meta.env.VITE_TOUR_URL);
export const NEWSLETTER_FORM_ACTION =
  clean(import.meta.env.VITE_NEWSLETTER_FORM_ACTION) || "https://formspree.io/f/your-id-here";

export const STREAMING_LINKS = [
  { label: "Spotify", href: SPOTIFY_URL },
  { label: "Apple Music", href: APPLE_MUSIC_URL },
  { label: "YouTube", href: YOUTUBE_URL },
  { label: "Bandcamp", href: BANDCAMP_URL },
].filter((link) => Boolean(link.href));
