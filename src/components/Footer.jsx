export default function Footer(){
  return (
    <footer className="border-t border-ink/10 dark:border-paperWhite/10 bg-paperWhite/90 dark:bg-ink/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-ink/70 dark:text-paperWhite/70">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div>© {new Date().getFullYear()} GoVanGoes / Cloutlandish LLC</div>
          <nav className="flex gap-4 flex-wrap">
            <a className="hover:text-ink dark:hover:text-paperWhite" href="https://www.instagram.com/govangoes/">Instagram</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="https://x.com/GoVanGoes">X / Twitter</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="https://www.tiktok.com/@govangoes">TikTok</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="https://www.youtube.com/@govangoes">YouTube</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="https://www.linkedin.com/in/evanmichaelfigueroa/">LinkedIn</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="https://www.reddit.com/user/GoVanGoes/">Reddit</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/press">Press</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/privacy">Privacy</a>
            <a className="hover:text-ink dark:hover:text-paperWhite" href="/terms">Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
