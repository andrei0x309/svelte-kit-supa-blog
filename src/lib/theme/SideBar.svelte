<script lang="ts">
    import GoodReadsWidget from "./sidebar/goodReadsWidget.svelte";
    import TagsCloudWidget from "./sidebar/tagsCloudWidget.svelte";
    export let sidebarData: any;
</script>

<aside class="sidebar md:mr-0 md:mt-0 md:w-2/5 md:ml-6 block content-center" >
      <GoodReadsWidget goodReads={sidebarData.goodReads} />
      <TagsCloudWidget tagCloud={sidebarData.tagCloud} />
</aside>