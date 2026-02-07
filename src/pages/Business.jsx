import { Link } from "react-router-dom";

export default function Business() {
  const streams = [
    ["Live/Bookings", "$30k target"],
    ["Merch", "$12k target"],
    ["YouTube", "$8k target"],
    ["Patreon/Members", "$7k target"],
    ["Licensing/Digital", "$5k target"],
  ];
  return (
    <section className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">Cloutlandish LLC • Year 1 Focus</h1>
        <p className="opacity-80 mt-2">Power • Play • Precision</p>
      </header>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {streams.map(([name, goal]) => (
          <div key={name} className="p-6 rounded-xl bg-ink/50 border border-white/10">
            <div className="font-semibold">{name}</div>
            <div className="opacity-80 mt-1">{goal}</div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link
          className="px-5 py-3 rounded bg-monteGold text-ink hover:opacity-90"
          to="/contact"
        >
          Booking & Collabs
        </Link>
      </div>
    </section>
  );
}
