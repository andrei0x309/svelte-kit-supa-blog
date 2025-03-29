

<script lang="ts">
    import SideBar from '@/lib/theme/SideBar.svelte';
    import { page as SveltePage } from '$app/state';
    import { isLoading } from '@/stores/main';
    import { config } from '$lib/config';
    import type { ICurrentUser } from '$lib/types/user';
    import { generateURLFCFrameEmbed } from '$lib/utils/client/fc-frame-v2';

    interface Props {
        data: {
        res: ICurrentUser
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
    try{
        featureImage = (new URL(data?.res?.avatar)).href
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
{#if config.farcasterFrameV2Enabled}
<meta name="fc:frame" content={generateURLFCFrameEmbed(featureImage, pageUrl)} />
{/if}
{/if}
{#if data?.schemaContent}
{@html data.schemaContent}
{/if}
</svelte:head>

<div id="main" class="{`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70': ''}`}">
 
    <main class="flex flex-col content w-full sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 p-8 article">
        {#if data?.res}
        <figure class="snip1336">
            <img src="/images/author_bg.webp" alt="author bg" />
            <figcaption>
              <img src="{data.res.avatar}" alt="profile-sample4" class="profile" />
              <div class="flex flex-row"><h1>{data.res.username}</h1><span>( Role: {data.res.role} )</span></div>
              <p>{data.res.description}</p>
              {#if data.res.social_links}
              {#each Object.entries(data.res.social_links) as link }
              <a href="{link[1]}" class="follow">{link[0]}</a>
              {/each}
                {/if}
            </figcaption>
          </figure>
        {:else}
        <div class="flex flex-col items-center">
            <h1 class="text-3xl font-bold">User not found</h1>
        </div>
        {/if}
 
    </main>
    <SideBar sidebarData={sidebarData} />
</div>


<style lang="scss">
.snip1336 {
    position: relative;
    overflow: hidden;
    margin: 0.1rem auto;
    min-width: 230px;
    max-width: 40rem;
    width: 100%;
    color: #ffffff;
    text-align: left;
    line-height: 1.4em;
    background-color: #141414;
}
.snip1336 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.snip1336 img {
  max-width: 100%;
  vertical-align: top;
  opacity: 0.85;
}
.snip1336 figcaption {
  width: 100%;
  background-color: #141414;
  padding: 25px;
  position: relative;
}
.snip1336 figcaption:before {
  position: absolute;
  content: '';
  bottom: 100%;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 55px 0 0 400px;
  border-color: transparent transparent transparent #141414;
}
.snip1336 figcaption a {
  padding: 5px;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-size: 0.7em;
  text-transform: uppercase;
  margin: 10px 0;
  display: inline-block;
  opacity: 0.65;
  width: 47%;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 1px;
}
.snip1336 figcaption a:hover {
  opacity: 1;
}
.snip1336 .profile {
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 25px;
  z-index: 1;
  max-width: 90px;
  opacity: 1;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
.snip1336 .follow {
  margin-right: 4%;
  border-color: #2980b9;
  color: #2980b9;
}
.snip1336 h1 {
  margin: 0 0 5px;
  font-weight: 300;
}
.snip1336 span {
  display: inline-block;
  font-size: 0.5rem;
  color: #2980b9;
  margin-left: 0.6rem;
}
.snip1336 p {
  margin: 0 0 10px;
  font-size: 0.8em;
  letter-spacing: 1px;
  opacity: 0.8;
}

</style>

