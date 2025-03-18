<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let loaded = $state(false);
  let root: HTMLElement = $state();

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loaded = true;
        observer.disconnect();
      }
    });
  });

  onMount(() => {
    observer.observe(root);
  });

  onDestroy(() => {
    observer.disconnect();
  });
</script>

<div bind:this={root}>
  {#if loaded}
    <div transition:fade|global>
      {@render children?.()}
    </div>
  {/if}
</div>
