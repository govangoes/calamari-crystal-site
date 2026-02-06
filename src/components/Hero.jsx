import React from "react";
import { Link } from "react-router-dom";
import { FILE_UPLOAD_URL, MIX_MASTER_FORM_URL } from "../content/links.js";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction and calls to action"
      className="relative flex flex-col items-center justify-center gap-6 px-6 pt-40 pb-32 text-center sm:pb-40 sm:pt-48"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Booked for the show.
          <br className="hidden md:block" />
          Trusted in the mix.
        </h1>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="btn btn-primary"
            to="/bookings"
            aria-label="Book Go Van Goes for a show or event"
          >
            Book Me
          </Link>
          <a
            href={MIX_MASTER_FORM_URL}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mix &amp; Master My Vocals
          </a>
        </div>

        <div className="mt-6 mx-auto max-w-2xl text-sm text-paperWhite/70">
          <div className="grid gap-2 text-left sm:text-center">
            <span>Step 1: Fill out the form</span>
            <span>
              Step 2:{" "}
              <a
                className="underline text-paperWhite"
                href={FILE_UPLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Upload Files
              </a>
            </span>
            <span>Step 3: I&rsquo;ll reply with next steps and timeline</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/music" className="pill">
            Listen
          </a>
          <a
            href="https://www.youtube.com/@govangoes"
            className="pill"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch
          </a>
          <a href="/merch" className="pill">
            Merch
          </a>
        </div>
      </div>
    </section>
  );
}
