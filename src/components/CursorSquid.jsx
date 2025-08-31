import { useEffect, useState } from "react";

export default function CursorSquid() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ transform: `translate(${pos.x - 16}px, ${pos.y - 16}px)` }}
    >
      <div className="h-8 w-8 rounded-full bg-ultraviolet/35 ring-2 ring-crystal/60 shadow-crystal blur-[0.5px]"></div>
    </div>
  );
}
