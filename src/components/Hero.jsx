import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction and calls to action"
      className="relative flex flex-col items-center justify-center gap-6 px-6 pt-40 pb-32 text-center sm:pb-40 sm:pt-48"
    >
      <h1 className="max-w-4xl text-6xl font-extrabold leading-tight tracking-tighter sm:text-7xl md:text-8xl">
        GoVanGoes — Jazz for the People
      </h1>
      <p className="max-w-2xl text-lg font-semibold leading-relaxed text-slate-400 sm:text-xl sm:leading-relaxed">
        Bringing classic jazz standards and original compositions to life with
        soul and energy.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
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
    </section>
  );
}
