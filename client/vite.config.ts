import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  root: 'src',
  build: {
    outDir: '../../dist/client',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}'],
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Change to your backend server address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
