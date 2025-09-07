<script lang="ts">
    import SideBar from '@/lib/theme/SideBar.svelte';
    import { page as SveltePage  } from '$app/state';
    import { isLoading } from '@/stores/main';
    import { config } from '$lib/config';
    

    interface Props {
        data: any;
    }

    let { data = $bindable() }: Props = $props();
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

    const errorMsg = SveltePage?.error?.message || 'Unknown reason'
    const errorStatus = SveltePage?.status || '500'
    data.pageTitle = 'Error ' + errorStatus + ' - ' + errorMsg
    
</script>

<svelte:head>
<title>{ data.pageTitle }</title>
<meta name="description" content="{data.pageDescription}">
<meta property="og:title" content="{data.pageTitle}" />
<meta property="og:description" content="{data.pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content={`${SveltePage.url}`} />
<meta property="og:site_name" content="{config.siteName}" />
<link rel="canonical" href={`${SveltePage.url}`} />
{#if featureImage }
<meta property="og:image" content="{featureImage}" />
{/if}
{#if data?.schemaContent}
{@html data.schemaContent}
{/if}
</svelte:head>

<div id="main" class="{`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70': ''}`}">
 
    <main class="flex flex-col content w-full sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 p-8 article">
        
    <div class="text-center mt-4">
     <svg class="w-20 mx-auto" enable-background="new 0 0 64 64" version="1.1" viewBox="0 0 64 64"><g><path d="M37,23H27c0,9-2,27-6,40h22C39,50,37,32,37,23z" fill="#BF8641"/><path d="M31,37v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2c0,0.6-0.4,1-1,1S31,37.6,31,37z M32,44c-0.6,0-1,0.4-1,1v6   c0,0.6,0.4,1,1,1s1-0.4,1-1v-6C33,44.4,32.6,44,32,44z" fill="#D9AA71"/><path d="M63,22c0,4.4-3.6,8-8,8c-2.9,0-5.4-1.6-6.8-3.9C46.8,27.3,45,28,43,28c-1.4,0-2.8-0.4-4-1.1   c-1.8,2.5-4.7,4.1-8,4.1c-2.7,0-5.1-1.1-6.9-2.8C23,29.9,21.1,31,19,31c-2.7,0-5-1.8-5.7-4.2C12,27.5,10.6,28,9,28   c-4.4,0-8-3.6-8-8c0-4.2,3.3-7.7,7.4-8C9.7,8,13.5,5,18,5c0.4,0,0.9,0,1.3,0.1C20.1,2.7,22.4,1,25,1c1.9,0,3.6,0.9,4.7,2.3   C31.4,1.8,33.6,1,36,1c4,0,7.5,2.4,9.1,5.8C46.3,6.3,47.6,6,49,6c5.2,0,9.5,4,10,9C61.4,16.4,63,19,63,22z M63,63c0-3.3-2.7-6-6-6   c-2.1,0-4,1.1-5.1,2.8C51.1,59.3,50.1,59,49,59c-0.3,0-0.7,0-1,0.1c-1.4-2.4-4-4.1-7-4.1c-2.6,0-4.9,1.3-6.4,3.2   c-1-0.8-2.2-1.2-3.6-1.2c-1.8,0-3.5,0.8-4.6,2.1c-1.2-3-4.1-5.1-7.4-5.1s-6.3,2.1-7.4,5.1C10.5,57.8,8.8,57,7,57c-3.3,0-6,2.7-6,6   H63z M37.8,36.2c0.1,0.7,0.2,1.3,0.2,2c2.6,0.2,4.1,0.5,5.1,0.8c-1,0.3-2.6,0.5-4.9,0.8C36.5,39.9,34.5,40,32,40s-4.5-0.1-6.3-0.2   c-2.3-0.2-3.9-0.5-4.9-0.8c0.9-0.2,2.5-0.5,5.1-0.8c0.1-0.7,0.2-1.3,0.2-2C18,36.8,18,38.3,18,39c0,1.7,3.5,2.4,7.5,2.8   C27.7,42,30.1,42,32,42s4.3,0,6.5-0.2c3.9-0.3,7.5-1.1,7.5-2.8C46,38.3,46,36.8,37.8,36.2z" fill="#D9AA71"/></g></svg>
    
     
     <h1 class="text-[1.9rem] p-4">ERROR {errorStatus}</h1>
        <p class="text-indigo-50 text-[1.2rem] p-3">Reason: {errorMsg}</p>

        <a href="/" class="text-amber-400">
        <button class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow-sm mt-4 cursor-pointer">
            <div class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span class="relative text-black group-hover:text-white text-[1.4rem]"><span class="opacity-60" >➲</span> Return Home</span>
          </button>
          </a>
        </div>
 
    </main>
        <SideBar sidebarData={sidebarData} />

</div>
