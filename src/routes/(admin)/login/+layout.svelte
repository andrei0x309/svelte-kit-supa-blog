<script>
// @ts-nocheck
  import '$lib/sass/tailwind.css'
  import '$lib/sass/admin.scss'
  import { onMount } from 'svelte';
  import { afterNavigate, beforeNavigate }  from '$app/navigation'
  import { isLoading } from '@/stores/main';
	/** @type {{children?: import('svelte').Snippet<[any]>}} */
	let { children } = $props();

  beforeNavigate(() => {
	isLoading.set(true)
  })

  afterNavigate(() => {
	isLoading.set(false)
  })

  const handlePopstate = () => {
    isLoading.set(false)
  }

  onMount(() => {
 
  window.addEventListener('popstate', handlePopstate);

    return () => {
        window.removeEventListener('popstate', handlePopstate);
    };
  })

</script>

<svelte:head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<meta name="author" content="andrei0x309">
	<link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com"/>
	<title>Login - flashsoft.eu</title>
  <meta name="description" content="Login - flashsoft.eu - Admin panel"/>

<!-- FavIcon  -->
<link rel="apple-touch-icon" sizes="57x57" href="/icon/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/icon/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/icon/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/icon/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/icon/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/icon/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/icon/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/icon/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/icon/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/icon/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png">
<link rel="manifest" href="/icon/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/icon/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
<!-- /FavIcon  -->

</svelte:head>

{#if $isLoading}
	<div class="load-line"></div>
	<div class="nav-spinner spinner__1"></div>
{/if}

{@render children?.({ isLoading, })}

