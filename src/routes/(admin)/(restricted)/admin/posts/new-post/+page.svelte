<script lang="ts">
import Post from '@/routes/(admin)/(restricted)/admin/posts/Post.svelte';

</script>

<Post>
    <slot name="header">
        <h1 class="font-medium text-3xl">New Post</h1>
    </slot>
</Post>