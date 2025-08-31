import { useState } from "react";

export default function Newsletter() {
  const [status, setStatus] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");
    if (!email) return;
    try {
      // TODO: Replace with your real newsletter endpoint
      await fetch("https://api.buttondown.email/v1/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Token YOUR_TOKEN_HERE" },
        body: JSON.stringify({ email })
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-3xl text-center">
      <h3 className="text-2xl font-bold text-white">Join the Crew</h3>
      <p className="text-white/70 mt-2">Get drops, lore, and secret tracks from the Calamari Crystal vault.</p>
      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <input
          name="email"
          type="email"
          required
          placeholder="you@oceanmail.com"
          className="flex-1 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
        />
        <button className="rounded-md bg-white text-black font-semibold px-4 py-2 hover:bg-white/90">Sign up</button>
      </form>
      {status === "success" && <p className="text-emerald-300 mt-2">Aye! Check your inbox.</p>}
      {status === "error" && <p className="text-red-300 mt-2">Hmm—couldn’t subscribe. Try again?</p>}
    </section>
  );
}
