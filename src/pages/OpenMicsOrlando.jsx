import { useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { orlandoOpenMics } from "../data/orlandoOpenMics.js";
import CrystalBadge from "../components/ui/CrystalBadge.jsx";
import CrystalCard from "../components/ui/CrystalCard.jsx";
import CrystalInput from "../components/ui/CrystalInput.jsx";
import CrystalSelect from "../components/ui/CrystalSelect.jsx";
import Field from "../components/ui/Field.jsx";
import GhostButton from "../components/ui/GhostButton.jsx";
import Hairline from "../components/ui/Hairline.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";

export default function OpenMicsOrlando() {
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [dayFilter, setDayFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const uniqueGenres = useMemo(() => {
    const genres = new Set();
    orlandoOpenMics.forEach((event) => event.genre.forEach((g) => genres.add(g)));
    return Array.from(genres).sort();
  }, []);

  const uniqueDays = useMemo(() => {
    const days = new Set(orlandoOpenMics.map((event) => event.day));
    return Array.from(days).sort();
  }, []);

  const filteredEvents = useMemo(() => {
    return orlandoOpenMics.filter((event) => {
      const matchesSearch = search
        ? `${event.name} ${event.location} ${event.description}`
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;
      const matchesGenre =
        genreFilter === "all" || event.genre.map((g) => g.toLowerCase()).includes(genreFilter);
      const matchesDay = dayFilter === "all" || event.day === dayFilter;
      const matchesRating = ratingFilter === "all" || event.rating >= Number(ratingFilter);
      return matchesSearch && matchesGenre && matchesDay && matchesRating;
    });
  }, [search, genreFilter, dayFilter, ratingFilter]);

  return (
    <main className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B]/80 to-[#4F46E5] opacity-90" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.3),_transparent_60%)]" />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-8">
        <header className="space-y-6 text-center">
          <SectionHeader
            align="center"
            eyebrow="Calamari Crystal Presents"
            titleAs="h1"
            title="Orlando Open Mics"
            subtitle="Find the best spots to perform, connect, and vibe with the city. Curated hip-hop, poetry, comedy, and mixed-genre stages to keep you in the loop."
            className="mx-auto max-w-3xl"
          />
          <Hairline className="mx-auto max-w-xl" />
        </header>

        <CrystalCard variant="glass" className="grid gap-4 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Field label="Search" htmlFor="open-mics-search">
              <CrystalInput
                id="open-mics-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, venue, or vibe"
                className="text-base"
              />
            </Field>
            <Field label="Genre" htmlFor="open-mics-genre">
              <CrystalSelect
                id="open-mics-genre"
                value={genreFilter}
                onChange={(event) => setGenreFilter(event.target.value)}
                className="text-base"
              >
                <option value="all">All genres</option>
                {uniqueGenres.map((genre) => (
                  <option key={genre} value={genre.toLowerCase()}>
                    {genre}
                  </option>
                ))}
              </CrystalSelect>
            </Field>
            <Field label="Day" htmlFor="open-mics-day">
              <CrystalSelect
                id="open-mics-day"
                value={dayFilter}
                onChange={(event) => setDayFilter(event.target.value)}
                className="text-base"
              >
                <option value="all">All days</option>
                {uniqueDays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </CrystalSelect>
            </Field>
            <Field label="Rating" htmlFor="open-mics-rating">
              <CrystalSelect
                id="open-mics-rating"
                value={ratingFilter}
                onChange={(event) => setRatingFilter(event.target.value)}
                className="text-base"
              >
                <option value="all">All ratings</option>
                {["4.5", "4", "3.5", "3"].map((value) => (
                  <option key={value} value={value}>
                    {value}+ stars
                  </option>
                ))}
              </CrystalSelect>
            </Field>
          </div>
          <p className="text-sm text-muted">
            {filteredEvents.length} event{filteredEvents.length === 1 ? "" : "s"} match your
            filters.
          </p>
        </CrystalCard>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <CrystalCard
              as="article"
              variant="glass"
              key={event.name}
              className="group flex h-full flex-col justify-between border-white/20 bg-slate-900/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-crystal/60"
            >
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-paperWhite drop-shadow-md">
                    {event.name}
                  </h2>
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-ultraviolet transition group-hover:text-violet-200"
                  >
                    <span>{event.location}</span>
                    <span aria-hidden>↗</span>
                  </a>
                </div>
                <RatingStars rating={event.rating} />
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                  <CrystalBadge
                    variant="chip"
                    className="border-ultraviolet/50 bg-ultraviolet/15 text-crystal"
                  >
                    {event.day}
                  </CrystalBadge>
                  <CrystalBadge variant="chip" className="border-opal/40 bg-opal/10 text-opal">
                    {event.time}
                  </CrystalBadge>
                </div>
                <p className="text-base text-muted">{event.description}</p>
                {event.host && (
                  <p className="text-sm uppercase tracking-wide text-muted">
                    Host: <span className="text-paperWhite">{event.host}</span>
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {event.genre.map((tag) => (
                    <CrystalBadge
                      key={tag}
                      variant="chip"
                      className="border-white/20 bg-slate-900/65 text-muted transition group-hover:border-crystal/50 group-hover:text-paperWhite"
                    >
                      {tag}
                    </CrystalBadge>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <a
                  href={event.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ultraviolet transition hover:text-violet-200"
                >
                  Follow updates
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </CrystalCard>
          ))}
          {filteredEvents.length === 0 && (
            <CrystalCard
              variant="outline"
              className="col-span-full border-dashed border-white/20 bg-slate-900/50 p-10 text-center text-violet-100"
            >
              <p className="text-lg font-semibold">No open mics match those filters… yet.</p>
              <p className="mt-2 text-sm text-muted">
                Try clearing your search or picking a different genre to explore more vibes.
              </p>
            </CrystalCard>
          )}
        </div>

        <CrystalCard
          as="section"
          variant="solid"
          className="relative overflow-hidden rounded-3xl border-white/20 bg-gradient-to-br from-ultraviolet/32 via-slate-900/80 to-[#0F172A] p-10 text-center"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(226,232,240,0.12),_transparent_60%)]" />
          <h2 className="text-3xl font-extrabold text-paperWhite md:text-4xl">
            Submit Your Open Mic Event
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted">
            Want your event featured? Let GVG know! Share the details and we’ll amplify it across
            the Calamari Crystal network.
          </p>
          <GhostButton as={Link} to="/contact" className="mt-6">
            Submit your Open Mic
            <span aria-hidden>→</span>
          </GhostButton>
        </CrystalCard>
      </section>
    </main>
  );
}

function RatingStars({ rating }) {
  const id = useId();
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-2" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          const variant =
            rounded >= starValue ? "full" : rounded >= starValue - 0.5 ? "half" : "empty";
          const gradientId = `${id}-star-${index}`;
          return (
            <svg
              key={starValue}
              viewBox="0 0 20 20"
              className={`h-4 w-4 drop-shadow ${
                variant === "empty" ? "text-orange-300/30" : "text-orange-300"
              }`}
              aria-hidden="true"
            >
              {variant === "half" && (
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="currentColor" stopOpacity="0" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
              )}
              <path
                fill={
                  variant === "full"
                    ? "currentColor"
                    : variant === "half"
                      ? `url(#${gradientId})`
                      : "transparent"
                }
                stroke="currentColor"
                strokeWidth="1.2"
                d="M10 1.5l2.472 5.007 5.528.805-4 3.905.944 5.5L10 13.9l-4.944 2.817.944-5.5-4-3.905 5.528-.805z"
              />
            </svg>
          );
        })}
      </div>
      <span className="text-xs font-semibold text-orange-200">{rating.toFixed(1)}</span>
    </div>
  );
}
