<script lang="ts">
    import SideBar from '@/lib/theme/SideBar.svelte';
    import { page as SveltePage } from '$app/stores';
    import { isLoading } from '@/stores/main';
    import { config } from '$lib/config';

    export let data: any;
    const sidebarData = data?.sidebarData
    let dataLoading = false
    isLoading.subscribe((val) => {
        dataLoading = val
    })

    let featureImage = data?.res?.feature_image
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
{#if featureImage }
<meta property="og:image" content="{featureImage}" />
{/if}
{#if data?.schemaContent}
{@html data.schemaContent}
{/if}
</svelte:head>

<div id="main" class="{`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70': ''}`}">
 
    <main class="flex flex-col content w-full sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 p-8 article">
     
     <h1>ERROR</h1>
 
    </main>
    <SideBar sidebarData={sidebarData} />
</div>
