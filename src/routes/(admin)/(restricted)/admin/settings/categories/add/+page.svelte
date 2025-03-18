<script lang="ts">
	import Settings from '@/routes/(admin)/(restricted)/admin/settings/Settings.svelte';
    import CatOrTag from '@/routes/(admin)/(restricted)/admin/settings/CatOrTag.svelte';
</script>

<Settings>
    {#snippet content()}
        <CatOrTag  />
    {/snippet}
</Settings>
