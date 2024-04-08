import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve('index.ts'),
            name: 'wc-testing',
            fileName: () => `index.js`,
            formats: ['cjs'],
        },
    },
});
