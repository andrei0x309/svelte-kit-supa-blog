<script>
// @ts-nocheck
  import '$lib/sass/tailwind.css'
  import '$lib/sass/admin.scss'
  import { afterNavigate, beforeNavigate }  from '$app/navigation'
  import { isLoading, currentUser } from '@/stores/main';

  beforeNavigate(() => {
	isLoading.set(true)
  })

  afterNavigate(() => {
	isLoading.set(false)
  })

  /** @type {{data: any, children?: import('svelte').Snippet<[any]>}} */
  let { data, children } = $props();
  currentUser.set(data.currentUser ?? null)

</script>

<svelte:head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="andrei0x309">
	<link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com"/>
	<title>Admin Panel</title>
	<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jodit/3.24.2/jodit.es2018.min.css"
/>
</svelte:head>

{#if $isLoading}
	<div class="load-line"></div>
	<div class="nav-spinner spinner__1"></div>
{/if}

{@render children?.({ isLoading, })}

<style windi:preflights:global windi:safelist:global windi:global>
</style>
