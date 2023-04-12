import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import typescript from '@rollup/plugin-typescript';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh(), typescript()],
  server: {
    port: 3000, // el puerto que deseo utilizar
    open: '/home'
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    minify: true,
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        ecma: 2015,
        module: true,
        toplevel: true,
        unsafe: true,
      },
    },
  },
});
