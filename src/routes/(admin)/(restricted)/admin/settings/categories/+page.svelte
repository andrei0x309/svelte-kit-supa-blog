<script lang="ts">
	import Settings from '@/routes/(admin)/(restricted)/admin/settings/Settings.svelte';
	import Alert from '@/lib/components/shared/Alert.svelte';
    import Tabs from '@/routes/(admin)/(restricted)/admin/settings/Tabs.svelte';
    import { tabs } from  '@/routes/(admin)/(restricted)/admin/settings/tabs';
    import ConfirmModal from '@/lib/components/shared/ConfirmModal.svelte';
    import type { ICatTag } from '@/lib/types/catTag'
    import { deleteCatOrTag } from  '$lib/utils/client/catTag'
    import CatOrTags from '@/routes/(admin)/(restricted)/admin/settings/CatOrTags.svelte'

    interface Props {
        data?: { catOrTags: ICatTag[]} & { notFound: boolean };
    }

    let { data = $bindable({ catOrTags: [], notFound: false }) }: Props = $props();

    let confirm: ConfirmModal = $state()
    let alert: Alert = $state()
    const deleteCat = async (id: number) => {
        data = await deleteCatOrTag(id, 'cat', alert, data) as typeof data
    }
	
</script>

<Settings>
    {#snippet content()}
        <Tabs  tabs={tabs} activeTab='Categories'> 
            {#snippet content()}
                <CatOrTags  data={data} deleteFn={deleteCat} confirm={confirm} >
                    {#snippet alert()}
                        <Alert  bind:this={alert} />
                    {/snippet}
                    <!-- @migration-task: migrate this slot by hand, `confirm` would shadow a prop on the parent component -->
    <ConfirmModal slot="confirm" bind:this={confirm} />
                </CatOrTags>
            {/snippet}
        </Tabs>
    {/snippet}

</Settings>
