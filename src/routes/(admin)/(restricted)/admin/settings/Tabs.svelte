<script lang="ts">
    interface Props {
        tabs?: any;
        activeTab?: string;
        content?: import('svelte').Snippet;
    }

    let { tabs = [] as {
        name: string,
        path: string,
    }[], activeTab = '', content }: Props = $props();

</script>

{#if tabs.length}
<div class="radio-container">
    <legend>&nbsp;&nbsp;Tabs&nbsp;&nbsp;</legend>
    <div class="flex">
    {#each tabs as tab}
    <a class="flex fex-col items-center" href="/admin/settings/{tab.path}">
    <label for="{`tab-${tab.name}`}"
           class="input-label"
           >
      <input type="radio"
             checked={activeTab === tab.name}
             value="false"
             name="draft"
             id="draft-no"/>
      <span>{tab.name}</span>
    </label>
</a>
    {/each}
    </div>
</div>

{#if content}{@render content()}{:else}
    <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold">Settings page slot not provided</h1>
    </div>
{/if}

{:else}
<div class="flex flex-col items-center">
    <h1 class="text-3xl font-bold">No tabs provided</h1>
</div>
{/if}