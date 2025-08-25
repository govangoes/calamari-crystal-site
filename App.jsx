import { useEffect, useState } from 'react'
import { Moon, Sun, Gem } from 'lucide-react'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Story from './pages/Story.jsx'
import Merch from './pages/Merch.jsx'
import Marketing from './pages/Marketing.jsx'
import Business from './pages/Business.jsx'
import Contact from './pages/Contact.jsx'
import CursorSquid from './components/CursorSquid.jsx'
import { Link, Routes, Route } from 'react-router-dom'

export default function App(){
  const [dark, setDark] = useState(true)
  useEffect(() => {
    const html = document.documentElement
    dark ? html.classList.add('dark') : html.classList.remove('dark')
  }, [dark])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-deepSeaBlue to-abyssNavy">
      {/* squid cursor */}
      <CursorSquid />
      {/* Header with navigation */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-richBlack/40 border-b border-crystalMagenta/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Gem className="w-6 h-6 text-crystalCyan" />
            <span className="font-black text-xl text-paperWhite">Calamari&nbsp;Crystal</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link to="/story" className="text-opalGlow hover:text-crystalCyan">Story</Link>
            <Link to="/merch" className="text-opalGlow hover:text-crystalCyan">Merch</Link>
            <Link to="/marketing" className="text-opalGlow hover:text-crystalCyan">Strategy</Link>
            <Link to="/business" className="text-opalGlow hover:text-crystalCyan">Business</Link>
            <Link to="/contact" className="text-opalGlow hover:text-crystalCyan">Contact</Link>
          </nav>
          <button
            aria-label="Toggle dark mode"
            onClick={() => setDark(d => !d)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-opalGlow/30 text-opalGlow hover:bg-opalGlow/10 transition"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="text-sm">{dark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </header>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/business" element={<Business />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
