import React from "react";
import { FILE_UPLOAD_URL, SHOP_URL } from "../content/links.js";
import PsychedelicButton from "./ui/PsychedelicButton.jsx";
import PsychedelicTextureLayer from "./ui/PsychedelicTextureLayer.jsx";

export default function Hero() {
  const baseUrl = import.meta.env.BASE_URL;
  const hasShop = Boolean(SHOP_URL);
  return (
    <section
      id="start"
      aria-label="Introduction and calls to action"
      className="relative isolate flex flex-col items-center justify-center gap-6 overflow-hidden px-6 pb-32 pt-40 text-center sm:pb-40 sm:pt-48"
    >
      <PsychedelicTextureLayer variant="hero" strength="medium" />
      <div className="relative z-[1] text-center">
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
          <PsychedelicButton
            as="a"
            className="text-sm sm:text-base"
            href={`${baseUrl}#bookings`}
            aria-label="Book Go Van Goes for a show or event"
          >
            Book Me
          </PsychedelicButton>
          <PsychedelicButton as="a" href={`${baseUrl}#mixmaster`} className="text-sm sm:text-base">
            Mix &amp; Master
          </PsychedelicButton>
        </div>
        <div id="dock-sentinel" aria-hidden="true" className="mt-1 h-px w-full" />

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
          <a href={`${baseUrl}#music`} className="pill">
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
          {hasShop && (
            <a href={SHOP_URL} className="pill" target="_blank" rel="noopener noreferrer">
              Merch
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
