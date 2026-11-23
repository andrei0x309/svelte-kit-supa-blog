<script lang="ts">
import SideBar from '#/lib/theme/SideBar.svelte';
import { isLoading } from '#/stores/main.ts';
import { config } from '#lib/config/index.ts';
import type { IPost } from '#lib/types/post.ts';
import type { ICurrentUser } from '#lib/types/user.ts';
import { page as SveltePage } from '$app/state';

interface Props {
  data: {
    res: ICurrentUser;
    posts: IPost[];
    pageTitle: string;
    pageDescription: string;
    schemaContent: string;
    sidebarData: any;
  };
}

let { data }: Props = $props();
const sidebarData = $derived(data?.sidebarData);

let dataLoading = $state(false);
isLoading.subscribe((val) => {
  dataLoading = val;
});

let featureImage = $derived.by(() => {
  try {
    return new URL(data?.res?.avatar).href;
  } catch {
    return '';
  }
});

const pageUrl = SveltePage.url.href.replace('http:', 'https:');
</script>

<svelte:head>
  <title>{data.pageTitle}</title>
  <meta name="description" content={data.pageDescription} />
  <meta property="og:title" content={data.pageTitle} />
  <meta property="og:description" content={data.pageDescription} />
  <meta property="og:type" content="website" />
   {#if SveltePage.status === 200}
    <meta property="og:url" content={`${pageUrl}`} />
  {/if}
  <meta property="og:site_name" content={config.siteName} />
  <link rel="canonical" href={`${pageUrl}`} />
  <link rel="alternate" type="application/rss+xml" title={`${config.siteName} » Feed`} href={`${config.baseSiteUrl}/feed`} />

  {#if featureImage && SveltePage.status === 200}
    <meta property="og:image" content={featureImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="{data.pageTitle}">
    <meta property="twitter:description" content="{data.pageDescription}">
    <meta property="twitter:image" content="{featureImage}">
  {/if}
  {#if data?.schemaContent}
    {@html data.schemaContent}
  {/if}
</svelte:head>

<div id="main" class={`main flex md:flex-row w-full mt-6 mb-6 justify-center ${dataLoading ? 'opacity-70' : ''}`}>
  <main class="flex flex-col content w-full sm:w-full md:w-7/12 lg:w-7/12 xl:w-7/12 p-8 pb-0 article">
    {#if data?.res}
      <figure class="snip1336 rounded-lg">
        <img src="/images/author_bg.webp" alt="author bg" />
        <figcaption>
          <img src={data.res.avatar} alt="profile-sample4" class="profile" />
          <div class="flex flex-row">
            <h1>{data.res.username}</h1>
            <span>( Role: {data.res.role} )</span>
          </div>
          <p>{data.res.description}</p>
          {#if data.res.social_links}
            {#each Object.entries(data.res.social_links) as link}
              <a href={link[1]} class="follow">{link[0]}</a>
            {/each}
          {/if}
        </figcaption>
      </figure>
      {#if data.posts?.length}
        <section class="author-posts snip1336 mt-6 mb-6 pb-2 rounded-lg" aria-labelledby="author-posts-heading">
          <h2 id="author-posts-heading" class="ml-4 text-xl font-bold mt-4 -mb-1">Latest Posts</h2>
          <div class="grid gap-4 p-4">
            {#each data.posts as post}
              <article class="hover:sepia-[0.5] author-post border border-gray-200 rounded-lg shadow-sm">
                <a href={`/${post.slug}`} title={post.title}>
                  <div class="author-post-stripe" aria-hidden="true"></div>
                  <div class="px-5 py-4">
                    <h3 class="text-lg font-bold mb-2">{post.title}</h3>
                    {#if post.content}
                      <p class="mb-3 text-[0.95rem]">{post.content}</p>
                    {/if}
                    {#if post.created_at}
                      <time datetime={post.created_at} class="text-sm opacity-70">{new Date(post.created_at).toLocaleDateString()}</time>
                    {/if}
                  </div>
                </a>
              </article>
            {/each}
          </div>
        </section>
      {/if}
    {:else}
      <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold">User not found</h1>
      </div>
    {/if}
  </main>
  <SideBar {sidebarData} />
</div>

<style lang="scss">
  .snip1336 {
    position: relative;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    min-width: 230px;
    max-width: 40rem;
    width: 100%;
    color: var(--text-color);
    text-align: left;
    line-height: 1.4em;
    background-color: var(--bg-color-author);
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
    background-color: var(--bg-color-author);
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
    border-color: transparent transparent transparent var(--bg-color-author);
  }
  .snip1336 figcaption a {
    padding: 5px;
    border: 1px solid var(--text-color);
    color: var(--text-color);
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
    border-color: var(--link-color);
    color: var(--link-color);
  }
  .snip1336 h1 {
    margin: 0 0 5px;
    font-weight: 300;
  }
  .snip1336 span {
    display: inline-block;
    font-size: 0.5rem;
    color: var(--link-color);
    margin-left: 0.6rem;
  }
  .snip1336 p {
    margin: 0 0 10px;
    font-size: 0.8em;
    letter-spacing: 1px;
    opacity: 0.8;
  }
  .author-posts {
    width: 100%;
    max-width: 40rem;
  }
  .author-post a {
    color: inherit;
    text-decoration: none;
  }
  .author-post-stripe {
    width: 100%;
    height: 0.5rem;
    background: linear-gradient(90deg, #c2c2c2d5, #646464a8, #2c2c2ca2);
    border-top-left-radius: var(--radius-lg);
    border-top-right-radius: var(--radius-lg);
  }
</style>
