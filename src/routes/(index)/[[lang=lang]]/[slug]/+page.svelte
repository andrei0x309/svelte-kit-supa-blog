<script lang="ts">
    // import '@/routes/(app)/cert.scss'
    // import Header from "../../Header.svelte"
    // import CertFilter from "../CertFilter.svelte";
    // import CertSearch from "../CertSearch.svelte";
    // import CertList from "../CertList.svelte";
    // import CertSingle from '../CertSingle.svelte';
    import Article from '$lib/theme/Article.svelte';
    import SideBar from '@/lib/theme/SideBar.svelte';
    import { isLoading } from '@/stores/main';


    export let data: any;
    let dataLoading = false
    isLoading.subscribe((val) => {
        dataLoading = val
    })

    console.log(data)


</script>

<svelte:head>
<!-- <title>{ data.pageTitle }</title>
<meta name="description" content="{data.pageDescription}">
<meta property="og:title" content="{data.pageTitle}" />
<meta property="og:description" content="{data.pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content={`${$SveltePage.url}`} />
<meta property="og:image" content="https://flashsoft.eu/res/flashsoftLogo.png" /> -->

<!-- {#if !isView}
{#if (data?.res?.page ?? 1) > 1}
<link rel="prev" href="/projects/page/{(data?.res?.page ?? 1) - 1}" />
{/if}
{#if (data?.res?.page ?? 1) < data.res.totalPages}
<link rel="next" href="/projects/page/{(data?.res?.page ?? 1) + 1}" />
{/if}
{/if} -->
</svelte:head>

<!-- <Header segment="cert">
    <CertFilter slot="filter" selectedTags={ data?.res?.tag_ids ?? []} expanded={(data?.res?.tag_ids ?? []).length > 0} />
    <CertSearch slot="search" searchInput={data?.searchInput ?? ''} expanded={(data?.searchInput ?? '').length > 0} />
</Header> -->

<div id="main" class="{`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70': ''}`}">
 
    <main class="flex flex-col content w-full sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 p-8 article">
     
        {#if data?.res}
                <Article data={data.res} />
        {:else}
        <div class="flex flex-col items-center">
            <h1 class="text-3xl font-bold">Post not found</h1>
        </div>
        {/if}
 
    </main>
    <SideBar />
</div>
