import React from "react";

function Item({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-paperWhite/15 bg-inkBlack/40 px-4 py-2 text-sm text-paperWhite/80 backdrop-blur transition hover:border-royalGold/60 hover:text-royalGold"
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  );
}

function TikTokIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21 8.5a6.8 6.8 0 0 1-4.5-1.7v6.6a6.4 6.4 0 1 1-6.3-6.5c.4 0 .9.1 1.3.2v3a3.4 3.4 0 1 0 2 3.1V2h3a6.8 6.8 0 0 0 4.5 4v2.5Z"/>
    </svg>
  );
}

export default function SocialLinks({ className = "" }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Item href="https://tiktok.com/@govangoes" label="TikTok">
        <TikTokIcon />
        TikTok
      </Item>
      <Item href="https://instagram.com/govangoes" label="Instagram">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3.3" stroke="currentColor" strokeWidth="2"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
        </svg>
        Instagram
      </Item>
      <Item href="https://youtube.com/@govangoes" label="YouTube">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 7.1a3 3 0 0 0-2.1-2.1C19.6 4.5 12 4.5 12 4.5s-7.6 0-9.4.5A3 3 0 0 0 .5 7.1 31 31 0 0 0 0 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-4.9ZM9.6 15.3V8.7l6 3.3-6 3.3Z"/>
        </svg>
        YouTube
      </Item>
      <Item href="https://twitter.com/govangoes" label="X / Twitter">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.5 3h3.3L14 10.5l7.7 10.5H18l-5-6.8-5.8 6.8H3.8l7.1-8.4L4 3h4.1l4.5 6.1L17.5 3Z"/>
        </svg>
        X / Twitter
      </Item>
    </div>
  );
}
