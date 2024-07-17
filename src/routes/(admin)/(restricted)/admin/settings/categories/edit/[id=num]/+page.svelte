<script lang="ts">
	import Settings from '@/routes/(admin)/(restricted)/admin/settings/Settings.svelte';
    import CatOrTag from '@/routes/(admin)/(restricted)/admin/settings/CatOrTag.svelte';
    import type { ICatTag } from '$lib/types/catTag';

    export let data: { catOrTag: ICatTag } & { notFound: boolean }

</script>

<Settings>
    <CatOrTag slot="content" data={ { catOrTag: data.catOrTag, notFound: data?.notFound ?? false  } } />
</Settings>
