<script lang="ts">
import Post from '@/routes/(admin)/(restricted)/admin/posts/Post.svelte';
import type { ICat, ITag, IPost } from '$lib/types/post';
export let data = { post: null, tags: [] as ITag[], cats: [] as ICat[], notfound: false } as { post: IPost | null, tags: ITag[], cats: ICat[], notfound: boolean }

</script>

<Post data={data}>
    <div slot="header">
        <h1 class="font-medium text-3xl">New Post</h1>
    </div>
</Post>
