import { useState } from "react";
export default function Newsletter(){
  const [email,setEmail] = useState("");
  const submit = (e)=>{ e.preventDefault(); alert("Thanks! We’ll keep you posted."); setEmail(""); };
  return (
    <form onSubmit={submit} className="card p-4 space-y-2">
      <h3 className="font-semibold">Join the Crew</h3>
      <p className="opacity-80 text-sm">Get drops, shows, and secret lore.</p>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded px-3 py-2 outline-none"
          type="email" required placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="btn-primary">Subscribe</button>
      </div>
    </form>
  );
}
