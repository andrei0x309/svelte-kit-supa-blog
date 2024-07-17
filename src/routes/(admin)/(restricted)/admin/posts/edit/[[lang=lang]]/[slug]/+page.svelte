<script lang="ts">
    import Post from '@/routes/(admin)/(restricted)/admin/posts/Post.svelte';
    import type { IPost, ICat, ITag } from '$lib/types/post';
    export let data = { post: { } as IPost, tags: [] as ITag[], cats: [] as ICat[],  notfound: false };
    </script>
    <!-- <span>TEST</span> -->
    <Post data={data}>
        <div slot="header">
            <h1 class="font-medium text-3xl">Edit Post</h1>
        </div>
    </Post>
