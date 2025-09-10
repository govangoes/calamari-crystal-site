import { BrowserRouter, Routes, Route } from "react-router-dom";
import CursorSquid from "./components/CursorSquid.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Story from "./pages/Story.jsx";
import Merch from "./pages/Merch.jsx";
import Marketing from "./pages/Marketing.jsx";
import Business from "./pages/Business.jsx";
import Contact from "./pages/Contact.jsx";
import EPK from "./pages/EPK.jsx";
import Music from "./pages/Music.jsx";
import Bookings from "./pages/Bookings.jsx";
import About from "./pages/About.jsx";
import Press from "./pages/Press.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-paperWhite text-ink dark:bg-abyssNavy dark:text-paperWhite">
        <CursorSquid />
        <NavBar />
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
          <Route path="/epk" element={<EPK />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
