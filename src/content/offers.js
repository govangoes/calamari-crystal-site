export const BOOKING_EMAIL = "bookings@govangoes.com";

/**
 * Put your Gumroad links here.
 * Make a FREE Gumroad product and enable "Require email" for email capture.
 */
export const FREE_CREATOR_PACK_URL = "https://gumroad.com/l/YOUR_FREE_PACK";
export const CREATOR_PACK_URL = "https://gumroad.com/l/YOUR_CREATOR_PACK";

/**
 * Mailto link with a prefilled brief (so requests are usable).
 */
const subject = encodeURIComponent("Custom Audio Request (Beat / Podcast / Creator)");
const body = encodeURIComponent(
  `What do you need?\n\n` +
    `• Type (loop / intro / full beat / cleanup mix):\n` +
    `• Vibe/genre:\n` +
    `• Length:\n` +
    `• Reference links:\n` +
    `• Deadline:\n` +
    `• Budget (optional):\n\n` +
    `Thanks!`,
);

export const CUSTOM_AUDIO_MAILTO = `mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`;
