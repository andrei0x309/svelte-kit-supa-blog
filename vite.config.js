// import adapter from '@sveltejs/adapter-auto';

import adapter from '@sveltejs/adapter-netlify';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
// import { partytownVite } from '@builder.io/partytown/utils'
import { join } from 'path';
import preprocess from 'svelte-preprocess';

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
      adapter: adapter({ edge: true, split: false })
      // adapter: adapter()
    }),

    // partytownVite({
    // 	// `dest` specifies where files are copied to in production
    // 	dest: join(process.cwd(), 'build', '~partytown')
    //   }),
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
    strictPort: true,
    cors: {
      preflightContinue: true
    }
  }
};

export default config;
