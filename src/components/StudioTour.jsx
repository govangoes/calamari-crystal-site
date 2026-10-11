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

      {/* studio monitors: two-way cabinet, ribbon tweeter in a waveguide, big woofer */}
      <g className={gearClass("monitors", activeIndex)}>
        {[62, 654].map((x) => (
          <g key={x}>
            <rect x={x} y="190" width="84" height="146" rx="7" />
            <rect x={x + 8} y="198" width="68" height="34" rx="5" className="studio-detail" />
            <rect x={x + 26} y="206" width="32" height="18" rx="3" className="studio-ribbon" />
            <circle cx={x + 42} cy="288" r="29" className="studio-detail" />
            <circle cx={x + 42} cy="288" r="21" className="studio-detail" />
            <circle cx={x + 42} cy="288" r="8" className="studio-cone" />
            <rect x={x + 30} y="324" width="24" height="3" rx="1.5" className="studio-dot" />
            <rect x={x + 18} y="336" width="48" height="46" className="studio-stand" />
          </g>
        ))}
      </g>

      {/* curved ultrawide screen with a session on it */}
      <g className={gearClass("screen", activeIndex)}>
        <path d="M166 126 Q400 142 634 126 L634 308 Q400 324 166 308 Z" />
        <path d="M172 132 Q400 147 628 132 L628 302 Q400 317 172 302 Z" className="studio-detail" />
        <path d="M398 316 L402 316 L406 372 L394 372 Z" className="studio-stand" />
        <path d="M344 382 Q400 366 456 382 Z" className="studio-stand" />
        <g className="studio-session">
          <rect x="188" y="150" width="62" height="8" rx="2" />
          <rect x="188" y="170" width="260" height="10" rx="2" />
          <rect x="188" y="190" width="200" height="10" rx="2" />
          <rect x="188" y="210" width="320" height="10" rx="2" />
          <rect x="188" y="230" width="170" height="10" rx="2" />
          <rect x="188" y="250" width="280" height="10" rx="2" />
          <rect x="188" y="270" width="230" height="10" rx="2" />
          <rect
            x="552"
            y="160"
            width="8"
            height="110"
            rx="2"
            className="studio-meter studio-meter--a"
          />
          <rect
            x="568"
            y="160"
            width="8"
            height="110"
            rx="2"
            className="studio-meter studio-meter--b"
          />
          <rect x="588" y="160" width="26" height="110" rx="3" className="studio-fader" />
        </g>
      </g>

      {/* Mac Studio: low aluminium box, ports and SD slot on the front */}
      <g className={gearClass("mac", activeIndex)}>
        <rect x="556" y="340" width="88" height="42" rx="9" className="studio-metal" />
        <rect x="556" y="340" width="88" height="8" rx="4" className="studio-detail" />
        <rect x="568" y="356" width="9" height="5" rx="2.5" className="studio-port" />
        <rect x="581" y="356" width="9" height="5" rx="2.5" className="studio-port" />
        <rect x="614" y="356" width="18" height="3" rx="1" className="studio-port" />
      </g>

      {/* headphones: closed-back, big cups */}
      <g className={gearClass("phones", activeIndex)}>
        <path
          d="M458 380 L458 352 Q458 326 490 326 Q522 326 522 352 L522 380"
          fill="none"
          className="studio-band"
        />
        <path
          d="M464 346 Q464 334 490 334 Q516 334 516 346"
          fill="none"
          className="studio-detail"
        />
        <rect x="448" y="350" width="20" height="30" rx="9" />
        <rect x="512" y="350" width="20" height="30" rx="9" />
        <rect x="453" y="357" width="10" height="16" rx="5" className="studio-detail" />
        <rect x="517" y="357" width="10" height="16" rx="5" className="studio-detail" />
      </g>

      {/* interface: desktop box, big gain knob, input meters */}
      <g className={gearClass("interface", activeIndex)}>
        <rect x="252" y="350" width="72" height="32" rx="5" className="studio-metal" />
        <circle cx="300" cy="366" r="10" className="studio-knob" />
        <circle cx="300" cy="366" r="4" className="studio-detail" />
        <rect x="260" y="358" width="22" height="3" rx="1.5" className="studio-dot" />
        <rect x="260" y="366" width="16" height="3" rx="1.5" className="studio-dot" />
        <circle cx="314" cy="373" r="2" className="studio-dot" />
      </g>

      {/* Cloudlifter: small metal box with XLR ends */}
      <g className={gearClass("boost", activeIndex)}>
        <rect x="190" y="358" width="44" height="24" rx="3" className="studio-metal" />
        <circle cx="190" cy="370" r="5" className="studio-detail" />
        <circle cx="234" cy="370" r="5" className="studio-detail" />
        <rect x="203" y="365" width="18" height="3" rx="1" className="studio-dot" />
      </g>

      {/* mic stand, boom, SM7B (foam windscreen, yoke) and vocal booth */}
      <g className={gearClass("mic", activeIndex)}>
        <path d="M44 382 L44 60 L226 86" fill="none" className="studio-stand-line" />
        <path d="M24 382 L64 382" className="studio-stand-line" />
        <circle cx="44" cy="60" r="5" className="studio-knob" />
        <path d="M244 56 A74 74 0 0 1 244 204" fill="none" className="studio-booth" />
        <g transform="translate(236 90) rotate(8)">
          <path d="M-22 6 Q-22 56 0 62 Q22 56 22 6" fill="none" className="studio-detail" />
          <rect x="-15" y="-2" width="30" height="46" rx="14" className="studio-foam" />
          <rect x="-13" y="42" width="26" height="40" rx="5" />
          <rect x="-13" y="50" width="26" height="4" className="studio-detail" />
          <rect x="-4" y="82" width="8" height="12" className="studio-stand" />
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
