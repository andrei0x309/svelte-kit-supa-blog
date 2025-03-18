<script lang="ts">
	import Settings from '@/routes/(admin)/(restricted)/admin/settings/Settings.svelte';
    import CatOrTag from '@/routes/(admin)/(restricted)/admin/settings/CatOrTag.svelte';
    import type { ICatTag } from '$lib/types/catTag';

    interface Props {
        data: { catOrTag: ICatTag } & { notFound: boolean };
    }

    let { data }: Props = $props();

</script>

<Settings>
    {#snippet content()}
        <CatOrTag  data={ { catOrTag: data.catOrTag, notFound: data?.notFound ?? false  } } />
    {/snippet}
</Settings>
