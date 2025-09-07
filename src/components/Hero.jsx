import React from "react";
import "../styles/hero.css";

export default function Hero() {
  return (
    <header className="section bg-hero-gradient">
      <div className="container" style={{ textAlign: "center" }}>
        <h1 className="hero-title">
          Wildly influential. Unapologetically different.
        </h1>
        <p className="hero-lede">Art that makes noise.</p>

        <div className="btn-group">
          <a className="btn-primary" href="#listen">Listen Now</a>
          <a className="pill" href="#watch">Watch a Performance</a>
          <a className="pill" href="#shop">Shop the Drop</a>
        </div>
      </div>
    </header>
  );
}
