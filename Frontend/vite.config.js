// frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Proxy API requests to the backend server
            '/blog': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                // Rewrite the URL: remove '/api' prefix if needed
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});