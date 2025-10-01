// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Forward any request starting with /api to your backend on port 5174
      '/api': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
