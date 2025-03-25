<script lang="ts">
    import User from '@/routes/(admin)/(restricted)/admin/users/User.svelte';
    interface Props {
        header?: import('svelte').Snippet;
    }

    let { header }: Props = $props();
    
    </script>
    
<User header={header}>
</User>
