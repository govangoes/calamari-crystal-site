export default function NotFound(){
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-black text-crystalMagenta tracking-widest">404</div>
        <p className="mt-3 text-opalGlow/90">This is not the page you are looking for.</p>
        <a href="/" className="inline-block mt-6 px-6 py-2 rounded-full border border-crystalCyan/40 hover:bg-crystalCyan/10 transition">Surface</a>
      </div>
    </div>
  )
}
