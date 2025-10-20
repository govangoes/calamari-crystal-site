import TikTokIcon from "../icons/TikTokIcon";
import InstagramIcon from "../icons/InstagramIcon";
import YouTubeIcon from "../icons/YouTubeIcon";
import XIcon from "../icons/XIcon";
import SpotifyIcon from "../icons/SpotifyIcon";
import BeRealIcon from "../icons/BeRealIcon";

const socials = [
  { name: "TikTok", href: "https://tiktok.com/@govangoes", Icon: TikTokIcon },
  { name: "Instagram", href: "https://instagram.com/govangoes", Icon: InstagramIcon },
  { name: "YouTube", href: "https://youtube.com/@govangoes", Icon: YouTubeIcon },
  { name: "X", href: "https://twitter.com/govangoes", Icon: XIcon },
  { name: "Spotify", href: "#", Icon: SpotifyIcon },
  { name: "BeReal", href: "https://bere.al/govangoes", Icon: BeRealIcon },
];

export default function SocialLinks({ size = 28, className = "" }) {
  return (
    <nav aria-label="Social links" className={className}>
      <ul className="flex flex-wrap items-center gap-4">
        {socials.map(({ name, href, Icon }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
            >
              <Icon size={size} className="social-crystal" />
              <span className="sr-only">{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
