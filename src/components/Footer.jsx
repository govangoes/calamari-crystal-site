export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/60">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <img src="/squid_emblem.png" alt="" className="h-6 w-6" />
            <h3 className="font-bold text-white">Calamari Crystal</h3>
          </div>
          <p className="text-white/70 mt-2">A psychedelic undersea saga—betrayal, treasure, redemption.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-white/80">
            <li><a href="https://tiktok.com/@govangoes" target="_blank">TikTok</a></li>
            <li><a href="https://instagram.com/govangoes" target="_blank">Instagram</a></li>
            <li><a href="https://youtube.com/@govangoes" target="_blank">YouTube</a></li>
            <li><a href="https://twitter.com/govangoes" target="_blank">Twitter/X</a></li>
            <li><a href="https://bere.al/govangoes" target="_blank">BeReal</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Support & Legal</h4>
          <ul className="space-y-1 text-white/80">
            <li><a href="/terms" className="opacity-70 pointer-events-none">Terms (soon)</a></li>
            <li><a href="/privacy" className="opacity-70 pointer-events-none">Privacy (soon)</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <p className="text-white/80">Bookings/press: <a className="underline" href="mailto:team@govangoes.com">team@govangoes.com</a></p>
        </div>
      </div>
      <div className="text-center text-white/50 text-xs py-4">© {new Date().getFullYear()} Cloutlandish LLC</div>
    </footer>
  );
}
