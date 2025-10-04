import { useId, useMemo } from "react";
import styled, { keyframes } from "styled-components";

const ripplePulse = keyframes`
  0% {
    transform: scale(1) translate3d(0, 0, 0);
  }
  50% {
    transform: scale(1.05) translate3d(-2%, -1%, 0);
  }
  100% {
    transform: scale(1.1) translate3d(2%, 2%, 0);
  }
`;

const PatternWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  isolation: isolate;
  z-index: -10;
`;

const PatternSurface = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    145deg,
    rgba(var(--cc-opalGlow-rgb, 255 209 102) / 0.95),
    rgba(var(--cc-crystalCyan-rgb, 34 211 238) / 0.92),
    rgba(var(--cc-squidViolet-rgb, 111 45 168) / 0.9)
  );
  filter: var(--pattern-filter, none);
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: -15%;
    background:
      radial-gradient(circle at 20% 30%, rgba(var(--cc-crystalCyan-rgb, 34 211 238) / 0.18) 0%, transparent 60%),
      radial-gradient(circle at 75% 20%, rgba(var(--cc-crystalMagenta-rgb, 238 62 150) / 0.18) 0%, transparent 60%),
      radial-gradient(circle at 50% 75%, rgba(var(--cc-opalGlow-rgb, 255 209 102) / 0.16) 0%, transparent 70%);
    mix-blend-mode: screen;
    filter: blur(32px);
  }
`;

const PatternRipple = styled.span`
  position: absolute;
  inset: -18%;
  background:
    radial-gradient(circle at 25% 35%, rgba(var(--cc-crystalCyan-rgb, 34 211 238) / 0.3) 0%, transparent 55%),
    radial-gradient(circle at 80% 25%, rgba(var(--cc-crystalMagenta-rgb, 238 62 150) / 0.28) 0%, transparent 60%),
    radial-gradient(circle at 45% 80%, rgba(var(--cc-opalGlow-rgb, 255 209 102) / 0.24) 0%, transparent 68%);
  mix-blend-mode: screen;
  opacity: 0.6;
  animation: ${ripplePulse} 20s ease-in-out infinite alternate;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const PatternTexture = styled.svg`
  position: absolute;
  width: 0;
  height: 0;
`;

export default function Pattern({ className = "" }) {
  const reactId = useId();
  const filterId = useMemo(
    () => `advanced-texture-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [reactId],
  );

  return (
    <PatternWrapper className={className} aria-hidden="true" style={{ "--pattern-filter": `url(#${filterId})` }}>
      <PatternSurface>
        <PatternRipple aria-hidden="true" />
        <PatternTexture aria-hidden="true" focusable="false">
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.7"
                numOctaves="3"
                result="noise"
              />
              <feSpecularLighting
                in="noise"
                surfaceScale="2"
                specularConstant="0.8"
                specularExponent="20"
                lightingColor="var(--cc-opalGlow, #ffd166)"
                result="specular"
              >
                <fePointLight x="50" y="50" z="100" />
              </feSpecularLighting>
              <feComposite in="specular" in2="SourceGraphic" operator="in" result="litNoise" />
              <feBlend mode="overlay" in="SourceGraphic" in2="litNoise" />
            </filter>
          </defs>
        </PatternTexture>
      </PatternSurface>
    </PatternWrapper>
  );
}
