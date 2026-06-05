import { HAS_SPOTIFY, HAS_YOUTUBE, SPOTIFY_ID, SPOTIFY_TYPE, YT_VIDEO_ID } from "./media.js";

const clean = (value) => (value && value.trim() ? value.trim() : "");
const PLACEHOLDER_URLS = new Set([
  "https://your-artist.bandcamp.com",
  "https://your-store-link",
  "https://bandsintown.com/your-artist",
  "https://formspree.io/f/your-id-here",
]);

function configuredUrl(value) {
  const url = clean(value);
  if (!url) return "";
  const normalized = url.toLowerCase();
  if (PLACEHOLDER_URLS.has(normalized)) return "";
  if (normalized.includes("replace_with") || normalized.includes("your-id-here")) return "";
  return url;
}

export const SPOTIFY_URL = HAS_SPOTIFY
  ? `https://open.spotify.com/${SPOTIFY_TYPE}/${SPOTIFY_ID}`
  : "";
export const YOUTUBE_URL =
  configuredUrl(import.meta.env.VITE_YT_CHANNEL_URL) ||
  (HAS_YOUTUBE ? `https://www.youtube.com/watch?v=${YT_VIDEO_ID}` : "");
export const APPLE_MUSIC_URL = "https://music.apple.com/us/artist/go-van-goes/1462114556";
export const BANDCAMP_URL = configuredUrl(import.meta.env.VITE_BANDCAMP_URL);
export const AUDIO_PROOF_URL = configuredUrl(import.meta.env.VITE_AUDIO_PROOF_URL);

export const PRESS_FEATURE_LINKS = [
  {
    label: "Rap Fiesta",
    href: "https://rapfiesta.com/go-van-goes-unknown-hacker-anthem/",
  },
  {
    label: "Orlando Voyager",
    href: "https://orlandovoyager.com/interview/meet-go-van-goes-of-orlando/",
  },
  {
    label: "GoVanGoes Press Kit",
    href: "https://www.govangoes.com/press",
  },
];

export const FILE_UPLOAD_URL =
  configuredUrl(import.meta.env.VITE_FILE_UPLOAD_URL) ||
  "https://drive.google.com/drive/folders/1ZSxhU4_faGw33ARMDqDPIbo0aXhDxG5R?usp=sharing";

export const SHOP_URL = configuredUrl(import.meta.env.VITE_SHOP_URL);
export const TOUR_URL = configuredUrl(import.meta.env.VITE_TOUR_URL);
export const NEWSLETTER_FORM_ACTION = configuredUrl(import.meta.env.VITE_NEWSLETTER_FORM_ACTION);

export const STREAMING_LINKS = [
  { label: "Spotify", href: SPOTIFY_URL },
  { label: "Apple Music", href: APPLE_MUSIC_URL },
  { label: "YouTube", href: YOUTUBE_URL },
  { label: "Bandcamp", href: BANDCAMP_URL },
].filter((link) => Boolean(link.href));
