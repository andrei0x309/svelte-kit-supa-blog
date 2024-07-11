<script lang="ts">
    import User from '@/routes/(admin)/(restricted)/admin/users/User.svelte';
    
    </script>
    
<User>
    <slot name="header">
        <h1 class="font-medium text-3xl">New User</h1>
    </slot>
</User>
