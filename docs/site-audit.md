# Calamari Crystal Site Audit — March 2025

## Scope and context
- Single-page React app with client-side routing for Home, Story, Music, Merch, Marketing, Business, Contact, Bookings, About, Rap Map, Press, Privacy, and Terms pages, plus 404 handling.
- SEO metadata is derived from a route map; descriptions are optional but not provided for every page.

## Build and quality health
- `npm run check` (lint/format verification)
- `npm run build` (Vite production bundle)

## Findings
1) **Contact form not wired to a real endpoint** — The form posts to the placeholder Formspree ID (`/f/your-id-here`), so submissions will be dropped until a real endpoint is configured.
   - _Impact_: Users cannot reach the team via the on-site form; only the mailto fallback works.
   - _Recommendation_: Replace the placeholder action with the live Formspree (or alternative) endpoint and add success/error handling.

2) **Missing meta descriptions for legal pages** — The SEO map only sets titles for `/privacy` and `/terms` routes, leaving descriptions undefined.
   - _Impact_: Search snippets may be empty or generic for legal content, reducing clarity in search results.
   - _Recommendation_: Add concise descriptions for the privacy policy and terms routes to improve SEO quality.

3) **Rap Map call-to-action uses a blocking alert instead of lead capture** — The “Get Notified” button triggers `window.alert("Coming soon!")` rather than collecting email interest.
   - _Impact_: Visitors interested in the Rap Map cannot submit contact info, missing an opportunity to build a waitlist.
   - _Recommendation_: Swap the alert for a small form or mailto link that saves addresses for launch updates.

## Next steps
- Configure the contact form endpoint and validate a full submission round-trip (success + error states).
- Expand the SEO map with meta descriptions for privacy and terms pages.
- Replace the Rap Map alert with a notification signup flow (form, modal, or mailto) to capture interested users.
