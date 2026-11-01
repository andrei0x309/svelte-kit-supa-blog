<script lang="ts">
import '#lib/sass/tailwind.css';
import '#lib/sass/app.scss';
import { onMount } from 'svelte';
import { isLoading, theme as themeStore } from '#/stores/main.ts';
import { config } from '#lib/config/index.ts';
import Footer from '#lib/theme/Footer.svelte';
import Header from '#lib/theme/Header.svelte';
import { getGoogleAnalyticsCode } from '#lib/utils/client/analytics.ts';
import { afterNavigate, beforeNavigate } from '$app/navigation';

// import { partytownSnippet } from '@builder.io/partytown/integration'

interface Props {
  data?: any;
  children?: import('svelte').Snippet<[any]>;
}

let { data = {}, children }: Props = $props();
let theme = $derived(data?.theme || 'dark');

beforeNavigate(({ shallow, type }) => {
  if (shallow && type === 'goto') return;

  isLoading.set(true);
});

afterNavigate(({ shallow, type }) => {
  if (shallow && type === 'goto') return;

  isLoading.set(false);
});

const handlePopstate = () => {
  isLoading.set(false);
};

let scriptEl: HTMLScriptElement | undefined = $state();


onMount(() => {
  themeStore.set(theme);
  // if (scriptEl) {
  // 	  scriptEl.textContent = partytownSnippet()
  // 	}

  window.addEventListener('popstate', handlePopstate);
  isLoading.set(false);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('Service Worker registered successfully scope:', reg.scope))
      .catch((err) => console.error('Service Worker registration failed:', err));
  }

  return () => {
    window.removeEventListener('popstate', handlePopstate);
  };
});
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content="andrei0x309" />

  <!-- FavIcon  -->
  <link rel="icon" type="image/png" href="/icon/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/icon/favicon.svg" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png" />
  <link rel="manifest" href="/icon/site.webmanifest" />
  <!-- /FavIcon  -->

  <link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com" />

  <!-- <script>

  partytown = {
    forward: ['dataLayer.push'],
    resolveUrl: (url) => {
    const siteUrl = 'https://blog.flashsoft.eu/proxy-town-proxy'
    if (url.hostname === 'www.googletagmanager.com') {
      const proxyUrl = new URL(siteUrl + '/gtm')
      const gtmId = new URL(url).searchParams.get('id')
      gtmId && proxyUrl.searchParams.append('id', gtmId)
      return proxyUrl
    } else if (
      url.href.includes('google-analytics.com')
    ) {
      const proxyUrl = new URL(url.href.replace(url.hostname, 'blog.flashsoft.eu/proxy-town-proxy') + '/ga')
      return proxyUrl
    }
    return url
    }
  }
</script> -->

  <!-- `partytownSnippet` is inserted here -->
  <!-- <script bind:this={scriptEl}></script> -->
  <!-- {@html webManifest} -->
</svelte:head>

<div class={theme} id="root-app">
  {#if $isLoading}
    <div class="load-line"></div>
    <div class="nav-spinner spinner__1"></div>
  {/if}
  <Header bind:theme />
  {@render children?.({ isLoading })}
  <Footer />
</div>

{#if config.enableGoogleAnalytics}
  {@html getGoogleAnalyticsCode(config.googleAnalyticsId)}
{/if}
