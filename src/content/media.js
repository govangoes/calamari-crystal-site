// Centralized media IDs for embeds.
// Configure via .env variables.

const clean = (value) => (value && value.trim() ? value.trim() : "");
const PLACEHOLDER_VALUES = new Set([
  "",
  "replace_with_youtube_video_id",
  "replace_with_spotify_id",
  "replace_with_spotify_artist_id",
  "your-youtube-id",
  "your-spotify-id",
  "your-spotify-artist-id",
  "your_spotify_id",
  "your_youtube_id",
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

function extractSpotifyConfig(value, fallbackType) {
  const raw = clean(value);
  if (!isConfiguredValue(raw)) return { id: "", type: fallbackType };

  const fromSpotifyUrl = raw.match(
    /open\.spotify\.com\/(?:embed\/)?(track|album|playlist|artist)\/([A-Za-z0-9]+)/i,
  );
  if (fromSpotifyUrl) {
    return {
      type: fromSpotifyUrl[1].toLowerCase(),
      id: fromSpotifyUrl[2],
    };
  }

  const fromSpotifyUri = raw.match(/^spotify:(track|album|playlist|artist):([A-Za-z0-9]+)$/i);
  if (fromSpotifyUri) {
    return {
      type: fromSpotifyUri[1].toLowerCase(),
      id: fromSpotifyUri[2],
    };
  }

  if (/^[A-Za-z0-9]{10,}$/.test(raw)) {
    return { id: raw, type: fallbackType };
  }

  return { id: "", type: fallbackType };
}

const DEFAULT_YOUTUBE_ID = "7Qn6OOGHV2Y";
const rawYouTube = clean(import.meta.env.VITE_YT_VIDEO_ID);
const parsedYouTubeId = extractYouTubeId(rawYouTube) || extractYouTubeId(DEFAULT_YOUTUBE_ID);
export const YOUTUBE_ID = parsedYouTubeId;
export const YT_VIDEO_ID = YOUTUBE_ID;
export const HAS_YOUTUBE = Boolean(YOUTUBE_ID);

const allowedSpotifyTypes = new Set(["track", "album", "playlist", "artist"]);
const rawSpotifyType = clean(import.meta.env.VITE_SPOTIFY_TYPE || "album").toLowerCase();
const fallbackSpotifyType = allowedSpotifyTypes.has(rawSpotifyType) ? rawSpotifyType : "album";

const rawSpotifyValue = clean(import.meta.env.VITE_SPOTIFY_ID);
const spotifyConfig = extractSpotifyConfig(rawSpotifyValue, fallbackSpotifyType);
export const SPOTIFY_ID = spotifyConfig.id;
export const SPOTIFY_TYPE = spotifyConfig.type;
export const HAS_SPOTIFY = Boolean(spotifyConfig.id);
