import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // '/Homeschool-/' for GitHub Pages, '/' for VPS/Docker production
  base: process.env.VITE_BASE_URL || '/',
})
