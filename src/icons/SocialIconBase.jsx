export default function SocialIconBase({ title, children, size=28, className="" }) {
  const id = Math.random().toString(36).slice(2);
  const labelled = Boolean(title);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      className={className}
      {...(labelled ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' })}
    >
      <defs>
        <linearGradient id={`crystal-${id}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%"  stopColor="var(--crystalCyan, #22d3ee)" />
          <stop offset="100%" stopColor="var(--crystalViolet, #a78bfa)" />
        </linearGradient>
        <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g filter={`url(#glow-${id})`}>
        <path d="M14 1 L25 8 L25 20 L14 27 L3 20 L3 8 Z" fill="url(#crystal-${id})" opacity="0.12" />
        <path d="M14 1 L25 8 L25 20 L14 27 L3 20 L3 8 Z" fill="none" stroke="url(#crystal-${id})" strokeWidth="1.3" />
      </g>
      <g fill="url(#crystal-${id})" stroke="none">{children}</g>
    </svg>
  );
}
