<script lang="ts">
    import Article from '$lib/theme/Article.svelte';
    import SideBar from '@/lib/theme/SideBar.svelte';
    import { page as SveltePage } from '$app/state';
    import { isLoading } from '@/stores/main';
    import { config } from '$lib/config';
    import { generateURLFCFrameEmbed } from '$lib/utils/client/fc-frame-v2';


    interface Props {
        data: any;
    }

    let { data }: Props = $props();
    const sidebarData = data?.sidebarData

    let dataLoading = $state(false)
    isLoading.subscribe((val) => {
        dataLoading = val
    })

    let featureImage = $state('')
    try{
        featureImage = (new URL(data?.res?.feature_image)).href
    } catch {
        featureImage = ''
    }
    
    const pageUrl = SveltePage.url.href.replace('http:', 'https:')


</script>

<svelte:head>
<title>{ data.pageTitle }</title>
<meta name="description" content="{data.pageDescription}">
<meta property="og:title" content="{data.pageTitle}" />
<meta property="og:description" content="{data.pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content={`${pageUrl}`} />
<meta property="og:site_name" content="{config.siteName}" />
<link rel="canonical" href={`${pageUrl}`} />
<link rel="alternate" type="application/rss+xml" title="{`${config.siteName} » Feed`}" href="{`${config.baseSiteUrl}/feed`}">

{#if featureImage }
<meta property="og:image" content="{featureImage}" />

{#if config.farcaster.miniAppEnabled}
<meta name="fc:frame" content={generateURLFCFrameEmbed(featureImage, pageUrl)} />
{/if}
{:else}
<meta property="og:image" content={`${config.baseSiteUrl}/images/og/default-og-blog-opt.webp`} />

{#if config.farcaster.miniAppEnabled}
<meta name="fc:frame" content={generateURLFCFrameEmbed('', pageUrl)} />
{/if}

{/if}
{#if data?.schemaContent}
{@html data.schemaContent}
{/if}
</svelte:head>

<div id="main" class="{`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70': ''}`}">
 
    <main class="flex flex-col content w-full sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 p-8 article">
     
        {#if data?.res}

 {#if data?.isPostList}
        {#if data?.res?.data?.length}
        {#each data?.res?.data as post, i}
            <Article data={post} index={i} />
        {/each}
    {:else}
    <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold">No posts found</h1>
    </div>
    {/if}

    <div class="text-center mt-2 flex mx-auto">
        {#if (data?.res?.page ?? 1) > 1}
        <a href={`/page/${(data?.res?.page ?? 1) - 1}`} class="show-more-posts-btn">⮈ Newer Posts</a>
        {/if}
        {#if (data?.res?.hasNext ?? false)}
        <a href={`/page/${(data?.res?.page ?? 1) + 1}`} class="show-more-posts-btn">Older Posts ⮊</a>
        {/if}
    </div>
    {:else}
                <Article data={data.res} />
        {/if}

        {:else}
        <div class="flex flex-col items-center">
            <h1 class="text-3xl font-bold">Post not found</h1>
        </div>
        {/if}
 
    </main>
    <SideBar sidebarData={sidebarData} />
</div>
