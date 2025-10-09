// PostCSS config that works for Tailwind v3 and v4
// - If @tailwindcss/postcss exists (v4), use it
// - Otherwise fall back to tailwindcss (v3)
let tailwind;
try {
  // Tailwind v4
  // eslint-disable-next-line import/no-extraneous-dependencies
  tailwind = require('@tailwindcss/postcss');
} catch (e) {
  // Tailwind v3 fallback
  // eslint-disable-next-line import/no-extraneous-dependencies
  tailwind = require('tailwindcss');
}

module.exports = {
  plugins: [
    // Both v3 and v4 expose a plugin function we can call
    tailwind(),
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('autoprefixer')()
  ]
};

