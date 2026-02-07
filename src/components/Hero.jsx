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
        <div className="mx-auto max-w-[900px]">
          <h1 className="font-extrabold text-[clamp(2rem,3.6vw,4rem)] leading-[1.05] tracking-[-0.01em] drop-shadow-[0_2px_18px_rgba(8,12,24,0.35)]">
            <span className="block">Sound good. Look official. Move different.</span>
            <span className="mt-4 block text-[clamp(1rem,1.6vw,1.35rem)] font-medium leading-[1.5] text-paperWhite/80">
              <span>Mixing, mastering, and booking —</span>{" "}
              <span className="text-[0.82em] font-normal text-paperWhite/60">
                clean process, clear communication, serious results.
              </span>
            </span>
          </h1>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          <Link
            className="btn btn-primary text-sm sm:text-base"
            to="/bookings"
            aria-label="Book Go Van Goes for a show or event"
          >
            Book Me
          </Link>
          <a
            href={MIX_MASTER_FORM_URL}
            className="btn btn-primary text-sm sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mix &amp; Master My Vocals
          </a>
        </div>

        <div className="mt-6 mx-auto max-w-[560px] text-xs sm:text-sm text-paperWhite/60">
          <div className="grid gap-2 leading-relaxed text-left sm:text-center">
            <span>Step 1: Fill out the form and share your vision</span>
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
            <span>Step 3: I&rsquo;ll reply with next steps, timeline, and feedback welcome</span>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
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
