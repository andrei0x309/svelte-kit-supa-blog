<script lang="ts">
	import Settings from '@/routes/(admin)/(restricted)/admin/settings/Settings.svelte';
	import Alert from '@/lib/components/shared/Alert.svelte';
    import Tabs from '@/routes/(admin)/(restricted)/admin/settings/Tabs.svelte';
    import { tabs } from  '@/routes/(admin)/(restricted)/admin/settings/tabs';
    import ConfirmModal from '@/lib/components/shared/ConfirmModal.svelte';
    import type { ICatTag } from '@/lib/types/catTag'
    import { deleteCatOrTag } from  '$lib/utils/client/catTag'
    import CatOrTags from '@/routes/(admin)/(restricted)/admin/settings/CatOrTags.svelte'

    export let data: { catOrTags: ICatTag[]} & { notFound: boolean } = { catOrTags: [], notFound: false }

    let confirm: ConfirmModal
    let alert: Alert
    const deleteTag = async (id: number) => {
        data = await deleteCatOrTag(id, 'tag', alert, data) as typeof data
    }
	
</script>

<Settings>
    <Tabs slot="content" tabs={tabs} activeTab='Tags'> 
        <CatOrTags slot="content" data={data} deleteFn={deleteTag} confirm={confirm} type="tag" >
            <Alert slot="alert" bind:this={alert} />
            <ConfirmModal slot="confirm" bind:this={confirm} />
        </CatOrTags>
    </Tabs>

</Settings>
