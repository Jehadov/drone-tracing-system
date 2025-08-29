import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // exposes server to LAN
    port: 5173,   // default Vite port
  }
})
