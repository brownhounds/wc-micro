import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve('index.ts'),
            name: 'event-bus',
            fileName: () => `index.js`,
            formats: ['cjs'],
        },
    },
});
