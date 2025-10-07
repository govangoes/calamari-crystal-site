export default function Footer(){
  return (
    <footer className="border-t border-ink/10 dark:border-paperWhite/10 bg-paperWhite/90 dark:bg-ink/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-ink/70 dark:text-paperWhite/70">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div>© {new Date().getFullYear()} GoVanGoes / Cloutlandish LLC</div>
          <nav className="flex gap-4 flex-wrap">
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/story">Story</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/music">Music</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/merch">Merch</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/news">News</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/bookings">Bookings</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/press">Press</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/privacy">Privacy</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/terms">Terms</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="https://instagram.com/govangoes">Instagram</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="https://tiktok.com/@govangoes">TikTok</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="https://youtube.com/@govangoes">YouTube</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
