// PostCSS config that works for Tailwind v3 and v4
// - If @tailwindcss/postcss exists (v4), use it
// - Otherwise fall back to tailwindcss (v3)
let tailwind;
try {
  // Tailwind v4
  tailwind = require('@tailwindcss/postcss');
} catch {
  // Tailwind v3 fallback
  tailwind = require('tailwindcss');
}

module.exports = {
  plugins: [
    // Both v3 and v4 expose a plugin function we can call
    tailwind(),
    require('autoprefixer')()
  ]
};
