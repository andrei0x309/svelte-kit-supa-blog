<script lang="ts">
export let data: any;

</script>

<article itemscope={!data.isFull ? true : null} itemtype={!data.isFull ? 'http://schema.org/BlogPosting' : null} 
class="{`${data.isFull ? '' : 'content-va-on '}break-word post-body mb-2`}"
id="{`post-${data.id}`}" 
data-id={data.id} data-slug={data.slug} data-title={data.title}>
    <header>
        {#if data.isFull}
        <h1 class="blog-post-title">
            {data.title}
        </h1>
        {:else}
        <h2 itemprop="headline" class="blog-post-title blog-post-title-link">
        <a href="{`/${data.slug}`}" title={data.title}>
            {data.title}
         </a>
        </h2>
        {/if}
        
       <div class="blog-post-meta flex flex-row">
           <address class="author px-2 pt-3 pb-6"><a rel="author" title="Author's page" href={'/author/${data.author.username}'}>
            <i class="icon-user-solid-square"></i>
            <span class="inline" itemprop={ !data.isFull ? 'author' : ''}>{data.author.username}</span></a></address> 
           <span class="px-2 pt-3 pb-6"><i class="icon-calendar"></i>
          <time datetime={data.created_at} title={data.created_at} 
          itemprop={ !data.isFull ? 'datePublished' :''}>
          {data.created_at} 
          </time></span>
        <!-- //    <span class="px-2 pt-3 pb-6" ><i class="icon-folder"></i> <?php the_category(', '); ?></span> 
        //    <?php if (!$articleFull) { ?> 
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
          <img itemprop={ !data.isFull ? 'image': ''} class="m-auto wp-post-image" width="500" height="281" loading="lazy" 
          src={data.feature_image} alt={data?.feature_image_alt} >
               </div>
            </a> 
      {:else}
      <a href="{data.slug}" 
           title={data?.feature_image_alt}
          class="{`post-image post-image-left p-0 ${data.isFull ? '' : 'post-image-link'}`}">
          <div class="pt-2 pr-4 pl-4 pb-6 featured-thumbnail w-full content-center justify-center md:w-2/5 md:float-left text-center">
          <img itemprop={ !data.isFull ? 'image': ''} class="m-auto wp-post-image" width="500" height="281" loading="lazy" 
          src={data.feature_image} alt={data?.feature_image_alt} >
               </div>
            </a> 
        {/if}

        {#if data.isFull}
            {@html data.content}
        {:else}
            {@html data.content}

            <a href="{`/${data.slug}`}" title={data.title} class="read-more"><i class="icon-read_more"></i> View full article </a>
        {/if}

</div>
</article>