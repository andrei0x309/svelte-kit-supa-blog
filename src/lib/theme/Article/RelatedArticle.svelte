<script lang="ts">
    import type { IPost } from "@/lib/types/post";
    export let relatedArticle: IPost['related'][number]
</script>

<div class="max-w-sm max-w-[18rem] border border-gray-200 rounded-lg shadow">
    <a href="{`/${relatedArticle.slug}`}">
        <img class="rounded-t-lg p-1" src="{relatedArticle.feature_image}" alt="{relatedArticle.feature_image_alt}" />
    </a>
    <div class="p-5">
        <a href="{`/${relatedArticle.slug}`}">
            <h5 class="mb-2 text-xl font-bold tracking-tight">{relatedArticle.title}</h5>
        </a>
        <p class="mb-3 font-normal text-[0.95rem]">{relatedArticle.excerpt}</p>
        <a href="{`/${relatedArticle.slug}`}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Read more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
</div>
