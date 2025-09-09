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
    </h1>
  );
}
