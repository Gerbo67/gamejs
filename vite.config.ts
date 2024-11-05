import { defineConfig } from 'vite';
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
    server: {
        open: true,
        port: 3000
    },
    build: {
        outDir: 'docs',
        sourcemap: true,
        emptyOutDir: true
    },
    base: './',
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'assets/*',
                    dest: 'assets'
                }
            ]
        })
    ]
});
