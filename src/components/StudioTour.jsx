import { useEffect, useRef, useState } from "react";
import { STUDIO_TOUR_HEADER, STUDIO_TOUR_STEPS } from "../content/studioTour.js";
import "./StudioTour.css";
import ScrollReveal from "./ScrollReveal.jsx";
import GhostButton from "./ui/GhostButton.jsx";
import PsychedelicButton from "./ui/PsychedelicButton.jsx";

// Which drawn pieces light up on each step (index matches STUDIO_TOUR_STEPS).
const GEAR_BY_STEP = [["mic"], ["boost"], ["interface"], ["mac", "screen"], ["monitors", "phones"]];

// Cable segments. Segment n is drawn once step n + 1 is reached.
const CABLES = [
  "M236 214 C236 290 214 318 214 352",
  "M232 372 L252 372",
  "M322 380 C322 410 600 410 600 382",
  "M640 348 C668 348 690 340 692 330",
];

function isLit(gearId, activeIndex) {
  return GEAR_BY_STEP[activeIndex].includes(gearId);
}

function isPassed(gearId, activeIndex) {
  return GEAR_BY_STEP.slice(0, activeIndex).some((ids) => ids.includes(gearId));
}

function gearClass(gearId, activeIndex) {
  if (isLit(gearId, activeIndex)) return "studio-gear studio-gear--lit";
  if (isPassed(gearId, activeIndex)) return "studio-gear studio-gear--passed";
  return "studio-gear";
}

function StudioDrawing({ activeIndex }) {
  return (
    <svg
      viewBox="0 0 800 440"
      role="img"
      aria-label="Drawing of the GoVanGoes studio desk: microphone, preamp, audio interface, Mac Studio, ultrawide screen, studio monitors and headphones."
      className="studio-drawing"
    >
      {/* desk */}
      <rect x="30" y="382" width="740" height="12" rx="3" className="studio-desk" />
      <rect x="70" y="394" width="10" height="36" className="studio-desk" />
      <rect x="720" y="394" width="10" height="36" className="studio-desk" />

      {/* monitors (speakers) */}
      <g className={gearClass("monitors", activeIndex)}>
        <rect x="62" y="196" width="84" height="138" rx="8" />
        <circle cx="104" cy="228" r="9" />
        <circle cx="104" cy="288" r="27" />
        <rect x="654" y="196" width="84" height="138" rx="8" />
        <circle cx="696" cy="228" r="9" />
        <circle cx="696" cy="288" r="27" />
        <rect x="80" y="334" width="48" height="48" className="studio-stand" />
        <rect x="672" y="334" width="48" height="48" className="studio-stand" />
      </g>

      {/* ultrawide screen with a session on it */}
      <g className={gearClass("screen", activeIndex)}>
        <path d="M168 128 Q400 142 632 128 L632 306 Q400 320 168 306 Z" rx="6" />
        <rect x="392" y="312" width="16" height="58" className="studio-stand" />
        <rect x="352" y="368" width="96" height="14" rx="4" className="studio-stand" />
        <g className="studio-session">
          <rect x="190" y="152" width="150" height="10" rx="2" />
          <rect x="190" y="172" width="260" height="10" rx="2" />
          <rect x="190" y="192" width="200" height="10" rx="2" />
          <rect x="190" y="212" width="320" height="10" rx="2" />
          <rect x="190" y="232" width="170" height="10" rx="2" />
          <rect x="190" y="252" width="280" height="10" rx="2" />
          <rect
            x="552"
            y="152"
            width="8"
            height="110"
            rx="2"
            className="studio-meter studio-meter--a"
          />
          <rect
            x="568"
            y="152"
            width="8"
            height="110"
            rx="2"
            className="studio-meter studio-meter--b"
          />
        </g>
      </g>

      {/* Mac Studio */}
      <g className={gearClass("mac", activeIndex)}>
        <rect x="560" y="338" width="80" height="44" rx="8" />
        <circle cx="600" cy="350" r="2.5" className="studio-dot" />
      </g>

      {/* headphones */}
      <g className={gearClass("phones", activeIndex)}>
        <path
          d="M462 382 L462 356 Q462 332 490 332 Q518 332 518 356 L518 382"
          fill="none"
          className="studio-band"
        />
        <rect x="454" y="356" width="16" height="26" rx="6" />
        <rect x="510" y="356" width="16" height="26" rx="6" />
      </g>

      {/* interface */}
      <g className={gearClass("interface", activeIndex)}>
        <rect x="252" y="352" width="70" height="30" rx="5" />
        <circle cx="298" cy="367" r="8" className="studio-knob" />
        <rect x="262" y="364" width="18" height="4" rx="1" className="studio-dot" />
      </g>

      {/* Cloudlifter */}
      <g className={gearClass("boost", activeIndex)}>
        <rect x="190" y="356" width="42" height="26" rx="4" />
        <rect x="198" y="364" width="12" height="3" rx="1" className="studio-dot" />
      </g>

      {/* mic stand, boom, mic and vocal booth */}
      <g className={gearClass("mic", activeIndex)}>
        <path d="M44 382 L44 60 L226 86" fill="none" className="studio-stand-line" />
        <path d="M28 382 L60 382" className="studio-stand-line" />
        <path d="M244 56 A74 74 0 0 1 244 204" fill="none" className="studio-booth" />
        <g transform="translate(236 86) rotate(8)">
          <rect x="-16" y="0" width="32" height="86" rx="14" />
          <rect x="-18" y="10" width="36" height="8" rx="2" className="studio-knob" />
          <rect x="-4" y="86" width="8" height="12" className="studio-stand" />
        </g>
      </g>

      {/* cables: drawn as the tour reaches each stage */}
      {CABLES.map((d, index) => (
        <path
          key={d}
          d={d}
          pathLength="1"
          fill="none"
          className={[
            "studio-cable",
            activeIndex > index ? "studio-cable--on" : "",
            activeIndex === index + 1 ? "studio-cable--flowing" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ))}
    </svg>
  );
}

const OBSERVER_OPTIONS = { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 };

export default function StudioTour() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  // Scroll-driven: the card nearest the middle of the screen becomes the active stop.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Number(entry.target.getAttribute("data-step-index"));
        if (!Number.isNaN(index)) setActiveIndex(index);
      });
    }, OBSERVER_OPTIONS);
    stepRefs.current.filter(Boolean).forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const activeStep = STUDIO_TOUR_STEPS[activeIndex];

  return (
    <ScrollReveal className="section section-shell mx-auto px-4">
      <section id="studio" aria-label="Studio tour" className="studio-tour">
        <header className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-bold text-paperWhite md:text-3xl">
            {STUDIO_TOUR_HEADER.title}
          </h2>
          <p className="text-sm text-muted md:text-base">{STUDIO_TOUR_HEADER.subtitle}</p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
          <div className="studio-stage-wrap">
            <div className="studio-stage">
              <StudioDrawing activeIndex={activeIndex} />
              <p className="studio-caption" aria-live="polite">
                <span className="studio-caption-title">{activeStep.title}</span>
                <span className="studio-caption-gear">{activeStep.gear}</span>
              </p>
            </div>
          </div>

          <ol className="studio-steps">
            {STUDIO_TOUR_STEPS.map((step, index) => (
              <li
                key={step.id}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                data-step-index={index}
                className={["studio-step", activeIndex === index ? "studio-step--active" : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <h3 className="text-lg font-semibold text-paperWhite">
                  <button
                    type="button"
                    className="studio-step-button"
                    aria-pressed={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                  >
                    {step.title}
                  </button>
                </h3>
                <p className="mt-1 text-sm text-paperWhite/85">{step.gear}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.detail}</p>
                <p className="studio-step-outcome">{step.outcome}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <PsychedelicButton as="a" href="#mixmaster">
            Send a mix or master
          </PsychedelicButton>
          <GhostButton as="a" href="#bookings">
            Book a date
          </GhostButton>
        </div>
      </section>
    </ScrollReveal>
  );
}
