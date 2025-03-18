<script lang="ts"> 
  import '$lib/sass/tailwind.css'
  import '$lib/sass/app.scss'

  import Header from '$lib/theme/Header.svelte'
  import Footer from '$lib/theme/Footer.svelte'
  import { afterNavigate, beforeNavigate }  from '$app/navigation'
  import { isLoading } from '@/stores/main';
  import { onMount } from 'svelte'
  import { theme as themeStore } from '@/stores/main'
  import { config } from '$lib/config'
  import { getGoogleAnalyticsCode } from '$lib/utils/client/analytics'
  import { partytownSnippet } from '@builder.io/partytown/integration'

  interface Props {
    data?: any;
    children?: import('svelte').Snippet<[any]>;
  }

  let { data = {}, children }: Props = $props();
  let theme = $state(data?.theme || 'dark')

  beforeNavigate(() => {
	isLoading.set(true)
  })

  afterNavigate(() => {
	isLoading.set(false)
  })

  let scriptEl: HTMLScriptElement | undefined = $state()

  onMount(() => {
	themeStore.set(theme)
  if (scriptEl) {
		  scriptEl.textContent = partytownSnippet()
		}
  })

</script>

<svelte:head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="andrei0x309">

	<!-- FavIcon  -->
	<link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png">
	<link rel="mask-icon" href="/fs-icon-mask.svg" color="#5bbad5">
	<meta name="theme-color" content="#ffffff"> 

<link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com"/>


<script>

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
</script>

  <!-- `partytownSnippet` is inserted here -->
  <script bind:this={scriptEl}></script>
  <!-- {@html webManifest} -->


</svelte:head>

<div class={theme} id="root-app">
{#if $isLoading}
	<div class="load-line"></div>
	<div class="nav-spinner spinner__1"></div>
{/if}
<Header bind:theme={theme} />
{@render children?.({ isLoading, })}
<Footer />
</div>

{#if config.enableGoogleAnalytics}
{@html getGoogleAnalyticsCode(config.googleAnalyticsId)}
{/if}

<style windi:preflights:global windi:safelist:global windi:global>
</style>
