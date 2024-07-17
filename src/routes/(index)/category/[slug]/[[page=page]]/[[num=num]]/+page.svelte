<script lang="ts">
    import { page as SveltePage } from '$app/stores';
    import Article from '$lib/theme/Article.svelte';
    import SideBar from '@/lib/theme/SideBar.svelte';
    import { isLoading } from '@/stores/main';
    import { config } from '$lib/config';

    export let data: any;
    const sidebarData = data?.sidebarData

    let dataLoading = false
    isLoading.subscribe((val) => {
        dataLoading = val
    })

</script>

<svelte:head>
<title>{ data.pageTitle }</title>
<meta name="description" content="{data.pageDescription}">
<meta property="og:title" content="{data.pageTitle}" />
<meta property="og:description" content="{data.pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content={`${$SveltePage.url}`} />
<meta property="og:image" content="https://flashsoft.eu/res/flashsoftLogo.png" />
<link rel="alternate" type="application/rss+xml" title="{`${config.siteName} » Feed`}" href="{`${config.baseSiteUrl}/feed`}">
<link rel="canonical" href={`${$SveltePage.url}`} />


{#if (data?.res?.hasNext ?? false)}
<link rel="next" href="/page/{(data?.res?.page ?? 1) + 1}" />
{/if}
{#if (data?.res?.page ?? 1) > 1}
<link rel="prev" href="/page/{(data?.res?.page ?? 1) - 1}" />
{/if}

</svelte:head>


<div id="main" class="{`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70': ''}`}">
 
    <main class="flex flex-col content w-full sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 p-8 article">
     <h1 class="text-3xl font-bold">Category {data?.cat?.name}</h1>
        {#if data?.res?.data?.length}
            {#each data?.res?.data as post}
                <Article data={post} />
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

    </main>
    <SideBar sidebarData={sidebarData} />
</div>
