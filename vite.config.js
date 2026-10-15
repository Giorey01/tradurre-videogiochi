import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base relativa: funziona su GitHub Pages sotto /tradurre-videogiochi/ con l'hash router
export default defineConfig({
  base: './',
  plugins: [vue()],
})
