<script lang="ts">
import Alert from '#/lib/components/shared/Alert.svelte';
import type { ICatTag } from '#/lib/types/catTag.ts';
import { deleteCatOrTag } from '#/lib/utils/client/catTag.ts';
import CatOrTags from '#/routes/(admin)/(restricted)/admin/settings/CatOrTags.svelte';
import Settings from '#/routes/(admin)/(restricted)/admin/settings/Settings.svelte';
import Tabs from '#/routes/(admin)/(restricted)/admin/settings/Tabs.svelte';
import { tabs } from '#/routes/(admin)/(restricted)/admin/settings/tabs.ts';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
let catOrTags = $derived<ICatTag[]>(data.catOrTags ?? []);
let alertRef = $state<Alert>();

const deleteTag = async (id: number) => {
  const res = await deleteCatOrTag(id, 'tag', alertRef!, { catOrTags });
  catOrTags = res.catOrTags;
};
</script>

<Settings>
  {#snippet content()}
    <Tabs {tabs} activeTab="Tags">
      {#snippet content()}
      <CatOrTags data={{ catOrTags, notFound: data.notFound ?? false }} deleteFn={deleteTag} type="tag">
        {#snippet alert()}
          <Alert bind:this={alertRef} />
        {/snippet}
      </CatOrTags>
      {/snippet}
    </Tabs>
  {/snippet}
</Settings>