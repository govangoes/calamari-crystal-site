export default function SocialLinks({ className = "" }) {
  const links = [
    { href: "https://tiktok.com/@govangoes", label: "TikTok", emoji: "🎵" },
    { href: "https://instagram.com/govangoes", label: "Instagram", emoji: "📸" },
    { href: "https://youtube.com/@govangoes", label: "YouTube", emoji: "▶️" },
    { href: "https://twitter.com/govangoes", label: "X / Twitter", emoji: "✖️" },
    { href: "https://bere.al/govangoes", label: "BeReal", emoji: "🖤" },
  ];
  return (
    <ul className={`nav ${className}`}>
      {links.map((l) => (
        <li key={l.href}>
          <a className="pill" href={l.href} target="_blank" rel="noreferrer">
            <span aria-hidden="true">{l.emoji}</span>
            <span>{l.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
