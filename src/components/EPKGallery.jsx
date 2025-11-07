/* global fetch */
import { useEffect, useState } from "react";
import Lightbox from "./Lightbox.jsx";
import "./EPKGallery.css";

function toWebp(src) {
  const i = src.lastIndexOf(".");
  if (i === -1) return src + ".webp";
  return src.slice(0, i) + ".webp";
}

export default function EPKGallery({ items: itemsProp }) {
  const [items, setItems] = useState(itemsProp || []);
  const [openIndex, setOpenIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (itemsProp && itemsProp.length) return; // using provided items
    let cancelled = false;
    fetch("/images/you/manifest.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message || "Failed to load images");
      });
    return () => {
      cancelled = true;
    };
  }, [itemsProp]);

  if (error) {
    return <div className="text-sm text-red-400">{String(error)}</div>;
  }

  if (!items.length) {
    return <div className="opacity-70">Press photos coming soon.</div>;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => {
          // Prefer WebP now that variants are generated at build-time.
          return (
            <figure key={(it.src || "") + idx} className="epk-card focus:outline-none">
              <div className="epk-card__inner">
                <div className="epk-card__face epk-card__face--front">
                  <picture className="epk-card__image">
                    <source srcSet={toWebp(it.src)} type="image/webp" />
                    <img
                      loading="lazy"
                      decoding="async"
                      src={it.src}
                      alt={it.alt || it.title || "GoVanGoes press photo"}
                    />
                  </picture>
                  <div className="epk-card__front-content">
                    <span className="epk-card__badge">Press Photo</span>
                    {it.title && <h3 className="epk-card__title">{it.title}</h3>}
                  </div>
                </div>
                <div className="epk-card__face epk-card__face--back">
                  <div className="epk-card__back-content">
                    {it.title && <h3 className="epk-card__title">{it.title}</h3>}
                    {it.caption ? (
                      <div
                        className="epk-card__caption"
                        aria-label={`Caption for ${it.title || "press photo"}`}
                      >
                        <p>{it.caption}</p>
                      </div>
                    ) : (
                      (it.credit || it.date || it.location) && (
                        <div className="epk-card__meta">
                          {it.credit && <span>{it.credit}</span>}
                          {it.credit && (it.date || it.location) && <span> • </span>}
                          {it.date && <span>{it.date}</span>}
                          {it.date && it.location && <span> • </span>}
                          {it.location && <span>{it.location}</span>}
                        </div>
                      )
                    )}
                    {it.captionLink && it.captionLink.href && (
                      <a
                        href={it.captionLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="epk-card__link"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {it.captionLink.label || "Learn more"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <button type="button" className="epk-card__trigger" onClick={() => setOpenIndex(idx)}>
                <span className="sr-only">{`View ${it.title || "press photo"}`}</span>
              </button>
            </figure>
          );
        })}
      </div>
      {openIndex != null && (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() => setOpenIndex((i) => (i > 0 ? i - 1 : items.length - 1))}
          onNext={() => setOpenIndex((i) => (i < items.length - 1 ? i + 1 : 0))}
        />
      )}
    </section>
  );
}
