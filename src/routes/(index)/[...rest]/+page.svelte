<script lang="ts">
    // import '@/routes/(app)/cert.scss'
    // import Header from "../../Header.svelte"
    // import CertFilter from "../CertFilter.svelte";
    // import CertSearch from "../CertSearch.svelte";
    // import CertList from "../CertList.svelte";
    import { page as SveltePage } from '$app/stores';
    // import CertSingle from '../CertSingle.svelte';
    import Article from '$lib/theme/Article.svelte';
    import SideBar from '@/lib/theme/SideBar.svelte';
    import { isLoading } from '@/stores/main';


    export let data: any;
    let dataLoading = false
    isLoading.subscribe((val) => {
        dataLoading = val
    })


$: {
    console.log(isLoading)
}
</script>

<svelte:head>
<title>{ data.pageTitle }</title>
<meta name="description" content="{data.pageDescription}">
<meta property="og:title" content="{data.pageTitle}" />
<meta property="og:description" content="{data.pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content={`${$SveltePage.url}`} />
<meta property="og:image" content="https://flashsoft.eu/res/flashsoftLogo.png" />

{#if (data?.res?.hasNext ?? false)}
<link rel="prev" href="/page/{(data?.res?.page ?? 1) - 1}" />
{/if}
{#if (data?.res?.page ?? 1) > 1}
<link rel="next" href="/page/{(data?.res?.page ?? 1) + 1}" />
{/if}

</svelte:head>

<!-- <Header segment="cert">
    <CertFilter slot="filter" selectedTags={ data?.res?.tag_ids ?? []} expanded={(data?.res?.tag_ids ?? []).length > 0} />
    <CertSearch slot="search" searchInput={data?.searchInput ?? ''} expanded={(data?.searchInput ?? '').length > 0} />
</Header> -->

<div id="main" class="{`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70': ''}`}">
 
    <main class="flex flex-col content w-full sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 p-8 article">
     
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
    <SideBar />
</div>
