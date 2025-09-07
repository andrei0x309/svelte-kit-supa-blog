<script lang="ts">
  import sdk from '@farcaster/frame-sdk';
  import { config } from '@/lib/config';
  import { onMount } from 'svelte';
  import { isViewingFromFrame as isViewingFromFrameStore } from '@/stores/main';
  import FarcasterIcon from '@/lib/theme/icons/platfroms/FarcasterIcon.svelte';

  let isViewingFromFrame = $state(false);

  const buttonClick = () => {
    sdk.actions.viewProfile({
      fid: config.farcaster.followFid
    });
  };

  onMount(() => {
    sdk.context.then((ctx) => {
      console.log(ctx?.user?.fid);
      isViewingFromFrame = (ctx?.user?.fid || 0) > 0;
      isViewingFromFrameStore.set(isViewingFromFrame);
    });
  });
</script>

{#if isViewingFromFrame}
  <button class="farcaster-button" onclick={buttonClick} aria-label="follow me on Farcaster" title="follow me on Farcaster">
    <span class="icon"
      >
      <FarcasterIcon class="w-8" />
      </span
    >
  </button>
{/if}

<style scoped>
  .farcaster-button {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: rgb(37 37 37);
    color: aliceblue;
    border: 1px #000000bf solid;
    overflow: hidden;
    cursor: pointer;
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 100;
  }

  .icon {
    position: absolute;
    left: 1px;
    top: 1px;
    transition: transform 0.5s;
    border-radius: 50%;
  }

  .icon::before {
    position: absolute;
    left: -100px;
    top: 0;
    z-index: -1;
    content: '';
  }

  .farcaster-button:active {
    transform: scale(1.03);
  }
</style>
