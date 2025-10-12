export default function PlayerEmbed() {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <div className="aspect-video flex items-center justify-center bg-black/40">
        <p className="opacity-80 p-4 text-center text-sm">
          Player goes here. Link out:{" "}
          <a
            className="underline"
            href="https://www.youtube.com/@govangoes"
            target="_blank"
            rel="noreferrer"
          >
            youtube.com/@govangoes
          </a>
        </p>
      </div>
    </div>
  );
}
