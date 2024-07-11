// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';
import { windi } from "svelte-windicss-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [windi({}), preprocess({
		preserve: ['ld+json']
	})],

	kit: {
		adapter: adapter({
			edge:true,
			split: false
		}),
		alias: {
				'@': './src'
		}
	}
};

export default config;
