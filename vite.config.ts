import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths let the same build work on GitHub Pages and ordinary
  // rental servers, including when it is placed in a subdirectory.
  base: './',
  plugins: [react()],
});
