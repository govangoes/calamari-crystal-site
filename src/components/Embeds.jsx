export function SpotifyEmbed({ id, title="Spotify Player" }) {
  return (
    <div className="card overflow-hidden">
      <iframe
        className="w-full h-full aspect-video"
        style={{ border: 0 }}
        src={`https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={title}
      />
    </div>
  );
}

export function YouTubeEmbed({ id, title="YouTube" }) {
  return (
    <div className="card overflow-hidden">
      <iframe
        className="w-full h-full aspect-video"
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
