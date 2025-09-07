<script lang="ts">
    import GoodReadsWidget from "./sidebar/goodReadsWidget.svelte";
    import TagsCloudWidget from "./sidebar/tagsCloudWidget.svelte";
    interface Props {
        sidebarData: any;
    }

    let { sidebarData }: Props = $props();
</script>

<aside class="sidebar md:mr-0 md:mt-0 md:w-2/5 md:ml-6 block content-center content-va-on" >
      <GoodReadsWidget goodReads={sidebarData?.goodReads} />
      <TagsCloudWidget tagCloud={sidebarData?.tagCloud} />
</aside>