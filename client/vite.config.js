import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '~base': resolve(__dirname, 'src', 'components', 'base'),
      '~common': resolve(__dirname, 'src', 'components', 'common'),
      '~loaders': resolve(__dirname, 'src', 'router', 'loaders'),
    },
  },
  build: {
    emptyOutDir: true,
  },
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
  },
  server: {
    port: 3000,
  },
})
