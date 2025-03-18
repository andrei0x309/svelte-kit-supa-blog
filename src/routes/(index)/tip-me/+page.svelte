

<script lang="ts">
    import SideBar from '@/lib/theme/SideBar.svelte';
    import { page as SveltePage } from '$app/state';
    import { isLoading } from '@/stores/main';
    import { config } from '$lib/config';
    // import type { ICurrentUser } from '$lib/types/user';

    interface Props {
        data: {
        // res: ICurrentUser
        pageTitle: string,
        pageDescription: string,
        schemaContent: string,
        sidebarData: any
    };
    }

    let { data }: Props = $props();
    const sidebarData = data?.sidebarData

    let dataLoading = $state(false)
    isLoading.subscribe((val) => {
        dataLoading = val
    })

    let featureImage = $state('')
    // try{
    //     featureImage = (new URL(featureImage)).href
    // } catch {
    //     featureImage = ''
    // }

    let pageTitle = `Tip Me - ${ config.siteName}`
    let pageDescription = `Show support and send a tip to - ${ config.tipMeName } - ${ config.siteName} `
 
</script>

<svelte:head>
<title>{pageTitle}</title>
<meta name="description" content="{pageDescription}">
<meta property="og:title" content="{pageTitle}" />
<meta property="og:description" content="{pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content={`${SveltePage.url}`} />
<meta property="og:site_name" content="{config.siteName}" />
<link rel="canonical" href={`${SveltePage.url}`} />
<link rel="alternate" type="application/rss+xml" title="{`${config.siteName} » Feed`}" href="{`${config.baseSiteUrl}/feed`}">

{#if featureImage }
<meta property="og:image" content="{featureImage}" />
{/if}
<!-- {#if data?.schemaContent}
{@html data.schemaContent}
{/if} -->
</svelte:head>

<div id="main" class="{`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70': ''}`}">
 
    <main class="flex flex-col content w-full sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 p-8 article">
        <h1 class="blog-post-title mx-auto mb-6">Tip Me</h1>
       
        <div
  class="mx-auto w-[21rem] h-[28.5rem] bg-[#171717] [transition:1s_ease-in-out] [clip-path:polygon(_30px_0%,_100%_0,_100%_calc(100%_-_30px),_calc(100%_-_30px)_100%,_0_100%,_0%_30px_)] rounded-tr-[20px] rounded-bl-[20px] flex flex-col"
>
  <div
    class="w-[6.8em] h-[6.8em] bg-[rgb(41,_41,_41)] rounded-[15px] ml-auto mr-auto mt-8 mb-4 flex"
  >
    <svg
      fill="none"
      class="m-auto text-[rgb(145,_206,_46)]"
      width="80"
      height="80"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 6.27975C16 6.88118 15.7625 7.45883 15.3383 7.88611C14.3619 8.87007 13.415 9.89605 12.4021 10.8443C12.17 11.0585 11.8017 11.0507 11.5795 10.8268L8.6615 7.88611C7.7795 6.99725 7.7795 5.56225 8.6615 4.67339C9.55218 3.77579 11.0032 3.77579 11.8938 4.67339L11.9999 4.78027L12.1059 4.67345C12.533 4.24286 13.1146 4 13.7221 4C14.3297 4 14.9113 4.24284 15.3383 4.67339C15.7625 5.10073 16 5.67835 16 6.27975Z"
        stroke="currentColor"
        stroke-linejoin="round"
      ></path>
      <path
        d="M18 20L21.8243 16.1757C21.9368 16.0632 22 15.9106 22 15.7515V10.5C22 9.67157 21.3284 9 20.5 9V9C19.6716 9 19 9.67157 19 10.5V15"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M18 16L18.8581 15.1419C18.949 15.051 19 14.9278 19 14.7994V14.7994C19 14.6159 18.8963 14.4482 18.7322 14.3661L18.2893 14.1447C17.5194 13.7597 16.5894 13.9106 15.9807 14.5193L15.0858 15.4142C14.7107 15.7893 14.5 16.298 14.5 16.8284V20"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M6 20L2.17574 16.1757C2.06321 16.0632 2 15.9106 2 15.7515V10.5C2 9.67157 2.67157 9 3.5 9V9C4.32843 9 5 9.67157 5 10.5V15"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M6 16L5.14187 15.1419C5.05103 15.051 5 14.9278 5 14.7994V14.7994C5 14.6159 5.10366 14.4482 5.26776 14.3661L5.71067 14.1447C6.48064 13.7597 7.41059 13.9106 8.01931 14.5193L8.91421 15.4142C9.28929 15.7893 9.5 16.298 9.5 16.8284V20"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  </div>
  <span class="font-bold text-[white] text-center block text-[1.2rem]"
    >Tip Me</span
  >
  <p
    class="font-normal text-[white] block text-center text-[0.97rem] mt-3 mb-1 mx-2"
  >
    Send a tip to show support!
  </p>
  <p
    class="font-normal text-[white] block text-center text-[0.97rem] mb-5 mx-2"
  >
    You can use a traditional provider(PayPal, debit card) or a crypto provider,
    whichever you find easier.
  </p>

  <a
    class="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-gray-600/15 border border-white/20 w-[90%] mx-auto mb-[1rem]"
    href="{config.tipKoFiLink}" target="_blank" rel="noopener noreferrer nofollow external"
  >
    <span
      class="group/link font-bold text-[white] text-center block text-[1.05rem] group-hover/button:text-[rgb(145,_206,_46)]"
      >Tip with card / paypal</span
    >
    <div
      class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)] ]"
    >
      <div class="relative h-full w-10 bg-white/20"></div>
    </div>
  </a>

  <a
    class="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-gray-600/15 border border-white/20 w-[90%] mx-auto mb-[1rem]"
    href="{config.tipNowPaymentsLink}" target="_blank" rel="noopener noreferrer nofollow external"
  >
    <span
      class="font-bold text-[white] text-center block text-[1.05rem] group-hover/button:text-[rgb(145,_206,_46)]"
      >Tip with crypto</span
    >
    <div
      class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
    >
      <div class="relative h-full w-10 bg-white/20"></div>
    </div>
  </a>
</div>

        
    </main>
    <SideBar sidebarData={sidebarData} />
</div>


<style lang="scss">
 
</style>