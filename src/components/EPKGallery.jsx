/* global fetch */
import { useEffect, useState } from "react";
import Lightbox from "./Lightbox.jsx";

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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => {
          // Prefer WebP now that variants are generated at build-time.
          return (
            <figure
              key={(it.src || "") + idx}
              className="group overflow-hidden rounded-xl border border-ink/10 dark:border-white/10 bg-white/70 dark:bg-white/5"
            >
              <a
                href={it.src}
                className="block"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(idx);
                }}
              >
                <picture>
                  <source srcSet={toWebp(it.src)} type="image/webp" />
                  <img
                    loading="lazy"
                    decoding="async"
                    src={it.src}
                    alt={it.alt || "GoVanGoes press photo"}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </picture>
              </a>
              <figcaption className="p-4 text-sm flex items-start justify-between gap-4">
                <div className="space-y-1">
                  {/* Prefer custom captions/titles; fall back to credit/date/location */}
                  {it.title && <div className="font-medium">{it.title}</div>}
                  {it.caption && (
                    <div className="opacity-80 space-y-2">
                      <p className="whitespace-pre-line">{it.caption}</p>
                      {it.captionLink && it.captionLink.href && (
                        <a
                          href={it.captionLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-crystal hover:opacity-80 transition"
                        >
                          {it.captionLink.label || "Learn more"}
                        </a>
                      )}
                    </div>
                  )}
                  {!it.caption && (it.credit || it.date || it.location) && (
                    <div className="opacity-60">
                      {it.credit && <span>{it.credit}</span>}
                      {it.credit && (it.date || it.location) && <span> • </span>}
                      {it.date && <span>{it.date}</span>}
                      {it.date && it.location && <span> • </span>}
                      {it.location && <span>{it.location}</span>}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={it.src}
                    download
                    className="shrink-0 inline-flex items-center rounded-md px-3 py-1.5 text-xs border border-ink/15 dark:border-white/15 hover:bg-ink/5 dark:hover:bg-white/10 transition"
                  >
                    Download
                  </a>
                  <button
                    className="shrink-0 inline-flex items-center rounded-md px-3 py-1.5 text-xs border border-ink/15 dark:border-white/15 hover:bg-ink/5 dark:hover:bg-white/10 transition"
                    onClick={() => setOpenIndex(idx)}
                  >
                    View
                  </button>
                </div>
              </figcaption>
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
