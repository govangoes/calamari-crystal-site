import { Link } from "react-router-dom";
import { SHOP_URL } from "../content/links.js";
import { BRAND } from "../content/services.js";
import GhostButton from "./ui/GhostButton.jsx";
import PsychedelicButton from "./ui/PsychedelicButton.jsx";
import PsychedelicTextureLayer from "./ui/PsychedelicTextureLayer.jsx";

export default function Hero() {
  const baseUrl = import.meta.env.BASE_URL;
  const hasShop = Boolean(SHOP_URL);
  return (
    <section
      id="start"
      aria-label="Introduction and calls to action"
      className="relative isolate flex flex-col items-center justify-center gap-6 overflow-hidden px-6 pb-28 pt-36 text-center sm:pb-36 sm:pt-44"
    >
      <PsychedelicTextureLayer variant="hero" strength="medium" />
      <div className="relative z-[1] text-center">
        <div className="mx-auto max-w-[900px]">
          <img
            src={`${baseUrl}govangoes-mark.webp`}
            alt="GoVanGoes logo"
            width="512"
            height="512"
            className="mx-auto mb-6 h-32 w-32 drop-shadow-[0_8px_30px_rgba(234,179,8,0.25)] sm:h-44 sm:w-44"
          />
          <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-crystal">
            {BRAND.company} · {BRAND.location}
          </p>
          <h1 className="font-extrabold text-[clamp(2rem,3.6vw,4rem)] leading-[1.05] tracking-[-0.01em] drop-shadow-[0_2px_18px_rgba(8,12,24,0.35)]">
            <span className="block">{BRAND.tagline}</span>
            <span className="mx-auto mt-5 block max-w-[46rem] text-[clamp(1rem,1.6vw,1.3rem)] font-medium leading-[1.5] text-paperWhite/82">
              Live performance and hosting, mixing and mastering, and studio consulting from one
              artist and engineer. Request a date or send a project in minutes.
            </span>
          </h1>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          <GhostButton
            as={Link}
            to="/bookings"
            className="text-sm sm:text-base"
            aria-label="Request a date to book GoVanGoes for a show or event"
          >
            Book a Date
          </GhostButton>
          <PsychedelicButton as="a" href={`${baseUrl}#mixmaster`} className="text-sm sm:text-base">
            Mix &amp; Master
          </PsychedelicButton>
        </div>
        <div id="dock-sentinel" aria-hidden="true" className="mt-1 h-px w-full" />

        <p className="mt-6 text-xs text-paperWhite/60 sm:text-sm">
          Every request is reviewed by hand. Expect a reply within 24–48 hours.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/services" className="pill">
            All services
          </Link>
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
