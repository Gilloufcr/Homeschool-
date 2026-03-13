import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // '/Homeschool-/' for GitHub Pages, '/' for VPS/Docker production
  base: process.env.VITE_BASE_URL || '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'data-lessons': [
            './src/data/lessons/index.js',
          ],
          'data-exercises': [
            './src/data/mathExercises.js',
            './src/data/frenchExercises.js',
            './src/data/historyExercises.js',
            './src/data/geographyExercises.js',
            './src/data/scienceExercises.js',
            './src/data/englishExercises.js',
            './src/data/emcExercises.js',
          ],
          'leaflet': ['leaflet', 'react-leaflet'],
        }
      }
    }
  }
})
