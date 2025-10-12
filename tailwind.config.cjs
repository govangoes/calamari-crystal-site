/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0b0a0f",
        paper: "#f5f7fb",
        crystal: "#22d3ee",
        monteGold: "#ffd700",
      },
      boxShadow: {
        crystal: "0 0 0 1px rgba(128,255,255,.15), 0 12px 40px rgba(128,255,255,.12)",
      },
    },
  },
  plugins: [],
};
