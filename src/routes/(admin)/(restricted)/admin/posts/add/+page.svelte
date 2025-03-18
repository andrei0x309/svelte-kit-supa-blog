<script lang="ts">
import Post from '@/routes/(admin)/(restricted)/admin/posts/Post.svelte';
import type { ICat, ITag, IPost } from '$lib/types/post';
    interface Props {
        data?: any;
    }

    let { data = { post: null, tags: [] as ITag[], cats: [] as ICat[], notfound: false } as { post: IPost | null, tags: ITag[], cats: ICat[], notfound: boolean } }: Props = $props();

</script>

<Post data={data}>
    {#snippet header()}
        <div >
            <h1 class="font-medium text-3xl">New Post</h1>
        </div>
    {/snippet}
</Post>
