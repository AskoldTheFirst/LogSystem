import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3006,
    open: 'http://localhost:3006'
  },
  plugins: [react()],
})
