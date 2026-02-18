import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-paperWhite/10 bg-paperWhite/90 dark:bg-ink/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-ink/70 dark:text-paperWhite/70">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div>© {new Date().getFullYear()} GoVanGoes / Cloutlandish LLC</div>
          <nav className="flex gap-4 flex-wrap">
            <a
              className="hover:text-ink dark:hover:text-paperWhite"
              href="https://tiktok.com/@govangoes"
            >
              TikTok
            </a>
            <a
              className="hover:text-ink dark:hover:text-paperWhite"
              href="https://instagram.com/govangoes"
            >
              Instagram
            </a>
            <a
              className="hover:text-ink dark:hover:text-paperWhite"
              href="https://youtube.com/@govangoes"
            >
              YouTube
            </a>
            <Link className="hover:text-ink dark:hover:text-paperWhite" to="/press">
              Press
            </Link>
            <Link className="hover:text-ink dark:hover:text-paperWhite" to="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-ink dark:hover:text-paperWhite" to="/terms">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
