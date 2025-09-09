import React, { useEffect, useState, useMemo } from "react";

function byIndex(a, b) {
  const ai = typeof a.index === "number" ? a.index : 0;
  const bi = typeof b.index === "number" ? b.index : 0;
  return ai - bi;
}

export default function EPKGallery({ manifestUrl = "/images/you/manifest.json" }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null); // active item for lightbox

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(manifestUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`Manifest not found (${res.status})`);
        const data = await res.json();
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Failed to load manifest");
          // Provide a tiny demo so layout still renders
          setItems([
            {
              index: 1,
              src: "/images/you/gvg-photo-1-wd.jpg",
              caption: "Wide promo still",
              date: null,
              location: null,
              aspect: "wd",
            },
          ]);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [manifestUrl]);

  const sorted = useMemo(() => (items ? [...items].sort(byIndex) : []), [items]);

  return (
    <section className="section" aria-label="EPK Photo Gallery">
      <div className="mx-auto max-w-6xl px-4">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h2 className="h2" style={{ margin: 0 }}>EPK Photos</h2>
            <p className="lead" style={{ marginTop: 6 }}>Click a photo to view details and context.</p>
          </div>
          <a className="pill" href="/images/you/manifest.json" target="_blank" rel="noreferrer">Manifest</a>
        </div>

        {error && (
          <p style={{ opacity: .8, marginTop: 12 }}>Note: {error}. Using a small placeholder entry. Create <code>/public/images/you/manifest.json</code> to control ordering, captions, and metadata.</p>
        )}

        <div className="masonry" style={{ columnCount: 1, columnGap: "1rem", marginTop: "1.25rem" }}>
          {/* Responsive columns */}
          <style>{`
            @media (min-width: 768px){ .masonry{ column-count: 2 } }
            @media (min-width: 1024px){ .masonry{ column-count: 3 } }
            .masonry-item{ break-inside: avoid; -webkit-column-break-inside: avoid; margin-bottom: 1rem; }
            .masonry-card{ display:block; border:1px solid var(--surfaceBorder); background:var(--surface); border-radius:14px; overflow:hidden; }
            .masonry-img{ width:100%; height:auto; display:block; }
            .masonry-meta{ padding:.75rem .9rem; }
            .masonry-caption{ margin:0; font-weight:600; }
            .masonry-sub{ margin:.25rem 0 0; opacity:.8; font-size:.9rem; }
          `}</style>

          {sorted.map((it) => (
            <div key={`${it.index}-${it.src}`} className="masonry-item">
              <button className="masonry-card" onClick={() => setActive(it)} aria-label="Open photo details">
                <img src={it.src} alt={it.alt || it.caption || "EPK photo"} className="masonry-img" loading="lazy" />
                {(it.caption || it.date || it.location) && (
                  <div className="masonry-meta">
                    {it.caption && <p className="masonry-caption">{it.caption}</p>}
                    {(it.date || it.location) && (
                      <p className="masonry-sub">
                        {it.date ? it.date : null}
                        {it.date && it.location ? " • " : null}
                        {it.location ? it.location : null}
                      </p>
                    )}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {active && (
          <div role="dialog" aria-modal="true" aria-label="Photo details" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", zIndex: 80, display: "grid", placeItems: "center", padding: "1rem" }} onClick={() => setActive(null)}>
            <div className="card" style={{ maxWidth: "min(1000px, 96vw)", width: "100%", background: "var(--bg)", borderColor: "var(--surfaceBorder)", padding: 12 }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <strong>{active.caption || "Untitled"}</strong>
                <button className="pill" onClick={() => setActive(null)} aria-label="Close">Close</button>
              </div>
              <img src={active.src} alt={active.alt || active.caption || "EPK photo"} style={{ width: "100%", height: "auto", display: "block", borderRadius: 8 }} />
              {(active.date || active.location || active.notes) && (
                <div style={{ marginTop: 10 }}>
                  <p className="lead" style={{ margin: 0 }}>
                    {active.date ? active.date : null}
                    {active.date && active.location ? " • " : null}
                    {active.location ? active.location : null}
                  </p>
                  {active.notes && <p style={{ opacity: .85, marginTop: 6 }}>{active.notes}</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

