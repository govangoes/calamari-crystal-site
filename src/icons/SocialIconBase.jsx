export default function SocialIconBase({ title, children, size = 28, className = "" }) {
  const id = Math.random().toString(36).slice(2);
  const labelled = Boolean(title);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      className={className}
      {...(labelled
        ? { role: "img", "aria-label": title }
        : { "aria-hidden": true, focusable: "false" })}
    >
      <defs>
        <linearGradient id={`crystal-${id}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--cc-crystalCyan, #22d3ee)" />
          <stop offset="45%" stopColor="var(--accent-coralPink, #ff7c8a)" />
          <stop offset="100%" stopColor="var(--cc-squidViolet, #6f2da8)" />
        </linearGradient>
        <radialGradient id={`bubble-${id}`} cx="0.2" cy="0.15" r="0.9">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id={`glow-${id}`} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#glow-${id})`}>
        <path
          d="M14 1 L25.5 7.6 C26.4 8.1 26.4 9.4 25.5 9.9 L25.5 18.1 C25.5 18.7 25.2 19.2 24.7 19.5 L14 27 L3.3 19.5 C2.8 19.2 2.5 18.7 2.5 18.1 L2.5 9.9 C1.6 9.4 1.6 8.1 2.5 7.6 L14 1 Z"
          fill="url(#crystal-${id})"
          opacity="0.16"
        />
        <path
          d="M14 1 L25.5 7.6 C26.4 8.1 26.4 9.4 25.5 9.9 L25.5 18.1 C25.5 18.7 25.2 19.2 24.7 19.5 L14 27 L3.3 19.5 C2.8 19.2 2.5 18.7 2.5 18.1 L2.5 9.9 C1.6 9.4 1.6 8.1 2.5 7.6 L14 1 Z"
          fill="none"
          stroke="url(#crystal-${id})"
          strokeWidth="1.35"
        />
        <circle cx="8" cy="7" r="3" fill={`url(#bubble-${id})`} opacity="0.55" />
        <circle cx="20" cy="21" r="2.4" fill={`url(#bubble-${id})`} opacity="0.35" />
      </g>
      <g fill="none" stroke="url(#crystal-${id})" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}
