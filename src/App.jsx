import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import setSEO from "./utils/seo.js";
import ScrollProgress from "./components/ScrollProgress.jsx";
import CursorSquid from "./components/CursorSquid.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import BackgroundPattern from "./components/BackgroundPattern.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Story = lazy(() => import("./pages/Story.jsx"));
const Merch = lazy(() => import("./pages/Merch.jsx"));
const Marketing = lazy(() => import("./pages/Marketing.jsx"));
const Business = lazy(() => import("./pages/Business.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
// EPK route aliases to Press content
const Music = lazy(() => import("./pages/Music.jsx"));
const Bookings = lazy(() => import("./pages/Bookings.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Press = lazy(() => import("./pages/Press.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollProgress />
      <RouteSEO />
      <BackgroundPattern />
      <div className="relative z-10 min-h-screen text-ink dark:text-paperWhite">
        <CursorSquid />
        <NavBar />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/music" element={<Music />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/business" element={<Business />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/about" element={<About />} />
            <Route path="/press" element={<Press />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/epk" element={<Press />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function RouteSEO() {
  const location = useLocation();
  useEffect(() => {
    const entry = ROUTE_SEO_MAP[location.pathname] || ROUTE_SEO_MAP["/"];
    setSEO({ ...entry, site: "GoVanGoes" });
  }, [location.pathname]);

  return null;
}

const ROUTE_SEO_MAP = {
  "/": {
    title: "GoVanGoes — Calamari Crystal",
    description: "Bold performance hip‑hop. Power, play, precision. Underdogs rise.",
  },
  "/story": { title: "Story — GoVanGoes", description: "The Calamari Crystal saga." },
  "/music": { title: "Music — GoVanGoes", description: "Listen to tracks and mixes." },
  "/merch": { title: "Merch — GoVanGoes", description: "Official merch and drops." },
  "/marketing": {
    title: "Marketing — GoVanGoes",
    description: "Brand, campaigns, collaborations.",
  },
  "/business": { title: "Business — GoVanGoes", description: "Booking, partnerships, press." },
  "/contact": { title: "Contact — GoVanGoes", description: "Reach the crew." },
  "/bookings": { title: "Bookings — GoVanGoes", description: "Book performances and events." },
  "/about": { title: "About — GoVanGoes", description: "Who we are." },
  "/press": { title: "Press — GoVanGoes", description: "Press kit and assets." },
  "/privacy": { title: "Privacy — GoVanGoes" },
  "/terms": { title: "Terms — GoVanGoes" },
  "/epk": { title: "EPK — GoVanGoes", description: "Electronic press kit." },
};

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50vh] items-center justify-center px-6 py-16"
    >
      <span className="animate-pulse text-lg font-semibold tracking-wide text-ink/70 dark:text-paperWhite/70">
        Loading experience…
      </span>
    </div>
  );
}
