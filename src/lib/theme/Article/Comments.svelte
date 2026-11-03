<script lang="ts">
  import Giscus from '@giscus/svelte';
  import { onDestroy, onMount } from 'svelte';
  import { theme as themeStore } from '#/stores/main.ts';

  const darkTheme = 'noborder_dark';
  const lightTheme = 'noborder_light';

  let localTheme = $state($themeStore === 'dark' ? darkTheme : lightTheme);
  let isLoaded = $state(false);
  let hasTimedOut = $state(false);
  let themeUnsub: () => void;
  let timeoutId: NodeJS.Timeout;

  // Listen for giscus message post-backs to confirm it initialized successfully
  function handleMessage(event: MessageEvent) {
    if (event.origin !== 'https://giscus.app') return;
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      if (data && data.giscus) {
        isLoaded = true;
        clearTimeout(timeoutId);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  onMount(() => {
    themeUnsub = themeStore.subscribe((theme) => {
      localTheme = theme === 'dark' ? darkTheme : lightTheme;
    });

    window.addEventListener('message', handleMessage);

    // If Giscus doesn't load within 6 seconds (likely VPN/network block), trigger timeout hide
    timeoutId = setTimeout(() => {
      if (!isLoaded) {
        hasTimedOut = true;
      }
    }, 6000);
  });

  onDestroy(() => {
    themeUnsub?.();
    clearTimeout(timeoutId);
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', handleMessage);
    }
  });
</script>

{#if !hasTimedOut}
  <div class:opacity-0={!isLoaded} class:transition-opacity={true} class:duration-500={true}>
    <h3 class="text-xl font-bold mt-8 mb-4">Comments</h3>
    <Giscus
      id="comments"
      repo="andrei0x309/svelte-kit-supa-blog"
      repoId="R_kgDOMS_bGQ"
      category="Announcements"
      categoryId="DIC_kwDOMS_bGc4CoN8P"
      mapping="pathname"
      term=""
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={localTheme}
      lang="en"
      loading="lazy"
    />
  </div>
{/if}