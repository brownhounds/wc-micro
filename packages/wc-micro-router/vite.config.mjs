import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve('index.ts'),
            name: 'wc-micro-router',
            fileName: () => `index.js`,
            formats: ['cjs'],
        },
        rollupOptions: {
            external: ['@brownhounds/event-bus'],
        },
    },
});
