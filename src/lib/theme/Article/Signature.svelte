<script lang="ts">
    import type { IPost } from '$lib/types/post'
    import { slide } from 'svelte/transition';
    import { onMount } from 'svelte';
    interface Props {
        data: IPost["signature"] | string;
    }

    let { data }: Props = $props();
    let expanded = $state(false)
    let json : IPost["signature"] = $state()
    let isValid = $state(true)
    onMount(() => {
        try {
            json = JSON.parse(data as string)
        } catch {
            isValid = false
        }
        json = JSON.parse(data as string)
    })

</script>

{#if isValid}
<div class="flex flex-col mt-2 p-4 text-[0.82rem] data-font">
<p
onclick={() => expanded = !expanded}
aria-hidden
><svg  class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M76.79,19.16,22.2,49.27,0,119.55,36.56,83a5.93,5.93,0,0,1,1.06-.83,13.68,13.68,0,1,1,8.22,8.22A6,6,0,0,1,45,91.44L8.45,128l70.28-22.2,30.12-54.59L128,32.05,95.95,0Z"/></svg>
EVM Signature
<svg  class="w-5 h-5 inline ml04" viewBox="0 0 512 512"><path  fill="currentColor" d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z"/></svg>
</p>
{#if expanded}
<div transition:slide|global>
<p class="p-1">Address: {json?.address}</p>
<p class="sig p-1">Sig: {json?.signature}</p>
<p class="p-1">Data: {json?.data}</p>
</div>
{/if}
</div>
{/if}

<style lang="scss">
    .sig {
        width: 99%;
        overflow-y: hidden;
        overflow-x: auto;
        word-break: break-all;
    }

    .data-font {
        font-family: monospace;
        cursor: pointer;
    }
</style>