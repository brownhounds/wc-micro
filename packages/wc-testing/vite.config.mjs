import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: [resolve('index.ts'), resolve('snapshots.ts')],
            name: 'wc-testing',
            fileName: (_, entryName) => `${entryName}.js`,
            formats: ['cjs'],
        },
    },
});
