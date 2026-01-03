import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction and calls to action"
      className="relative flex flex-col items-center justify-center gap-6 px-6 pt-40 pb-32 text-center sm:pb-40 sm:pt-48"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Wildly influential.
          <br className="hidden md:block" />
          Unapologetically different.
        </h1>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="gradient-button"
            to="/services"
            aria-label="View services and book"
          >
            <span className="gradient-text">Book Services</span>
          </Link>
          <a href="/music" className="btn btn-secondary">
            Listen Now
          </a>
          <a
            href="https://www.youtube.com/@govangoes"
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch a Performance
          </a>
          <a href="/merch" className="btn btn-tertiary">
            Shop the Drop
          </a>
        </div>
      </div>
    </section>
  );
}
