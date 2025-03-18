<script lang="ts">
    import User from '@/routes/(admin)/(restricted)/admin/users/User.svelte';
    import type { ICurrentUser } from '$lib/types/user';

    interface ICurrentUserEx {
        notfound: boolean;
        user: ICurrentUser & { error: boolean };
    }
    interface Props {
        data: ICurrentUserEx;
    }

    let { data = $bindable() }: Props = $props();
    if (data.notfound) {
        data.user.error = true
    } else {
        data.user.error = false
    }
    </script>
    
<User {...data.user}>
    {#snippet header()}
        <div >
            <h1 class="font-medium text-3xl">Edit User { data.user?.id || ''}</h1>
        </div>
    {/snippet}
</User>
