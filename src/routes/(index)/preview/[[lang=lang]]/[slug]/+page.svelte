<script lang="ts">
    import Article from '$lib/theme/Article.svelte';
    import SideBar from '@/lib/theme/SideBar.svelte';
    import { page as SveltePage } from '$app/stores';
    import { isLoading } from '@/stores/main';
    import { config } from '$lib/config';

    interface Props {
        data: any;
    }

    let { data }: Props = $props();
    const sidebarData = data?.sidebarData

    let dataLoading = $state(false)
    isLoading.subscribe((val) => {
        dataLoading = val
    })

    let featureImage = $state(data?.res?.feature_image)
    try{
        featureImage = (new URL(featureImage)).href
    } catch {
        featureImage = ''
    }
    
</script>

<svelte:head>
<title>{ data.pageTitle }</title>
<meta name="description" content="{data.pageDescription}">
<meta property="og:title" content="{data.pageTitle}" />
<meta property="og:description" content="{data.pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content={`${$SveltePage.url}`} />
<meta property="og:site_name" content="{config.siteName}" />
<link rel="canonical" href={`${$SveltePage.url}`} />
<link rel="alternate" type="application/rss+xml" title="{`${config.siteName} » Feed`}" href="{`${config.baseSiteUrl}/feed`}">

{#if featureImage }
<meta property="og:image" content="{featureImage}" />
{/if}
</svelte:head>

<div id="main" class="{`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70': ''}`}">
 
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
    <SideBar sidebarData={sidebarData} />
</div>
