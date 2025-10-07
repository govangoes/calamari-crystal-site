import TikTokIcon from "../icons/TikTokIcon";
import InstagramIcon from "../icons/InstagramIcon";
import YouTubeIcon from "../icons/YouTubeIcon";
import XIcon from "../icons/XIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import RedditIcon from "../icons/RedditIcon";

import "./SocialLinks.css";

const socials = [
  {
    name: "Instagram",
    handle: "@govangoes",
    href: "https://www.instagram.com/govangoes/",
    tagline: "Snapshots from the crystal current.",
    Icon: InstagramIcon,
  },
  {
    name: "X / Twitter",
    handle: "@GoVanGoes",
    href: "https://x.com/GoVanGoes",
    tagline: "Quick pulses from the squid signal.",
    Icon: XIcon,
  },
  {
    name: "TikTok",
    handle: "@govangoes",
    href: "https://www.tiktok.com/@govangoes",
    tagline: "Short-form tides and crystal riffs.",
    Icon: TikTokIcon,
  },
  {
    name: "YouTube",
    handle: "@GoVanGoes",
    href: "https://www.youtube.com/@govangoes",
    tagline: "Full dives, live sessions, deep lore.",
    Icon: YouTubeIcon,
  },
  {
    name: "LinkedIn",
    handle: "Evan Michael Figueroa",
    href: "https://www.linkedin.com/in/evanmichaelfigueroa/",
    tagline: "Strategy, partnerships, and professional currents.",
    Icon: LinkedInIcon,
  },
  {
    name: "Reddit",
    handle: "u/GoVanGoes",
    href: "https://www.reddit.com/user/GoVanGoes/",
    tagline: "Behind-the-scenes lore with the reef.",
    Icon: RedditIcon,
  },
];

export default function SocialLinks({ className = "" }) {
  return (
    <section
      className={`social-reef ${className}`}
      aria-labelledby="social-reef-title"
      aria-describedby="social-reef-lede"
    >
      <div className="social-reef__aurora" aria-hidden="true" />
      <div className="social-reef__caustics" aria-hidden="true" />
      <div className="social-reef__inner">
        <header className="social-reef__header">
          <p className="social-reef__eyebrow" id="social-reef-lede">
            Follow the Calamari Crystal current
          </p>
          <h2 className="social-reef__title" id="social-reef-title">
            Connect across every reef signal
          </h2>
          <p className="social-reef__copy">
            Each platform is a different tide — from fast-moving pulses to deep dives. Choose your
            channel and ride the glow.
          </p>
        </header>
        <ul className="social-reef__grid">
          {socials.map(({ name, handle, href, tagline, Icon }, index) => (
            <li key={name} className="social-reef__item">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-reef__link"
              >
                <span className="social-reef__icon">
                  <Icon size={48} className="social-crystal" />
                </span>
                <span className="social-reef__meta">
                  <span className="social-reef__name">{name}</span>
                  <span className="social-reef__handle">{handle}</span>
                  <span className="social-reef__tagline">{tagline}</span>
                </span>
              </a>
              <span
                aria-hidden="true"
                className="social-reef__bubble"
                style={{ "--delay": `${index * 0.14}s` }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
