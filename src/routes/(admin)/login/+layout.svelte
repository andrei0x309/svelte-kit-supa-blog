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
  isLoading.set(false)

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
  <link rel="icon" type="image/png" href="/icon/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/icon/favicon.svg" />
  <link rel="shortcut icon" href="/icon/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png" />
  <link rel="manifest" href="/icon/site.webmanifest" />
<!-- /FavIcon  -->

</svelte:head>

{#if $isLoading}
	<div class="load-line"></div>
	<div class="nav-spinner spinner__1"></div>
{/if}

{@render children?.({ isLoading, })}

