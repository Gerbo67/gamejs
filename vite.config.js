// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        port: 3001,
        cors: "*",
        open: true
    }
})