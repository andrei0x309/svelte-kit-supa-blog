<script>
// @ts-nocheck
  import '$lib/sass/admin.scss'
  import { afterNavigate, beforeNavigate }  from '$app/navigation'
  import { isLoading } from '@/stores/main';

  beforeNavigate(() => {
	isLoading.set(true)
  })

  afterNavigate(() => {
	isLoading.set(false)
  })

</script>

<svelte:head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="andrei0x309">
	<link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com"/>
	<title>Login</title>
</svelte:head>

{#if $isLoading}
	<div class="load-line"></div>
	<div class="nav-spinner spinner__1"></div>
{/if}

<slot isLoading={isLoading} />

<style windi:preflights:global windi:safelist:global windi:global>
</style>
