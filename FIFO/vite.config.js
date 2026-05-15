import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ustaw base pod GitHub Pages: https://buksa656.github.io/FIFO/
export default defineConfig({
  plugins: [react()],
  base: '/FIFO/',
});
