import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 49453,
        https: false,
        proxy: {
            '/api': {
                target: 'https://localhost:7121/',
                changeOrigin: true,
                secure: false,
            },
        }
    }
})
