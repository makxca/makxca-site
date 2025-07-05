import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/vite-react/',
    publicDir: false,
    server: {
        proxy: {
            '/vite-react/public': {
                target: 'http://localhost:3010',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/vite-react\/public/, ''),
            },
            '/public': {
                target: 'http://localhost:3010',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/public/, ''),
            },
        },
    },
})
