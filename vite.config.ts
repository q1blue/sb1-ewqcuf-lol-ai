import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'LolAiFramework',
      fileName: (format) => `lol-ai-framework.${format}.js`
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  },
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});