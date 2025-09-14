import { useEffect, useRef } from "react";

export default function Lightbox({ items = [], index = 0, onClose, onPrev, onNext }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    
    try { 
      closeRef.current?.focus(); 
    } catch {
      // intentionally empty - focus may fail on some elements
    }
    
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
      if (e.key === 'Tab') {
        // simple focus trap: keep focus within lightbox controls
        const focusables = Array.from(document.querySelectorAll('[data-lbx-focus]'));
        if (!focusables.length) return;
        const i = focusables.indexOf(document.activeElement);
        if (e.shiftKey) {
          if (i <= 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
        } else {
          if (i === -1 || i === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
        }
      }
    };
    
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  const it = items[index] || {};
  const src = it?.src || '';
  const title = it?.title || '';
  const caption = it?.caption || '';
  const alt = it?.alt || title || 'Press photo';
  const webp = toWebp(src);

  return (
    <div
      className="fixed inset-0 z-[10000] bg-ink/80 dark:bg-ink/90 backdrop-blur-sm text-paperWhite flex items-center justify-center"
      role="dialog" aria-modal="true" aria-label="Image viewer"
    >
      {/* Controls */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-crystal"
        data-lbx-focus
        ref={closeRef}
      >Close</button>
      <button
        onClick={onPrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 w-10 h-10 grid place-items-center hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-crystal"
        aria-label="Previous"
        data-lbx-focus
      >‹</button>
      <button
        onClick={onNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 w-10 h-10 grid place-items-center hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-crystal"
        aria-label="Next"
        data-lbx-focus
      >›</button>
      
      {/* Media */}
      <figure className="max-w-[92vw] max-h-[82vh] w-full md:w-auto">
        <picture>
          <source srcSet={webp} type="image/webp" />
          <img src={src} alt={alt} className="max-h-[70vh] w-auto h-auto mx-auto rounded-lg shadow-crystal" />
        </picture>
        {(title || caption) && (
          <figcaption className="mt-3 text-sm opacity-90 px-2 text-center">
            {title && <div className="font-medium">{title}</div>}
            {caption && <div className="opacity-80">{caption}</div>}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

function toWebp(src) {
  const i = src.lastIndexOf('.');
  if (i === -1) return src + '.webp';
  return src.slice(0, i) + '.webp';
}
