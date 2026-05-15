// 🟢 astro.config.mjs
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    site: 'https://cTapiaDev.github.io',
    base: '/vesta-system',
    integrations: [vue()],
    vite: {
        plugins: [tailwindcss()],
    },
});
