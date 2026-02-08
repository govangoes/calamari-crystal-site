import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import calamariTheme from "./theme/calamariTheme.js";
import "./index.css";

const baseUrl = import.meta.env.BASE_URL;
const basename = baseUrl === "/" ? "/" : baseUrl.replace(/\/$/, "");
const rootStyle = document.documentElement.style;
const themeVars = {
  "--cc-glow-strength": `${calamariTheme.glow.strength}`,
  "--cc-glow-hover-boost": `${calamariTheme.glow.hoverBoost}`,
  "--cc-glass-blur": `${calamariTheme.blur.glass}px`,
  "--cc-card-radius": `${calamariTheme.radius.md}px`,
  "--cc-radius-sm": `${calamariTheme.radius.sm}px`,
  "--cc-radius-lg": `${calamariTheme.radius.lg}px`,
  "--cc-shadow-depth": `${calamariTheme.shadow.depth}`,
  "--cc-texture-hero": `${calamariTheme.texture.hero}`,
  "--cc-texture-section": `${calamariTheme.texture.section}`,
  "--cc-focus-ring": `${calamariTheme.focus.ring}px`,
  "--cc-container-max": `${calamariTheme.spacing.containerMax}px`,
  "--cc-section-y": `${calamariTheme.spacing.sectionY}px`,
};

Object.entries(themeVars).forEach(([name, value]) => {
  rootStyle.setProperty(name, value);
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
