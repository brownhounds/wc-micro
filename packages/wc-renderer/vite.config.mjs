import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve('index.ts'),
            name: 'wc-renderer',
            fileName: () => `index.js`,
            formats: ['cjs'],
        },
    },
});
