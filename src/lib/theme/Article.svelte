<script lang="ts">
import type { IPost } from '$lib/types/post'
export let data: IPost;
import { config } from '$lib/config';
import Signature from '$lib/theme/Article/Signature.svelte';
import RelatedArticle from '$lib/theme/Article/RelatedArticle.svelte';
import FeatureImage from '$lib/theme/FeatureImage.svelte';
// import Comments from '$lib/theme/Article/Comments.svelte';
export let draft = false;
export let index = 0

let related: IPost['related']

try {
    related = JSON.parse(data.related as any)
} catch {
    related = []
}


</script>

<article itemscope={!data.isFull ? true : null} itemtype={!data.isFull ? 'http://schema.org/BlogPosting' : null} 
class="{`${data.isFull ? '' : 'content-va-on '}break-word post-body mb-2`}"
id="{`post-${data.slug}`}" 
data-id={data.slug} data-slug={data.slug} data-title={data.title}>
    <header>
        {#if data.isFull}
        <h1 class="blog-post-title">
            {data.title}
        </h1>
        {:else}
        <h2 itemprop="headline" class="blog-post-title blog-post-title-link">
        <a href="{`/${draft ? 'preview/' : ''}${data.slug}`}" title={data.title}>
            {data.title}
         </a>
        </h2>
        {/if}
        
       <div class="blog-post-meta flex flex-row">
           <address class="author px-2 pt-3 pb-6">
            {#if config.authorPageEnabled}
            <a rel="author" title="Author's page" href={`/author/${data?.author?.username}`}>
            {#if data?.author?.avatar}
            <img width="8" height="8" src={data.author.avatar} alt={data.author.username} class="rounded-xl w-6 inline-block" />
            {:else}
            <i class="icon-user-solid-square"></i>
            {/if}
            <span class="inline" itemprop={ !data.isFull ? 'author' : ''}>{data?.author?.username}</span>
            </a>
            {:else}
            {#if data?.author?.avatar}
            <img  width="8" height="8" src={data.author.avatar} alt={data.author.username} class="rounded-xl w-6 inline-block" />
            {:else}
            <i class="icon-user-solid-square"></i>
            {/if}
            <span class="inline" itemprop={ !data.isFull ? 'author' : ''}>{data?.author?.username}</span>
            {/if}</address> 
           <span class="px-2 pt-3 pb-6"><i class="icon-calendar"></i>
          <time datetime={data.created_at} title={data.created_at} 
          itemprop={ !data.isFull ? 'datePublished' :''}>
          {new Date(data.created_at).toLocaleDateString() } 
          </time></span>
          {#if data?.cat?.name}
          <span class="px-2 pt-3 pb-6" >
          <a href="{`/category/${data.cat.slug}`}" title={data.cat.name}>
         <i class="icon-folder"></i> {data?.cat?.name ?? 'No category'}
            </a>
        </span> 
          {:else}
          <span class="px-2 pt-3 pb-6" ><i class="icon-folder"></i> {data?.cat?.name ?? 'No category'}</span> 
            {/if}
         
        <!-- //    <?php if (!$articleFull) { ?> 
        //    <meta itemprop="mainEntityOfPage" content="<?php echo site_url(); ?>">
        //    <meta itemprop="dateModified" content="<?php the_modified_date(); ?>">
        //    <?php } ?> -->
       </div>     
    </header>
    <div itemprop={ !data.isFull ? 'articleBody': ''} class="article-body">
    
    
        {#if !data.isFull}
        <a href="{data.slug}" 
           title={data?.feature_image_alt}
          class="{`post-image post-image-left p-0 ${data.isFull ? '' : 'post-image-link'}`}">
          <div class="pt-2 pr-4 pl-4 pb-6 featured-thumbnail w-full content-center justify-center md:w-2/5 md:float-left text-center">
          <FeatureImage full={data.isFull} imgSource={data.feature_image} alt={data?.feature_image_alt} index={index} />
          
               </div>
            </a> 
      {:else}
      <a href="{data.slug}" 
           title={data?.feature_image_alt}
          class="{`post-image post-image-left p-0 ${data.isFull ? '' : 'post-image-link'}`}">
          <div class="pt-2 pr-4 pl-4 pb-6 featured-thumbnail w-full content-center justify-center md:w-2/5 md:float-left text-center">
            <FeatureImage full={data.isFull} imgSource={data.feature_image} alt={data?.feature_image_alt} index={index} />

               </div>
            </a> 
        {/if}

        {#if data.isFull}
            {@html data.content}
        {:else}
            {@html data.content}

            <a href="{`/${draft ? 'preview/': ''}${data.slug}`}" title={data.title} class="read-more"><i class="icon-read_more"></i> View full article </a>
        {/if}
        
        <div class="clearfix">
        {#if data.isFull && data.tags && (data.tags.length ?? 0) > 0}
        {@const tags = data.tags.slice(0, 6)}
        <h3 class="text-xl font-bold mt-8 mb-4">Tags</h3>
   
        <div class="flex gap-4">
            {#each tags as tag}
            <a class=" text-[0.85rem] px46 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-40 items-center justify-center bg-gray-700/60 text-gray-100" href="{`/tag/${tag.slug}`}" title={tag.name}>
                <svg class="w-4 mr-2 block-inline" viewBox="0 0 30 30" ><path fill="currentColor" d="M23,3h-6c-0.512,0-1.024,0.195-1.414,0.586l-12,12c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0  c0.391-0.391,11.609-11.609,12-12C26.805,14.024,27,13.512,27,13V7C27,4.791,25.209,3,23,3z M23,9c-1.105,0-2-0.895-2-2  c0-1.105,0.895-2,2-2s2,0.895,2,2C25,8.105,24.105,9,23,9z"/></svg>
                {tag.name || 'No tag'}
            </a>
            {/each}
        </div>
        {/if}

        {#if data.isFull && related && (related.length ?? 0) > 0 }
        <h3 class="text-xl font-bold mt-8 mb-4">Related Articles</h3>
        <div class="flex flex-wrap gap-4">
        {#each related as aRelated }
            <RelatedArticle relatedArticle={aRelated} />
        {/each}
        </div>
        {/if}

        {#if data.isFull && data.signature}
            <Signature data={data.signature} />
        {/if}

        <!-- {#if data.isFull && data.author}
        <h3 class="text-xl font-bold mt-8 mb-4">Comments</h3>
            <Comments/>
        {/if} -->

    </div>
    </div>
</article>

<style lang="scss">
    .clearfix {
        clear: both;
    }
</style>