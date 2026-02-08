// Centralized media IDs for embeds.
// Configure via .env variables.

const clean = (value) => (value && value.trim() ? value.trim() : "");
const PLACEHOLDER_VALUES = new Set([
  "",
  "replace_with_youtube_video_id",
  "replace_with_spotify_id",
  "your-youtube-id",
  "your-spotify-id",
]);

function isConfiguredValue(value) {
  const normalized = clean(value).toLowerCase();
  return Boolean(normalized) && !PLACEHOLDER_VALUES.has(normalized);
}

function extractYouTubeId(value) {
  const raw = clean(value);
  if (!raw) return "";

  const fromShortUrl = raw.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (fromShortUrl) return fromShortUrl[1];

  const fromWatchUrl = raw.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (fromWatchUrl) return fromWatchUrl[1];

  const fromEmbedUrl = raw.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/);
  if (fromEmbedUrl) return fromEmbedUrl[1];

  return /^[A-Za-z0-9_-]{11}$/.test(raw) ? raw : "";
}

const rawYouTube = clean(import.meta.env.VITE_YT_VIDEO_ID);
export const YT_VIDEO_ID = extractYouTubeId(rawYouTube);
export const HAS_YOUTUBE = Boolean(YT_VIDEO_ID);

const rawSpotifyId = clean(import.meta.env.VITE_SPOTIFY_ID);
export const SPOTIFY_ID = isConfiguredValue(rawSpotifyId) ? rawSpotifyId : "";
export const HAS_SPOTIFY = Boolean(SPOTIFY_ID);

const allowedSpotifyTypes = new Set(["track", "album", "playlist"]);
const rawSpotifyType = clean(import.meta.env.VITE_SPOTIFY_TYPE || "album").toLowerCase();
export const SPOTIFY_TYPE = allowedSpotifyTypes.has(rawSpotifyType) ? rawSpotifyType : "album";
