import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const isGhPages = process.env.GITHUB_PAGES === "true";
  return {
    base: isGhPages ? "/calamari-crystal-site/" : "/",
    plugins: [react()],
  };
});
