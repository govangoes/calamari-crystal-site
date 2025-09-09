/**
 * Polished tagline lockup for the hero headline.
 * No duplicate exports – this file should only define TaglineLockup once.
 */
import React from "react";

export default function TaglineLockup() {
  return (
    <h1
      className="gvg-tagline"
      aria-label="Wildly Influential. Unapologetically Different."
    >
      <span className="wildly">Wildly</span>{" "}
      <span className="influential">Influential.</span>
      <br />
      <span className="unapologetic">Unapologetically</span>{" "}
      <span className="different">Different.</span>
      {/* Minimal tentacle underline */}
      <svg
        className="underline"
        viewBox="0 0 800 80"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M10,60 C160,10 360,10 790,60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </h1>
  );
}
