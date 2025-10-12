/**
 * Kraken Edition Villain Theme for GoVanGoes Calamari Crystal Site
 * A dark, underwater-inspired theme with villain aesthetics
 * Features styled-components theming with deep navy, teal, and glowing accents
 */

// Deep Ocean Color Palette - Villain Edition
const colors = {
  // Primary Kraken Colors
  deepNavy: "#0B1426", // Darkest depths
  abyssNavy: "#1A2B47", // Deep ocean floor
  krakenTeal: "#1B4D4D", // Dark teal tentacles
  poisonTeal: "#2A6969", // Toxic waters

  // Glowing Accents - Bioluminescent
  electricTeal: "#00FFCC", // Electric kraken glow
  acidGreen: "#39FF14", // Toxic bioluminescence
  ghostBlue: "#4DEEEA", // Spectral underwater light
  coralGlow: "#FF6B9D", // Coral reef villain accent

  // Neutral Depths
  charcoalGrey: "#2C3E50", // Dark coral reef
  stormGrey: "#34495E", // Stormy ocean surface
  fogGrey: "#7F8C8D", // Ocean mist
  pearlWhite: "#ECF0F1", // Pearl highlights

  // Danger/Warning (Villain Theme)
  bloodRed: "#E74C3C", // Danger/warning
  toxicYellow: "#F1C40F", // Caution/warning
};

// Typography - Cinematic & Villainous
const typography = {
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    heading: '"Playfair Display", serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing Scale - Ocean Depths
const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
};

// Shadows - Underwater Depths & Glows
const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
  base: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
  lg: "0 8px 16px 0 rgba(0, 0, 0, 0.3)",
  xl: "0 12px 24px 0 rgba(0, 0, 0, 0.25)",

  // Glowing Effects - Villain Theme
  electricGlow: `0 0 20px ${colors.electricTeal}40`,
  acidGlow: `0 0 15px ${colors.acidGreen}60`,
  ghostGlow: `0 0 25px ${colors.ghostBlue}30`,
  coralGlow: `0 0 18px ${colors.coralGlow}50`,

  // Inset depths
  inset: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)",
  insetLg: "inset 0 4px 8px 0 rgba(0, 0, 0, 0.4)",
};

// Border Radius - Organic Ocean Shapes
const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px", // Full round
  blob: "30% 70% 70% 30% / 30% 30% 70% 70%", // Organic blob shape
};

// Animations - Fluid Ocean Motion
const animations = {
  durations: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "750ms",
  },
  easings: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    wave: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  },
};

// Breakpoints - Responsive Ocean
const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Main Theme Object - Kraken Edition
const krakenTheme = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  animations,
  breakpoints,

  // Component-specific styles
  components: {
    // Buttons - Villain Style
    button: {
      primary: {
        bg: colors.krakenTeal,
        hoverBg: colors.poisonTeal,
        text: colors.pearlWhite,
        shadow: shadows.electricGlow,
        borderRadius: borderRadius.lg,
      },
      secondary: {
        bg: "transparent",
        hoverBg: colors.abyssNavy,
        text: colors.electricTeal,
        border: `2px solid ${colors.electricTeal}`,
        shadow: shadows.ghostGlow,
        borderRadius: borderRadius.lg,
      },
    },

    // Cards - Deep Ocean Panels
    card: {
      bg: colors.abyssNavy,
      border: `1px solid ${colors.krakenTeal}40`,
      shadow: shadows.lg,
      borderRadius: borderRadius.xl,
      glow: shadows.ghostGlow,
    },

    // Navigation - Surface Waters
    nav: {
      bg: `${colors.deepNavy}95`,
      backdropBlur: "12px",
      border: `1px solid ${colors.krakenTeal}20`,
      shadow: shadows.base,
    },

    // Hero Section - Kraken's Domain
    hero: {
      bg: `linear-gradient(135deg, ${colors.deepNavy} 0%, ${colors.abyssNavy} 50%, ${colors.krakenTeal} 100%)`,
      overlay: `${colors.deepNavy}60`,
      glow: shadows.electricGlow,
    },
  },

  // Utility functions
  utils: {
    // Generate rgba color with opacity
    rgba: (color, opacity) =>
      `${color}${Math.floor(opacity * 255)
        .toString(16)
        .padStart(2, "0")}`,

    // Responsive breakpoint helper
    responsive: (values) => {
      const keys = Object.keys(breakpoints);
      return keys.reduce((acc, key, index) => {
        if (values[index] !== undefined) {
          acc[`@media (min-width: ${breakpoints[key]})`] = values[index];
        }
        return acc;
      }, {});
    },
  },
};

export default krakenTheme;

/**
 * SITE DEVELOPMENT DOCUMENTATION
 * ==============================
 *
 * This theme supports the following pages and tools:
 *
 * PAGES TO BE STYLED:
 * ├── Home (Hero, Features, CTA)
 * ├── Story (Concept Album Narrative)
 * ├── Merch (Product Catalog)
 * ├── Marketing (Press Kit, Media)
 * ├── Business (Contact, Services)
 * └── Contact (Form, Social Links)
 *
 * DEVELOPMENT TOOLS:
 * ├── Vite (Build Tool)
 * ├── React (UI Framework)
 * ├── Tailwind CSS (Utility Classes)
 * ├── Styled Components (Theme Provider)
 * ├── Vercel (Deployment)
 * └── GitHub Actions (CI/CD)
 *
 * COMPONENTS TO IMPLEMENT:
 * ├── ThemeProvider (Styled Components)
 * ├── Hero Section with Kraken Animation
 * ├── Navigation with Glass Effect
 * ├── Cards with Glow Effects
 * ├── Buttons with Hover States
 * ├── Forms with Validation
 * ├── Loading States
 * └── Responsive Layout Grid
 *
 * USAGE EXAMPLE:
 * ```jsx
 * import { ThemeProvider } from 'styled-components';
 * import krakenTheme from './styles/theme.js';
 *
 * function App() {
 *   return (
 *     <ThemeProvider theme={krakenTheme}>
 *       <YourComponents />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 *
 * STYLED COMPONENT EXAMPLE:
 * ```jsx
 * import styled from 'styled-components';
 *
 * const HeroSection = styled.section`
 *   background: ${props => props.theme.components.hero.bg};
 *   box-shadow: ${props => props.theme.components.hero.glow};
 *   padding: ${props => props.theme.spacing[16]} ${props => props.theme.spacing[8]};
 *
 *   @media (min-width: ${props => props.theme.breakpoints.md}) {
 *     padding: ${props => props.theme.spacing[24]} ${props => props.theme.spacing[12]};
 *   }
 * `;
 * ```
 */
