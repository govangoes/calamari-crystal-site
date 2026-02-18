import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import TopNav from "./components/TopNav.jsx";
import Footer from "./components/Footer.jsx";
import CrystalDock from "./components/ui/CrystalDock.jsx";
import Home from "./pages/Home.jsx";

const Services = lazy(() => import("./pages/Services.jsx"));
const Story = lazy(() => import("./pages/Story.jsx"));
const Merch = lazy(() => import("./pages/Merch.jsx"));
const Marketing = lazy(() => import("./pages/Marketing.jsx"));
const Business = lazy(() => import("./pages/Business.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Press = lazy(() => import("./pages/Press.jsx"));
const Music = lazy(() => import("./pages/Music.jsx"));
const RapMap = lazy(() => import("./pages/RapMap.jsx"));
const Artists = lazy(() => import("./pages/Artists.jsx"));
const ArtistProfile = lazy(() => import("./pages/ArtistProfile.jsx"));
const LyricsLab = lazy(() => import("./pages/LyricsLab.jsx"));
const Upload = lazy(() => import("./pages/Upload.jsx"));
const OpenMicsOrlando = lazy(() => import("./pages/OpenMicsOrlando.jsx"));
const Bookings = lazy(() => import("./pages/Bookings.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RouteLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-paperWhite/70">
      Loading...
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const [isMenuOverlayActive, setIsMenuOverlayActive] = useState(false);
  const showCrystalDock = pathname === "/";

  return (
    <>
      <ScrollToTop />
      <div className="min-h-dvh bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-paperWhite flex flex-col">
        <TopNav onMenuStateChange={setIsMenuOverlayActive} />
        <div className="flex-1">
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/story" element={<Story />} />
              <Route path="/merch" element={<Merch />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/business" element={<Business />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/press" element={<Press />} />
              <Route path="/music" element={<Music />} />
              <Route path="/rap-map" element={<RapMap />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:id" element={<ArtistProfile />} />
              <Route path="/lyrics-lab" element={<LyricsLab />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/open-mics" element={<OpenMicsOrlando />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
        {showCrystalDock && <CrystalDock menuOpen={isMenuOverlayActive} />}
      </div>
    </>
  );
}
