import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: [resolve('index.ts'), resolve('decorators.ts')],
            name: 'wc-micro',
            fileName: (_, entryName) => `${entryName}.js`,
            formats: ['cjs'],
        },
        rollupOptions: {
            external: ['uhtml'],
        },
    },
});
