import TaglineLockup from "./TaglineLockup.jsx";
import SocialLinks from "./SocialLinks.jsx";

export default function Hero() {
  return (
    <section aria-label="Hero" className="bg-hero section">
      <div className="mx-auto max-w-3xl px-4">
        <TaglineLockup />
        <p className="lead" style={{ maxWidth: 720 }}>
          Art that makes noise — bars, showmanship, and a movement you can join.
        </p>
        <div className="flex gap-3 flex-wrap mt-6">
          <a href="/listen" className="btn-primary">Listen Now</a>
          <a href="/videos" className="btn-primary">Watch a Performance</a>
          <a href="/shop" className="btn-primary">Shop the Drop</a>
        </div>
        <div className="mt-5">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
