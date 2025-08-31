/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        ink:         'var(--core-richBlack)',
        graphite:    'var(--core-graphite)',
        paperWhite:  'var(--core-paperWhite)',
        monteGold:   'var(--core-gvgGold)',
        abyssNavy:   'var(--cc-abyssNavy)',
        ultraviolet: 'var(--cc-squidViolet)',
        crystal:     'var(--cc-crystalCyan)',
        magenta:     'var(--cc-crystalMagenta)',
        coral:       'var(--accent-coralPink)',
        jade:        'var(--core-jadeCore)',
        opal:        'var(--cc-opalGlow)',
      },
      backgroundImage:{
        'squid-gradient':'linear-gradient(135deg, var(--cc-squidViolet), var(--cc-crystalCyan))',
        'crystal-bloom': 'linear-gradient(90deg, var(--cc-crystalCyan), var(--cc-crystalMagenta), var(--cc-opalGlow))'
      },
      boxShadow:{ crystal:'0 0 24px rgba(0, 194, 255, .35)' }
    }
  },
  plugins:[]
}
