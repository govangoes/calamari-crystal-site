import { Link } from "react-router-dom";
import { Mic, Music, Sliders, PenTool, Speaker, Package, ArrowRight } from "lucide-react";
import { FILE_UPLOAD_URL, MIX_MASTER_FORM_URL } from "../content/links.js";

// Reusable Service Card Component with "Glass" Effect
const ServiceCard = ({ icon: Icon, title, desc, bestFor, delay }) => (
  <div
    className="group relative flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
  >
    {/* Glow Effect on Hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-crystal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="relative z-10">
      <div className="w-12 h-12 rounded-lg bg-crystal/20 flex items-center justify-center text-crystal mb-4 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-bold text-paperWhite">{title}</h3>
      <p className="mt-3 text-paperWhite/70 text-sm leading-relaxed min-h-[60px]">{desc}</p>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs font-semibold text-crystal uppercase tracking-wider">
          Best For:
        </p>
        <p className="text-sm text-paperWhite/90 mt-1">{bestFor}</p>
      </div>
    </div>
  </div>
);

export default function Services() {
  const services = [
    {
      title: "Mixing & Mastering",
      icon: Sliders,
      desc: "Clarity, balance, and polish with your vision leading the mix. Notes and revisions are part of the process.",
      bestFor: "Singles • EPs • Albums",
    },
    {
      title: "Vocal Production",
      icon: Mic,
      desc: "Clean vocals, tight timing, and tasteful polish while keeping the emotion intact.",
      bestFor: "Hooks • Verses • Harmonies",
    },
    {
      title: "Custom Production",
      icon: Music,
      desc: "Original production built around your cadence, story, and references, collaborative from sketch to final bounce.",
      bestFor: "Hip-Hop • R&B • Alternative",
    },
    {
      title: "Songwriting",
      icon: PenTool,
      desc: "Stronger hooks, cleaner verses, better structure. Co-writing available with a clear, discreet process.",
      bestFor: "Artists needing a pen upgrade",
    },
    {
      title: "Studio Design",
      icon: Speaker,
      desc: "Room analysis and treatment guidance so your recordings translate outside the room.",
      bestFor: "Home Studios • Serious Creators",
    },
    {
      title: "Development Packages",
      icon: Package,
      desc: "A focused roadmap: sound identity, branding, release strategy, and content built around your vision.",
      bestFor: "Career Artists",
    },
  ];

  return (
    <section className="relative min-h-screen">
      {/* Background Ambience (Optional extra texture) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">

        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-paperWhite via-crystal to-paperWhite bg-[length:200%_auto] animate-gradient-x">
            Build Your Sound, With Care.
          </h1>
          <p className="mt-6 text-xl text-paperWhite/80 leading-relaxed">
            Mixing, mastering, and artist support with clear communication and a guided process.
            <br className="hidden md:block" />
            Your vision leads the decisions, and feedback is always welcome.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link className="btn btn-primary px-8 py-3 text-lg" to="/bookings">
              Book Me
            </Link>
            <a
              className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition text-paperWhite font-semibold flex items-center gap-2"
              href={MIX_MASTER_FORM_URL}
              target="_blank"
              rel="noreferrer"
            >
              Mix &amp; Master My Vocals <ArrowRight size={18} />
            </a>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-paperWhite/70">
            <span>Step 1: Fill out the form and share your vision</span>
            <span>
              Step 2:{" "}
              <a
                className="underline text-paperWhite"
                href={FILE_UPLOAD_URL}
                target="_blank"
                rel="noreferrer"
              >
                Upload Files
              </a>
            </span>
            <span>Step 3: I&rsquo;ll reply with next steps, timeline, and feedback welcome</span>
          </div>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-crystal/20 to-purple-900/20 border border-crystal/30 text-center backdrop-blur-lg">
          <h2 className="text-3xl font-bold text-paperWhite">Ready When You Are.</h2>
          <p className="mt-4 text-paperWhite/80 max-w-2xl mx-auto text-lg">
            I keep a focused roster so each project gets attention, clarity, and care.
          </p>
          <div className="mt-8">
            <Link className="btn btn-primary inline-flex items-center gap-2" to="/contact">
              Start Your Project <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
