<script lang="ts">
    import User from '@/routes/(admin)/(restricted)/admin/users/User.svelte';
    interface Props {
        header?: import('svelte').Snippet;
    }

    let { header }: Props = $props();
    
    </script>
    
<User>
    {#if header}{@render header()}{:else}
        <h1 class="font-medium text-3xl">New User</h1>
    {/if}
</User>
