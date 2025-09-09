import React from "react";

const links = [
  { href: "https://instagram.com/govangoes", label: "Instagram", icon: "ig" },
  { href: "https://x.com/govangoes", label: "X", icon: "x" },
  { href: "https://tiktok.com/@govangoes", label: "TikTok", icon: "tt" },
  { href: "https://youtube.com/@govangoes", label: "YouTube", icon: "yt" },
];

function Icon({ name, size=18 }) {
  const common = { width:size, height:size, fill:"currentColor", ariaHidden:true, focusable:false };
  switch(name){
    case "ig": // simplified rounded square + lens
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6-1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      );
    case "x":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 3h4.6l5.2 6.7L18.7 3H21l-7.1 9 7.6 9H17l-5.6-7.1L8 21H3l7.3-9.2L3 3z"/>
        </svg>
      );
    case "tt":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M14 3c1.2 1.4 2.8 2.4 4.6 2.6v3a7.7 7.7 0 0 1-4.6-1.5V14a5.5 5.5 0 1 1-5.5-5.5c.4 0 .8 0 1.1.1V11a2.6 2.6 0 1 0 1.9 2.5V3h2.5z"/>
        </svg>
      );
    case "yt":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M22 8.6v6.8c0 1.5-1.2 2.6-2.6 2.6H4.6C3.2 18 2 16.9 2 15.4V8.6C2 7.1 3.2 6 4.6 6h14.8C20.8 6 22 7.1 22 8.6zM10 9.5v5l5-2.5-5-2.5z"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function SocialLinks({ className="" }){
  return (
    <div className={className} style={{display:"flex", gap:12, flexWrap:"wrap"}}>
      {links.map(l => (
        <a
          key={l.href}
          href={l.href}
          target="_blank" rel="noopener noreferrer"
          className="pill"
          aria-label={l.label}
          title={l.label}
          style={{gap:8}}
        >
          <Icon name={l.icon} />
          <span>{l.label}</span>
        </a>
      ))}
    </div>
  );
}

