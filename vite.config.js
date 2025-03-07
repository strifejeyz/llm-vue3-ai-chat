import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [
        vue({
            template: { transformAssetUrls }
        }),
        vuetify({
            autoImport: true,
        }),
        ViteFonts({
            google: {
                families: [{
                    name: 'Roboto',
                    styles: 'wght@100;300;400;500;700;900',
                }],
            },
        }),
    ],
    define: { 'process.env': {} },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
        ],
    },
    server: {
        host: 'localhost',
        port: 9000,
    },
    build: {
        rollupOptions: {
            output: {
                format: 'iife',
                name: 'MyVueApp',
                entryFileNames: 'VueApp.js',
                assetFileNames: 'VueApp.css',
            },
        },
        target: 'es2015',
        polyfillDynamicImport: true,
    },
});
