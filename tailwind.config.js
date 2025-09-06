/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand core
        ink: "#0B0A0F",       // near-black canvas
        abyss: "#0F0B1E",     // deep section bg
        crystal: "#6B3DF4",   // Crystal Purple (primary)
        magenta: "#FF3AA7",   // Neon Magenta (accent)
        cyan: "#27F0FF",      // Electric Cyan (accent 2)
        gold: "#FFC857",      // Gold Aura (CTA/hover)
        paper: "#F5F7FA",     // Paper White (text on dark)
        smoke: "#A7AEC1",     // Subtext
      },
      backgroundImage: {
        // purple-forward hero gradient (less black)
        "hero-veil":
          "radial-gradient(80rem 40rem at 20% -10%, rgba(107,61,244,0.45) 0%, transparent 55%), radial-gradient(70rem 30rem at 100% 0%, rgba(255,58,167,0.35) 0%, transparent 60%), radial-gradient(60rem 30rem at 0% 100%, rgba(39,240,255,0.30) 0%, transparent 60%), linear-gradient(180deg, #0F0B1E 0%, #0B0A0F 100%)",
      },
      boxShadow: {
        "glow-gold": "0 0 25px rgba(255,200,87,0.35)",
        "glow-cyan": "0 0 25px rgba(39,240,255,0.25)",
      },
    },
  },
  plugins: [],
};
