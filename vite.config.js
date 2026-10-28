// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import adapter from '@sveltejs/adapter-netlify';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
// import { partytownVite } from '@builder.io/partytown/utils'
import { join } from 'path';
import tailwindcss from '@tailwindcss/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    tailwindcss(),
    // nodePolyfills({
    // 	protocolImports: true
    // }),
    sveltekit({
      // Consult https://github.com/sveltejs/svelte-preprocess
      // for more information about preprocessors
      preprocess: [preprocess({ preserve: ['ld+json'] })],
      adapter: adapter({ edge: true, split: false }),
      // adapter: adapter(),
      alias: { '@': './src' }
    }),

    // partytownVite({
    // 	// `dest` specifies where files are copied to in production
    // 	dest: join(process.cwd(), 'build', '~partytown')
    //   }),
    SvelteKitPWA({
      manifest: {
        $schema: 'https://json.schemastore.org/web-manifest-combined.json',
        name: 'Blog flashsoft.eu',
        short_name: 'blog.flashsoft.eu',
        description: 'PWA for domain blog.flashsoft.eu.',
        categories: ['programming', 'personal', 'blog', 'tech', 'dev'],
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/icon/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/icon/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone'
      }
    })
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  define: {
    VERSION: JSON.stringify(process.env.npm_package_version),
    SK_VERSION: JSON.stringify(process.env['npm_package_devDependencies__sveltejs_kit'])
  },
  server: {
    port: 5512,
    allowedHosts: ['tun-5512.flashsoft.eu'],
    cors: true,
    strictPort: true
  }
};

export default config;
