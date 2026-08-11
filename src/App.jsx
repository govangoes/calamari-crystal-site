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

const appRoutes = [
  { path: "/", Component: Home },
  { path: "/services", Component: Services },
  { path: "/story", Component: Story },
  { path: "/merch", Component: Merch },
  { path: "/marketing", Component: Marketing },
  { path: "/business", Component: Business },
  { path: "/contact", Component: Contact },
  { path: "/press", Component: Press },
  { path: "/epk", Component: Press },
  { path: "/music", Component: Music },
  { path: "/rap-map", Component: RapMap },
  { path: "/artists", Component: Artists },
  { path: "/artists/:id", Component: ArtistProfile },
  { path: "/lyrics-lab", Component: LyricsLab },
  { path: "/upload", Component: Upload },
  { path: "/open-mics", Component: OpenMicsOrlando },
  { path: "/open-mics-orlando", Component: OpenMicsOrlando },
  { path: "/bookings", Component: Bookings },
  { path: "/about", Component: About },
  { path: "/privacy", Component: Privacy },
  { path: "/terms", Component: Terms },
  { path: "*", Component: NotFound },
];

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
              {appRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </Suspense>
        </div>
        <Footer />
        {showCrystalDock && <CrystalDock menuOpen={isMenuOverlayActive} />}
      </div>
    </>
  );
}
