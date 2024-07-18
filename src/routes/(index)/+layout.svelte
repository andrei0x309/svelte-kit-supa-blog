<script lang="ts">
  import Header from '$lib/theme/Header.svelte'
  import Footer from '$lib/theme/Footer.svelte'
  import '$lib/sass/app.scss'
  import { afterNavigate, beforeNavigate }  from '$app/navigation'
  import { isLoading } from '@/stores/main';
  import { onMount } from 'svelte'
  import { theme as themeStore } from '@/stores/main'
  import { config } from '$lib/config'
  import { getGoogleAnalyticsCode } from '$lib/utils/client/analytics'
 
  export let data: any = {}
  let theme = data?.theme || 'dark'

  beforeNavigate(() => {
	isLoading.set(true)
  })

  afterNavigate(() => {
	isLoading.set(false)
  })

  onMount(() => {
	themeStore.set(theme)
  })


</script>

<svelte:head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="andrei0x309">

	<!-- FavIcon  -->
	<!-- <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="mask-icon" href="/fs-icon-mask.svg" color="#5bbad5">
	<meta name="theme-color" content="#ffffff"> -->

<link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com"/>

</svelte:head>

<div class={theme} id="root-app">
{#if $isLoading}
	<div class="load-line"></div>
	<div class="nav-spinner spinner__1"></div>
{/if}
<Header bind:theme={theme} />
<slot isLoading={isLoading} />
<Footer />
</div>

{#if config.enableGoogleAnalytics}
{@html getGoogleAnalyticsCode(config.googleAnalyticsId)}
{/if}

<style windi:preflights:global windi:safelist:global windi:global>
</style>
