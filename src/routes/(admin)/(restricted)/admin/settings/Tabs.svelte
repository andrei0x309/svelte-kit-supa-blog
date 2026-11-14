<script lang="ts">
interface Tab {
  name: string;
  path: string;
}

interface Props {
  tabs?: Tab[];
  activeTab?: string;
  content?: import('svelte').Snippet;
}

let {
  tabs = [],
  activeTab = '',
  content
}: Props = $props();
</script>

{#if tabs.length}
  <nav aria-label="Settings sections" class="mb-6 border-b border-white/15">
    <div class="-mb-px flex flex-wrap gap-1">
      {#each tabs as tab}
        <a
          href="/admin/settings/{tab.path}"
          aria-current={activeTab === tab.name ? 'page' : undefined}
          class={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.name
              ? 'border-zinc-400 text-white'
              : 'border-transparent text-slate-400 hover:border-white/30 hover:text-white'
          }`}
        >
          {tab.name}
        </a>
      {/each}
    </div>
  </nav>

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
