export function SpotifyEmbed({ id, title = "Spotify Player" }) {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
      <iframe
        className="w-full h-full"
        style={{ border: 0 }}
        src={`https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={title}
      />
    </div>
  );
}

export function YouTubeEmbed({ id, title = "YouTube" }) {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
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
