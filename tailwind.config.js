/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
      "core": {
            "gvgGold": "#F4C24E",
            "deepGold": "#B57F1B",
            "jadeCore": "#2EAD5F",
            "darkJade": "#0B5D3B",
            "haloMint": "#C9F7C5",
            "richBlack": "#0B0B0E",
            "graphite": "#1F1F23",
            "paperWhite": "#F7F7FB"
      },
      "accents": {
            "royalPurple": "#6C2BD9",
            "neonMagenta": "#E039F5",
            "electricBlue": "#00C2FF",
            "sunflowerYellow": "#FFC300",
            "coralPink": "#FF6DAE",
            "warmOrange": "#FF8A00"
      },
      "calamariCrystal": {
            "squidViolet": "#7D3AC1",
            "tentaclePlum": "#542A91",
            "deepSeaBlue": "#0B5D8C",
            "abyssNavy": "#062A3F",
            "crystalCyan": "#5FE1FF",
            "crystalMagenta": "#FF6AD5",
            "opalGlow": "#C8A9FF",
            "starshineWhite": "#F9F9FF"
      },
      "gradients": {
            "goldToBrass": [
                  "#F8D563",
                  "#B98100"
            ],
            "jadeToDeepJade": [
                  "#289A3C",
                  "#0B5D3B"
            ],
            "crystalBloom": [
                  "#5FE1FF",
                  "#FF6AD5",
                  "#C8A9FF"
            ]
      }
},
      boxShadow: {
        glow: '0 0 40px rgba(238,62,150,0.35), 0 0 80px rgba(0,246,255,0.15)'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        drift: {
          '0%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(8px,-6px)' },
          '100%': { transform: 'translate(0,0)' }
        }
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        drift: 'drift 10s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
