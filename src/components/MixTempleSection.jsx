import { useEffect, useRef, useState } from "react";
import { MIX_TEMPLE_HEADER, MIX_TEMPLE_HERO_SRC, MIX_TEMPLE_STEPS } from "../content/mixTemple.js";
import ScrollReveal from "./ScrollReveal.jsx";
import CrystalBadge from "./ui/CrystalBadge.jsx";
import CrystalCard from "./ui/CrystalCard.jsx";
import GhostButton from "./ui/GhostButton.jsx";
import PsychedelicButton from "./ui/PsychedelicButton.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";

const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: "-45% 0px -45% 0px",
  threshold: 0,
};

const PROOF_STRIP_ITEMS = ["Client-ready mix", "Notes welcome", "24–48h response"];

export default function MixTempleSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [failedFrames, setFailedFrames] = useState(() => new Set());
  const stepRefs = useRef([]);
  const safeStepIndex = Math.min(activeStepIndex, MIX_TEMPLE_STEPS.length - 1);
  const activeStep = MIX_TEMPLE_STEPS[safeStepIndex] || MIX_TEMPLE_STEPS[0];

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setPrefersReducedMotion(mediaQuery.matches);

    onMotionChange();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onMotionChange);
      return () => mediaQuery.removeEventListener("change", onMotionChange);
    }

    mediaQuery.addListener(onMotionChange);
    return () => mediaQuery.removeListener(onMotionChange);
  }, []);

  useEffect(() => {
    const frameSources = [MIX_TEMPLE_HERO_SRC, ...MIX_TEMPLE_STEPS.map((step) => step.frameSrc)];
    const preloaders = frameSources.map((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
      return image;
    });

    return () => {
      preloaders.forEach((image) => {
        image.src = "";
      });
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver((entries) => {
      const viewportCenter = window.innerHeight * 0.5;
      let nextStep = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const rawIndex = entry.target.getAttribute("data-step-index");
        const index = Number(rawIndex);
        if (Number.isNaN(index)) return;

        const rect = entry.target.getBoundingClientRect();
        const centerDistance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (centerDistance < nearestDistance) {
          nearestDistance = centerDistance;
          nextStep = index;
        }
      });

      if (nextStep === null) return;
      setActiveStepIndex((currentIndex) => (currentIndex === nextStep ? currentIndex : nextStep));
    }, OBSERVER_OPTIONS);

    const observedSteps = stepRefs.current.filter(Boolean);
    observedSteps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  const markFrameFailed = (source) => {
    setFailedFrames((previous) => {
      if (previous.has(source)) return previous;
      const next = new Set(previous);
      next.add(source);
      return next;
    });
  };

  const heroFrameMissing = failedFrames.has(MIX_TEMPLE_HERO_SRC);

  return (
    <ScrollReveal className="section section-shell mx-auto isolate px-4">
      <section
        id="mix-temple"
        className="mix-temple-root relative isolate overflow-hidden rounded-[26px] border border-white/15 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
        aria-label="THE MIX TEMPLE gear tour"
      >
        <div className="relative z-[1]">
          <SectionHeader
            eyebrow={MIX_TEMPLE_HEADER.eyebrow}
            title={MIX_TEMPLE_HEADER.title}
            subtitle={MIX_TEMPLE_HEADER.subtitle}
          />
          <ul className="mix-temple-proof-strip" aria-label="Mix Temple proof points">
            {PROOF_STRIP_ITEMS.map((item) => (
              <li key={item} className="mix-temple-proof-pill">
                {item}
              </li>
            ))}
          </ul>
          <p className="mix-temple-kicker">
            Scroll the steps to reveal each stage of the chain. The gear is proof, but the outcome
            is the point.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-10">
            <div>
              <div className="mix-temple-stage-sticky">
                <div className="mix-temple-stage">
                  {!heroFrameMissing && (
                    <img
                      src={MIX_TEMPLE_HERO_SRC}
                      alt="THE MIX TEMPLE studio shrine hero frame"
                      className="mix-temple-layer mix-temple-layer--base"
                      loading="lazy"
                      onError={() => markFrameFailed(MIX_TEMPLE_HERO_SRC)}
                    />
                  )}
                  <div aria-hidden="true">
                    {MIX_TEMPLE_STEPS.map((step, index) => {
                      const isActive = safeStepIndex === index;
                      const isMissing = failedFrames.has(step.frameSrc);
                      if (isMissing) return null;

                      const layerClassName = [
                        "mix-temple-layer",
                        "mix-temple-layer--overlay",
                        isActive ? "mix-temple-layer--active" : "",
                        prefersReducedMotion ? "mix-temple-layer--reduced-motion" : "",
                      ]
                        .filter(Boolean)
                        .join(" ");

                      return (
                        <img
                          key={step.id}
                          src={step.frameSrc}
                          alt=""
                          className={layerClassName}
                          loading="lazy"
                          onError={() => markFrameFailed(step.frameSrc)}
                        />
                      );
                    })}
                  </div>
                  <div className="mix-temple-stage-caption" aria-live="polite">
                    <p className="mix-temple-stage-caption-step">
                      Step {safeStepIndex + 1} of {MIX_TEMPLE_STEPS.length}
                    </p>
                    <h3 className="mix-temple-stage-caption-title">{activeStep.title}</h3>
                    <p className="mix-temple-stage-caption-outcome">{activeStep.outcome}</p>
                  </div>
                  {heroFrameMissing && (
                    <div className="mix-temple-frame-fallback">
                      Add frame PNGs in /public/mix-temple to preview visuals.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {MIX_TEMPLE_STEPS.map((step, index) => {
                const isActive = safeStepIndex === index;
                const cardClassName = [
                  "mix-temple-step-card",
                  isActive ? "mix-temple-step-card--active" : "",
                  prefersReducedMotion ? "mix-temple-step-card--reduced-motion" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <article
                    key={step.id}
                    ref={(node) => {
                      stepRefs.current[index] = node;
                    }}
                    data-step-index={index}
                    className="mix-temple-step"
                  >
                    <CrystalCard variant="outline" className={cardClassName}>
                      <CrystalBadge
                        variant="tag"
                        className={isActive ? "border-crystal/45 bg-crystal/15 text-crystal" : ""}
                      >
                        Step {index + 1}
                      </CrystalBadge>
                      <h3 className="mt-3 text-lg font-semibold text-paperWhite md:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-paperWhite/85">{step.subtitle}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{step.detail}</p>
                      <p className="mix-temple-step-outcome">{step.outcome}</p>
                      <p className="mix-temple-step-proof">Proof: {step.proof}</p>
                    </CrystalCard>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="mix-temple-actions">
            <PsychedelicButton as="a" href="#mixmaster" className="mix-temple-action-btn">
              Mix &amp; Master
            </PsychedelicButton>
            <GhostButton as="a" href="#bookings" className="mix-temple-action-btn">
              Book Me
            </GhostButton>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
