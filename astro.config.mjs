// 🟢 astro.config.mjs
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    // site: 'https://tu-usuario.github.io',
    // base: '/nombre-del-repo',
    integrations: [vue()],
    vite: {
        plugins: [tailwindcss()],
    },
});
