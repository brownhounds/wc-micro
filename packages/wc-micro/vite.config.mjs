import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve('index.ts'),
            name: 'wc-micro',
            fileName: () => `index.js`,
            formats: ['cjs'],
        },
        rollupOptions: {
            external: ['uhtml'],
        },
    },
});
