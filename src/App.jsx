import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <main className="min-h-screen bg-abyssNavy text-paperWhite">
      <section className="max-w-5xl mx-auto px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold">GoVanGoes • Calamari Crystal</h1>
        <p className="mt-3 opacity-85">Fresh baseline is live. Build your sections back up on this stable foundation.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/" className="btn btn-primary">Home</Link>
          <a href="https://www.youtube.com/@govangoes" className="btn bg-white/10 hover:bg-white/15">YouTube</a>
          <a href="/health" className="btn bg-white/10 hover:bg-white/15">Health</a>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
