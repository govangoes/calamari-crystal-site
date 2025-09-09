import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // listen on all addresses (fixes IPv6 localhost issues)
    port: 5173,
    strictPort: true,  // fail if 5173 is taken instead of switching
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
})
