export function SpotifyEmbed({ id, type = "album", title = "Spotify Player", className = "" }) {
  if (!id) return null;

  const composedClassName = [
    "aspect-video w-full overflow-hidden rounded-lg border border-white/10",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={composedClassName}>
      <iframe
        className="w-full h-full"
        style={{ border: 0 }}
        src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={title}
      />
    </div>
  );
}

export function YouTubeEmbed({ id, title = "YouTube", className = "" }) {
  if (!id) return null;

  const composedClassName = [
    "aspect-video w-full overflow-hidden rounded-lg border border-white/10",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={composedClassName}>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
