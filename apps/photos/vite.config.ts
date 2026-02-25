import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['**/e2e/**', '**/node_modules/**', '**/.next/**'],
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tdorsey/shared': path.resolve(__dirname, '../../libs/shared/assets'),
      '@tdorsey/photo-service': path.resolve(__dirname, '../../libs/photoService/src/index.ts'),
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
});
