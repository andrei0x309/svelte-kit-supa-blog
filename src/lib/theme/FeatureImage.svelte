<script lang="ts">
    import { optimizeGoogleCDNImage } from '$lib/utils/server/image';
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'

  interface Props {
    imgSource: string;
    index?: number;
    full?: boolean;
    alt?: string;
  }

  let {
    imgSource = $bindable(),
    index = 0,
    full = false,
    alt = ''
  }: Props = $props();

    let isLoaded = $state(true);
	let isError = $state(false);
	let img: HTMLImageElement | undefined = $state();
    
    const loaded = () => {
        isLoaded = true;
    }

    const error = () => {
		isLoaded = true;
		isError = true;
        imgSource = '/images/placeholder.svg'
     }

	onMount(() => {
		if(!img?.complete) {
			isLoaded = false;
		}
	})


  </script>
<div class="relative">
{#if !isLoaded}
<div class="loader"></div>
{/if}
<img bind:this={img}  onload={loaded} onerror={error} itemprop={ !full? 'image': ''} class="m-auto wp-post-image" width="{isError ? 170 : 500}" height="281"  loading="{ index < 2 ? 'eager' : 'lazy' }" 
src={optimizeGoogleCDNImage(imgSource)} alt={alt}>
</div>

<style lang="scss">

.loader {
    position: absolute;
    display: flex;
    top: 1rem;
    left: 6rem;
	height: 7rem;
    width: 7rem;
    border-top: 4px solid var(--loader-large);
    border-radius: 50%;
    animation: spin .5s linear infinite;
}

.loader:before, .loader:after {
	content: " ";
	display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	height: 6rem;
	width: 6rem;
	margin-top: -50px;
	margin-left: -50px;
	border-top: 3px solid var(--loader-medium);
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

.loader:after {
	height: 4rem;
	width: 4rem;
	margin-top: -40px;
	margin-left: -40px;
	border-top: 2px solid var(--loader-small);
	animation: spin 0.8s linear infinite;
}



</style>