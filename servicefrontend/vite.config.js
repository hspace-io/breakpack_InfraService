import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    allowedHosts: ['knights.hspace.io', 'knights.hspace.io:40280']
  },
  preview: {
    port: 5174,
    host: true,
    allowedHosts: ['knights.hspace.io', 'knights.hspace.io:40280']
  }
})
