export function setSEO({ title, description, image, imageAlt, url, author, site } = {}) {
  const origin = (typeof window !== 'undefined' && window.location) ? window.location.origin : '';
  const currentUrl = (typeof window !== 'undefined' && window.location) ? origin + window.location.pathname : url;
  if (title) document.title = title;
  const set = (selector, attr, value) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      if (selector.startsWith('meta[name="')) {
        el.setAttribute('name', selector.match(/meta\[name="([^"]+)"\]/)[1]);
      } else if (selector.startsWith('meta[property="')) {
        el.setAttribute('property', selector.match(/meta\[property="([^"]+)"\]/)[1]);
      }
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  if (description) set('meta[name="description"]', 'content', description);
  if (title) {
    set('meta[property="og:title"]', 'content', title);
    set('meta[name="twitter:title"]', 'content', title);
  }
  if (description) {
    set('meta[property="og:description"]', 'content', description);
    set('meta[name="twitter:description"]', 'content', description);
  }
  const absImage = image ? (image.startsWith('http') ? image : origin + image) : (origin ? origin + '/images/og.jpg' : undefined);
  if (absImage) {
    set('meta[property="og:image"]', 'content', absImage);
    set('meta[name="twitter:image"]', 'content', absImage);
    if (imageAlt) {
      set('meta[property="og:image:alt"]', 'content', imageAlt);
      set('meta[name="twitter:image:alt"]', 'content', imageAlt);
    }
  }
  const absUrl = url || currentUrl;
  if (absUrl) {
    set('meta[property="og:url"]', 'content', absUrl);
    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute('href', absUrl);
  }

  // Extras: site name / author
  if (site) {
    set('meta[property="og:site_name"]', 'content', site.replace(/^@/, ''));
    set('meta[name="twitter:site"]', 'content', site);
  }
  if (author) {
    set('meta[name="author"]', 'content', author);
    set('meta[property="article:author"]', 'content', author);
  }
}

export default setSEO;
