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
    },
  },
  server: {
    port: 3000,
  },
})
