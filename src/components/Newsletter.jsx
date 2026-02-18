import { NEWSLETTER_FORM_ACTION } from "../content/links.js";

export default function Newsletter({
  title = "Join the Crew",
  description = "Get drops, shows, and secret lore.",
  buttonLabel = "Subscribe",
  action = NEWSLETTER_FORM_ACTION,
}) {
  return (
    <form
      className="rounded-xl border border-white/10 p-4 bg-ink/40 space-y-2"
      action={action}
      method="POST"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="opacity-80 text-sm">{description}</p>
      <input type="hidden" name="source" value="website-newsletter" />
      <div className="flex flex-wrap gap-2">
        <input
          aria-label="Email address"
          className="flex-1 min-w-[220px] rounded px-3 py-2 bg-black/30 border border-white/10 outline-none"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
        />
        <button
          aria-label="Subscribe to newsletter"
          className="px-4 py-2 rounded bg-ultraviolet text-paperWhite"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}
