<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";

  let loaded = false;
  let root: HTMLElement;

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
      <slot></slot>
    </div>
  {/if}
</div>
