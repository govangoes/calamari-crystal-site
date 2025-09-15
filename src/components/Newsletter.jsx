/* global alert */
import { useState } from "react";
export default function Newsletter(){
  const [email,setEmail] = useState("");
  const submit = (e)=>{ e.preventDefault(); alert("Thanks! We'll keep you posted."); setEmail(""); };
  return (
    <form className="rounded-xl border border-white/10 p-4 bg-ink/40 space-y-2" onSubmit={submit}>
      <h3 className="font-semibold">Join the Crew</h3>
      <p className="opacity-80 text-sm">Get drops, shows, and secret lore.</p>
      <div className="flex gap-2">
        <input
          aria-label="Email address"
          className="flex-1 rounded px-3 py-2 bg-black/30 border border-white/10 outline-none"
          type="email" required placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button aria-label="Subscribe to newsletter" className="px-4 py-2 rounded bg-ultraviolet text-paperWhite">Subscribe</button>
      </div>
    </form>
  );
}
