export default function NotFound() {
  return (
    <main id="main" tabIndex="-1" className="min-h-[50vh] grid place-items-center px-4 text-center">
      <div>
        <h1 className="text-5xl font-extrabold">404</h1>
        <p className="opacity-80 mt-2">The current carried this page away.</p>
        <a href="/" className="inline-block mt-6 px-5 py-3 rounded bg-ultraviolet text-paperWhite">
          Back to shore
        </a>
      </div>
    </main>
  );
}
