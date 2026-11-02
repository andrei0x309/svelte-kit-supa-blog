<script lang="ts">
import SideBar from '#/lib/theme/SideBar.svelte';
import { isLoading } from '#/stores/main.ts';
import { config } from '#lib/config/index.ts';
import Article from '#lib/theme/Article.svelte';
import { page as SveltePage } from '$app/state';

interface Props {
  data: any;
}

let { data }: Props = $props();
const sidebarData = $derived(data?.sidebarData);

let dataLoading = $state(false);
isLoading.subscribe((val) => {
  dataLoading = val;
});

const featureImage = $derived(data?.res?.feature_image);

const pageUrl = SveltePage.url.href.replace('http://', 'https://');
</script>

<svelte:head>
  <title>{data.pageTitle}</title>
  <meta name="description" content={data.pageDescription} />
  <meta property="og:title" content={data.pageTitle} />
  <meta property="og:description" content={data.pageDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:site_name" content={config.siteName} />
  <link rel="canonical" href={pageUrl} />
  <link rel="alternate" type="application/rss+xml" title={`${config.siteName} » Feed`} href={`${config.baseSiteUrl}/feed`} />

  {#if featureImage}
    <meta property="og:image" content={featureImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="{data.pageTitle}">
    <meta property="twitter:description" content="{data.pageDescription}">
    <meta property="twitter:image" content="{featureImage}">
  {/if}
</svelte:head>

<div id="main" class={`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70' : ''}`}>
  <main class="flex flex-col content w-full sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 p-8 article">
    <p>This post is marked as a draft and thus is not publicly accessible.</p>
    {#if data?.res}
      <Article data={data.res} />
    {:else}
      <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold">Post not found</h1>
      </div>
    {/if}
  </main>
  <SideBar {sidebarData} />
</div>
