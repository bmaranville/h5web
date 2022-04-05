import react from '@vitejs/plugin-react';
import path from 'path';
// import wasmLoader from 'esbuild-plugin-wasm';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  server: { open: true },
  preview: { open: true },
  esbuild: {
    target: 'es2020',
    sourcemap: true,
  },
  build: {
    target: 'es2020',
    sourcemap: true,
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, 'src/library.tsx'),
      name: 'NCNRBrowser',
      fileName: (format) => `NCNRBrowser.${format}.js`,
    },
  },
  // css: { modules: { root: '.' } }, // https://github.com/vitejs/vite/issues/3092#issuecomment-915952727
  plugins: [react(), eslintPlugin()],
});
