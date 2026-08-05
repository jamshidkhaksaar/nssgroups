import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  // Vercel rewrites deep links to index.html, so production assets must be root-relative.
  // Retain relative assets for the existing portable static-build workflow.
  base: process.env.VERCEL ? '/' : './',
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
