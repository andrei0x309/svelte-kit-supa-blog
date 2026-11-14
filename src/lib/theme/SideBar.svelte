<script lang="ts">
  import { config, widgets } from "#lib/config/index.ts";
  import GoodReadsWidget from "./sidebar/goodReadsWidget.svelte";
  import TagsCloudWidget from "./sidebar/tagsCloudWidget.svelte";

  interface Props {
    sidebarData: {
      goodReads: string;
      tagCloud: string;
    }
  }

  let { sidebarData }: Props = $props();
</script>

{#if config.sidebarEnabled}
  <aside class="sidebar md:mr-0 md:mt-0 md:w-2/5 md:ml-6 block content-center content-va-on">
    {#if widgets.goodReads.enabled}
      <GoodReadsWidget goodReads={sidebarData?.goodReads} />
    {/if}
    {#if widgets.tagCloud.enabled}
      <TagsCloudWidget tagCloud={sidebarData?.tagCloud} />
    {/if}
  </aside>
{/if}
