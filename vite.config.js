import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// import { partytownVite } from '@builder.io/partytown/utils'
import { join } from 'path'
import tailwindcss from '@tailwindcss/vite';


/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		tailwindcss(),
		nodePolyfills({
			protocolImports: true
		}),
		sveltekit(),
		// partytownVite({
		// 	// `dest` specifies where files are copied to in production
		// 	dest: join(process.cwd(), 'build', '~partytown')
		//   }),
		SvelteKitPWA({
			manifest: {
				"$schema": "https://json.schemastore.org/web-manifest-combined.json",
				"name": "Blog flashsoft.eu",
				"short_name": "blog.flashsoft.eu",
				"description": "PWA for domain blog.flashsoft.eu.",
				"categories": ["programming", "personal", "blog", "tech", "dev"],
				"orientation": "portrait-primary",
				"icons": [
					{
						"src": "/images/icons/icon-512x512.png",
						"sizes": "512x512",
						"type": "image/png"
					},
					{
						"src": "/images/icons/icon-384x384.png",
						"sizes": "384x384",
						"type": "image/png"
					},
					{
						"src": "/images/icons/icon-192x192.png",
						"sizes": "192x192",
						"type": "image/png"
					},
					{
						"src": "/images/icons/icon-152x152.png",
						"sizes": "152x152",
						"type": "image/png"
					},
					{
						"src": "/images/icons/icon-128x128.png",
						"sizes": "128x128",
						"type": "image/png"
					},
					{
						"src": "/images/icons/icon-96x96.png",
						"sizes": "96x96",
						"type": "image/png"
					}
				],
				"theme_color": "#ffffff",
				"background_color": "#ffffff",
				"display": "standalone"
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
		port: 5512
	}
};

export default config;
