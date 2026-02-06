import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/calamari-crystal-site/", // must match repo name
  plugins: [react()],
});
