// PostCSS config compatible with Tailwind v3 and v4.
// - On Tailwind v4, use the new @tailwindcss/postcss plugin
// - On Tailwind v3, fall back to the legacy 'tailwindcss' plugin key
export default async () => {
  let tailwind;
  try {
    // Prefer the Tailwind v4 package if present
    tailwind = (await import('@tailwindcss/postcss')).default;
  } catch {
    // Fallback for Tailwind v3 projects
    tailwind = (await import('tailwindcss')).default;
  }
  const autoprefixer = (await import('autoprefixer')).default;
  return {
    plugins: [tailwind(), autoprefixer()]
  };
};
