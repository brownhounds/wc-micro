import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: [
                resolve('index.ts'),
                resolve('decorators.ts'),
                resolve('reactive.ts'),
                resolve('signal.ts'),
            ],
            name: 'wc-micro',
            fileName: (_, entryName) => `${entryName}.js`,
            formats: ['cjs'],
        },
        rollupOptions: {
            external: ['@brownhounds/uhtml'],
        },
    },
});
