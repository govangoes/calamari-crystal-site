import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-squid-gradient">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">Calamari Crystal</h1>
            <p className="mt-4 text-paperWhite/80">
              A concept odyssey — betrayal, treasure, revenge, redemption.
            </p>
          </div>
          <div className="relative">
            <img
              src="/squid_emblem.png"
              alt="Squid Emblem"
              className="w-full drop-shadow-2xl shadow-crystal"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
