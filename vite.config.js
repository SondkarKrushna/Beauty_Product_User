import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
     server: {
    host: "0.0.0.0", // ← important for Cloudflare tunnel
    port: 5173,
    strictPort: true, // ensures it doesn’t jump to another port
     allowedHosts: [
      "reduced-soup-residents-cleared.trycloudflare.com", // 👈 add your Cloudflare Tunnel domain here
    ],
  },
})
