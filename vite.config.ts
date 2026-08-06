import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths keep dist/ portable for any static host (cPanel/Namecheap).
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy data-viz vendors into cacheable chunks to keep the
        // portal dashboards lean and avoid the >500 kB chunk warning.
        manualChunks: {
          'vendor-charts': ['recharts'],
        },
      },
    },
  },
});
