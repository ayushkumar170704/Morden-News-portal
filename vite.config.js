// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // use '@/...' instead of relative paths
    }
  },
  server: {
    port: 5173, // change if needed
    open: true  // auto-open browser on dev start
  }
})
