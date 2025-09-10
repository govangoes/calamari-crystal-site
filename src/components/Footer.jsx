export default function Footer(){
  return (
    <footer className="border-t border-paperWhite/10 bg-ink/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-paperWhite/70">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div>© {new Date().getFullYear()} GoVanGoes / Cloutlandish LLC</div>
          <nav className="flex gap-4 flex-wrap">
            <a className="hover:text-paperWhite" href="https://tiktok.com/@govangoes">TikTok</a>
            <a className="hover:text-paperWhite" href="https://instagram.com/govangoes">Instagram</a>
            <a className="hover:text-paperWhite" href="https://youtube.com/@govangoes">YouTube</a>
            <a className="hover:text-paperWhite" href="/press">Press</a>
            <a className="hover:text-paperWhite" href="/privacy">Privacy</a>
            <a className="hover:text-paperWhite" href="/terms">Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
