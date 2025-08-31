/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyssNavy:  'var(--abyss-navy)',
        paperWhite: 'var(--paper-white)',
        ultraviolet:'var(--ultraviolet)',
        crystal:    'var(--crystal-teal)',
        monteGold:  'var(--monte-gold)',
        ink:        'var(--ink)',
        bloodCoral: 'var(--blood-coral)',
        kelp:       'var(--kelp-green)',
      },
      backgroundImage: {
        'squid-gradient': 'linear-gradient(135deg, var(--ultraviolet), var(--crystal-teal))',
      },
      boxShadow: {
        crystal: '0 0 24px rgba(34,211,238,.35)',
      },
    },
  },
  plugins: [],
}
