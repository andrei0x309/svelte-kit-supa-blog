<script lang="ts">
import CatOrTag from '#/routes/(admin)/(restricted)/admin/settings/CatOrTag.svelte';
import Settings from '#/routes/(admin)/(restricted)/admin/settings/Settings.svelte';
import type { ICatTag } from '#lib/types/catTag.ts';

interface Props {
  data: { catOrTag: ICatTag } & { notFound: boolean };
}

let { data }: Props = $props();
</script>

<Settings>
  {#snippet content()}
    <CatOrTag data={{ catOrTag: data.catOrTag, notFound: data?.notFound ?? false }} />
  {/snippet}
</Settings>
