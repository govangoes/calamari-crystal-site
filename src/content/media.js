// Centralized media IDs for embeds.
// Configure via .env variables or edit these defaults.

export const YT_VIDEO_ID = import.meta.env.VITE_YT_VIDEO_ID || "dQw4w9WgXcQ"; // YouTube video id

// Spotify: type can be "track", "album", or "playlist"
const rawSpotifyId = (import.meta.env.VITE_SPOTIFY_ID || "").trim();
export const SPOTIFY_ID = rawSpotifyId;
export const HAS_SPOTIFY = Boolean(rawSpotifyId);
export const SPOTIFY_TYPE = (import.meta.env.VITE_SPOTIFY_TYPE || "album").trim();
