<script lang="ts">
import CatOrTag from '#/routes/(admin)/(restricted)/admin/settings/CatOrTag.svelte';
import Settings from '#/routes/(admin)/(restricted)/admin/settings/Settings.svelte';
</script>

<Settings>
  {#snippet content()}
    <CatOrTag type="tag" />
  {/snippet}
</Settings>
