# SEO & Growth Roadmap

## 1. Immediate technical priorities (Week 1–2)
- **Consolidate `<head>` metadata** so every page serves a single description, canonical URL, and social card.
  - Refactor `index.html` to expose a clean default and ensure routed pages call `setSEO` with their own titles + descriptions.
- **Verify all primary CTAs resolve** to live pages. Update hero buttons and footer/nav links so no CTA lands on a 404.
- **Ship crawl assets**: publish an up-to-date XML sitemap that lists every route and add a `robots.txt` pointing to it.
- **Improve performance signals**: compress hero imagery, add `srcset` for responsive loading, and trim unused JavaScript for better Core Web Vitals.

## 2. On-page content upgrades (Week 3–4)
- **Homepage depth**: expand the hero copy to include target keywords (Florida hip-hop duo, immersive lore, live shows) and add a 150–200 word overview section.
- **Story page**: build a chronological lore timeline with anchors so visitors (and crawlers) understand the Calamari Crystal universe.
- **Music hub**: surface latest releases with cover art, track lists, streaming embeds, and lyric snippets marked up with structured data.
- **Merch detail**: list product materials, availability, pricing, and care instructions; interlink merch items with relevant story beats.

## 3. Content marketing roadmap (Month 2)
- Launch a **News / Journal** section for release drops, tour recaps, and behind-the-scenes posts. Plan at least 2 articles per month.
- Create **pillar pages** for “GoVanGoes live shows”, “Calamari Crystal universe”, and “Hip-hop brand partnerships” that link to bookings and contact funnels.
- Embed **multimedia** (YouTube, Spotify, TikTok) with descriptive summaries to capture long-tail keywords.

## 4. Authority & conversion builders (Month 3)
- Add **structured data** for `MusicEvent`, `Product`, and `Organization` to qualify for rich results.
- Integrate **social proof**: testimonials from promoters, media logos, and outbound links to press coverage.
- Upgrade **lead capture**: replace the placeholder booking form with a real endpoint, add an email signup, and gate premium assets (EPK, stems) for contact growth.

## 5. Future feature milestones (Quarterly)
1. Launch a merch storefront integration (Shopify buy buttons or Snipcart) to replace static CTA cards.
2. Ship a shows/tour calendar with ticket CTAs and filters.
3. Automate sitemap/robots generation inside the Vite build and hook up Lighthouse CI to guard regressions.
4. Explore a lightweight headless CMS (Contentful, Sanity, or MDX) for journal posts and lore updates.
