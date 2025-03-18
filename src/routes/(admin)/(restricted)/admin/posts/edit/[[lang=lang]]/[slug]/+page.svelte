<script lang="ts">
    import Post from '@/routes/(admin)/(restricted)/admin/posts/Post.svelte';
    import type { IPost, ICat, ITag } from '$lib/types/post';
    interface Props {
        data?: any;
    }

    let { data = { post: { } as IPost, tags: [] as ITag[], cats: [] as ICat[],  notfound: false } }: Props = $props();
    </script>
    <!-- <span>TEST</span> -->
    <Post data={data}>
        {#snippet header()}
        <div >
                <h1 class="font-medium text-3xl">Edit Post</h1>
            </div>
    {/snippet}
    </Post>
